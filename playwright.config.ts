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
  projects: [
    {
      name: 'FindRecruitFollow',
      testIgnore: '**/accessibilityTests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Firefox',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['Desktop Firefox'],
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Safari',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['Desktop Safari'],
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Microsoft Edge',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['Desktop Edge'],
        channel: 'msedge',
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Google Chrome',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Mobile Chrome',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['Pixel 5'],
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: 'FRF Mobile Safari',
      testIgnore: '**/tests/**',
      use: {
        userAgent: 'findrecruitandfollowup-auto-agent',
        ...devices['iPhone 13'],
        trace: 'on',
        baseURL: `${process.env.E2E_BASE_URL}`,
        headless: true,
        screenshot: 'on',
        storageState: 'qa/utils/cookieAccept.json',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
  ],
}

export default config
