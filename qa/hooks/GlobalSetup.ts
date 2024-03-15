import { BASE_URL } from '../constants/environment'

async function globalSetup() {
  process.env.BASE_URL = BASE_URL
}

export default globalSetup
