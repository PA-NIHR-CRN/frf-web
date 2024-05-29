import { devices, PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './qa/tests/features',
  outputDir: './qa/test-results',
  testMatch: /features/,
  testIgnore: '**/src/**',
  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: './qa/test-report' }],
  ],
  globalSetup: './qa/hooks/GlobalSetup.ts',
  timeout: 30000,
  workers: 6, // to enforce parallel workers in Actions Workflow
  retries: 2,
  use: {
        userAgent: `${process.env.FRF_USER_AGENT}`,
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
  projects: [
    {
      name: 'FindRecruitFollow',
      testIgnore: '**/accessibilityTests/**',
    },
    {
      name: 'FRF Firefox',
      testIgnore: '**/tests/**',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'FRF Safari',
      testIgnore: '**/tests/**',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'FRF Microsoft Edge',
      testIgnore: '**/tests/**',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
    {
      name: 'FRF Google Chrome',
      testIgnore: '**/tests/**',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'FRF Mobile Chrome',
      testIgnore: '**/tests/**',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'FRF Mobile Safari',
      testIgnore: '**/tests/**',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
}

export default config
