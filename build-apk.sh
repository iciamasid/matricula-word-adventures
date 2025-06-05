
#!/bin/bash

# APK Build Script
set -e

echo "📱 Building Android APK..."

# Set Java 17 environment
export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
export PATH=$JAVA_HOME/bin:$PATH

echo "☕ Using Java version:"
java -version

# Check if Android environment is set up
if [ ! -d "/usr/local/lib/android/sdk" ]; then
    echo "❌ Android SDK not found. Please run setup-android.sh first."
    exit 1
fi

# Set environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Verify Android platform exists
if [ ! -d "android" ]; then
    echo "❌ Android platform not found. Running setup..."
    chmod +x setup-android.sh
    ./setup-android.sh
fi

# Build the web app
echo "🔨 Building web application..."
npm run build

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

# Build APK
echo "📦 Building APK..."
cd android

# Ensure gradle.properties has correct Java 17 settings
cat > gradle.properties << EOF
# Android SDK and build settings
sdk.dir=$ANDROID_SDK_ROOT
org.gradle.java.home=$JAVA_HOME
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Android build settings
android.useAndroidX=true
android.enableJetifier=true

# Gradle daemon settings
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
EOF

# Ensure gradlew is executable
chmod +x gradlew

# Build with error handling
echo "🔨 Starting Gradle build..."
if ! ./gradlew assembleDebug --info; then
    echo "❌ Build failed. You can try:"
    echo "1. Run fallback build: chmod +x build-apk-fallback.sh && ./build-apk-fallback.sh"
    echo "2. Run fresh build: chmod +x fresh-build.sh && ./fresh-build.sh"
    exit 1
fi

echo "✅ APK build completed!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Show APK info
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "📊 APK size: $(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)"
    echo "📱 APK ready for installation!"
fi
