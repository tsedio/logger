import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outDir: "lib/browser/types",
      include: ["src/browser", "src/common"],
      exclude: ["**/*.spec.{ts,tsx}", "**/*.stories.{ts,tsx}"],
    })
  ],
  build: {
    outDir: "lib/browser",
    lib: {
      entry: resolve(__dirname, "src/browser/index.ts"),
      formats: ["umd", "es"],
      name: "@tsed/logger",
      fileName: "logger",
    },
  }
});
