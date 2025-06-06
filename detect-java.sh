
#!/bin/bash

# Enhanced Java Detection and Setup Utility
# This script detects and configures Java for Android builds

setup_java() {
    echo "🔍 Detecting Java installation..."
    
    # Check common Java locations
    POSSIBLE_JAVA_HOMES=(
        # Check standard Linux locations
        "/usr/lib/jvm/java-17-openjdk"
        "/usr/lib/jvm/java-17-openjdk-amd64"
        "/usr/lib/jvm/msopenjdk-17"
        "/usr/lib/jvm/ms-openjdk-17"
        "/usr/lib/jvm/java-17"
        "/usr/lib/jvm/jdk-17"
        # Check Microsoft OpenJDK location
        "/opt/msopenjdk-17"
        # Check GitHub Codespaces default Java location
        "/usr/lib/jvm/temurin-17-jdk-amd64"
        # Check other possible locations
        "/usr/local/lib/jvm/java-17"
        "/usr/local/openjdk-17"
    )
    
    # Find the first valid Java installation
    for java_home in "${POSSIBLE_JAVA_HOMES[@]}"; do
        if [ -d "$java_home" ] && [ -f "$java_home/bin/java" ]; then
            echo "✅ Found Java 17 at: $java_home"
            export JAVA_HOME="$java_home"
            export PATH="$JAVA_HOME/bin:$PATH"
            java -version
            return 0
        fi
    done
    
    # Check if "java" executable is in PATH
    if command -v java >/dev/null 2>&1; then
        echo "✅ Found Java in PATH"
        java -version
        
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
    
    echo "❌ Failed to detect Java installation"
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
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    setup_java
    display_java_info
fi
