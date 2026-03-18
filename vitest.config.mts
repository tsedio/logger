import {defineConfig} from "vite";

export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        statements: 26,
        branches: 62,
        functions: 46,
        lines: 26
      }
    },
    projects: [
      'packages/**/vitest.config.{mts,ts}',
    ]
  }
})