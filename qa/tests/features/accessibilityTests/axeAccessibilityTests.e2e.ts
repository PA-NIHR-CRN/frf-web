import { test, expect } from '../../../hooks/CustomFixtures'

test.describe('Home Page Accessibility Tests - @access_Home', () => {
  test('Scan Home Page with AXE Tool', async ({ homePage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults: any
    await test.step('Given I have navigated to the Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })

    await test.step('When I scan the Home Page for Accessibility Errors', async () => {
      axeScanResults = await axeScanner
        .options({ reporter: 'v2' })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    })

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(axeScanResults, null, 2),
      contentType: 'application/json',
    })

    await test.step('Then I should recieve no issue up to WCAG 2.1 AA Standard', async () => {
      expect(await axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Site Menu Accessibility Tests - @access_SiteMenu', () => {
  test('Scan Site Menu with AXE Tool', async ({ homePage, commonItemsPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults: any
    await test.step('Given I have navigated to the Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })

    // Include if needed
    await test.step('And I open the site Menu', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
      await commonItemsPage.assertMenuIconAppearsOpen()
    })

    await test.step('When I scan the Site Menu for Accessibility Errors', async () => {
      axeScanResults = await axeScanner
        .options({ reporter: 'v2' })
        .include('button[data-state="open"]')
        .include('nav[data-state="open"]')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    })

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(axeScanResults, null, 2),
      contentType: 'application/json',
    })

    await test.step('Then I should recieve no issue up to WCAG 2.1 AA Standard', async () => {
      expect(await axeScanResults.violations).toEqual([])
    })
  })
})
