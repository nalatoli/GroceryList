import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 3001,
    host: true,
    allowedHosts: [process.env.VITE_ALLOWED_HOST || 'localhost'],
  },
});
