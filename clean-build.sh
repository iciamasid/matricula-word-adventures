
#!/bin/bash

# Clean Build Script - Removes all build artifacts and caches
set -e

echo "🧹 Cleaning build artifacts and caches..."

# Set Java 17 environment
export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
export PATH=$JAVA_HOME/bin:$PATH

echo "☕ Using Java version:"
java -version

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
        ./gradlew clean
        ./gradlew --stop
    fi
    
    # Remove build directories
    rm -rf app/build
    rm -rf build
    rm -rf .gradle
    
    # Clean Gradle cache globally
    rm -rf ~/.gradle/caches/
    
    cd ..
    
    # Remove and re-add Android platform
    echo "🔄 Removing and re-adding Android platform..."
    npx cap remove android || true
fi

echo "✅ Clean completed! Ready for fresh build."
