import { test } from '../../../hooks/CustomFixtures'
import testData from '../../../utils/testData.json'

test.describe('Contact FRF Form Validation Tests - @frf_75 @frf_75_validation', () => {
  test('As a user I am shown a Summary of Validation Errors, if Mandatory fields are incomplete - @frf_75_validation_summary', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactFrfPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains a `There is a problem` heading', async () => {
      await contactFrfPage.assertValidationSummaryHeading()
    })
    await test.step('And it contains the Expected Validation Message for Each Mandatory Field', async () => {
      await contactFrfPage.assertValidationSummaryMandatoryMessages()
    })
  })

  test('As a user when I click a Validation Summary Error Message, the Relevant field comes into Focus - @frf_75_validation_summary_links', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have triggered the display of the Validation Summary box', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('When I Click the Enquiry Details Validation Summary Message', async () => {
      await contactFrfPage.validationSummaryEnquiryDetailsError.click()
    })
    await test.step('Then the Enquiry Details Text Area has been focused', async () => {
      await contactFrfPage.assertValidationSummaryLinks('Enquiry')
    })
    await test.step('When I Click the Full Name Validation Summary Message', async () => {
      await contactFrfPage.validationSummaryNameError.click()
    })
    await test.step('Then the Full Name Input has been focused', async () => {
      await contactFrfPage.assertValidationSummaryLinks('Name')
    })
    await test.step('When I Click the Organisation Name Validation Summary Message', async () => {
      await contactFrfPage.validationSummaryOrgNameError.click()
    })
    await test.step('Then the Organisation Name Input has been focused', async () => {
      await contactFrfPage.assertValidationSummaryLinks('Org')
    })
  })

  test('As a user I am shown Validation Errors above each relevant field, if Mandatory fields are incomplete - @frf_75_validation_individual', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await contactFrfPage.assertContactFrfFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then the Expected Validation Message appears above each Mandatory field', async () => {
      await contactFrfPage.assertValidationMandatoryFieldMessages()
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Telphone value - @frf_75_validation_phone', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactFrfPage.formTelephoneInput.type('02890T494')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactFrfPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone Field', async () => {
      await contactFrfPage.assertValidationSummaryTelephoneMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone field', async () => {
      await contactFrfPage.assertValidationTelephoneFieldMessagePresent(true)
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Email value - @frf_75_validation_email', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactFrfPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactFrfPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Email Field', async () => {
      await contactFrfPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Email field', async () => {
      await contactFrfPage.assertValidationEmailFieldMessagePresent(true)
    })
  })

  test('As a user when I correct Validation Errors, then the Error Messages Disappear Dynamically- @frf_75_validation_correction', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered an invalid Telephone value', async () => {
      await contactFrfPage.formTelephoneInput.type('07700 900 982+')
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await contactFrfPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('And I have entered valid values for the remaining Mandatory Fields', async () => {
      await contactFrfPage.formFullNameInput.type('Testing Name')
      await contactFrfPage.formJobRoleInput.type('Testing Job')
      await contactFrfPage.formOrgNameInput.type('Testing Org')
      await contactFrfPage.formEnquiryDetailsTxt.type('Testing Contact FRF Value')
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await contactFrfPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Telephone & Email Fields', async () => {
      await contactFrfPage.assertValidationSummaryTelephoneMessagePresent(true)
      await contactFrfPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Telephone & Email fields', async () => {
      await contactFrfPage.assertValidationTelephoneFieldMessagePresent(true)
      await contactFrfPage.assertValidationEmailFieldMessagePresent(true)
    })
    await test.step('When I then enter a valid Telephone value', async () => {
      await contactFrfPage.formTelephoneInput.clear()
      await contactFrfPage.formTelephoneInput.type('+44 808 157 0192')
    })
    await test.step('Then the Validation Message for Telephone disappears from the Summary box', async () => {
      await contactFrfPage.assertValidationSummaryTelephoneMessagePresent(false)
    })
    await test.step('And the Validation Message disappears from above the Telephone field', async () => {
      await contactFrfPage.assertValidationTelephoneFieldMessagePresent(false)
    })
    await test.step('When I then enter a valid Email value', async () => {
      await contactFrfPage.formEmailAddressInput.clear()
      await contactFrfPage.formEmailAddressInput.type('dummy.test@nihr.ac.uk')
    })
    await test.step('And the Validation Summary box no longer appears at the top of the form', async () => {
      await contactFrfPage.assertValidationSummaryPresent(false)
    })
    await test.step('And the Validation Message disappears from above the Email field', async () => {
      await contactFrfPage.assertValidationEmailFieldMessagePresent(false)
    })
  })

  test('As a user I cannot exceed the 1200 character limit on the Enquiry Details Text Area - @frf_75_validation_max_chars', async ({
    contactFrfPage,
  }) => {
    test.setTimeout(45000)
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered 1200 characters in the Enquiry Details Text Area', async () => {
      await contactFrfPage.formEnquiryDetailsTxt.type(testData.maxCharsText)
      await contactFrfPage.assertEnquiryDetailsCharCount(0)
    })
    await test.step('When I continue to type in the Enquiry Details Text Area', async () => {
      await contactFrfPage.formEnquiryDetailsTxt.type('Continue to Type Test')
    })
    await test.step('Then no further text has been entered in the Enquiry Details Text Area', async () => {
      await contactFrfPage.assertEnquiryDetailsCharCount(0)
      await contactFrfPage.assertEnquiryDetailsContent(testData.maxCharsText)
    })
  })

  test('As a Non-Human user I cannot successfully submit the Form due to Honeypot approach- @frf_75_ac3', async ({
    contactFrfPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactFrfPage.enterValuesAllMandatory()
    })
    await test.step('And I have entered a value in the Hidden Honeypot field', async () => {
      await contactFrfPage.enterValueAsSpamBot()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then I am shown the Generic Error message at the top of the Page', async () => {
      await contactFrfPage.assertValidationSummaryPresent(true)
      await contactFrfPage.assertValidationSummaryHeading()
      await contactFrfPage.assertGenericErrorMsg()
    })
    await test.step('And I remain on the Contact FRF Error page as the form was not submitted', async () => {
      await contactFrfPage.assertOnContactFrfErrorPage()
    })
  })
})
