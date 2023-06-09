import { PlaywrightTestConfig, LaunchOptions } from '@playwright/test'

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
  // workers: 6, // to enforce parallel workers in Actions Workflow
  retries: 1,
  projects: [
    {
      name: 'FindRecruitFollow',
      use: {
        trace: 'on',
        baseURL: `${process.env.BASE_URL}`,
        headless: true,
        screenshot: 'on',
        launchOptions: {
          slowMo: 0,
        },
      },
    },
  ],
}

export default config
