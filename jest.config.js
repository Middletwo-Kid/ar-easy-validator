module.exports = {
  roots: [
      "<rootDir>/test"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/[directory path]/**',
  ],
  preset: 'ts-jest'
};