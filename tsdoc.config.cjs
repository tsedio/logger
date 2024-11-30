module.exports = {
  rootDir: process.cwd(),
  packagesDir: 'packages/',
  scanPatterns: ['<rootDir>/packages/**/lib/types/**/*.d.ts', '!node_modules'],
  outputDir: '<rootDir>/docs/api',
  baseUrl: '/api',
  jsonOutputDir: '<rootDir>/docs/public',
  templatesDir: '<rootDir>/docs/.templates',
  scope: '@tsed',
  modules: {}
}
