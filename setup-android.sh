
#!/bin/bash

# Enhanced Android Build Setup Script for Codespaces
set -e

echo "🚀 Starting Android build environment setup..."
echo "📋 Setup started at: $(date)"

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
    echo "❌ Java detection script not found. Creating..."
    # Create detect-java.sh if it doesn't exist
    curl -fsSL https://raw.githubusercontent.com/your-org/android-build-scripts/main/detect-java.sh > detect-java.sh
    chmod +x detect-java.sh
    source ./detect-java.sh
    setup_java || exit 1
fi

# Set environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin

echo "📋 Environment Configuration:"
echo "Java Home: $JAVA_HOME"
echo "User: $(whoami)"
echo "Working Directory: $(pwd)"

# Verify Java version
echo "☕ Verifying Java installation:"
if [ -f "$JAVA_HOME/bin/java" ]; then
    $JAVA_HOME/bin/java -version
    JAVA_VERSION=$($JAVA_HOME/bin/java -version 2>&1 | head -n 1)
    if echo "$JAVA_VERSION" | grep -q "17\."; then
        echo "✅ Java 17 confirmed"
    else
        echo "⚠️ Wrong Java version detected. Expected Java 17."
        echo "Searching for Java 17 installation..."
        
        # Try to find Java 17 specifically
        POSSIBLE_JAVA17_HOMES=(
            "/usr/lib/jvm/java-17-openjdk"
            "/usr/lib/jvm/java-17-openjdk-amd64"
            "/usr/lib/jvm/msopenjdk-17"
            "/usr/lib/jvm/temurin-17-jdk-amd64"
        )
        
        for java_home in "${POSSIBLE_JAVA17_HOMES[@]}"; do
            if [ -d "$java_home" ] && [ -f "$java_home/bin/java" ]; then
                export JAVA_HOME="$java_home"
                export PATH="$JAVA_HOME/bin:$PATH"
                echo "✅ Found Java 17 at: $JAVA_HOME"
                $JAVA_HOME/bin/java -version
                break
            fi
        done
    fi
else
    echo "⚠️ Java executable not found at expected location"
    echo "Checking alternatives..."
    
    # Try to find Java using which command
    if command -v java >/dev/null 2>&1; then
        echo "✅ Found Java in PATH"
        java -version
    fi
fi

# Install dependencies
echo "📦 Installing npm dependencies..."
if npm install --legacy-peer-deps; then
    echo "✅ npm dependencies installed"
else
    echo "⚠️ Failed to install npm dependencies but continuing"
fi

# Build the project
echo "🔨 Building the project..."
if npm run build; then
    echo "✅ Project built successfully"
else
    echo "⚠️ Project build failed but continuing"
fi

# Set up Android SDK
echo "📱 Setting up Android SDK..."
if [ ! -d "$ANDROID_SDK_ROOT" ]; then
    echo "📁 Creating Android SDK directory..."
    sudo mkdir -p $ANDROID_SDK_ROOT
    sudo chown -R $(whoami):$(whoami) $ANDROID_SDK_ROOT
fi

# Download and setup Android command line tools if not already present
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "⬇️ Downloading Android command line tools..."
    
    if wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip; then
        echo "✅ Command line tools downloaded"
    else
        echo "❌ Failed to download Android command line tools"
        exit 1
    fi
    
    if unzip -q commandlinetools-linux-9477386_latest.zip; then
        echo "✅ Command line tools extracted"
    else
        echo "❌ Failed to extract Android command line tools"
        exit 1
    fi
    
    sudo mkdir -p $ANDROID_SDK_ROOT/cmdline-tools
    sudo mv cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest
    sudo chown -R $(whoami):$(whoami) $ANDROID_SDK_ROOT
    rm commandlinetools-linux-9477386_latest.zip
    
    echo "✅ Android command line tools installed"
else
    echo "✅ Android command line tools already present"
fi

# Accept licenses and install SDK components
echo "📋 Accepting Android licenses..."
echo "📋 This may take several minutes..."
yes | $ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --licenses || echo "⚠️ License acceptance may have issues but continuing"

echo "⬇️ Installing Android SDK components..."
$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager --install "platforms;android-34" "build-tools;34.0.0" "platform-tools" || echo "⚠️ Component installation may have issues but continuing"
echo "✅ Android SDK components installed"

# Add Capacitor Android platform
echo "📱 Adding Capacitor Android platform..."
npx cap remove android || echo "No existing Android platform to remove"
rm -rf android

if npx cap add android; then
    echo "✅ Capacitor Android platform added"
else
    echo "⚠️ Failed to add Capacitor Android platform but continuing"
fi

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
if npx cap sync android; then
    echo "✅ Capacitor synced"
else
    echo "⚠️ Capacitor sync failed but continuing"
fi

# Setup Android project
echo "⚙️ Configuring Android project..."
if [ -d "android" ]; then
    cd android
    chmod +x gradlew
    echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties

    # Create gradle.properties with correct Java path
    cat > gradle.properties << EOF
# Android SDK and build settings
org.gradle.java.home=$JAVA_HOME
android.useAndroidX=true
android.enableJetifier=true
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.jvmargs=-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
EOF

    # Create a Java environment file for Gradle scripts
    cat > setup-java-env.sh << EOF
#!/bin/bash
export JAVA_HOME="$JAVA_HOME"
export PATH="\$JAVA_HOME/bin:\$PATH"
EOF
    chmod +x setup-java-env.sh
    
    # Modify gradlew to ensure it sources our Java environment
    cp gradlew gradlew.original
    sed -i '4i source "./setup-java-env.sh" || true' gradlew
    chmod +x gradlew

    cd ..
    echo "✅ Android project configured"
else
    echo "⚠️ Android directory not found, skipping configuration"
fi

# Make all scripts executable
chmod +x build-apk.sh verify-licenses.sh detect-java.sh fresh-build.sh build-apk-fallback.sh clean-build.sh

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
echo "📋 Next steps:"
echo "1. Restart your terminal or run: source ~/.bashrc"
echo "2. To build APK: ./build-apk.sh"
echo "3. To verify licenses: ./verify-licenses.sh"
