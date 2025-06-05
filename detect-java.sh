
#!/bin/bash

# Java Detection and Setup Utility
# This script detects and configures Java for Android builds

detect_java() {
    echo "🔍 Detecting Java installation..."
    
    # Array of possible Java locations
    local java_locations=(
        "/usr/lib/jvm/msopenjdk-17"
        "/usr/lib/jvm/java-17-openjdk-amd64"
        "/usr/lib/jvm/java-17-openjdk"
        "/usr/lib/jvm/temurin-17-jdk-amd64"
        "/opt/java/openjdk"
        "/usr/local/openjdk-17"
        "/home/codespace/.sdkman/candidates/java/17.0.2-open"
        "/home/codespace/java/current"
    )
    
    # Check each location
    for location in "${java_locations[@]}"; do
        if [ -d "$location" ] && [ -f "$location/bin/java" ]; then
            echo "✅ Found Java at: $location"
            export JAVA_HOME="$location"
            export PATH="$JAVA_HOME/bin:$PATH"
            
            # Verify Java version
            local version=$("$JAVA_HOME/bin/java" -version 2>&1 | head -n 1)
            echo "☕ Java version: $version"
            
            # Check if it's Java 17
            if echo "$version" | grep -q "17\."; then
                echo "✅ Java 17 confirmed"
                return 0
            else
                echo "⚠️ Found Java but not version 17"
            fi
        fi
    done
    
    # Try to find Java using alternatives
    if command -v update-alternatives >/dev/null 2>&1; then
        local alt_java=$(update-alternatives --query java 2>/dev/null | grep "Value:" | head -n1 | cut -d' ' -f2)
        if [ -n "$alt_java" ] && [ -f "$alt_java" ]; then
            local java_home=$(dirname $(dirname "$alt_java"))
            if [ -d "$java_home" ]; then
                echo "✅ Found Java via alternatives: $java_home"
                export JAVA_HOME="$java_home"
                export PATH="$JAVA_HOME/bin:$PATH"
                return 0
            fi
        fi
    fi
    
    # Try to find Java using which
    if command -v java >/dev/null 2>&1; then
        local java_path=$(which java)
        local java_home=$(dirname $(dirname "$java_path"))
        if [ -d "$java_home" ]; then
            echo "✅ Found Java via which: $java_home"
            export JAVA_HOME="$java_home"
            export PATH="$JAVA_HOME/bin:$PATH"
            return 0
        fi
    fi
    
    echo "❌ Java not found in standard locations"
    return 1
}

install_java() {
    echo "📦 Installing Java 17..."
    
    # Update package list
    sudo apt-get update
    
    # Install OpenJDK 17
    if sudo apt-get install -y openjdk-17-jdk; then
        echo "✅ Java 17 installed successfully"
        
        # Try to detect again
        if detect_java; then
            return 0
        fi
        
        # Set JAVA_HOME manually if detection failed
        export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
        if [ ! -d "$JAVA_HOME" ]; then
            export JAVA_HOME="/usr/lib/jvm/java-17-openjdk"
        fi
        
        if [ -d "$JAVA_HOME" ]; then
            export PATH="$JAVA_HOME/bin:$PATH"
            echo "✅ Java configured manually: $JAVA_HOME"
            return 0
        fi
    fi
    
    echo "❌ Failed to install Java"
    return 1
}

setup_java() {
    if detect_java; then
        echo "✅ Java setup completed"
        echo "JAVA_HOME: $JAVA_HOME"
        java -version
        return 0
    fi
    
    echo "⚠️ Java not found, attempting installation..."
    if install_java; then
        echo "✅ Java installation and setup completed"
        return 0
    fi
    
    echo "❌ Failed to setup Java"
    return 1
}

# If script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    setup_java
fi
