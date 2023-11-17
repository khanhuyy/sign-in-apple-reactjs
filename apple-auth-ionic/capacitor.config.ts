import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'apple-auth-ionic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
