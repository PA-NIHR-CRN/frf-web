import { test } from '../../../hooks/CustomFixtures'

test.describe('Initial Site Testing of Basic Contentful Page Structure and Navigation - @frf_1', () => {
  test('As a User I Can Navigate to the Home Page', async ({ homePage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I should see the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })

  test('As a User I Can Navigate to Providers Page from Home Page - @frf_1_0', async ({ homePage, providersPage }) => {
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

  test('As a User I Can Navigate to Provider Details Page from Providers Page - @frf_1_1', async ({
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

  test('As a User I Can See That the Page Structure is Consistent Across the Site - @frf_1_2', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    commonItemsPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I should see the Header and Footer Items Appear', async () => {
      await commonItemsPage.assertHeaderFooterItemsAppear()
    })
    await test.step('And I should see the FRF Service Title Appear', async () => {
      await commonItemsPage.assertServiceTitleCorrect()
    })
    await test.step('And I should see the NIHR Logo Appear', async () => {
      await commonItemsPage.assertNihrLogoPresent()
    })
    await test.step('And I should see the GDS Beta Banner Appear', async () => {
      await commonItemsPage.assertBetaGdsBannerAppears()
    })
    await test.step('And I should see the link to Feedback Form Appear in the GDS Beta Banner', async () => {
      await commonItemsPage.assertFeedbackLinkAppears()
    })
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('Then I should see the Header and Footer Items Appear', async () => {
      await commonItemsPage.assertHeaderFooterItemsAppear()
    })
    await test.step('And I should see the FRF Service Title Appear', async () => {
      await commonItemsPage.assertServiceTitleCorrect()
    })
    await test.step('And I should see the NIHR Logo Appear', async () => {
      await commonItemsPage.assertNihrLogoPresent()
    })
    await test.step('And I should see the GDS Beta Banner Appear', async () => {
      await commonItemsPage.assertBetaGdsBannerAppears()
    })
    await test.step('And I should see the link to Feedback Form Appear in the GDS Beta Banner', async () => {
      await commonItemsPage.assertFeedbackLinkAppears()
    })
    await test.step('Given I have navigated to the Provider Details Page', async () => {
      await providerDetailsPage.goto()
    })
    await test.step('Then I should see the Header and Footer Items Appear', async () => {
      await commonItemsPage.assertHeaderFooterItemsAppear()
    })
    await test.step('And I should see the FRF Service Title Appear', async () => {
      await commonItemsPage.assertServiceTitleCorrect()
    })
    await test.step('And I should see the NIHR Logo Appear', async () => {
      await commonItemsPage.assertNihrLogoPresent()
    })
    await test.step('And I should see the GDS Beta Banner Appear', async () => {
      await commonItemsPage.assertBetaGdsBannerAppears()
    })
    await test.step('And I should see the link to Feedback Form Appear in the GDS Beta Banner', async () => {
      await commonItemsPage.assertFeedbackLinkAppears()
    })
  })

  test('As a User I Can Navigate to the Privacy Page via the Footer Link Across Multiple Pages - @frf_1_3', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    commonItemsPage,
    privacyPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the Privacy Link in the Footer', async () => {
      await commonItemsPage.linkPrivacy.click()
    })
    await test.step('Then I should see the Privacy Page', async () => {
      await privacyPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click the Privacy Link in the Footer', async () => {
      await commonItemsPage.linkPrivacy.click()
    })
    await test.step('Then I should see the Privacy Page', async () => {
      await privacyPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Provider Details Page', async () => {
      await providerDetailsPage.goto()
    })
    await test.step('When I click the Privacy Link in the Footer', async () => {
      await commonItemsPage.linkPrivacy.click()
    })
    await test.step('Then I should see the Privacy Page', async () => {
      await privacyPage.assertOnPrivacyPage()
    })
  })

  test('As a User I Can Navigate to the Accessibilty Page via the Footer Link Across Multiple Pages - @frf_1_4', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    commonItemsPage,
    accessibilityPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkAccessibility.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await accessibilityPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkAccessibility.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await accessibilityPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Provider Details Page', async () => {
      await providerDetailsPage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkAccessibility.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await accessibilityPage.assertOnPrivacyPage()
    })
  })

  test('As a User I Can Navigate to the Feecback Form via GDS Beta Banner Link, Across Multiple Pages - @frf-_1_5', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    commonItemsPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkFeedback.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await feedbackFormPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkFeedback.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await feedbackFormPage.assertOnPrivacyPage()
    })
    await test.step('Given I have navigated to the Provider Details Page', async () => {
      await providerDetailsPage.goto()
    })
    await test.step('When I click the Accessibility Link in the Footer', async () => {
      await commonItemsPage.linkFeedback.click()
    })
    await test.step('Then I should see the Accessibility Page', async () => {
      await feedbackFormPage.assertOnPrivacyPage()
    })
  })
})
