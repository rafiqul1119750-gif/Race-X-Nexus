import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ye line @workspace errors ko fix karegi
      "@workspace": path.resolve(__dirname, "../lib"), 
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Agar @workspace/api-client-react phir bhi error de, toh hum ise external bol denge
      external: [], 
    },
  },
});
