
#!/bin/bash

# Enhanced Android Build Setup Script for Codespaces
set -e

echo "🚀 Starting enhanced Android build environment setup..."
echo "📋 Setup started at: $(date)"

# Source Java detection utility
if [ -f "./detect-java.sh" ]; then
    source ./detect-java.sh
    if ! setup_java; then
        echo "❌ Java setup failed. Please check the Codespace configuration."
        exit 1
    fi
else
    echo "⚠️ Java detection script not found. Using manual setup..."
    export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
    if [ ! -d "$JAVA_HOME" ]; then
        echo "❌ Java 17 not found. Please rebuild the Codespace."
        exit 1
    fi
    export PATH="$JAVA_HOME/bin:$PATH"
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Environment Configuration:"
echo "Java Home: $JAVA_HOME"
echo "User: $(whoami)"
echo "Working Directory: $(pwd)"
echo "Available Memory: $(free -h | grep Mem | awk '{print $2}')"

# Install dependencies
echo "📦 Installing npm dependencies..."
if ! npm install --legacy-peer-deps; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi
echo "✅ npm dependencies installed"

# Build the project
echo "🔨 Building the project..."
if ! npm run build; then
    echo "❌ Project build failed"
    exit 1
fi
echo "✅ Project built successfully"

# Set up Android SDK
echo "📱 Setting up Android SDK..."
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

echo "Android SDK Root: $ANDROID_SDK_ROOT"

# Download and setup Android command line tools if not already present
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "⬇️ Downloading Android command line tools..."
    
    if ! wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip; then
        echo "❌ Failed to download Android command line tools"
        exit 1
    fi
    
    if ! unzip -q commandlinetools-linux-9477386_latest.zip; then
        echo "❌ Failed to extract Android command line tools"
        exit 1
    fi
    
    sudo mkdir -p $ANDROID_SDK_ROOT/cmdline-tools
    sudo mv cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest
    sudo chown -R codespace:codespace $ANDROID_SDK_ROOT
    rm commandlinetools-linux-9477386_latest.zip
    
    echo "✅ Android command line tools installed"
else
    echo "✅ Android command line tools already present"
fi

# Verify SDK manager
if [ ! -f "$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "❌ SDK manager not found after installation"
    exit 1
fi

# Accept licenses and install SDK components
echo "📋 Accepting Android licenses..."
echo "📋 This may take several minutes..."

# Use timeout to prevent hanging
if timeout 300 bash -c 'yes | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses'; then
    echo "✅ Android licenses accepted"
else
    echo "⚠️ License acceptance may have timed out, but continuing..."
fi

echo "⬇️ Installing Android SDK components..."
if ! $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --install "platforms;android-34" "build-tools;34.0.0" "platform-tools"; then
    echo "❌ Failed to install Android SDK components"
    exit 1
fi
echo "✅ Android SDK components installed"

# Add Capacitor Android platform (remove first if exists)
echo "📱 Adding Capacitor Android platform..."
npx cap remove android || echo "No existing Android platform to remove"
rm -rf android

if ! npx cap add android; then
    echo "❌ Failed to add Capacitor Android platform"
    exit 1
fi
echo "✅ Capacitor Android platform added"

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
if ! npx cap sync android; then
    echo "❌ Capacitor sync failed"
    exit 1
fi
echo "✅ Capacitor synced"

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

# Test Gradle wrapper
echo "📋 Testing Gradle wrapper..."
if ./gradlew --version; then
    echo "✅ Gradle wrapper working"
else
    echo "⚠️ Gradle wrapper test failed, but continuing..."
fi

cd ..

# Add environment variables to bashrc
echo "🌍 Setting up persistent environment variables..."
cat >> ~/.bashrc << EOF

# Android Development Environment
export ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT
export ANDROID_HOME=$ANDROID_SDK_ROOT
export JAVA_HOME=$JAVA_HOME
export PATH=\$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:\$JAVA_HOME/bin
EOF

echo "✅ Android build environment setup completed successfully!"
echo "📋 Setup completed at: $(date)"
echo ""
echo "📋 Environment Summary:"
echo "Java Home: $JAVA_HOME"
echo "Android SDK: $ANDROID_SDK_ROOT"
echo "Java Version: $($JAVA_HOME/bin/java -version 2>&1 | head -n1)"
echo ""
echo "📋 Next steps:"
echo "1. Restart your terminal or run: source ~/.bashrc"
echo "2. To build APK with fresh setup: chmod +x fresh-build.sh && ./fresh-build.sh"
echo "3. To build APK normally: chmod +x build-apk.sh && ./build-apk.sh"
echo "4. To verify licenses: chmod +x verify-licenses.sh && ./verify-licenses.sh"
echo "5. If issues persist: chmod +x build-apk-fallback.sh && ./build-apk-fallback.sh"
echo "6. APK will be available at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "🎉 Setup process completed successfully!"
