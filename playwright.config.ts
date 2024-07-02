import { devices, PlaywrightTestConfig } from '@playwright/test'

const baseConfig = {
  userAgent: process.env.FRF_USER_AGENT,
  baseURL: 'https://test.findrecruitandfollowup.nihr.ac.uk/',
  headless: true,
  screenshot: 'on' as const,
  trace: 'on' as const,
  storageState: 'qa/utils/cookieAccept.json',
  launchOptions: {
    slowMo: 0,
  },
}

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
    ...baseConfig,
  },
  projects: [
    {
      name: 'FindRecruitFollow',
      testIgnore: '**/accessibilityTests/**',
      use: {
        ...baseConfig,
      },
    },
    {
      name: 'FRF Firefox',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'FRF Safari',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'FRF Microsoft Edge',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
    {
      name: 'FRF Google Chrome',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'FRF Mobile Chrome',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'FRF Mobile Safari',
      testIgnore: '**/tests/**',
      use: {
        ...baseConfig,
        ...devices['iPhone 13'],
      },
    },
  ],
}

export default config
