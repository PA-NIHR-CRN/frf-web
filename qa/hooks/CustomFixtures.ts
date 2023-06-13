import { test as base } from '@playwright/test'
import HomePage from '../pages/HomePage'
import ProvidersPage from '../pages/ProvidersPage'
import ProviderDetailsPage from '../pages/ProviderDetailsPage'
import CommonItemsPage from '../pages/CommonItemsPage'
import PrivacyPage from '../pages/PrivacyPage'
import AccessibilityPage from '../pages/AccessibilityPage'
import FeedbackFormPage from '../pages/FeedbackFormPage'

type CustomFixtures = {
  homePage: HomePage
  providersPage: ProvidersPage
  providerDetailsPage: ProviderDetailsPage
  commonItemsPage: CommonItemsPage
  privacyPage: PrivacyPage
  accessibilityPage: AccessibilityPage
  feedbackFormPage: FeedbackFormPage
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

  privacyPage: async ({ page }, use) => {
    await use(new PrivacyPage(page))
  },

  accessibilityPage: async ({ page }, use) => {
    await use(new AccessibilityPage(page))
  },

  feedbackFormPage: async ({ page }, use) => {
    await use(new FeedbackFormPage(page))
  },
})

export { expect } from '@playwright/test'
