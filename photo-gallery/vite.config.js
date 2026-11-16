import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/picsum": {
        target: "https://picsum.photos",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/picsum/, ""),
      },
    },
  },
});
