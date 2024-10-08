module.exports = {
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: [
    "<rootDir>/tests/**/*.jest.spec.ts"
  ],
  setupFiles: ['dotenv/config'],
  reporters: [
    "default", 
    [
      "jest-html-reporters", {
        publicPath: "./reports/jest",
        filename: "report.html",
        openReport: false
      }
    ]
  ],
};