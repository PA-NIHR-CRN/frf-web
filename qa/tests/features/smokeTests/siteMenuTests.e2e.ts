import { test } from '../../../hooks/CustomFixtures'

test.describe('Site Menu Smoke Tests - @frf_5', () => {
  test('As a user I want Access to a Menu of Links to Various Parts of the Site - @frf_5_ac1_0', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('And I see a Menu Icon in the Site Header', async () => {
      await commonItemsPage.assertMenuIconAppearsClosed()
    })
    await test.step('When I click the Menu Icon', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('Then I will see an Expanded Site Menu', async () => {
      await commonItemsPage.assertMenuIconAppearsOpen()
    })
    await test.step('And I am presented with All the Expected Site Menu Links', async () => {
      await commonItemsPage.assertSiteMenuLinksAppear()
    })
  })

  test('As a user I want to see Guidance Text on the Site Menu - @frf_5_ac1_1', async ({
    homePage,
    commonItemsPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the Menu Icon', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('And I am presented with All the Expected Site Menu Links', async () => {
      await commonItemsPage.assertSiteMenuLinksAppear()
    })
    await test.step('Then Each Link will have a Short Description', async () => {
      await commonItemsPage.assertSiteMenuLinkDescriptionsPresent()
    })
    await test.step('And the Site Menu will have Introductory Text', async () => {
      await commonItemsPage.assertSiteMenuIntroTextPresent()
    })
  })

  test('As a user I want the option to Close the Menu - @frf_5_ac2', async ({ homePage, commonItemsPage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('And I click the Menu Icon', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('And I see an Expanded Site Menu', async () => {
      await commonItemsPage.assertMenuIconAppearsOpen()
    })
    await test.step('When I click the Menu Icon again', async () => {
      await commonItemsPage.btnOpenedSiteMenu.click()
    })
    await test.step('Then the Site Menu will be Closed', async () => {
      await commonItemsPage.assertMenuIconAppearsClosed()
    })
    await test.step('Given I click the Menu Icon', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('And I see an Expanded Site Menu', async () => {
      await commonItemsPage.assertMenuIconAppearsOpen()
    })
    await test.step('When I click Anywhere Outside of the Site Menu', async () => {
      await commonItemsPage.frfBanner.click()
    })
    await test.step('Then the Site Menu will be Closed', async () => {
      await commonItemsPage.assertMenuIconAppearsClosed()
    })
  })
})
