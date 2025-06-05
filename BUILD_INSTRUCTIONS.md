
# Android APK Build Instructions

This document provides step-by-step instructions for building an Android APK from your Capacitor project in GitHub Codespaces.

## Quick Start

For most cases, simply run:
```bash
chmod +x fresh-build.sh && ./fresh-build.sh
```

## Available Build Scripts

### 1. Fresh Build (Recommended)
```bash
chmod +x fresh-build.sh && ./fresh-build.sh
```
- Cleans everything and builds from scratch
- Automatically detects and configures Java
- Handles all setup automatically
- Most reliable for first-time builds

### 2. Normal Build
```bash
chmod +x build-apk.sh && ./build-apk.sh
```
- Standard build process
- Automatically detects Java environment
- Assumes Android SDK is already set up

### 3. Fallback Build
```bash
chmod +x build-apk-fallback.sh && ./build-apk-fallback.sh
```
- Temporarily disables AdMob plugin
- Use if normal build fails due to plugin issues
- Automatically restores configuration after build

### 4. Clean Build
```bash
chmod +x clean-build.sh && ./clean-build.sh
```
- Removes all build artifacts and caches
- Use before fresh build if you have issues

### 5. Setup Only
```bash
chmod +x setup-android.sh && ./setup-android.sh
```
- Sets up Android environment only
- Automatically detects and configures Java
- Use if you want to configure environment without building

## Automatic Java Detection

All build scripts now include automatic Java detection that:

- **Searches multiple locations**: Checks standard Java installation paths
- **Verifies Java 17**: Ensures the correct Java version is being used
- **Fallback installation**: Automatically installs Java 17 if not found
- **Dynamic configuration**: Updates all build configurations with the detected Java path

### Supported Java Locations
The scripts automatically check these locations:
- `/usr/lib/jvm/msopenjdk-17`
- `/usr/lib/jvm/java-17-openjdk-amd64`
- `/usr/lib/jvm/java-17-openjdk`
- `/usr/lib/jvm/temurin-17-jdk-amd64`
- `/opt/java/openjdk`
- `/usr/local/openjdk-17`
- System alternatives and PATH

## Build Process Steps

The fresh build process includes:

1. **Java Detection**: Automatically find and configure Java 17
2. **Clean**: Remove all previous build artifacts
3. **Install**: Install npm dependencies with legacy peer deps
4. **Build Web**: Build the React web application
5. **Android SDK**: Verify and set up Android SDK
6. **Add Platform**: Add Capacitor Android platform
7. **Configure**: Set up Android project with detected Java path
8. **Sync**: Sync Capacitor with Android project
9. **Build APK**: Generate the Android APK

## Environment Requirements

- **Java**: Version 17 (automatically detected/installed)
- **Node.js**: Version 20+ (provided by Codespace)
- **Android SDK**: API Level 34 (automatically installed)
- **Build Tools**: 34.0.0 (automatically installed)

## Output Location

The generated APK will be available at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting

### Common Issues and Solutions

1. **Java Version Conflicts**
   - Scripts now automatically detect and configure Java 17
   - If issues persist, check: `java -version` and `echo $JAVA_HOME`

2. **Gradle Build Failures**
   - Try the fallback build script
   - Run fresh build to clean everything and reconfigure

3. **Missing Android SDK**
   - Scripts automatically download and configure SDK
   - Verify with: `echo $ANDROID_SDK_ROOT`

4. **AdMob Plugin Issues**
   - Use fallback build to temporarily disable AdMob
   - Check plugin compatibility with current Capacitor version

5. **Java Detection Issues**
   - Scripts include fallback Java installation
   - Manual verification: `source ./detect-java.sh && setup_java`

### Manual Java Detection

You can manually run the Java detection utility:
```bash
chmod +x detect-java.sh
source ./detect-java.sh
setup_java
```

### Build Logs

All scripts provide detailed output including:
- Java detection and version verification
- Build progress indicators
- Error messages with suggested solutions
- APK size and location information

### Manual Verification

After build completion, you can verify:
```bash
# Check APK exists
ls -la android/app/build/outputs/apk/debug/

# Check APK size
du -h android/app/build/outputs/apk/debug/app-debug.apk

# Verify Java version
java -version

# Check Java home
echo $JAVA_HOME

# Check Android SDK
echo $ANDROID_SDK_ROOT
```

## Next Steps

After successful APK generation:

1. **Download APK**: The APK file can be downloaded from the Codespace
2. **Install on Device**: Transfer and install on Android device
3. **Test App**: Verify all functionality works as expected

## Support

If you encounter persistent issues:
1. Try the fresh build script first (it reconfigures everything)
2. Use the fallback build if AdMob causes problems
3. Check the build logs for specific error messages
4. Verify Java detection with: `source ./detect-java.sh && setup_java`
5. Ensure your Codespace has sufficient resources

The new Java detection system should resolve most environment-related build issues automatically.
