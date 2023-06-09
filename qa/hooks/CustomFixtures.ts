import { test as base } from '@playwright/test'
import HomePage from '../pages/HomePage'
import ProvidersPage from '../pages/ProvidersPage'
import ProviderDetailsPage from '../pages/ProviderDetailsPage'
import CommonItemsPage from '../pages/CommonItemsPage'

type CustomFixtures = {
  homePage: HomePage
  providersPage: ProvidersPage
  providerDetailsPage: ProviderDetailsPage
  commonItemsPage: CommonItemsPage
}

export const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },

  providersPage: async ({ page }, use) => {
    await use(new ProvidersPage(page))
  },

  providerDetailsPage: async ({ page }, use) => {
    await use(new ProviderDetailsPage(page))
  },

  commonItemsPage: async ({ page }, use) => {
    await use(new CommonItemsPage(page))
  },
})

export { expect } from '@playwright/test'
