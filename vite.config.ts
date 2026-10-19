import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // "/" for a root domain; "/<repo>/" when served from a sub-path (GitHub Pages project site).
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
});
