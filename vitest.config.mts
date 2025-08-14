import {defineConfig} from "vite";

export default defineConfig({
  test: {
    projects: [
      'packages/**/vitest.config.{mts,ts}',
    ]
  }
})
