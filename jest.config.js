module.exports = {
  setupFiles: [
    '<rootDir>/config/jest/enzyme.ts',
    '<rootDir>/src/utils/registerCustomMessages.ts',
  ],
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/test-utils/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.ts',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
};
