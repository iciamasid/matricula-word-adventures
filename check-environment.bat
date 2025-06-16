
@echo off
REM Environment Check Script for Android Development (Windows)
setlocal enabledelayedexpansion

echo 🔍 Checking Android Development Environment
echo ==========================================

REM Check Node.js
echo 🔍 Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js !NODE_VERSION! is installed
) else (
    echo ❌ Node.js is not installed
    echo   📥 Install from: https://nodejs.org/
)

REM Check npm
echo 🔍 Checking npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm !NPM_VERSION! is installed
) else (
    echo ❌ npm is not installed
)

REM Check Java
echo 🔍 Checking Java...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Java is installed
    java -version 2>&1 | findstr "17\." >nul
    if %errorlevel% equ 0 (
        echo ✅ Java 17 detected (recommended)
    ) else (
        echo ⚠️ Java 17 is recommended for Android development
    )
) else (
    echo ❌ Java is not installed
    echo   📥 Install Java 17 from: https://adoptium.net/
)

REM Check JAVA_HOME
echo 🔍 Checking JAVA_HOME...
if defined JAVA_HOME (
    if exist "%JAVA_HOME%" (
        echo ✅ JAVA_HOME is set: %JAVA_HOME%
        if exist "%JAVA_HOME%\bin\java.exe" (
            echo ✅ Java executable found in JAVA_HOME
        ) else (
            echo ❌ Java executable not found in JAVA_HOME\bin\
        )
    ) else (
        echo ❌ JAVA_HOME directory does not exist: %JAVA_HOME%
    )
) else (
    echo ❌ JAVA_HOME environment variable is not set
    echo   🔧 Set JAVA_HOME to your Java installation directory
)

REM Check Android SDK
echo 🔍 Checking Android SDK...
set ANDROID_SDK=
if defined ANDROID_HOME (
    set ANDROID_SDK=%ANDROID_HOME%
) else if defined ANDROID_SDK_ROOT (
    set ANDROID_SDK=%ANDROID_SDK_ROOT%
)

if defined ANDROID_SDK (
    if exist "%ANDROID_SDK%" (
        echo ✅ Android SDK found: %ANDROID_SDK%
        
        if exist "%ANDROID_SDK%\cmdline-tools\latest\bin\sdkmanager.bat" (
            echo ✅ SDK Manager found
        ) else (
            echo ⚠️ SDK Manager not found. Install Android SDK Command-line Tools
        )
        
        if exist "%ANDROID_SDK%\platform-tools" (
            echo ✅ Platform tools found
        ) else (
            echo ⚠️ Platform tools not found
        )
        
        if exist "%ANDROID_SDK%\platforms" (
            echo ✅ Android platforms directory found
        ) else (
            echo ⚠️ No platforms directory found
        )
    ) else (
        echo ❌ Android SDK directory does not exist: %ANDROID_SDK%
    )
) else (
    echo ❌ Android SDK not found (ANDROID_HOME or ANDROID_SDK_ROOT not set)
    echo   🔧 Set ANDROID_HOME to your Android SDK directory
    echo   📥 Usually located at: %%LOCALAPPDATA%%\Android\Sdk
)

REM Check ADB
echo 🔍 Checking ADB (Android Debug Bridge)...
adb version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ ADB is available
) else (
    echo ⚠️ ADB not found in PATH
    echo   🔧 Add Android SDK platform-tools to your PATH
)

REM Check Git
echo 🔍 Checking Git...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo ✅ !GIT_VERSION! is installed
) else (
    echo ❌ Git is not installed
    echo   📥 Install from: https://git-scm.com/
)

REM Check Capacitor CLI
echo 🔍 Checking Capacitor CLI...
cap --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('cap --version') do set CAP_VERSION=%%i
    echo ✅ Capacitor CLI !CAP_VERSION! is available
) else (
    echo ⚠️ Capacitor CLI not found globally
    echo   🔧 It will be used via npx when needed
)

REM Check project files
echo 🔍 Checking Project files...
if exist "package.json" (
    echo ✅ package.json found
    
    if exist "capacitor.config.ts" (
        echo ✅ Capacitor config found
    ) else (
        echo ⚠️ Capacitor config not found
    )
    
    if exist "android" (
        echo ✅ Android platform exists
        
        if exist "android\gradlew.bat" (
            echo ✅ Gradle wrapper found
        ) else (
            echo ⚠️ Gradle wrapper not found
        )
    ) else (
        echo ⚠️ Android platform not added yet
        echo   🔧 Run: npx cap add android
    )
) else (
    echo ⚠️ Not in a Node.js project directory (no package.json found)
)

echo.
echo 📋 Environment Check Complete
echo ==============================
echo.
echo 🚀 Ready to build APK locally!
echo.
echo Next steps:
echo 1. Fix any ❌ errors shown above
echo 2. Run: build-local.bat
echo 3. Your APK will be at: android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Need help? Check LOCAL_BUILD_GUIDE.md for detailed instructions.
echo.
pause
