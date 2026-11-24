
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json"
      }
    ]
  },

  testMatch: ["**/tests/**/*.test.ts"],

  setupFiles: ["<rootDir>/tests/setupEnv.ts"],

  clearMocks: true,
  testTimeout: 10000
};
