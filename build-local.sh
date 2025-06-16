
#!/bin/bash

# Local Android APK Build Script
set -e

echo "🚀 Starting local Android APK build..."
echo "📋 Build started at: $(date)"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version $NODE_VERSION is too old. Please install Node.js 18 or higher."
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check Java
if ! command -v java &> /dev/null; then
    print_error "Java is not installed. Please install Java 17 JDK."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" != "17" ]; then
    print_warning "Java version $JAVA_VERSION detected. Java 17 is recommended."
else
    print_success "Java 17 detected"
fi

# Check JAVA_HOME
if [ -z "$JAVA_HOME" ]; then
    print_error "JAVA_HOME environment variable is not set."
    print_error "Please set JAVA_HOME to your Java 17 installation directory."
    exit 1
fi
print_success "JAVA_HOME is set to: $JAVA_HOME"

# Check Android SDK
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    print_error "Android SDK not found. Please set ANDROID_HOME or ANDROID_SDK_ROOT."
    print_error "Usually located at: ~/Android/Sdk (Linux/macOS) or %LOCALAPPDATA%\\Android\\Sdk (Windows)"
    exit 1
fi

# Use ANDROID_SDK_ROOT if ANDROID_HOME is not set
if [ -z "$ANDROID_HOME" ]; then
    export ANDROID_HOME="$ANDROID_SDK_ROOT"
fi

if [ ! -d "$ANDROID_HOME" ]; then
    print_error "Android SDK directory not found at: $ANDROID_HOME"
    exit 1
fi
print_success "Android SDK found at: $ANDROID_HOME"

# Check if sdkmanager exists
if [ ! -f "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
    print_warning "SDK Manager not found. Please install Android SDK Command-line Tools."
fi

print_success "All prerequisites check passed!"

# Step 1: Install dependencies
print_status "Installing npm dependencies..."
if ! npm install; then
    print_error "Failed to install npm dependencies"
    exit 1
fi
print_success "Dependencies installed successfully"

# Step 2: Build web application
print_status "Building web application..."
if ! npm run build; then
    print_error "Web application build failed"
    exit 1
fi
print_success "Web application built successfully"

# Step 3: Add Android platform if not exists
if [ ! -d "android" ]; then
    print_status "Adding Android platform..."
    if ! npx cap add android; then
        print_error "Failed to add Android platform"
        exit 1
    fi
    print_success "Android platform added successfully"
else
    print_status "Android platform already exists"
fi

# Step 4: Sync Capacitor
print_status "Syncing Capacitor..."
if ! npx cap sync android; then
    print_error "Capacitor sync failed"
    exit 1
fi
print_success "Capacitor sync completed"

# Step 5: Configure Android project
print_status "Configuring Android project..."
cd android

# Create local.properties if it doesn't exist
if [ ! -f "local.properties" ]; then
    echo "sdk.dir=$ANDROID_HOME" > local.properties
    print_success "Created local.properties"
fi

# Make gradlew executable
chmod +x gradlew

# Create/update gradle.properties
cat > gradle.properties << EOF
# Android SDK and build settings
sdk.dir=$ANDROID_HOME
org.gradle.java.home=$JAVA_HOME
org.gradle.jvmargs=-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Android build settings
android.useAndroidX=true
android.enableJetifier=true

# Gradle daemon settings
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true

# Additional build optimization
org.gradle.caching=true
org.gradle.configuration-cache=false
EOF

print_success "Android project configured"

# Step 6: Build APK
print_status "Building Android APK..."
print_status "This may take several minutes on first build..."

if ! ./gradlew assembleDebug --info; then
    print_error "APK build failed"
    print_error "Try running: ./gradlew clean assembleDebug"
    exit 1
fi

print_success "APK build completed successfully!"

# Step 7: Verify APK and show results
APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    print_success "APK generated successfully!"
    echo ""
    echo "📁 APK Location: android/$APK_PATH"
    echo "📊 APK Size: $APK_SIZE"
    echo "📱 Ready for installation!"
    echo ""
    echo "🔧 To install on device:"
    echo "   adb install $APK_PATH"
    echo ""
    echo "📋 Build completed at: $(date)"
else
    print_error "APK file not found after build"
    echo "📋 Checking build outputs:"
    find app/build/outputs -name "*.apk" 2>/dev/null || echo "No APK files found"
    exit 1
fi

cd ..
print_success "Local build process completed successfully! 🎉"
