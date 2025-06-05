
#!/bin/bash

# Fresh Build Script - Complete setup from scratch
set -e

echo "🚀 Starting fresh build process..."

# Set Java 17 environment
export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
export PATH=$JAVA_HOME/bin:$PATH

echo "☕ Using Java version:"
java -version

# Set Android environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Step 1: Clean everything
echo "📋 Step 1: Cleaning previous builds..."
chmod +x clean-build.sh
./clean-build.sh

# Step 2: Install dependencies
echo "📋 Step 2: Installing dependencies..."
npm install --legacy-peer-deps

# Step 3: Build web app
echo "📋 Step 3: Building web application..."
npm run build

# Step 4: Check Android SDK
echo "📋 Step 4: Verifying Android SDK..."
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "❌ Android SDK not found. Running setup..."
    chmod +x setup-android.sh
    ./setup-android.sh
fi

# Step 5: Add Android platform
echo "📋 Step 5: Adding Android platform..."
npx cap add android

# Step 6: Configure Android project
echo "📋 Step 6: Configuring Android project..."
cd android

# Ensure gradlew is executable
chmod +x gradlew

# Create/update local.properties
echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties

# Create/update gradle.properties with Java 17
echo "org.gradle.java.home=$JAVA_HOME" > gradle.properties
echo "org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8" >> gradle.properties
echo "android.useAndroidX=true" >> gradle.properties
echo "android.enableJetifier=true" >> gradle.properties

cd ..

# Step 7: Sync Capacitor
echo "📋 Step 7: Syncing Capacitor..."
npx cap sync android

# Step 8: Build APK
echo "📋 Step 8: Building APK..."
cd android

# Build with detailed output
echo "🔨 Starting Gradle build..."
./gradlew assembleDebug --info --stacktrace

echo "✅ Fresh build completed successfully!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Show APK info
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "📊 APK size: $(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)"
    echo "📱 APK ready for installation!"
fi
