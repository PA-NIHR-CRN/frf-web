import { expect, test } from '../../../hooks/CustomFixtures'

test.describe('Home Page Accessibility Tests - @accessibility @access_Home', () => {
  test('Scan Home Page with AXE Tool', async ({ homePage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Site Menu Accessibility Tests - @accessibility @access_SiteMenu', () => {
  test('Scan Site Menu with AXE Tool', async ({ homePage, commonItemsPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })

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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('DSP List Page Accessibility Tests - @accessibility @access_DspListPage', () => {
  test('Scan DSP List Page with AXE Tool', async ({ providersPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })

    await test.step('When I scan the DSP List Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('DSP Details Page Accessibility Tests - @accessibility @access_DspDetailPage', () => {
  test('Scan DSP Details Page with AXE Tool', async ({ providerDetailsPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })

    await test.step('When I scan the DSP Details Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Feedback Form Accessibility Tests - @accessibility @access_FeedbackForm', () => {
  test('Scan Feedback Form with AXE Tool', async ({ feedbackFormPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the Feedback Form', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })

    await test.step('When I scan the Feedback Form for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Feedback Confirmation Page Accessibility Tests - @accessibility @access_FeedbackConfirmation', () => {
  test('Scan Feedback Confirmation Page with AXE Tool', async ({
    feedbackFormConfirmationPage,
    makeAxeBuilder,
  }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the Feedback Confirmation Page', async () => {
      await feedbackFormConfirmationPage.goto()
      await feedbackFormConfirmationPage.assertOnFeedbackConfirmationPage()
    })

    await test.step('When I scan the Feedback Confirmation Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact Research Support Form Accessibility Tests - @accessibility @access_ContactSupportForm', () => {
  test('Scan Contact Research Support Form with AXE Tool', async ({ contactSupportPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the Contact Research Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })

    await test.step('When I scan the Contact Research Support Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact Research Support Confirmation Page Accessibility Tests - @accessibility @access_ContactSupportConfirmationForm', () => {
  test('Scan Contact Research Support Confirmation Page with AXE Tool', async ({
    contactSupportConfirmationPage,
    makeAxeBuilder,
  }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to the Contact Research Support Confirmation Page', async () => {
      await contactSupportConfirmationPage.goto()
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })

    await test.step('When I scan the Contact Research Support Confirmation Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact FRF Form Accessibility Tests - @accessibility @access_ContactFrfForm', () => {
  test('Scan Contact FRF Form with AXE Tool', async ({ contactFrfPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })

    await test.step('When I scan the Contact FRF Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact FRF Confirmation Page Accessibility Tests - @accessibility @access_ContactFrfConfirmation', () => {
  test('Scan Contact FRF Confirmation Page with AXE Tool', async ({
    contactFrfConfirmationPage,
    makeAxeBuilder,
  }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a Contact FRF Page', async () => {
      await contactFrfConfirmationPage.goto()
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })

    await test.step('When I scan the Contact FRF Confirmation Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact DSP Form Accessibility Tests - @accessibility @access_ContactDspForm', () => {
  test('Scan Contact DSP Form with AXE Tool', async ({ contactDspPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })

    await test.step('When I scan the Contact DSP Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Contact DSP Confirmation Page Accessibility Tests - @accessibility @access_ContactDspConfirmation', () => {
  test('Scan Contact DSP Confirmation Page with AXE Tool', async ({
    contactDspConfirmationPage,
    makeAxeBuilder,
  }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a Contact DSP Confirmation Page', async () => {
      await contactDspConfirmationPage.goto('genomic-profile-register')
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })

    await test.step('When I scan the Contact DSP Confirmation Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})

test.describe('Generic Page Accessibility Tests - @accessibility @access_GenericPage', () => {
  test('Scan Generic Page with AXE Tool', async ({ genericTestPage, makeAxeBuilder }, testInfo) => {
    const axeScanner = makeAxeBuilder()
    let axeScanResults = await axeScanner.analyze()
    await test.step('Given I have navigated to a Generic Page', async () => {
      await genericTestPage.goto('/chris-testing-page')
      await genericTestPage.assertOnTestPage()
    })

    await test.step('When I scan the Generic Page for Accessibility Errors', async () => {
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
      expect(axeScanResults.violations).toEqual([])
    })
  })
})
