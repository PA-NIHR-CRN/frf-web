import { test } from '../../../hooks/CustomFixtures'
import testData from '../../../utils/testData.json'

test.describe('Contact Research Support Form Validation Tests - @frf_32 @frf_32_validation', () => {
  test('As a user I am shown a Summary of Validation Errors, if Mandatory fields are incomplete - @frf_32_validation_summary', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactSupportPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains a `There is a problem` heading', async () => {
      await contactSupportPage.assertValidationSummaryHeading()
    })
    await test.step('And it contains the Expected Validation Message for Each Mandatory Field', async () => {
      await contactSupportPage.assertValidationSummaryMandatoryMessages()
    })
  })

  test('As a user when I click a Validation Summary Error Message, the Relevant field comes into Focus - @frf_32_validation_summary_links', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have triggered the display of the Validation Summary box', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('When I Click the Enquiry Validation Summary Message', async () => {
      await contactSupportPage.validationSummaryEnquiryError.click()
    })
    await test.step('Then the Data Services Enquiry Input has been focused', async () => {
      await contactSupportPage.assertValidationSummaryLinks('Enquiry')
    })
    await test.step('When I Click the Summary Support Validation Summary Message', async () => {
      await contactSupportPage.validationSummarySupportSummaryError.click()
    })
    await test.step('Then the Summary Support Input has been focused', async () => {
      await contactSupportPage.assertValidationSummaryLinks('Summary')
    })
    await test.step('When I Click the Job Role Validation Summary Message', async () => {
      await contactSupportPage.validationSummaryJobRoleError.click()
    })
    await test.step('Then the Job Role Input has been focused', async () => {
      await contactSupportPage.assertValidationSummaryLinks('Job')
    })
    await test.step('When I Click the Lead Region Validation Summary Message', async () => {
      await contactSupportPage.validationSummaryLeadRegionError.click()
    })
    await test.step('Then the Lead Region Input has been focused', async () => {
      await contactSupportPage.assertValidationSummaryLinks('Region')
    })
  })

  test('As a user I am shown Validation Errors above each relevant field, if Mandatory fields are incomplete - @frf_32_validation_individual', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactSupportPage.assertContactSupportFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then the Expected Validation Message appears above each Mandatory field', async () => {
      await contactSupportPage.assertValidationMandatoryFieldMessages()
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Telphone value - @frf_32_validation_phone', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactSupportPage.formTelephoneInput.type('02890T494')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactSupportPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone Field', async () => {
      await contactSupportPage.assertValidationSummaryTelephoneMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone field', async () => {
      await contactSupportPage.assertValidationTelephoneFieldMessagePresent(true)
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Email value - @frf_32_validation_email', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactSupportPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactSupportPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Email Field', async () => {
      await contactSupportPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Email field', async () => {
      await contactSupportPage.assertValidationEmailFieldMessagePresent(true)
    })
  })

  test('As a user when I correct Validation Errors, then the Error Messages Disappear Dynamically- @frf_32_validation_correction', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactSupportPage.formTelephoneInput.type('07700 900 982+')
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactSupportPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('And I have entered valid values for the remaining Mandatory Fields', async () => {
      await contactSupportPage.formEnquiryRadioButtonData.click()
      await contactSupportPage.formSummarySupportTxt.type('Testing Value')
      await contactSupportPage.formFullNameInput.type('Testing Name')
      await contactSupportPage.formJobRoleInput.type('Testing Job')
      await contactSupportPage.formOrgNameInput.type('Testing Org')
      await contactSupportPage.formOrgRadioButtonComm.click()
      await contactSupportPage.formResearchLeadDropdown.selectOption(contactSupportPage.researchLeadExampleOption)
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactSupportPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone & Email Fields', async () => {
      await contactSupportPage.assertValidationSummaryTelephoneMessagePresent(true)
      await contactSupportPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone & Email fields', async () => {
      await contactSupportPage.assertValidationTelephoneFieldMessagePresent(true)
      await contactSupportPage.assertValidationEmailFieldMessagePresent(true)
    })
    await test.step('When I then enter a valid Telephone value', async () => {
      await contactSupportPage.formTelephoneInput.clear()
      await contactSupportPage.formTelephoneInput.type('+44 808 157 0192')
    })
    await test.step('Then the Validation Message for Telephone disappears from the Summary box', async () => {
      await contactSupportPage.assertValidationSummaryTelephoneMessagePresent(false)
    })
    await test.step('And the Validation Message disappears from above the Telephone field', async () => {
      await contactSupportPage.assertValidationTelephoneFieldMessagePresent(false)
    })
    await test.step('When I then enter a valid Email value', async () => {
      await contactSupportPage.formEmailAddressInput.clear()
      await contactSupportPage.formEmailAddressInput.type('dummy.test@nihr.ac.uk')
    })
    await test.step('And the Validation Summary box no longer appears at the top of the form', async () => {
      await contactSupportPage.assertValidationSummaryPresent(false)
    })
    await test.step('And the Validation Message disappears from above the Email field', async () => {
      await contactSupportPage.assertValidationEmailFieldMessagePresent(false)
    })
  })

  test('As a user I cannot exceed the 1200 character limit on the Summary Support field - @frf_32_validation_max_chars', async ({
    contactSupportPage,
  }) => {
    test.setTimeout(45000)
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered 1200 characters in the Summary Support Text Field', async () => {
      await contactSupportPage.formSummarySupportTxt.type(testData.maxCharsText)
      await contactSupportPage.assertSupportSummaryCharCount(0)
    })
    await test.step('When I continue to type in the Summary Support Text Field', async () => {
      await contactSupportPage.formSummarySupportTxt.type('Continue to Type Test')
    })
    await test.step('Then no further text has been entered in the Summary Support Text Field', async () => {
      await contactSupportPage.assertSupportSummaryCharCount(0)
      await contactSupportPage.assertSupportSummaryContent(testData.maxCharsText)
    })
  })

  test('As a Non-Human user I cannot successfully submit the Form due to Honeypot approach- @frf_32_ac3', async ({
    contactSupportPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactSupportPage.enterValuesAllMandatory()
    })
    await test.step('And I have entered a value in the Hidden Honeypot field', async () => {
      await contactSupportPage.enterValueAsSpamBot()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then I am shown the Generic Error message at the top of the Page', async () => {
      await contactSupportPage.assertValidationSummaryPresent(true)
      await contactSupportPage.assertValidationSummaryHeading()
      await contactSupportPage.assertGenericErrorMsg()
    })
    await test.step('And I remain on the Contact Support Error page as the form was not submitted', async () => {
      await contactSupportPage.assertOnContactSupportErrorPage()
    })
  })
})
