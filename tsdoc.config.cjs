module.exports = {
  rootDir: process.cwd(),
  packagesDir: "packages/",
  scanPatterns: ["<rootDir>/packages/**/lib/**/*.d.ts", "!node_modules"],
  outputDir: "<rootDir>/docs/api",
  baseUrl: "/api",
  jsonOutputDir: "<rootDir>/docs/.vuepress/public",
  scope: "@tsed",
  modules: {}
};
