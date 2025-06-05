
#!/bin/bash

# Fallback APK Build Script - Builds without AdMob if needed
set -e

echo "📱 Building Android APK (Fallback mode)..."

# Set Java 17 environment
export JAVA_HOME=/usr/lib/jvm/msopenjdk-17
export PATH=$JAVA_HOME/bin:$PATH

echo "☕ Using Java version:"
java -version

# Set environment variables
export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
export ANDROID_HOME=/usr/local/lib/android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Temporarily disable AdMob plugin
echo "⚠️ Temporarily disabling AdMob plugin for build..."

# Create backup of capacitor.config.ts
cp capacitor.config.ts capacitor.config.ts.backup

# Create temporary config without AdMob
cat > capacitor.config.ts << 'EOF'
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.matriculabracadabra',
  appName: 'matriculaba-cadabra',
  webDir: 'dist',
  server: {
    url: 'https://001c7f33-800c-4a75-83f8-20908228325e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      releaseType: "APK",
      javaVersion: "17"
    }
  }
};

export default config;
EOF

# Build the web app
echo "🔨 Building web application..."
npm run build

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

# Build APK
echo "📦 Building APK..."
cd android

# Ensure gradle.properties has Java 17 setting
echo "org.gradle.java.home=$JAVA_HOME" > gradle.properties
echo "org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m" >> gradle.properties

./gradlew assembleDebug --info

echo "✅ Fallback APK build completed!"
echo "📁 APK location: android/app/build/outputs/apk/debug/app-debug.apk"

# Restore original config
echo "🔄 Restoring original configuration..."
mv capacitor.config.ts.backup capacitor.config.ts

# Show APK info
if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
    echo "📊 APK size: $(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)"
fi

echo ""
echo "⚠️ Note: This APK was built without AdMob functionality."
echo "To re-enable AdMob, the configuration has been restored."
