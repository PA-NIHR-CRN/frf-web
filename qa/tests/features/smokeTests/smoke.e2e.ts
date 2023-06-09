import { test } from '../../../hooks/CustomFixtures'

test.describe('Basic Smoke Tests for Initial Site Testing', () => {
  test('As a User I Can Navigate to the Home Page', async ({ homePage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I should see the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })

  test('As a User I Can Navigate to Providers Page from Home Page', async ({ homePage, providersPage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the Providers button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('Then I should see the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
  })

  test('As a User I Can Navigate to Provider Details Page from Providers Page', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click the Detail button', async () => {
      await providersPage.btnDetail.click()
    })
    await test.step('Then I should see the Provider Details Page', async () => {
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
  })

  test('As a User I Can See That a Banner with Shared Items Appears Consistently Across the Site', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    commonItemsPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I should see the Banner Items Appear', async () => {
      await commonItemsPage.assertBannerItemsAppear()
    })
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('Then I should see the Banner Items Appear', async () => {
      await commonItemsPage.assertBannerItemsAppear()
    })
    await test.step('Given I have navigated to the Provider Details Page', async () => {
      await providerDetailsPage.goto()
    })
  })
})
