import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Humne server block hata diya hai taaki 'port is not defined' wala error na aaye
  // Render Static Site ise khud handle kar legi
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
