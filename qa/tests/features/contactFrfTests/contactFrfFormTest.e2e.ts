import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact FRF Form Tests - @frf_75 @frf_75_form', () => {
  test('As a user I have access to the Contact FRF Form via the Home Page - @frf_75_nav_dsp', async ({
    homePage,
    contactFrfPage,
    dataServiceProvidersPage,
  }) => {
    await test.step('Given I have navigated to the Data Service Providers Page', async () => {
      await homePage.goto()
      await homePage.btnBecomeDsp.click()
      await dataServiceProvidersPage.assertOnDataServiceProvidersPage()
    })
    await test.step('When I Click the Contact FRF button', async () => {
      await dataServiceProvidersPage.assertContactFrfButtonPresent()
      await dataServiceProvidersPage.contactFrfBtn.click()
    })
    await test.step('Then I am on the Contact FRF Page', async () => {
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And the Contact FRF Form is present', async () => {
      await contactFrfPage.assertContactFrfFormPresent()
    })
  })

  test('As a user I have access to a Contact FRF Form via the Research Support Page - @frf_75_nav_research_support', async ({
    homePage,
    commonItemsPage,
    contactFrfPage,
    researchSupportPage,
  }) => {
    await test.step('Given I have navigated to the Research Support Page', async () => {
      await homePage.goto()
      await commonItemsPage.btnClosedSiteMenu.click()
      await commonItemsPage.linkSiteMenuResearchStaff.click()
      await researchSupportPage.assertOnResearchSupportPage()
    })
    await test.step('When I Click the Contact FRF button', async () => {
      await researchSupportPage.assertContactFrfButtonPresent()
      await researchSupportPage.contactFrfBtn.click()
    })
    await test.step('Then I am on the Contact FRF Page', async () => {
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And the Contact FRF Form is present', async () => {
      await contactFrfPage.assertContactFrfFormPresent()
    })
  })

  test('As a user I see Introductory Text above the Contact FRF Form - @frf_75_ac1_intro', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
    })
    await test.step('When I View the Contact FRF Page', async () => {
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('Then the Page will contain the Expected Introductory Text', async () => {
      await contactFrfPage.assertIntroText()
    })
  })

  test('The Contact FRF Form contains the expected inputs for the user`s Contact Information - @frf_75_ac1_contact_inputs', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
    })
    await test.step('When I View the Contact FRF Form', async () => {
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('Then the form will have a `Full name` input', async () => {
      await contactFrfPage.assertFullNamePresent()
    })
    await test.step('And the form will have an `Email address` input', async () => {
      await contactFrfPage.assertEmailAddressPresent()
    })
    await test.step('And the form will have an Optional `Telephone` input', async () => {
      await contactFrfPage.assertTelephonePresent()
    })
    await test.step('And the form will have a `Job role` input', async () => {
      await contactFrfPage.assertJobRolePresent()
    })
    await test.step('And the form will have a `Organisation name` input', async () => {
      await contactFrfPage.assertOrgNamePresent()
    })
  })

  test('The Contact FRF Form contains a Text Area to input Enquiry Details - @frf_75_ac1_enquiry_input', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
    })
    await test.step('When I View the Contact FRF Form', async () => {
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('Then the form will have an Enquiry Details Text Area with Character Limit', async () => {
      await contactFrfPage.assertEnquiryDetails()
    })
    await test.step('And the Character Count will reduce as I type in the Text Area', async () => {
      await contactFrfPage.formEnquiryDetailsTxt.type('T')
      await contactFrfPage.assertEnquiryDetailsCharCount(1199)
      await contactFrfPage.formEnquiryDetailsTxt.type('E')
      await contactFrfPage.assertEnquiryDetailsCharCount(1198)
      await contactFrfPage.formEnquiryDetailsTxt.type('S')
      await contactFrfPage.assertEnquiryDetailsCharCount(1197)
      await contactFrfPage.formEnquiryDetailsTxt.type('T')
      await contactFrfPage.assertEnquiryDetailsCharCount(1196)
    })
  })

  test('The Contact FRF Form has a Submit button and Email Copy Text - @frf_75_ac1_submit', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
    })
    await test.step('When I View the Contact FRF Form', async () => {
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('Then the Form will have Text Notifying me that an Email Copy will be sent', async () => {
      await contactFrfPage.assertEmailCopyTxtPresent()
    })
    await test.step('And the Form will have a Submit button', async () => {
      await contactFrfPage.assertSubmitButtonPresent()
    })
  })
})
