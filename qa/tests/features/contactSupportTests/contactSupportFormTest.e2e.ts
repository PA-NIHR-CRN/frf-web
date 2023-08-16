import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact Research Support Form Tests - @frf_32', () => {
  test('As a user I have access to a Contact Research Support Form via the Home Page - @frf_32_nav_home', async ({
    homePage,
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I Click the Contact Research Support button', async () => {
      await homePage.btnContactSupport.click()
    })
    await test.step('Then I am on the Contact Research Support Page', async () => {
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And the Contact Research Support Form is present', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
  })

  test('As a user I have access to a Contact Research Support Form via the Site Menu - @frf_32_nav_menu', async ({
    homePage,
    commonItemsPage,
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I open the Site Menu', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('And I Click the Contact Research Support link', async () => {
      await commonItemsPage.linkSiteMenuContactSupport.click()
    })
    await test.step('Then I am on the Contact Research Support Page', async () => {
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And the Contact Research Support Form is present', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
  })

  test('As a user I have access to a Contact Research Support Form via the DSP List Page - @frf_32_nav_dsp_list', async ({
    providersPage,
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I Click the Contact Research Support button', async () => {
      await providersPage.dspContactSupportBtn.click()
    })
    await test.step('Then I am on the Contact Research Support Page', async () => {
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And the Contact Research Support Form is present', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
  })

  test('As a user I have access to a Contact Research Support Form via a DSP Details Page - @frf_32_nav_dsp_details', async ({
    providerDetailsPage,
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providerDetailsPage.goto('providers/genomic-profile-register')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('When I Click the Contact Research Support button', async () => {
      await providerDetailsPage.btnContactResearch.click()
    })
    await test.step('Then I am on the Contact Research Support Page', async () => {
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And the Contact Research Support Form is present', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
  })

  test('As a user I see Introductory Text above the Contact Research Support Form - @frf_32_ac1_intro', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
    })
    await test.step('When I View the Contact Research Support Page', async () => {
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('Then the Page will contain the Expected Introductory Text', async () => {
      await contactSupportPage.assertIntroText()
    })
  })

  test('The Contact Research Support Form contains an `About your enquiry` section - @frf_32_ac1_enquiry', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
    })
    await test.step('When I View the Contact Research Support Form', async () => {
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('Then the Form will have an `About Your enquiry` section', async () => {
      await contactSupportPage.assertAboutEnquirySectionPresent()
    })
    await test.step('And the section will have an `Is your enquiry about` label', async () => {
      await contactSupportPage.assertIsEnquiryAboutLabelPresent()
    })
    await test.step('And the section will have 2 Radio button inputs', async () => {
      await contactSupportPage.assertEnquiryRadioGroupPresent()
    })
    await test.step('And the 2 Radio button inputs will have the expected values', async () => {
      await contactSupportPage.assertEnquiryRadioGroupValues()
    })
    await test.step('And the section will have a Support Summary Text Area with Character Limit', async () => {
      await contactSupportPage.assertEnquirySupportSummary()
    })
    await test.step('And the Character Count will reduce as I type in the Text Area', async () => {
      await contactSupportPage.formSummarySupportTxt.type('T')
      await contactSupportPage.assertSupportSummaryCharCount(1199)
      await contactSupportPage.formSummarySupportTxt.type('E')
      await contactSupportPage.assertSupportSummaryCharCount(1198)
      await contactSupportPage.formSummarySupportTxt.type('S')
      await contactSupportPage.assertSupportSummaryCharCount(1197)
      await contactSupportPage.formSummarySupportTxt.type('T')
      await contactSupportPage.assertSupportSummaryCharCount(1196)
    })
  })

  test('The Contact Research Support Form contains an `About you` section - @frf_32_ac1_you', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
    })
    await test.step('When I View the Contact Research Support Form', async () => {
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('Then the Form will have an `About You` section', async () => {
      await contactSupportPage.assertAboutYouSectionPresent()
    })
    await test.step('And the section will have a `Full name` input', async () => {
      await contactSupportPage.assertFullNamePresent()
    })
    await test.step('And the section will have an `Email address` input', async () => {
      await contactSupportPage.assertEmailAddressPresent()
    })
    await test.step('And the section will have an Optional `Telephone` input', async () => {
      await contactSupportPage.assertTelephonePresent()
    })
    await test.step('And the section will have a `Job role` input', async () => {
      await contactSupportPage.assertJobRolePresent()
    })
    await test.step('And the section will have a `Organisation name` input', async () => {
      await contactSupportPage.assertOrgNamePresent()
    })
    await test.step('And the section will have an `Is your organisation` label', async () => {
      await contactSupportPage.assertIsYourOrgLabelPresent()
    })
    await test.step('And the section will have 2 Radio button inputs', async () => {
      await contactSupportPage.assertOrgRadioGroupPresent()
    })
    await test.step('And the 2 Radio button inputs will have the expected values', async () => {
      await contactSupportPage.assertOrgRadioGroupValues()
    })
  })

  test('The Contact Research Support Form contains an `About your research` section - @frf_32_ac1_research', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
    })
    await test.step('When I View the Contact Research Support Form', async () => {
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('Then the Form will have an `About your research` section', async () => {
      await contactSupportPage.assertAboutResearchSectionPresent()
    })
    await test.step('And the section will have a `Which region will take a lead` label', async () => {
      await contactSupportPage.assertWhichRegionLabelPresent()
    })
    await test.step('And underneath there will be Guidance Text with a link to LCRN', async () => {
      await contactSupportPage.assertResearchLeadGuideBlockPresent()
    })
    await test.step('And there will be a Dropdown input to select the Lead Region', async () => {
      await contactSupportPage.assertLeadRegionInputPresent()
    })
    await test.step('And the section will have an Optional Study Title input', async () => {
      await contactSupportPage.assertStudyTitlePresent()
    })
    await test.step('And the section will have an Optional Protocol Reference input', async () => {
      await contactSupportPage.assertProtocolRefPresent()
    })
    await test.step('And the section will have an Optional CPMS Id input with Guidance Text', async () => {
      await contactSupportPage.assertCpmsIdPresent()
    })
  })

  test('The Contact Research Support Form has a Submit button and Email Copy Text - @frf_32_ac1_submit', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
    })
    await test.step('When I View the Contact Research Support Form', async () => {
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('Then the Form will have Text Notifying me that an Email Copy will be sent', async () => {
      await contactSupportPage.assertEmailCopyTxtPresent()
    })
    await test.step('And the Form will have a Submit button', async () => {
      await contactSupportPage.assertSubmitButtonPresent()
    })
  })
})
