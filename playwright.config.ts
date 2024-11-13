import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testMatch: '**/**/*playwright.spec.ts',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['pwmochawesome', { reportDir: "reports/playwright"}]],
  use: {
    headless: false,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'] 
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'] 
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'] 
      },
    },
  ],
  maxFailures: 1,
  timeout: 120000,
  expect: {
      timeout: 120000
  },
});
