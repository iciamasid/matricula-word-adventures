
#!/bin/bash

# Clean Build Script - Removes all build artifacts and caches
set -e

echo "🧹 Cleaning build artifacts and caches..."

# Source Java detection utility
if [ -f "./detect-java.sh" ]; then
    source ./detect-java.sh
    if ! setup_java; then
        echo "⚠️ Java setup failed, but continuing with cleanup..."
    fi
    
    # Display detailed Java info for debugging
    display_java_info
else
    echo "⚠️ Java detection script not found, but continuing..."
fi

echo "☕ Using Java version:"
java -version || echo "⚠️ Java not available"

# Clean npm cache and node_modules
echo "🗑️ Cleaning npm cache and node_modules..."
npm cache clean --force
rm -rf node_modules
rm -rf package-lock.json

# Clean build directories
echo "🗑️ Cleaning build directories..."
rm -rf dist
rm -rf .vite

# Clean Android build artifacts if they exist
if [ -d "android" ]; then
    echo "🗑️ Cleaning Android build artifacts..."
    cd android
    
    # Clean Gradle cache
    if [ -f "gradlew" ]; then
        # Create a temporary environment setup for gradlew
        if [ -n "$JAVA_HOME" ] && [ -d "$JAVA_HOME" ]; then
            echo "#!/bin/bash" > setup-java-env.sh
            echo "export JAVA_HOME=\"$JAVA_HOME\"" >> setup-java-env.sh
            echo "export PATH=\"\$JAVA_HOME/bin:\$PATH\"" >> setup-java-env.sh
            chmod +x setup-java-env.sh
            
            # Source our Java environment and run gradle clean
            source ./setup-java-env.sh
            if ! ./gradlew clean; then
                echo "⚠️ Gradle clean failed, using manual cleanup"
                # Manual cleanup if gradlew fails
                rm -rf app/build
                rm -rf build
            fi
            ./gradlew --stop
        else
            echo "⚠️ JAVA_HOME not properly set, using manual cleanup"
            # Manual cleanup
            rm -rf app/build
            rm -rf build
        fi
    fi
    
    # Remove build directories
    rm -rf app/build
    rm -rf build
    rm -rf .gradle
    
    # Clean Gradle cache globally
    rm -rf ~/.gradle/caches/
    
    cd ..
    
    # Remove and re-add Android platform
    echo "🔄 Removing Android platform..."
    npx cap remove android || true
fi

echo "✅ Clean completed! Ready for fresh build."
