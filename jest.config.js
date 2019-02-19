module.exports = {
  setupFiles: [
    '<rootDir>/config/jest/enzyme.ts',
    '<rootDir>/src/utils/registerCustomMessages.ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/test-utils/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.ts',
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
