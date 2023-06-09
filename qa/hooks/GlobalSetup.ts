import { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  process.env.BASE_URL = 'https://dev.findrecruitandfollowup.nihr.ac.uk/'
}

export default globalSetup
