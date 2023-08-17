import { test } from '../../../hooks/CustomFixtures'

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies()
})

test.describe('Cookie Confirmation Tests - @frf_3', () => {
  test('I am shown the Cookie Confirmation Banner, when I have made a Selection - @frf_3_ac5_confirmation', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have visited the FRF site', async () => {
      await homePage.goto()
    })
    await test.step('When I have chosen to Accept Cookies', async () => {
      await commonItemsPage.cookieBannerAccept.click()
    })
    await test.step('Then I will see a Confirmation Message displays in the Cookie Banner', async () => {
      await commonItemsPage.assertCookieConfirmationMsgAppears('Accept')
    })
    await test.step('And the Confirmation Message contains a Link to the Cookie Policy Page', async () => {
      await commonItemsPage.assertCookieConfirmationPolicyLink(true)
    })
    await test.step('And the Confirmation Message contains an Option to Change your Selection', async () => {
      await commonItemsPage.assertCookieConfirmationChangeLink(true)
    })
    await test.step('And the Confirmation Banner now Contains a `Hide cookie message` Button', async () => {
      await commonItemsPage.assertCookieConfirmationHideButton(true)
    })
  })

  test('The Link provided in the Confirmation Message, takes me to the Cookie Policy Page - @frf_3_ac6_view_policy', async ({
    homePage,
    commonItemsPage,
    cookiePolicyPage,
  }) => {
    await test.step('Given I have been Shown the Cookie Confirmation Message', async () => {
      await homePage.goto()
      await commonItemsPage.cookieBannerReject.click()
      await commonItemsPage.assertCookieConfirmationMsgAppears('Reject')
    })
    await test.step('When I Click the inline Cookie Policy Link', async () => {
      await commonItemsPage.cookieConfirmationPolicyLink.click()
    })
    await test.step('Then I am taken to the Cookie Policy page', async () => {
      await cookiePolicyPage.assertOnCookiePolicyPage()
    })
    await test.step('And the Cookie Banner is no longer visible', async () => {
      await commonItemsPage.assertCookieBannerAppears(false)
    })
  })

  test('The Link provided in the Confirmation Message, re-displays Cookie Options - @frf_3_ac7_change', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have been Shown the Cookie Confirmation Message', async () => {
      await homePage.goto()
      await commonItemsPage.cookieBannerAccept.click()
      await commonItemsPage.assertCookieConfirmationMsgAppears('Accept')
    })
    await test.step('When I Click the inline Change Settings Link', async () => {
      await commonItemsPage.cookieConfirmationChangeLink.click()
    })
    await test.step('Then the Cookie Confirmation Message Closes', async () => {
      await commonItemsPage.assertCookieConfirmationPolicyLink(false)
      await commonItemsPage.assertCookieConfirmationChangeLink(false)
      await commonItemsPage.assertCookieConfirmationHideButton(false)
    })
    await test.step('And the Original Cookie Banner is now Visible', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('And the Cookie Banner has the expected Heading and Text Content', async () => {
      await commonItemsPage.assertCookieBannerTxtContent()
    })
    await test.step('And the Cookie Banner has the Accept, Reject & View Cookies Options', async () => {
      await commonItemsPage.assertCookieBannerOptionsAppear()
    })
  })

  test('The Button provided in the Confirmation Message, Hides the Cookie Banner - @frf_3_ac8_hide', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have been Shown the Cookie Confirmation Message', async () => {
      await homePage.goto()
      await commonItemsPage.cookieBannerAccept.click()
      await commonItemsPage.assertCookieConfirmationMsgAppears('Accept')
    })
    await test.step('When I Click the Hide Button', async () => {
      await commonItemsPage.cookieConfirmationHideBtn.click()
    })
    await test.step('Then the Cookie Confirmation Message Closes', async () => {
      await commonItemsPage.assertCookieConfirmationPolicyLink(false)
      await commonItemsPage.assertCookieConfirmationChangeLink(false)
      await commonItemsPage.assertCookieConfirmationHideButton(false)
    })
    await test.step('And the Cookie Banner is no longer visible', async () => {
      await commonItemsPage.assertCookieBannerAppears(false)
    })
  })

  test('As a user I can re-display the Cookie Banner, via the Cookie Policy Page - @frf_3_frf_68_change', async ({
    homePage,
    commonItemsPage,
    cookiePolicyPage,
  }) => {
    await test.step('Given I have been Shown the Cookie Confirmation Message', async () => {
      await homePage.goto()
      await commonItemsPage.cookieBannerReject.click()
      await commonItemsPage.assertCookieConfirmationMsgAppears('Reject')
    })
    await test.step('And I have then Hidden the Cookie Banner', async () => {
      await commonItemsPage.cookieConfirmationHideBtn.click()
      await commonItemsPage.assertCookieBannerAppears(false)
    })
    await test.step('When I navigate to the Cookie Policy page', async () => {
      await commonItemsPage.cookiePolicyFooterLink.click()
      await cookiePolicyPage.assertOnCookiePolicyPage()
    })
    await test.step('Then see a `Change cookie settings` button', async () => {
      await cookiePolicyPage.assertChangeCookieOptionAvailable()
    })
    await test.step('When I Click the `Change cookie settings` button', async () => {
      await cookiePolicyPage.changeCookieBtn.click()
    })
    await test.step('Then the Cookie Banner is now Visible', async () => {
      await commonItemsPage.assertCookieBannerAppears(true)
    })
    await test.step('And the Cookie Banner has the expected Heading and Text Content', async () => {
      await commonItemsPage.assertCookieBannerTxtContent()
    })
    await test.step('And the Cookie Banner has the Accept, Reject & View Cookies Options', async () => {
      await commonItemsPage.assertCookieBannerOptionsAppear()
    })
    await test.step('When I navigate back to the Homepage', async () => {
      await commonItemsPage.btnHomeIcon.click()
    })
    await test.step('Then the Cookie Banner is not Visible', async () => {
      await commonItemsPage.assertCookieBannerAppears(false)
    })
  })
})
