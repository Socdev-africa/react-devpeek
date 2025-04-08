// demo-vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './demo',  // Simplified path
  resolve: {
    alias: {
      'react-devpeek': path.resolve(__dirname, './src/index.tsx')
    }
  },
  server: {
    port: 3000
  }
});