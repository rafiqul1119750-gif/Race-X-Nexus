import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Ye lines missing dependencies ko force-fix karengi:
      "@tanstack/react-query": path.resolve(__dirname, "node_modules/@tanstack/react-query"),
      "react-query": path.resolve(__dirname, "node_modules/@tanstack/react-query"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // Isse Rollup ko pata chalega ki ye libraries installed hain
      external: [], 
    },
  },
});
