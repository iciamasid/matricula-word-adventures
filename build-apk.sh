
#!/bin/bash

# Enhanced APK Build Script with comprehensive error handling
set -e

echo "📱 Starting Android APK build process..."
echo "📋 Build started at: $(date)"

# Source Java detection utility
if [ -f "./detect-java.sh" ]; then
    source ./detect-java.sh
    if ! setup_java; then
        echo "❌ Java setup failed. Attempting to install Java 17..."
        
        # Try to install Java 17 if possible
        if command -v apt-get >/dev/null 2>&1; then
            echo "📦 Installing OpenJDK 17 via apt..."
            sudo apt-get update
            sudo apt-get install -y openjdk-17-jdk
            
            # Try setup again after installation
            if ! setup_java; then
                echo "❌ Failed to set up Java even after installation attempt."
                exit 1
            fi
        else
            echo "❌ Cannot install Java automatically. Please install Java 17 manually."
            exit 1
        fi
    fi
    
    # Display detailed Java info for debugging
    display_java_info
else
    echo "❌ Java detection script not found at ./detect-java.sh"
    exit 1
fi

# Set environment variables explicitly
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin

# Comprehensive environment verification
echo "📋 Environment Verification:"
echo "Java Home: $JAVA_HOME"
echo "Android SDK: $ANDROID_SDK_ROOT"
echo "Current User: $(whoami)"
echo "Working Directory: $(pwd)"

# Verify Java version
echo "☕ Verifying Java installation:"
if [ -f "$JAVA_HOME/bin/java" ]; then
    $JAVA_HOME/bin/java -version
    JAVA_VERSION=$($JAVA_HOME/bin/java -version 2>&1 | head -n 1)
    if echo "$JAVA_VERSION" | grep -q "17\."; then
        echo "✅ Java 17 confirmed"
    else
        echo "❌ Wrong Java version detected: $JAVA_VERSION"
        echo "Expected Java 17. Please rebuild the Codespace."
        exit 1
    fi
else
    echo "❌ Java executable not found at $JAVA_HOME/bin/java"
    exit 1
fi

# Verify Android SDK
echo "📱 Verifying Android SDK:"
if [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "❌ Android SDK directory not found at $ANDROID_SDK_ROOT"
    echo "Please rebuild the Codespace to set up the Android environment."
    exit 1
fi

if [ ! -f "$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "❌ Android SDK manager not found"
    echo "Please rebuild the Codespace to set up the Android environment."
    exit 1
fi

# Verify Android platform exists
if [ ! -d "android" ]; then
    echo "❌ Android platform directory not found"
    echo "Please rebuild the Codespace to set up the Android platform."
    exit 1
fi

# Verify and re-accept licenses if needed
echo "📋 Verifying Android SDK licenses..."
if ! $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses <<< $'y\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny\ny' >/dev/null 2>&1; then
    echo "⚠️ License acceptance may have failed, but continuing..."
fi

# Build the web app
echo "🔨 Building web application..."
if ! npm run build; then
    echo "❌ Web application build failed"
    exit 1
fi
echo "✅ Web application built successfully"

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
if ! npx cap sync android; then
    echo "❌ Capacitor sync failed"
    exit 1
fi
echo "✅ Capacitor sync completed"

# Configure Android project
echo "📱 Configuring Android project..."
cd android

# Ensure gradlew is executable
chmod +x gradlew

# Create comprehensive gradle.properties
echo "📝 Updating gradle.properties with Java 17 configuration..."
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

# Verify gradle.properties content
echo "📋 Gradle configuration:"
cat gradle.properties

# Create local.properties if it doesn't exist
if [ ! -f "local.properties" ]; then
    echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties
fi

# Create a Java environment file for Gradle scripts
echo "📝 Creating Java environment file for Gradle..."
cat > setup-java-env.sh << EOF
#!/bin/bash
export JAVA_HOME="$JAVA_HOME"
export PATH="\$JAVA_HOME/bin:\$PATH"
EOF
chmod +x setup-java-env.sh

# Verify Gradle wrapper
echo "📋 Verifying Gradle wrapper:"
if [ -f "gradlew" ]; then
    echo "✅ Gradle wrapper found"
    
    # Modify gradlew to ensure it sources our Java environment
    cp gradlew gradlew.original
    sed -i '4i source "./setup-java-env.sh" || true' gradlew
    
    echo "Gradle wrapper version:"
    ./gradlew --version || echo "⚠️ Could not get Gradle version, but continuing..."
else
    echo "❌ Gradle wrapper not found"
    exit 1
fi

# Build APK with comprehensive error handling
echo "📦 Starting APK build..."
echo "📋 Build command: ./gradlew assembleDebug --info --stacktrace"

if ! JAVA_HOME="$JAVA_HOME" PATH="$JAVA_HOME/bin:$PATH" ./gradlew assembleDebug --info --stacktrace; then
    echo "❌ APK build failed"
    echo "📋 Troubleshooting suggestions:"
    echo "1. Try rebuilding the Codespace"
    echo "2. Use the fallback build script: ./build-apk-fallback.sh"
    echo "3. Check if all dependencies are properly installed"
    exit 1
fi

echo "✅ APK build completed successfully!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Verify APK was created
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    APK_SIZE=$(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)
    echo "📊 APK size: $APK_SIZE"
    echo "📱 APK ready for installation!"
    echo "📋 Build completed at: $(date)"
else
    echo "❌ APK file not found after build"
    echo "📋 Checking build outputs:"
    find app/build/outputs -name "*.apk" 2>/dev/null || echo "No APK files found"
    exit 1
fi

cd ..
echo "🎉 Build process completed successfully!"
