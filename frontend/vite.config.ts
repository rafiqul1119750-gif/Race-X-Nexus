import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Render ke absolute path structure ke hisab se fix:
      "@workspace/api-client-react": path.resolve(__dirname, "../../src/lib/api-client-react"),
      "@tanstack/react-query": path.resolve(__dirname, "node_modules/@tanstack/react-query"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
