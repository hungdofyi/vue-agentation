import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname),
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
