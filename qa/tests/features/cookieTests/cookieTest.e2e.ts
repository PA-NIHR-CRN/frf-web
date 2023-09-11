import { test } from '../../../hooks/CustomFixtures'

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies()
})

test.describe('Cookie Tests - @frf_3_cookies @frf_3_cookie_banner', () => {
  test('As a user I am shown a Cookie Banner when I first visit the FRF site- @frf_3_ac1_display', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have visited the FRF site', async () => {
      await homePage.goto()
    })
    await test.step('When I have not yet selected my Cookie options', async () => {
      await homePage.assertOnHomePage()
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('And the Cookie Banner has the expected Heading and Text Content', async () => {
      await commonItemsPage.assertCookieBannerTxtContent()
    })
    await test.step('And the Cookie Banner has the Accept, Reject & View Cookies Options', async () => {
      await commonItemsPage.assertCookieBannerOptionsAppear()
    })
  })

  test('As a user I will not be asked to re-select my Cookie Preference for 12 months - @frf_3_ac2_expire', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have visited the FRF site', async () => {
      await homePage.goto()
    })
    await test.step('When I have chosen to Accept Cookies', async () => {
      await commonItemsPage.cookieBannerAccept.click()
    })
    await test.step('Then the Site Decision Cookie has been applied with a value of Accept', async () => {
      await commonItemsPage.assertDecisonCookieApplied('Accept')
    })
    await test.step('And the Site Decision Cookie has an Expiry value exactly 1 year later', async () => {
      await commonItemsPage.assertDecisonCookieExpiry()
    })
  })

  test('As a user I am shown a Cookie Banner across the Site until I make a Selection- @frf_3_ac3_persist', async ({
    homePage,
    providersPage,
    providerDetailsPage,
    contactDspPage,
    cookiePolicyPage,
    commonItemsPage,
  }) => {
    await test.step('Given I have visited the FRF site Homepage', async () => {
      await homePage.goto()
    })
    await test.step('When I have not yet selected my Cookie options', async () => {
      await homePage.assertOnHomePage()
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('When I Click the View all DSP`s button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the DSP list page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('When I Click the View more Details button', async () => {
      await providersPage.btnViewMoreDetails.nth(0).click()
    })
    await test.step('And I am on a DSP Details page', async () => {
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('When I Click the Contact DSP button', async () => {
      await providerDetailsPage.btnContactDsp.click()
    })
    await test.step('And I am on the Contact DSP page', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('When I Click the Cookie Policy Link in the Footer', async () => {
      await commonItemsPage.cookiePolicyFooterLink.click()
    })
    await test.step('And I am on the Cookie Policy page', async () => {
      await cookiePolicyPage.assertOnCookiePolicyPage()
    })
    await test.step('Then I will see the Cookie Banner displays at the top of the Page', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
  })

  test('Google Analytics & Youtube Cookies are applied when I Accept Cookies - @frf_3_ac4_accept', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have visited the FRF site', async () => {
      await homePage.goto()
    })
    await test.step('And there are currently no Cookies applied to the FRF site', async () => {
      await commonItemsPage.page.context().clearCookies()
      await commonItemsPage.assertNoCookiesApplied()
    })
    await test.step('When I have chosen to Accept Cookies', async () => {
      await commonItemsPage.cookieBannerAccept.click()
    })
    await test.step('Then the Site Decision Cookie has been applied with a value of Accept', async () => {
      await commonItemsPage.assertDecisonCookieApplied('Accept')
    })
    await test.step('And the Site Cookies for Google Analytics have been applied', async () => {
      await commonItemsPage.assertGoogleAnalyticsCookiesApplied(true)
    })
    await test.step('When I click an embedded Youtube video', async () => {
      await homePage.iframeIntroVideo.click()
      await homePage.assertVideoPlayable()
    })
    await test.step('Then the Third Party Cookies from Youtube have been applied', async () => {
      await commonItemsPage.assertYoutubeCookiesApplied(true)
    })
  })

  test('Google Analytics & Youtube Cookies are not applied when I Reject Cookies - @frf_3_ac4_reject', async ({
    homePage,
    commonItemsPage,
    providersPage,
  }) => {
    await test.step('Given I have visited the FRF site', async () => {
      await homePage.goto()
    })
    await test.step('And there are currently no Cookies applied to the FRF site', async () => {
      await commonItemsPage.page.context().clearCookies()
      await commonItemsPage.assertNoCookiesApplied()
    })
    await test.step('When I have chosen to Reject Cookies', async () => {
      await commonItemsPage.cookieBannerReject.click()
    })
    await test.step('Then the Site Decision Cookie has been applied with a value of Reject', async () => {
      await commonItemsPage.assertDecisonCookieApplied('Reject')
    })
    await test.step('And the Site Cookies for Google Analytics have not been applied', async () => {
      await commonItemsPage.assertGoogleAnalyticsCookiesApplied(false)
    })
    await test.step('When I click an embedded Youtube video', async () => {
      await homePage.iframeIntroVideo.click()
      await homePage.assertVideoPlayable()
    })
    await test.step('Then the Third Party Cookies from Youtube have not been applied', async () => {
      await commonItemsPage.assertYoutubeCookiesApplied(false)
    })
    await test.step('When I navigate to Another Area of the Site, such as DSP List Page', async () => {
      await homePage.btnProviders.click()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And the Site Cookies for Google Analytics have still not been applied', async () => {
      await commonItemsPage.assertGoogleAnalyticsCookiesApplied(false)
    })
  })
})
