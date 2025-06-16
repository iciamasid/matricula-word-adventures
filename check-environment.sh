
#!/bin/bash

# Environment Check Script for Android Development
echo "🔍 Checking Android Development Environment"
echo "=========================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_check() {
    echo -e "${BLUE}🔍 Checking $1...${NC}"
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

# Check Node.js
print_check "Node.js"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_success "Node.js $NODE_VERSION is installed"
    
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -lt 18 ]; then
        print_warning "Node.js version is older than 18. Consider upgrading."
    fi
else
    print_error "Node.js is not installed"
    echo "  📥 Install from: https://nodejs.org/"
fi

# Check npm
print_check "npm"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    print_success "npm $NPM_VERSION is installed"
else
    print_error "npm is not installed"
fi

# Check Java
print_check "Java"
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    print_success "Java is installed: $JAVA_VERSION"
    
    # Check if it's Java 17
    if echo "$JAVA_VERSION" | grep -q "17\."; then
        print_success "Java 17 detected (recommended)"
    else
        print_warning "Java 17 is recommended for Android development"
    fi
else
    print_error "Java is not installed"
    echo "  📥 Install Java 17 from: https://adoptium.net/"
fi

# Check JAVA_HOME
print_check "JAVA_HOME"
if [ -n "$JAVA_HOME" ]; then
    if [ -d "$JAVA_HOME" ]; then
        print_success "JAVA_HOME is set: $JAVA_HOME"
        
        if [ -f "$JAVA_HOME/bin/java" ]; then
            print_success "Java executable found in JAVA_HOME"
        else
            print_error "Java executable not found in JAVA_HOME/bin/"
        fi
    else
        print_error "JAVA_HOME directory does not exist: $JAVA_HOME"
    fi
else
    print_error "JAVA_HOME environment variable is not set"
    echo "  🔧 Set JAVA_HOME to your Java installation directory"
fi

# Check Android SDK
print_check "Android SDK"
ANDROID_SDK=""
if [ -n "$ANDROID_HOME" ]; then
    ANDROID_SDK="$ANDROID_HOME"
elif [ -n "$ANDROID_SDK_ROOT" ]; then
    ANDROID_SDK="$ANDROID_SDK_ROOT"
fi

if [ -n "$ANDROID_SDK" ]; then
    if [ -d "$ANDROID_SDK" ]; then
        print_success "Android SDK found: $ANDROID_SDK"
        
        # Check for important SDK components
        if [ -f "$ANDROID_SDK/cmdline-tools/latest/bin/sdkmanager" ]; then
            print_success "SDK Manager found"
        else
            print_warning "SDK Manager not found. Install Android SDK Command-line Tools"
        fi
        
        if [ -d "$ANDROID_SDK/platform-tools" ]; then
            print_success "Platform tools found"
        else
            print_warning "Platform tools not found"
        fi
        
        if [ -d "$ANDROID_SDK/platforms" ]; then
            PLATFORMS=$(ls "$ANDROID_SDK/platforms" 2>/dev/null | wc -l)
            if [ "$PLATFORMS" -gt 0 ]; then
                print_success "Android platforms found ($PLATFORMS platforms)"
            else
                print_warning "No Android platforms found"
            fi
        else
            print_warning "No platforms directory found"
        fi
        
    else
        print_error "Android SDK directory does not exist: $ANDROID_SDK"
    fi
else
    print_error "Android SDK not found (ANDROID_HOME or ANDROID_SDK_ROOT not set)"
    echo "  🔧 Set ANDROID_HOME to your Android SDK directory"
    echo "  📥 Usually located at:"
    echo "     • macOS: ~/Library/Android/sdk"
    echo "     • Linux: ~/Android/Sdk"
    echo "     • Windows: %LOCALAPPDATA%\\Android\\Sdk"
fi

# Check ADB
print_check "ADB (Android Debug Bridge)"
if command -v adb &> /dev/null; then
    ADB_VERSION=$(adb version | head -n 1)
    print_success "ADB is available: $ADB_VERSION"
else
    print_warning "ADB not found in PATH"
    echo "  🔧 Add Android SDK platform-tools to your PATH"
fi

# Check Git
print_check "Git"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_success "$GIT_VERSION is installed"
else
    print_error "Git is not installed"
    echo "  📥 Install from: https://git-scm.com/"
fi

# Check Capacitor CLI
print_check "Capacitor CLI"
if command -v cap &> /dev/null; then
    CAP_VERSION=$(cap --version)
    print_success "Capacitor CLI $CAP_VERSION is available"
else
    print_warning "Capacitor CLI not found globally"
    echo "  🔧 It will be used via npx when needed"
fi

# Check if in project directory
print_check "Project files"
if [ -f "package.json" ]; then
    print_success "package.json found"
    
    if [ -f "capacitor.config.ts" ]; then
        print_success "Capacitor config found"
    else
        print_warning "Capacitor config not found"
    fi
    
    if [ -d "android" ]; then
        print_success "Android platform exists"
        
        if [ -f "android/gradlew" ]; then
            print_success "Gradle wrapper found"
        else
            print_warning "Gradle wrapper not found"
        fi
    else
        print_warning "Android platform not added yet"
        echo "  🔧 Run: npx cap add android"
    fi
else
    print_warning "Not in a Node.js project directory (no package.json found)"
fi

echo ""
echo "📋 Environment Check Complete"
echo "=============================="

# Summary
echo ""
echo "🚀 Ready to build APK locally!"
echo ""
echo "Next steps:"
echo "1. Fix any ❌ errors shown above"
echo "2. Run: ./build-local.sh (Linux/macOS) or build-local.bat (Windows)"
echo "3. Your APK will be at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "Need help? Check LOCAL_BUILD_GUIDE.md for detailed instructions."
