import { PlaywrightTestConfig } from '@playwright/test';
import * as helpers from './helpers'

const config: PlaywrightTestConfig = {
  testDir: './tests', // Directory where your test files are located
  timeout: 30000000, // Timeout for each test in milliseconds
  workers: 5,
  fullyParallel:true,
  retries:1,
  use: {
    browserName: 'chromium', // Default browser to use
    headless: false, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    actionTimeout: 10000000, // Timeout for actions like clicks
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Record video on test failures
    screenshot: 'only-on-failure', // Take screenshots only on test failures
  },
  projects: [
    {
      name: 'login',
      use: { browserName: 'chromium' },
      testMatch: /.*\.login\.spec\.ts/
    },
    // {
    //   name: 'firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'webkit',
    //   use: { browserName: 'webkit' },
    // },
    {
        name: 'setup',
        testMatch: /.*\.setup\.ts/,
      },
      {
        name: 'tests',
        // dependencies: ['login'],
        use: {
          storageState: 'storageState-amazon.json',
        },
        testMatch: /.*\.test\.spec\.ts/
      }
  ],
  reporter: [['list'], ['html', { open: 'never' }]], // Reporters for test results
};

export default config;
