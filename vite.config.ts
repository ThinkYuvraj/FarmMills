import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import app from './server/app.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'farmers-mill-backend-api',
      configureServer(server) {
        // Mount the Express app on the Vite dev server middlewares
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/api') || req.url === '/api')) {
            return (app as any)(req, res, next);
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
