
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.matriculabracadabra',
  appName: 'matriculaba-cadabra',
  webDir: 'dist',
  server: {
    url: 'https://001c7f33-800c-4a75-83f8-20908228325e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    AdMob: {
      testMode: true, // Activado para testing
      initializeForTesting: true // Activado para testing
    }
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      releaseType: "APK" // Generar APK en lugar de AAB para testing
    }
  }
};

export default config;
