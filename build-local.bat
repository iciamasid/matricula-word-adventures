
@echo off
REM Local Android APK Build Script for Windows
setlocal enabledelayedexpansion

echo 🚀 Starting local Android APK build...
echo 📋 Build started at: %date% %time%

REM Check prerequisites
echo 📋 Checking prerequisites...

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)
echo ✅ Node.js detected

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is not installed. Please install Java 17 JDK.
    exit /b 1
)
echo ✅ Java detected

REM Check JAVA_HOME
if "%JAVA_HOME%"=="" (
    echo ❌ JAVA_HOME environment variable is not set.
    echo Please set JAVA_HOME to your Java 17 installation directory.
    exit /b 1
)
echo ✅ JAVA_HOME is set to: %JAVA_HOME%

REM Check Android SDK
if "%ANDROID_HOME%"=="" if "%ANDROID_SDK_ROOT%"=="" (
    echo ❌ Android SDK not found. Please set ANDROID_HOME or ANDROID_SDK_ROOT.
    echo Usually located at: %%LOCALAPPDATA%%\Android\Sdk
    exit /b 1
)

REM Use ANDROID_SDK_ROOT if ANDROID_HOME is not set
if "%ANDROID_HOME%"=="" set ANDROID_HOME=%ANDROID_SDK_ROOT%

if not exist "%ANDROID_HOME%" (
    echo ❌ Android SDK directory not found at: %ANDROID_HOME%
    exit /b 1
)
echo ✅ Android SDK found at: %ANDROID_HOME%

echo ✅ All prerequisites check passed!

REM Step 1: Install dependencies
echo 📋 Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install npm dependencies
    exit /b 1
)
echo ✅ Dependencies installed successfully

REM Step 2: Build web application
echo 📋 Building web application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Web application build failed
    exit /b 1
)
echo ✅ Web application built successfully

REM Step 3: Add Android platform if not exists
if not exist "android" (
    echo 📋 Adding Android platform...
    call npx cap add android
    if %errorlevel% neq 0 (
        echo ❌ Failed to add Android platform
        exit /b 1
    )
    echo ✅ Android platform added successfully
) else (
    echo 📋 Android platform already exists
)

REM Step 4: Sync Capacitor
echo 📋 Syncing Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo ❌ Capacitor sync failed
    exit /b 1
)
echo ✅ Capacitor sync completed

REM Step 5: Configure Android project
echo 📋 Configuring Android project...
cd android

REM Create local.properties if it doesn't exist
if not exist "local.properties" (
    echo sdk.dir=%ANDROID_HOME% > local.properties
    echo ✅ Created local.properties
)

REM Create/update gradle.properties
(
echo # Android SDK and build settings
echo sdk.dir=%ANDROID_HOME%
echo org.gradle.java.home=%JAVA_HOME%
echo org.gradle.jvmargs=-Xmx2048m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
echo.
echo # Android build settings
echo android.useAndroidX=true
echo android.enableJetifier=true
echo.
echo # Gradle daemon settings
echo org.gradle.daemon=true
echo org.gradle.parallel=true
echo org.gradle.configureondemand=true
echo.
echo # Additional build optimization
echo org.gradle.caching=true
echo org.gradle.configuration-cache=false
) > gradle.properties

echo ✅ Android project configured

REM Step 6: Build APK
echo 📋 Building Android APK...
echo This may take several minutes on first build...

call gradlew.bat assembleDebug --info
if %errorlevel% neq 0 (
    echo ❌ APK build failed
    echo Try running: gradlew.bat clean assembleDebug
    exit /b 1
)

echo ✅ APK build completed successfully!

REM Step 7: Verify APK and show results
set APK_PATH=app\build\outputs\apk\debug\app-debug.apk
if exist "%APK_PATH%" (
    echo ✅ APK generated successfully!
    echo.
    echo 📁 APK Location: android\%APK_PATH%
    echo 📱 Ready for installation!
    echo.
    echo 🔧 To install on device:
    echo    adb install %APK_PATH%
    echo.
    echo 📋 Build completed at: %date% %time%
) else (
    echo ❌ APK file not found after build
    echo 📋 Checking build outputs:
    dir app\build\outputs\apk\debug\ 2>nul || echo No APK files found
    exit /b 1
)

cd ..
echo ✅ Local build process completed successfully! 🎉
pause
