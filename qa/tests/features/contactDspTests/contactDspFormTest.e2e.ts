import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact DSP Form Tests - @frf_23', () => {
  test('As a user I have access to a Contact DSP Form via the DSP Details Page - @frf_23_nav', async ({
    providerDetailsPage,
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to the Genomic Profile Register Details Page', async () => {
      await providerDetailsPage.goto('providers/genomic-profile-register')
    })
    await test.step('When I Click the `Get in touch with Genomic Profile Register` button', async () => {
      await providerDetailsPage.btnContactDsp.click()
    })
    await test.step('Then I am on the Contact Genomic Profile Register Page', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And the ContactDSP Form is present', async () => {
      await contactDspPage.assertContactDspFormPresent()
    })
  })

  test('As a user I see Introductory Text above the Contact DSP Form - @frf_23_ac1_intro', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
    })
    await test.step('When I View the Contact DSP Page', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('Then the Page will contain the Expected Introductory Text', async () => {
      await contactDspPage.assertIntroText()
    })
  })

  test('The Contact DSP Form contains the expected inputs for the user`s Contact Information - @frf_23_ac1_contact_inputs', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
    })
    await test.step('When I View the Contact DSP Form', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('Then the form will have a `Full name` input', async () => {
      await contactDspPage.assertFullNamePresent()
    })
    await test.step('And the form will have an `Email address` input', async () => {
      await contactDspPage.assertEmailAddressPresent()
    })
    await test.step('And the form will have an Optional `Telephone` input', async () => {
      await contactDspPage.assertTelephonePresent()
    })
    await test.step('And the form will have a `Job role` input', async () => {
      await contactDspPage.assertJobRolePresent()
    })
    await test.step('And the form will have a `Organisation name` input', async () => {
      await contactDspPage.assertOrgNamePresent()
    })
  })

  test('The Contact DSP Form contains a Text Area to input Enquiry Details - @frf_23_ac1_enquiry_input', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
    })
    await test.step('When I View the Contact DSP Form', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('Then the form will have an Enquiry Details Text Area with Character Limit', async () => {
      await contactDspPage.assertEnquiryDetails()
    })
    await test.step('And the Character Count will reduce as I type in the Text Area', async () => {
      await contactDspPage.formEnquiryDetailsTxt.type('T')
      await contactDspPage.assertEnquiryDetailsCharCount(1199)
      await contactDspPage.formEnquiryDetailsTxt.type('E')
      await contactDspPage.assertEnquiryDetailsCharCount(1198)
      await contactDspPage.formEnquiryDetailsTxt.type('S')
      await contactDspPage.assertEnquiryDetailsCharCount(1197)
      await contactDspPage.formEnquiryDetailsTxt.type('T')
      await contactDspPage.assertEnquiryDetailsCharCount(1196)
    })
  })

  test('The Contact DSP Form has a Submit button and Email Copy Text - @frf_23_ac1_submit', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
    })
    await test.step('When I View the Contact DSP Form', async () => {
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('Then the Form will have Text Notifying me that an Email Copy will be sent', async () => {
      await contactDspPage.assertEmailCopyTxtPresent()
    })
    await test.step('And the Form will have a Submit button', async () => {
      await contactDspPage.assertSubmitButtonPresent()
    })
  })
})
