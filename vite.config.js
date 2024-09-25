import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    cors: true,
    fs: {
      allow: [
        "https://accomodation-link.onrender.com",
        "http://localhost:5174",
        "",
      ],
    },
  },
});
