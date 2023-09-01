import { test } from '../../../hooks/CustomFixtures'
import testData from '../../../utils/testData.json'

test.describe('Contact DSP Form Validation Tests - @frf_23 @frf_23_validation', () => {
  test('As a user I am shown a Summary of Validation Errors, if Mandatory fields are incomplete - @frf_23_validation_summary', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactDspPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains a `There is a problem` heading', async () => {
      await contactDspPage.assertValidationSummaryHeading()
    })
    await test.step('And it contains the Expected Validation Message for Each Mandatory Field', async () => {
      await contactDspPage.assertValidationSummaryMandatoryMessages()
    })
  })

  test('As a user when I click a Validation Summary Error Message, the Relevant field comes into Focus - @frf_23_validation_summary_links', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have triggered the display of the Validation Summary box', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('When I Click the Enquiry Details Validation Summary Message', async () => {
      await contactDspPage.validationSummaryEnquiryDetailsError.click()
    })
    await test.step('Then the Enquiry Details Text Area has been focused', async () => {
      await contactDspPage.assertValidationSummaryLinks('Enquiry')
    })
    await test.step('When I Click the Email Address Validation Summary Message', async () => {
      await contactDspPage.validationSummaryEmailError.click()
    })
    await test.step('Then the Email Address Input has been focused', async () => {
      await contactDspPage.assertValidationSummaryLinks('Email')
    })
    await test.step('When I Click the Organisation Name Validation Summary Message', async () => {
      await contactDspPage.validationSummaryOrgNameError.click()
    })
    await test.step('Then the Organisation Name Input has been focused', async () => {
      await contactDspPage.assertValidationSummaryLinks('Org')
    })
  })

  test('As a user I am shown Validation Errors above each relevant field, if Mandatory fields are incomplete - @frf_23_validation_individual', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactDspPage.assertContactDspFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then the Expected Validation Message appears above each Mandatory field', async () => {
      await contactDspPage.assertValidationMandatoryFieldMessages()
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Telphone value - @frf_23_validation_phone', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactDspPage.formTelephoneInput.type('02890T494')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactDspPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone Field', async () => {
      await contactDspPage.assertValidationSummaryTelephoneMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone field', async () => {
      await contactDspPage.assertValidationTelephoneFieldMessagePresent(true)
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Email value - @frf_23_validation_email', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactDspPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactDspPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Email Field', async () => {
      await contactDspPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Email field', async () => {
      await contactDspPage.assertValidationEmailFieldMessagePresent(true)
    })
  })

  test('As a user when I correct Validation Errors, then the Error Messages Disappear Dynamically- @frf_23_validation_correction', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactDspPage.formTelephoneInput.type('07700 900 982+')
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactDspPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('And I have entered valid values for the remaining Mandatory Fields', async () => {
      await contactDspPage.formFullNameInput.type('Testing Name')
      await contactDspPage.formJobRoleInput.type('Testing Job')
      await contactDspPage.formOrgNameInput.type('Testing Org')
      await contactDspPage.formEnquiryDetailsTxt.type('Testing Contact DSP Value')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactDspPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone & Email Fields', async () => {
      await contactDspPage.assertValidationSummaryTelephoneMessagePresent(true)
      await contactDspPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone & Email fields', async () => {
      await contactDspPage.assertValidationTelephoneFieldMessagePresent(true)
      await contactDspPage.assertValidationEmailFieldMessagePresent(true)
    })
    await test.step('When I then enter a valid Telephone value', async () => {
      await contactDspPage.formTelephoneInput.clear()
      await contactDspPage.formTelephoneInput.type('+44 808 157 0192')
    })
    await test.step('Then the Validation Message for Telephone disappears from the Summary box', async () => {
      await contactDspPage.assertValidationSummaryTelephoneMessagePresent(false)
    })
    await test.step('And the Validation Message disappears from above the Telephone field', async () => {
      await contactDspPage.assertValidationTelephoneFieldMessagePresent(false)
    })
    await test.step('When I then enter a valid Email value', async () => {
      await contactDspPage.formEmailAddressInput.clear()
      await contactDspPage.formEmailAddressInput.type('dummy.test@nihr.ac.uk')
    })
    await test.step('And the Validation Summary box no longer appears at the top of the form', async () => {
      await contactDspPage.assertValidationSummaryPresent(false)
    })
    await test.step('And the Validation Message disappears from above the Email field', async () => {
      await contactDspPage.assertValidationEmailFieldMessagePresent(false)
    })
  })

  test('As a user I cannot exceed the 1200 character limit on the Enquiry Details Text Area - @frf_23_validation_max_chars', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered 1200 characters in the Enquiry Details Text Area', async () => {
      await contactDspPage.formEnquiryDetailsTxt.type(testData.maxCharsText)
      await contactDspPage.assertEnquiryDetailsCharCount(0)
    })
    await test.step('When I continue to type in the Enquiry Details Text Area', async () => {
      await contactDspPage.formEnquiryDetailsTxt.type('Continue to Type Test')
    })
    await test.step('Then no further text has been entered in the Enquiry Details Text Area', async () => {
      await contactDspPage.assertEnquiryDetailsCharCount(0)
      await contactDspPage.assertEnquiryDetailsContent(testData.maxCharsText)
    })
  })

  test('As a Non-Human user I cannot successfully submit the Form due to Honeypot approach- @frf_23_ac3', async ({
    contactDspPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactDspPage.enterValuesAllMandatory()
    })
    await test.step('And I have entered a value in the Hidden Honeypot field', async () => {
      await contactDspPage.enterValueAsSpamBot()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
    })
    await test.step('Then I am shown the Generic Error message at the top of the Page', async () => {
      await contactDspPage.assertValidationSummaryPresent(true)
      await contactDspPage.assertValidationSummaryHeading()
      await contactDspPage.assertGenericErrorMsg()
    })
    await test.step('And I remain on the Contact FRF Error page as the form was not submitted', async () => {
      await contactDspPage.assertOnContactDspErrorPage('Genomic Profile Register')
    })
  })
})
