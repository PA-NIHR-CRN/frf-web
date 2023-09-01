import { test } from '../../../hooks/CustomFixtures'

test.describe('Generic Page Functionality Tests - @frf_61', () => {
  test('As a user I can navigate to a Generic Page that I have Published - @frf_61_navigation', async ({
    homePage,
    providerDetailsPage,
    genericTestPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I enter the slug for my Generic Page in the Address Bar', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('Then I am on my Generic Test Page', async () => {
      await genericTestPage.assertOnTestPage()
    })
    await test.step('Given I am on the Generic Test DSP page', async () => {
      await providerDetailsPage.goto('providers/test-dsp-for-generic-page-link')
    })
    await test.step('When I click the link to Visit `Visit Chris Testing Page`', async () => {
      await providerDetailsPage.dspDetailDataContentSubSectionGenericHeader.click()
      await providerDetailsPage.dspDetailChrisTestPageLink.click()
    })
    await test.step('Then I am on my Generic Test Page', async () => {
      await genericTestPage.assertOnTestPage()
    })
  })

  test('As a user I can Add Content to the site, via the Generic Page Template in Contentful - @frf_61_features_present', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have navigated to my Published Generic Page', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I View the Published Generic Page', async () => {
      await genericTestPage.assertOnTestPage()
    })
    await test.step('Then I can see the Page Headings that I added', async () => {
      await genericTestPage.assertPageHeadingsAppear()
    })
    await test.step('And I can see the Introduction Text that I added', async () => {
      await genericTestPage.assertIntroAppears()
    })
    await test.step('And I can see the Bullet Point List that I added', async () => {
      await genericTestPage.assertBulletListAppears()
    })
    await test.step('And I can see the Numbered List that I added', async () => {
      await genericTestPage.assertNumberedListAppears()
    })
    await test.step('And I can see the Hyperlinked Text that I added', async () => {
      await genericTestPage.assertHyperlinkAppears()
    })
    await test.step('And I can see the Line Separators that I added', async () => {
      await genericTestPage.assertSeparatorsAppear()
    })
    await test.step('And I can see the Image that I added', async () => {
      await genericTestPage.assertImageAppears()
    })
    await test.step('And I can see the Primary External Button that I added', async () => {
      await genericTestPage.assertPrimaryButtonAppears()
      await genericTestPage.assertButtonIsExternal()
    })
    await test.step('And I can see the Video that I added', async () => {
      await genericTestPage.assertVideoAppears()
    })
    await test.step('And I can see the Secondary Internal Button that I added', async () => {
      await genericTestPage.assertSecondaryButtonAppears()
      await genericTestPage.assertButtonIsInternal()
    })
  })

  test('As a user I can Add a Contact Block to a Generic Page, which is Optional - @frf_61_optional_block', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have Published a Generic Page with Contact Block', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I View the Page', async () => {
      await genericTestPage.assertOnTestPage()
    })
    await test.step('Then I can see the Contact Block', async () => {
      await genericTestPage.assertContactBlockAppears(true)
    })
    await test.step('And the Contact Block contains the Title that I added', async () => {
      await genericTestPage.assertContactBlockTitle('Test Block Promo')
    })
    await test.step('And the Contact Block contains the Text that I added', async () => {
      await genericTestPage.assertContactBlockText('Click here to give us some feedback')
    })
    await test.step('And the Contact Block contains the Button that I added', async () => {
      await genericTestPage.assertContactBlockButton('Click Me!')
    })
    await test.step('Given I have Published a Generic Page without a Contact Block', async () => {
      await genericTestPage.goto('/numbered-list-example')
    })
    await test.step('When I View the Page', async () => {
      await genericTestPage.assertOnAltTestPage()
    })
    await test.step('Then I cannot see the Contact Block', async () => {
      await genericTestPage.assertContactBlockAppears(false)
    })
  })

  test.only('As a user I can Navigate using a Hyperlink on a Generic Page - @frf_61_hyperlink', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have Published a Generic Page with a Hyperlink', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I Click the Hyperlink', async () => {
      await genericTestPage.linkText.click()
      await genericTestPage.page.waitForLoadState()
    })
    await test.step('Then I am taken to the Hyperlinked Page', async () => {
      await genericTestPage.assertOnLinkedPage('BBC')
    })
  })

  test('As a user I can Navigate using a Primary Button on a Generic Page - @frf_61_primary', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have Published a Generic Page with a Primary Button with External Link', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I Click the Primary Button', async () => {
      await genericTestPage.clickExternalButton()
    })
    await test.step('Then I am taken to the Linked Page in a New Tab', async () => {
      await genericTestPage.assertOnLinkedPage('Primary')
    })
  })

  test.only('As a user I can Navigate using a Secondary Button on a Generic Page - @frf_61_secondary', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have Published a Generic Page with a Secondary Button with Internal Link', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I Click the Secondary Button', async () => {
      await genericTestPage.secondaryButton.click()
    })
    await test.step('Then I am taken to the Linked Page', async () => {
      await genericTestPage.assertOnLinkedPage('Secondary')
    })
  })

  test('As a user I can Navigate using a Contact Block Button on a Generic Page - @frf_61_contact_button', async ({
    genericTestPage,
  }) => {
    await test.step('Given I have Published a Generic Page with a Contact Block Button', async () => {
      await genericTestPage.goto('/chris-testing-page')
    })
    await test.step('When I Click the Contact Block Button', async () => {
      await genericTestPage.contactBlockButton.click()
      await genericTestPage.page.waitForLoadState()
    })
    await test.step('Then I am taken to the Linked Page', async () => {
      await genericTestPage.assertOnLinkedPage('Contact')
    })
  })
})
