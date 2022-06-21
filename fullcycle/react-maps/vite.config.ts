import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import secrets from './secrets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  define: {
    'process.env': {
      GOOGLE_MAPS_API_KEY: secrets.google_api_keys,
    },
  },
})
