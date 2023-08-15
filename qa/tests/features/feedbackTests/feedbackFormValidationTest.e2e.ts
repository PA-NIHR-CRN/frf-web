import { test } from '../../../hooks/CustomFixtures'
import testData from '../../../utils/testData.json'

test.describe('Feedback Form Validation Tests - @frf_2', () => {
  test('As a user I am shown a Summary of Validation Errors, if Mandatory fields are incomplete - @frf_2_validation_summary', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await feedbackFormPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains a `There is a problem` heading', async () => {
      await feedbackFormPage.assertValidationSummaryHeading()
    })
    await test.step('And it contains the Expected Validation Message for Each Mandatory Field', async () => {
      await feedbackFormPage.assertValidationSummaryMandatoryMessages(true)
    })
  })

  test('As a user I am shown Validation Errors above each relevant field, if Mandatory fields are incomplete - @frf_2_validation_individual', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have not entered any values in the Mandatory fields', async () => {
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then the Expected Validation Message appears above each Mandatory field', async () => {
      await feedbackFormPage.assertValidationMandatoryFieldMessages(true)
    })
  })

  test('As a user I am shown a Validation Error if I enter an invalid Email value - @frf_2_validation_email', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await feedbackFormPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await feedbackFormPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Email Field', async () => {
      await feedbackFormPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Email field', async () => {
      await feedbackFormPage.assertValidationEmailFieldMessagePresent(true)
    })
  })

  test('As a user when I click a Validation Summary Error Message, the Relevant field comes into Focus - @frf_2_validation_summary_links', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have triggered the display of the Validation Summary box', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.formEmailAddressInput.type('this.isnotright.com')
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('When I Click the Helpful Selection Validation Summary Message', async () => {
      await feedbackFormPage.validationSummaryHelpfulSelectError.click()
    })
    await test.step('Then the Very Helpful Input has been focused', async () => {
      await feedbackFormPage.assertValidationSummaryLinks('Helpful')
    })
    await test.step('When I Click the Email Validation Summary Message', async () => {
      await feedbackFormPage.validationSummaryEmailError.click()
    })
    await test.step('Then the Email Address Input has been focused', async () => {
      await feedbackFormPage.assertValidationSummaryLinks('Email')
    })
  })

  test('As a user when I correct Validation Errors, then the Error Messages Disappear Dynamically- @frf_2_validation_correction', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have entered an invalid Email value', async () => {
      await feedbackFormPage.formEmailAddressInput.type('this.isnotright.com')
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then a Validation Summary box appears at the top of the form', async () => {
      await feedbackFormPage.assertValidationSummaryPresent(true)
    })
    await test.step('And it contains the Expected Validation Message for the Helpful Select & Email Fields', async () => {
      await feedbackFormPage.assertValidationSummaryMandatoryMessages(true)
      await feedbackFormPage.assertValidationSummaryEmailMessagePresent(true)
    })
    await test.step('And the Expected Validation Message appears above the Helpful Select & Email fields', async () => {
      await feedbackFormPage.assertValidationMandatoryFieldMessages(true)
      await feedbackFormPage.assertValidationEmailFieldMessagePresent(true)
    })
    await test.step('When I then enter a Helpful Select Input', async () => {
      await feedbackFormPage.formHelpfulRadioButtonSomewhat.click()
    })
    await test.step('Then the Validation Message for Helpful Select disappears from the Summary box', async () => {
      await feedbackFormPage.assertValidationSummaryMandatoryMessages(false)
    })
    await test.step('And the Validation Message disappears from above the Helpful Select field', async () => {
      await feedbackFormPage.assertValidationMandatoryFieldMessages(false)
    })
    await test.step('When I then enter a valid Email value', async () => {
      await feedbackFormPage.formEmailAddressInput.clear()
      await feedbackFormPage.formEmailAddressInput.type('dummy.test@nihr.ac.uk')
    })
    await test.step('And the Validation Summary box no longer appears at the top of the form', async () => {
      await feedbackFormPage.assertValidationSummaryPresent(false)
    })
    await test.step('And the Validation Message disappears from above the Email field', async () => {
      await feedbackFormPage.assertValidationEmailFieldMessagePresent(false)
    })
  })

  test('As a user I cannot exceed the 1200 character limit on the Any Other Feedback Text Area - @frf_2_validation_max_chars', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have entered 1200 characters in the Summary Support Text Field', async () => {
      await feedbackFormPage.formOtherFeedbackTxt.type(testData.maxCharsText)
      await feedbackFormPage.assertOtherFeedbackCharCount(0)
    })
    await test.step('When I continue to type in the Any Other Feedback Text Area', async () => {
      await feedbackFormPage.formOtherFeedbackTxt.type('Continue to Type Test')
    })
    await test.step('Then no further text has been entered in the Any Other Feedback Text Area', async () => {
      await feedbackFormPage.assertOtherFeedbackCharCount(0)
      await feedbackFormPage.assertOtherFeedbackContent(testData.maxCharsText)
    })
  })

  test('As a Non-Human user I cannot successfully submit the Feedback Form due to Honeypot approach- @frf_2_ac4', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have entered valid values in each of the Form fields', async () => {
      await feedbackFormPage.enterAllFieldValues()
    })
    await test.step('And I have entered a value in the Hidden Honeypot field', async () => {
      await feedbackFormPage.enterValueAsSpamBot()
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then I am shown the Generic Error message at the top of the Page', async () => {
      await feedbackFormPage.assertValidationSummaryPresent(true)
      await feedbackFormPage.assertValidationSummaryHeading()
      await feedbackFormPage.assertGenericErrorMsg()
    })
    await test.step('And I remain on the Feedback Error page as the form was not submitted', async () => {
      await feedbackFormPage.assertOnFeedbackErrorPage()
    })
  })
})
