import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Seedha src folder ko target karein
      "@": "/opt/render/project/src/frontend/src",
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Agar koi module nahi mil raha, toh use external maanke skip na karein, use dhoondhein
      external: [],
    },
  },
  // Force pre-bundling of problematic dependencies
  optimizeDeps: {
    include: ["@tanstack/react-query", "react-query"],
  },
});
