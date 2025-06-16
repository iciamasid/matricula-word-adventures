
# Local Android APK Build Guide

This guide will help you build the Android APK locally on your machine.

## Prerequisites

Before starting, ensure you have the following installed:

### 1. Node.js (version 18 or higher)
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from: https://nodejs.org/
```

### 2. Java 17 (JDK)
```bash
# Check if Java 17 is installed
java -version

# Should show something like "openjdk version "17.x.x""
```

**Installation options:**
- **Windows**: Download OpenJDK 17 from [Adoptium](https://adoptium.net/)
- **macOS**: `brew install openjdk@17`
- **Linux**: `sudo apt install openjdk-17-jdk` (Ubuntu/Debian)

### 3. Android Studio
Download and install from: https://developer.android.com/studio

**Important**: During installation, make sure to install:
- Android SDK
- Android SDK Platform-Tools
- Android Virtual Device (for testing)

### 4. Git
```bash
# Check if Git is installed
git --version

# If not installed, download from: https://git-scm.com/
```

## Environment Setup

### 1. Set Environment Variables

**Windows (Command Prompt):**
```cmd
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set ANDROID_SDK_ROOT=%ANDROID_HOME%
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
```

**Windows (PowerShell):**
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:PATH = "$env:PATH;$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\cmdline-tools\latest\bin"
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot"
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64  # Adjust path as needed
```

### 2. Accept Android SDK Licenses
```bash
# Navigate to Android SDK directory and accept licenses
sdkmanager --licenses
# Type 'y' for each license prompt
```

## Build Process

### Step 1: Clone and Setup
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Build the web application
npm run build
```

### Step 2: Add Android Platform
```bash
# Add Android platform (only needed once)
npx cap add android

# Sync the project
npx cap sync android
```

### Step 3: Configure Android Project
```bash
# Navigate to android directory
cd android

# Create local.properties file
echo "sdk.dir=$ANDROID_SDK_ROOT" > local.properties

# Make gradlew executable (macOS/Linux only)
chmod +x gradlew
```

### Step 4: Build APK
```bash
# Build debug APK
./gradlew assembleDebug

# For Windows, use:
# gradlew.bat assembleDebug
```

### Step 5: Locate Your APK
The APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "JAVA_HOME not set" Error
```bash
# Verify JAVA_HOME is set correctly
echo $JAVA_HOME  # macOS/Linux
echo %JAVA_HOME%  # Windows

# Make sure it points to your Java 17 installation
```

#### 2. "Android SDK not found" Error
```bash
# Verify ANDROID_HOME is set correctly
echo $ANDROID_HOME  # macOS/Linux
echo %ANDROID_HOME%  # Windows

# Make sure Android Studio SDK is installed
```

#### 3. "License not accepted" Error
```bash
# Re-accept licenses
sdkmanager --licenses
```

#### 4. Gradle Build Fails
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

#### 5. Permission Denied (macOS/Linux)
```bash
# Make gradlew executable
chmod +x android/gradlew
```

## Testing Your APK

### Install on Physical Device
1. Enable "Developer Options" on your Android device
2. Enable "USB Debugging"
3. Connect device via USB
4. Install APK:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Emulator
1. Start Android Studio
2. Open AVD Manager
3. Create/start an emulator
4. Install APK:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Quick Build Script

For convenience, you can use this script after initial setup:

**build-local.sh (macOS/Linux):**
```bash
#!/bin/bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
echo "APK built successfully at: android/app/build/outputs/apk/debug/app-debug.apk"
```

**build-local.bat (Windows):**
```batch
@echo off
npm run build
npx cap sync android
cd android
gradlew.bat assembleDebug
echo APK built successfully at: android/app/build/outputs/apk/debug/app-debug.apk
```

## Need Help?

If you encounter issues:
1. Check that all prerequisites are properly installed
2. Verify environment variables are set correctly
3. Ensure Android SDK licenses are accepted
4. Try cleaning and rebuilding the project
5. Check Android Studio for any SDK updates

For more detailed troubleshooting, refer to the [Capacitor documentation](https://capacitorjs.com/docs/android).
