
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
      testMode: false, // DESACTIVADO para producción
      initializeForTesting: false, // DESACTIVADO para producción
      applicationId: 'ca-app-pub-4321448416977763~6220700472' // Tu App ID real
    }
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
