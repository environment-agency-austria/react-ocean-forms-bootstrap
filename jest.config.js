module.exports = {
  setupFiles: [
    '<rootDir>/src/utils/registerCustomMessages.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/testingLibrary.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/test-utils/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.ts',
  },
};
