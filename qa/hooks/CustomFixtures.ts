import AxeBuilder from '@axe-core/playwright'
import { test as base } from '@playwright/test'

import AccessibilityPage from '../pages/AccessibilityPage'
import CommonItemsPage from '../pages/CommonItemsPage'
import ContactSupportConfirmationPage from '../pages/ContactSupportConfirmationPage'
import ContactSupportPage from '../pages/ContactSupportPage'
import FeedbackConfirmationPage from '../pages/FeedbackFormConfirmationPage'
import FeedbackFormPage from '../pages/FeedbackFormPage'
import GenericTestPage from '../pages/GenericTestPage'
import HomePage from '../pages/HomePage'
import PrivacyPage from '../pages/PrivacyPage'
import ProviderDetailsPage from '../pages/ProviderDetailsPage'
import ProvidersPage from '../pages/ProvidersPage'

type CustomFixtures = {
  homePage: HomePage
  providersPage: ProvidersPage
  providerDetailsPage: ProviderDetailsPage
  commonItemsPage: CommonItemsPage
  privacyPage: PrivacyPage
  accessibilityPage: AccessibilityPage
  feedbackFormPage: FeedbackFormPage
  feedbackFormConfirmationPage: FeedbackConfirmationPage
  genericTestPage: GenericTestPage
  contactSupportPage: ContactSupportPage
  contactSupportConfirmationPage: ContactSupportConfirmationPage

  makeAxeBuilder: () => AxeBuilder
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

  genericTestPage: async ({ page }, use) => {
    await use(new GenericTestPage(page))
  },

  contactSupportPage: async ({ page }, use) => {
    await use(new ContactSupportPage(page))
  },

  contactSupportConfirmationPage: async ({ page }, use) => {
    await use(new ContactSupportConfirmationPage(page))
  },

  feedbackFormConfirmationPage: async ({ page }, use) => {
    await use(new FeedbackConfirmationPage(page))
  },

  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page })
    await use(makeAxeBuilder)
  },
})

export { expect } from '@playwright/test'
