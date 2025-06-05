
#!/bin/bash

# Android Build Setup Script for Codespaces
set -e

echo "🚀 Starting Android build environment setup..."

# Set Java 17 environment
export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
export PATH=$JAVA_HOME/bin:$PATH

echo "☕ Using Java version:"
java -version

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🔨 Building the project..."
npm run build

# Set up Android SDK
echo "📱 Setting up Android SDK..."
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and setup Android command line tools if not already present
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "⬇️ Downloading Android command line tools..."
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
    unzip -q commandlinetools-linux-9477386_latest.zip
    sudo mkdir -p $ANDROID_SDK_ROOT/cmdline-tools
    sudo mv cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest
    sudo chown -R codespace:codespace $ANDROID_SDK_ROOT
    rm commandlinetools-linux-9477386_latest.zip
fi

# Accept licenses and install SDK components
echo "📋 Accepting Android licenses..."
yes | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses

echo "⬇️ Installing Android SDK components..."
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --install "platforms;android-34" "build-tools;34.0.0" "platform-tools"

# Add Capacitor Android platform (remove first if exists)
echo "📱 Adding Capacitor Android platform..."
npx cap remove android || true
npx cap add android

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

# Setup Android project
echo "⚙️ Configuring Android project..."
cd android
chmod +x gradlew
echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties

# Create comprehensive gradle.properties
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

# Add environment variables to bashrc
echo "🌍 Setting up environment variables..."
cat >> ~/.bashrc << EOF

# Android Development Environment
export ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT
export ANDROID_HOME=$ANDROID_SDK_ROOT
export JAVA_HOME=$JAVA_HOME
export PATH=\$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:\$JAVA_HOME/bin
EOF

cd ..

echo "✅ Android build environment setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Restart your terminal or run: source ~/.bashrc"
echo "2. To build APK with fresh setup: chmod +x fresh-build.sh && ./fresh-build.sh"
echo "3. To build APK normally: chmod +x build-apk.sh && ./build-apk.sh"
echo "4. If issues persist: chmod +x build-apk-fallback.sh && ./build-apk-fallback.sh"
echo "5. APK will be available at: android/app/build/outputs/apk/debug/app-debug.apk"
