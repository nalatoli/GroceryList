import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const allowedHost = env.VITE_ALLOWED_HOST;

  return {
    plugins: [react()],
    root: '.',
    server: {
      port: 3001,
      host: true,
      allowedHosts: [allowedHost],
    },
    preview: {
      port: 4173,
      host: true,
      allowedHosts: [allowedHost],
    },
  };
});
