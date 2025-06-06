
#!/bin/bash

# Enhanced Java Detection and Setup Utility
# This script detects and configures Java for Android builds

setup_java() {
    echo "🔍 Detecting Java installation..."
    
    # Check common Java locations (prioritizing standard Ubuntu locations)
    # Using a more compatible approach for shell arrays
    JAVA_HOME_CANDIDATES="/usr/lib/jvm/java-17-openjdk-amd64 /usr/lib/jvm/java-17-openjdk /usr/lib/jvm/java-1.17.0-openjdk-amd64 /usr/lib/jvm/java-1.17.0-openjdk /usr/lib/jvm/msopenjdk-17 /usr/lib/jvm/ms-openjdk-17 /opt/msopenjdk-17 /usr/lib/jvm/temurin-17-jdk-amd64 /usr/lib/jvm/java-17 /usr/lib/jvm/jdk-17 /usr/local/lib/jvm/java-17 /usr/local/openjdk-17"
    
    # Find the first valid Java installation
    for java_home in $JAVA_HOME_CANDIDATES; do
        if [ -d "$java_home" ] && [ -f "$java_home/bin/java" ]; then
            echo "✅ Found Java 17 at: $java_home"
            export JAVA_HOME="$java_home"
            export PATH="$JAVA_HOME/bin:$PATH"
            
            # Verify it's actually Java 17
            JAVA_VERSION=$($JAVA_HOME/bin/java -version 2>&1 | head -n 1)
            if echo "$JAVA_VERSION" | grep -q "17\."; then
                echo "✅ Confirmed Java 17: $JAVA_VERSION"
                return 0
            else
                echo "⚠️ Found Java but not version 17: $JAVA_VERSION"
            fi
        fi
    done
    
    # Check if "java" executable is in PATH
    if command -v java >/dev/null 2>&1; then
        echo "✅ Found Java in PATH"
        JAVA_VERSION=$(java -version 2>&1 | head -n 1)
        echo "Java version: $JAVA_VERSION"
        
        # Check if it's Java 17
        if echo "$JAVA_VERSION" | grep -q "17\."; then
            echo "✅ Java 17 confirmed in PATH"
            
            # Try to determine JAVA_HOME from java binary location
            JAVA_BIN=$(command -v java)
            JAVA_BIN_DIR=$(dirname "$JAVA_BIN")
            
            if [ "$JAVA_BIN_DIR" != "/usr/bin" ] && [ -d "$JAVA_BIN_DIR/.." ]; then
                # Most installations have java in bin/ subdirectory
                export JAVA_HOME=$(cd "$JAVA_BIN_DIR/.." && pwd)
                echo "✅ Set JAVA_HOME to: $JAVA_HOME"
                return 0
            fi
            
            # Try using readlink on Linux to follow symlinks
            if command -v readlink >/dev/null 2>&1; then
                JAVA_REAL_PATH=$(readlink -f "$JAVA_BIN")
                JAVA_REAL_DIR=$(dirname "$JAVA_REAL_PATH")
                if [ -d "$JAVA_REAL_DIR/.." ]; then
                    export JAVA_HOME=$(cd "$JAVA_REAL_DIR/.." && pwd)
                    echo "✅ Set JAVA_HOME to: $JAVA_HOME (from symlink resolution)"
                    return 0
                fi
            fi
        else
            echo "⚠️ Java found but not version 17: $JAVA_VERSION"
        fi
    fi
    
    # Last resort: Ask Java for its home
    if command -v java >/dev/null 2>&1; then
        JAVA_VERSION_OUTPUT=$(java -XshowSettings:properties -version 2>&1)
        JAVA_HOME_FROM_OUTPUT=$(echo "$JAVA_VERSION_OUTPUT" | grep "java.home" | awk '{print $3}')
        
        if [ -n "$JAVA_HOME_FROM_OUTPUT" ] && [ -d "$JAVA_HOME_FROM_OUTPUT" ]; then
            export JAVA_HOME="$JAVA_HOME_FROM_OUTPUT"
            export PATH="$JAVA_HOME/bin:$PATH"
            echo "✅ Set JAVA_HOME to: $JAVA_HOME (from java -XshowSettings)"
            java -version
            return 0
        fi
    fi
    
    echo "❌ Failed to detect Java 17 installation"
    echo "💡 Attempting to install Java 17..."
    
    # Try to install Java 17 if possible
    if command -v apt-get >/dev/null 2>&1; then
        echo "📦 Installing OpenJDK 17 via apt..."
        sudo apt-get update
        sudo apt-get install -y openjdk-17-jdk
        
        # Try setup again after installation
        export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
        if [ -d "$JAVA_HOME" ] && [ -f "$JAVA_HOME/bin/java" ]; then
            export PATH="$JAVA_HOME/bin:$PATH"
            echo "✅ Java 17 installed successfully at: $JAVA_HOME"
            $JAVA_HOME/bin/java -version
            return 0
        fi
    fi
    
    return 1
}

display_java_info() {
    echo "ℹ️ Java environment information:"
    echo "JAVA_HOME: $JAVA_HOME"
    
    if [ -d "$JAVA_HOME" ]; then
        echo "JAVA_HOME exists: ✓"
        
        if [ -f "$JAVA_HOME/bin/java" ]; then
            echo "java executable exists: ✓"
        else
            echo "java executable exists: ✗ (not found at $JAVA_HOME/bin/java)"
        fi
    else
        echo "JAVA_HOME exists: ✗ (directory not found)"
    fi
    
    if command -v java >/dev/null 2>&1; then
        echo "java in PATH: ✓"
        echo "java version:" 
        java -version
        echo "java path: $(command -v java)"
    else
        echo "java in PATH: ✗ (not found)"
    fi
}

# If script is executed directly
if [ "${BASH_SOURCE[0]}" = "${0}" ] 2>/dev/null || [ "${0##*/}" = "detect-java.sh" ]; then
    setup_java
    display_java_info
fi
