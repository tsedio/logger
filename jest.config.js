// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // moduleDirectories: ["node_modules", "packages"],
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['index.ts', '/node_modules/'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@tsed/logger(.*)$': '<rootDir>/packages/logger$1/src'
  },

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 78.18,
      functions: 90.42,
      lines: 94.78,
      statements: 94.46
    }
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/packages/*/src/**/__tests__/**/*.[jt]s?(x)',
    '**/packages/*/src/**/?(*.)+(spec|test).[tj]s?(x)',
    '**/packages/*/test/**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        'target': 'es2021',
        'parser': {
          'syntax': 'typescript',
          'tsx': true,
          'decorators': true,
          'dynamicImport': true,
          'privateMethod': true,
          'exportDefaultFrom': true,
          'importMeta': true
        },
        'transform': {
          'hidden': {
            'jest': true
          },
          'legacyDecorator': true,
          'decoratorMetadata': true
        }
      },
      'module': {
        'type': 'commonjs',
        'strict': false,
        'strictMode': true,
        'lazy': false,
        'noInterop': false
      }
    }
    ]
  },

  modulePathIgnorePatterns: ['<rootDir>/packages/*/lib', '<rootDir>/dist'],
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [],

  extensionsToTreatAsEsm: ['.ts']
}
