import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  global: {
    browser: true,
  },
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
  },
});
