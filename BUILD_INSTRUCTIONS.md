
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
- Handles all setup automatically
- Most reliable for first-time builds

### 2. Normal Build
```bash
chmod +x build-apk.sh && ./build-apk.sh
```
- Standard build process
- Assumes environment is already set up

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
- Use if you want to configure environment without building

## Build Process Steps

The fresh build process includes:

1. **Clean**: Remove all previous build artifacts
2. **Install**: Install npm dependencies with legacy peer deps
3. **Build Web**: Build the React web application
4. **Android SDK**: Verify and set up Android SDK
5. **Add Platform**: Add Capacitor Android platform
6. **Configure**: Set up Android project with Java 17
7. **Sync**: Sync Capacitor with Android project
8. **Build APK**: Generate the Android APK

## Environment Requirements

- **Java**: Version 17 (automatically configured)
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
   - All scripts ensure Java 17 is used
   - Check with: `java -version`

2. **Gradle Build Failures**
   - Try the fallback build script
   - Run fresh build to clean everything

3. **Missing Android SDK**
   - Scripts automatically download and configure SDK
   - Verify with: `echo $ANDROID_SDK_ROOT`

4. **AdMob Plugin Issues**
   - Use fallback build to temporarily disable AdMob
   - Check plugin compatibility with current Capacitor version

5. **Memory Issues**
   - Gradle is configured with 2GB heap size
   - Consider using clean build first

### Build Logs

All scripts provide detailed output including:
- Java version verification
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
1. Try the fresh build script first
2. Use the fallback build if AdMob causes problems
3. Check the build logs for specific error messages
4. Ensure your Codespace has sufficient resources
