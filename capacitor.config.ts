
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
      testMode: false,
      initializeForTesting: false
    }
  }
};

export default config;
