
#!/bin/bash

# Enhanced Fresh Build Script - Complete setup from scratch with comprehensive error handling
set -e

echo "🚀 Starting fresh build process..."
echo "📋 Build started at: $(date)"

# Source Java detection utility
if [ -f "./detect-java.sh" ]; then
    source ./detect-java.sh
    if ! setup_java; then
        echo "❌ Java setup failed. Please check the Codespace configuration."
        exit 1
    fi
else
    echo "⚠️ Java detection script not found. Using default configuration..."
    export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
    if [ ! -d "$JAVA_HOME" ]; then
        echo "❌ Java 17 not found. Please rebuild the Codespace."
        exit 1
    fi
fi

# Set environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin

echo "📋 Environment Configuration:"
echo "Java Home: $JAVA_HOME"
echo "Android SDK: $ANDROID_SDK_ROOT"
echo "User: $(whoami)"
echo "Working Directory: $(pwd)"

# Verify Java version
echo "☕ Verifying Java version:"
if [ -f "$JAVA_HOME/bin/java" ]; then
    $JAVA_HOME/bin/java -version
else
    echo "❌ Java executable not found at $JAVA_HOME/bin/java"
    exit 1
fi

# Step 1: Clean everything
echo "📋 Step 1: Cleaning previous builds..."
echo "🗑️ Removing node_modules, package-lock.json, dist, .vite..."
rm -rf node_modules package-lock.json dist .vite

if [ -d "android" ]; then
    echo "🗑️ Removing existing Android platform..."
    rm -rf android
fi

echo "✅ Cleanup completed"

# Step 2: Install dependencies
echo "📋 Step 2: Installing dependencies..."
if ! npm install --legacy-peer-deps; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi
echo "✅ Dependencies installed successfully"

# Step 3: Build web app
echo "📋 Step 3: Building web application..."
if ! npm run build; then
    echo "❌ Web application build failed"
    exit 1
fi
echo "✅ Web application built successfully"

# Step 4: Check Android SDK
echo "📋 Step 4: Verifying Android SDK..."
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "❌ Android SDK not found at $ANDROID_SDK_ROOT"
    echo "Please rebuild the Codespace to set up the Android environment."
    exit 1
fi

if [ ! -f "$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "❌ SDK manager not found"
    echo "Please rebuild the Codespace to set up the Android environment."
    exit 1
fi

echo "✅ Android SDK verified"

# Step 5: Re-accept licenses
echo "📋 Step 5: Re-accepting Android SDK licenses..."
echo "📋 This may take a few minutes..."
(yes | timeout 300 $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses || echo "License acceptance completed (may have timed out safely)")

# Step 6: Add Android platform
echo "📋 Step 6: Adding Android platform..."
if ! npx cap add android; then
    echo "❌ Failed to add Android platform"
    exit 1
fi
echo "✅ Android platform added successfully"

# Step 7: Configure Android project
echo "📋 Step 7: Configuring Android project..."
cd android

# Ensure gradlew is executable
chmod +x gradlew

# Create local.properties
echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties

# Create comprehensive gradle.properties with Java 17
cat > gradle.properties << EOF
# Android SDK and build settings
sdk.dir=$ANDROID_SDK_ROOT
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

echo "📋 Android project configuration:"
echo "📁 local.properties:"
cat local.properties
echo ""
echo "📁 gradle.properties:"
cat gradle.properties

cd ..
echo "✅ Android project configured"

# Step 8: Sync Capacitor
echo "📋 Step 8: Syncing Capacitor..."
if ! npx cap sync android; then
    echo "❌ Capacitor sync failed"
    exit 1
fi
echo "✅ Capacitor sync completed"

# Step 9: Build APK
echo "📋 Step 9: Building APK..."
cd android

echo "📋 Starting Gradle build with detailed output..."
echo "📋 Build command: ./gradlew assembleDebug --info --stacktrace"

if ! ./gradlew assembleDebug --info --stacktrace; then
    echo "❌ APK build failed"
    echo "📋 Troubleshooting suggestions:"
    echo "1. Check the error messages above"
    echo "2. Try the fallback build script: ./build-apk-fallback.sh"
    echo "3. Verify all licenses are accepted: ./verify-licenses.sh"
    exit 1
fi

echo "✅ Fresh build completed successfully!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Verify APK was created and show info
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    APK_SIZE=$(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)
    echo "📊 APK size: $APK_SIZE"
    echo "📱 APK ready for installation!"
    echo "📋 Build completed at: $(date)"
else
    echo "❌ APK file not found after successful build"
    echo "📋 Checking build outputs:"
    find app/build/outputs -name "*.apk" 2>/dev/null || echo "No APK files found"
fi

cd ..
echo "🎉 Fresh build process completed successfully!"
