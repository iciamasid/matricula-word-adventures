
#!/bin/bash

# Android SDK License Verification and Re-acceptance Script
set -e

echo "📋 Android SDK License Verification Script"
echo "=========================================="

# Source Java detection utility
if [ -f "./detect-java.sh" ]; then
    source ./detect-java.sh
    setup_java
else
    export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
fi

# Set environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin

echo "📋 Environment:"
echo "Java Home: $JAVA_HOME"
echo "Android SDK: $ANDROID_SDK_ROOT"
echo "User: $(whoami)"

# Verify SDK manager exists
if [ ! -f "$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager" ]; then
    echo "❌ Android SDK manager not found at $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager"
    echo "Please rebuild the Codespace to set up the Android environment."
    exit 1
fi

echo "✅ SDK manager found"

# Check current license status
echo "📋 Checking current license status..."
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses 2>&1 | head -20

echo ""
echo "📋 Re-accepting all Android SDK licenses..."
echo "This will automatically accept all license agreements."

# Accept all licenses with timeout
echo "📋 Accepting licenses (with 5-minute timeout)..."
if timeout 300 bash -c 'yes | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses'; then
    echo "✅ All licenses accepted successfully"
else
    echo "⚠️ License acceptance timed out or failed, but this might be normal"
    echo "📋 Attempting alternative license acceptance method..."
    
    # Alternative method with specific responses
    echo "📋 Using alternative acceptance method..."
    $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses <<EOF
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
y
EOF
fi

echo ""
echo "📋 Verifying license acceptance..."
LICENSE_OUTPUT=$($ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses 2>&1 | grep -c "All SDK package licenses accepted" || echo "0")

if [ "$LICENSE_OUTPUT" -gt 0 ]; then
    echo "✅ All SDK package licenses are accepted"
else
    echo "⚠️ License status unclear, but proceeding..."
    echo "📋 License check output:"
    $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses 2>&1 | tail -10
fi

echo ""
echo "📋 Verifying installed packages..."
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --list_installed | head -10

echo ""
echo "✅ License verification completed"
echo "📋 You can now try building the APK with: ./build-apk.sh"
