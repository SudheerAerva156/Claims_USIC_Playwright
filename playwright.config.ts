import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { EnvironmentManager } from './src/managers/EnvironmentManager';

// Load local environment overrides if present
dotenv.config();

const envConfig = EnvironmentManager.getConfig();

export default defineConfig({
  testDir: './tests',
  timeout: envConfig.timeout || 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],
  use: {
    baseURL: envConfig.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: process.env.HEADLESS !== 'false',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    ignoreHTTPSErrors: envConfig.ignoreHTTPSErrors ?? true
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']
      }
    }
  ],
  outputDir: 'test-results'
});
