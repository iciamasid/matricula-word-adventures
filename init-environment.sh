
#!/bin/sh

# Initialize Android Development Environment
# This script sets up the environment variables needed for Android development

# Source the Java detection script if available
if [ -f "./detect-java.sh" ]; then
    . ./detect-java.sh
    setup_java || echo "⚠️ Java setup failed, but continuing..."
else
    # Default Java location if detection script is not available
    export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
    export PATH="$JAVA_HOME/bin:$PATH"
    echo "📋 Using default Java path: $JAVA_HOME"
    
    if [ ! -d "$JAVA_HOME" ]; then
        echo "⚠️ Default Java path not found, attempting to install Java 17..."
        sudo apt-get update && sudo apt-get install -y openjdk-17-jdk
        
        if [ -d "$JAVA_HOME" ]; then
            echo "✅ Java 17 installed successfully"
        else
            echo "❌ Java 17 installation failed"
            echo "Please install Java 17 manually or rebuild the Codespace"
            exit 1
        fi
    fi
fi

# Set up Android environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin

# Display environment information
echo "📋 Environment variables set:"
echo "JAVA_HOME = $JAVA_HOME"
echo "ANDROID_SDK_ROOT = $ANDROID_SDK_ROOT"
echo "ANDROID_HOME = $ANDROID_HOME"

# Check Java version
if command -v java >/dev/null 2>&1; then
    echo "Java version:"
    java -version
else
    echo "❌ Java not found in PATH"
fi

echo ""
echo "✅ Environment initialized"
echo "You can now run './build-apk.sh' to build your Android APK"

# Make other scripts executable
chmod +x build-apk.sh verify-licenses.sh detect-java.sh fresh-build.sh build-apk-fallback.sh clean-build.sh 2>/dev/null || true

echo ""
echo "📋 Available commands:"
echo "- ./build-apk.sh: Build the Android APK"
echo "- ./verify-licenses.sh: Verify Android SDK licenses"
echo "- ./fresh-build.sh: Clean and rebuild everything"
echo "- ./clean-build.sh: Clean build artifacts and caches"
