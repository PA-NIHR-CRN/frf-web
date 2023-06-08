import { test } from '../../../hooks/CustomFixtures'

test('Can Navigate to Home Page', async ({ homePage }) => {
  await homePage.goto()
  await homePage.assertOnHomePage()
})

test('Check that Common Site Items Appear', async ({ homePage, commonItemsPage }) => {
  await homePage.goto()
  await commonItemsPage.assertBannerItemsAppear()
})

test('Can Navigate to Providers Page from Home Page', async ({ homePage, providersPage }) => {
  await homePage.goto()
  await homePage.btnProviders.click()
  await providersPage.assertOnProvidersPage()
})

test('Can Navigate to Provider Details Page from Providers Page', async ({ providersPage, providerDetailsPage }) => {
  await providersPage.goto()
  await providersPage.btnDetail.click()
  await providerDetailsPage.assertOnProviderDetailsPage()
})
