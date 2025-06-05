
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

# Build the web app
echo "🔨 Building web application..."
npm run build

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

# Build APK
echo "📦 Building APK..."
cd android

# Ensure gradle.properties has Java 17 setting
echo "org.gradle.java.home=$JAVA_HOME" >> gradle.properties

./gradlew assembleDebug

echo "✅ APK build completed!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Show APK info
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "📊 APK size: $(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)"
fi
