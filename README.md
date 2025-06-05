
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

### Automatic Setup (GitHub Codespaces)

When you create a new Codespace, the Android build environment will be automatically configured. The setup includes:
- Node.js and npm dependencies
- Android SDK and build tools
- Capacitor Android platform

### Manual Setup

If the automatic setup fails or you want to set up manually:

```bash
# Make scripts executable
chmod +x setup-android.sh build-apk.sh

# Run the setup script
./setup-android.sh
```

### Building the APK

After setup is complete:

```bash
# Build the APK
./build-apk.sh
```

The APK will be available at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Troubleshooting

- If you encounter permission issues, restart the Codespace
- If the build fails, try running `./setup-android.sh` manually
- Check that all environment variables are set: `echo $ANDROID_SDK_ROOT`
- Ensure Java 17 is being used: `java -version`

### Requirements for Local Development

To build locally, you need:
- Node.js 20+
- Java 17
- Android SDK
- Android Studio (for emulator testing)
