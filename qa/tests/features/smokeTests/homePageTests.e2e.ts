import { test } from '../../../hooks/CustomFixtures'

test.describe('Home Page Smoke Tests - @frf_4', () => {
  test('As a user I will see an Introduction Section with Video on the Homepage- @frf_4_ac1_0', async ({
    homePage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I will see an Introductory Section with Title and Description of FRF', async () => {
      await homePage.assertOnHomePage()
      await homePage.assertIntroductorySectionDisplayed()
    })
    await test.step('And I will see an Embedded FRF Intro Video', async () => {
      await homePage.assertVideoPresent()
    })
    await test.step('When I click the on the Intro Video', async () => {
      await homePage.iframeIntroVideo.click()
    })
    await test.step('Then I can Watch the Video on the Site', async () => {
      await homePage.assertVideoPlayable()
    })
  })

  test('As a user I will see a Middle Section Signposting me to the DSP list page on the Home Page - @frf_4_ac1_1', async ({
    homePage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I will see Introductory DSP Text', async () => {
      await homePage.assertOnHomePage()
      await homePage.assertDspIntroTextDisplayed()
    })
    await test.step('And I will see 3 Boxes, one for each Service', async () => {
      await homePage.assertDspIntroBoxesDisplayed()
    })
    await test.step('And each box will Contain a Short Description of the Relevant Service', async () => {
      await homePage.assertDspIntroBoxesTextDisplayed()
    })
    await test.step('And each box will Contain a a Link to the DSP list Filtered to that Service', async () => {
      await homePage.assertDspIntroBoxesLinksDisplayed()
    })
  })

  test('As a user I will see a Button to View All DSPs on the Home Page - @frf_4_ac1_2', async ({ homePage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I will see a Button to View All DSPs', async () => {
      await homePage.assertDspBtnPresent()
    })
  })

  test('As a user I will see Signposting to other key parts of the site on the Home Page - @frf_4_ac2', async ({
    homePage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('Then I can see the "Get Support for your research" section', async () => {
      await homePage.assertGetSupportSectionVisible()
    })
    await test.step('And I can see the "Become a DSP" section', async () => {
      await homePage.assertBecomeDspVisible()
    })
    await test.step('And both Sections have a Title', async () => {
      await homePage.assertGetSupportTitleVisible()
      await homePage.assertBecomeDspTitleVisible()
    })
    await test.step('And both Sections have a Short Description', async () => {
      await homePage.assertGetSupportDescTextVisible()
      await homePage.assertBecomeDspDescTextVisible()
    })
    await test.step('And both Sections have a Button to Visit the Relevant Part of the Site', async () => {
      await homePage.assertGetSupportButtonVisible()
      await homePage.assertBecomeDspButtonVisible()
    })
  })

  test('As a user I will Always have a Link Available to Navigate back to the Home Page - @frf_4_ac3', async ({
    homePage,
    providersPage,
    commonItemsPage,
    privacyPage,
  }) => {
    await test.step('Given I have navigated to the Providers Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click the FRF Banner Title', async () => {
      await commonItemsPage.frfServiceTitle.click()
    })
    await test.step('Then I should see the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
    await test.step('Given I have navigated to the Privacy Page', async () => {
      await privacyPage.goto()
    })
    await test.step('When I click the FRF Banner Title', async () => {
      await commonItemsPage.frfServiceTitle.click()
    })
    await test.step('Then I should see the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })
})
