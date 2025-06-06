
#!/bin/bash

# Simple Java Detection and Setup Utility
# This script detects and configures Java for Android builds

setup_java() {
    echo "🔍 Setting up Java for Android builds..."
    
    # Set default Java path
    export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
    export PATH="$JAVA_HOME/bin:$PATH"
    
    # Check if the default path exists
    if [ -d "$JAVA_HOME" ] && [ -f "$JAVA_HOME/bin/java" ]; then
        echo "✅ Using default Java at: $JAVA_HOME"
        java -version
        return 0
    fi
    
    # Try to find Java using which
    if command -v java >/dev/null 2>&1; then
        echo "✅ Found Java in PATH"
        java -version
        
        # Try to detect Java home
        if [ -n "$JAVA_HOME" ] && [ -d "$JAVA_HOME" ]; then
            echo "Using JAVA_HOME: $JAVA_HOME"
        else
            echo "⚠️ JAVA_HOME not set properly, using java from PATH"
        fi
        return 0
    fi
    
    echo "❌ Failed to setup Java"
    return 1
}

# If script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    setup_java
fi
