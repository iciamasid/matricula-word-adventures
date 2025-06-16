
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/001c7f33-800c-4a75-83f8-20908228325e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/001c7f33-800c-4a75-83f8-20908228325e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/001c7f33-800c-4a75-83f8-20908228325e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Mobile App Development (Android APK)

This project is configured for mobile app development using Capacitor.

### 🚀 **NEW: Local Build Process (Recommended)**

You can now build the Android APK locally on your machine for better control and faster builds.

#### Quick Start (Local Build)

1. **Check your environment:**
   ```bash
   # Linux/macOS
   ./check-environment.sh
   
   # Windows
   check-environment.bat
   ```

2. **Build the APK:**
   ```bash
   # Linux/macOS
   ./build-local.sh
   
   # Windows
   build-local.bat
   ```

3. **Install the APK:**
   - Your APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Install on device: `adb install android/app/build/outputs/apk/debug/app-debug.apk`

#### Prerequisites for Local Build

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Java 17 JDK** - [Download here](https://adoptium.net/)
- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Git** - [Download here](https://git-scm.com/)

For detailed setup instructions, see **[LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md)**.

### GitHub Codespaces Build (Alternative)

If you prefer to use GitHub Codespaces, the environment will be automatically configured. The setup includes:
- Node.js and npm dependencies
- Android SDK and build tools
- Capacitor Android platform

#### Manual Codespaces Setup

If the automatic setup fails:

```bash
# Make scripts executable
chmod +x setup-android.sh build-apk.sh

# Run the setup script
./setup-android.sh
```

#### Building the APK in Codespaces

After setup is complete:

```bash
# Build the APK
./build-apk.sh
```

### Manual Setup (Any Environment)

If you want to set up manually:

```bash
# Install dependencies
npm install

# Build web app
npm run build

# Add Android platform (first time only)
npx cap add android

# Sync project
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug
```

### Troubleshooting

**Common Issues:**
- **Java not found**: Install Java 17 and set JAVA_HOME
- **Android SDK not found**: Install Android Studio and set ANDROID_HOME
- **Licenses not accepted**: Run `sdkmanager --licenses`
- **Build fails**: Try `./gradlew clean assembleDebug`

**Need Help?**
- Check [LOCAL_BUILD_GUIDE.md](LOCAL_BUILD_GUIDE.md) for detailed instructions
- Run environment check scripts to diagnose issues
- Ensure all prerequisites are properly installed

### Requirements for Local Development

To build locally, you need:
- Node.js 18+
- Java 17 JDK
- Android Studio (with SDK)
- Git

The local build process is now the recommended approach for building Android APKs as it provides:
- ✅ Better error handling and debugging
- ✅ Faster build times
- ✅ More control over the build environment
- ✅ Detailed progress feedback
- ✅ Comprehensive environment validation
