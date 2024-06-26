import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact Research Support Form Complete Tests - @frf_68', () => {
  test('As a user I am shown a Confirmation Page, when I successfully complete the Form - @frf_68_success', async ({
    contactSupportPage,
    contactSupportConfirmationPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactSupportPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to a Confirmation Page with a `Thank you` header', async () => {
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Text block explaining follow up Actions ', async () => {
      await contactSupportConfirmationPage.assertConfirmationPageTextBlock()
    })
    await test.step('And the Confirmation Page Text Block has a Link to the Feedback page', async () => {
      await contactSupportConfirmationPage.assertContainsFeedbackLink()
    })
    await test.step('And the Confirmation Page has a Button to return to the Home Page', async () => {
      await contactSupportConfirmationPage.assertContainsHomePageButton()
    })
  })

  test('As a user I am shown a Confirmation Page with a formatted enquiry Reference Number - @frf_68_ref_format', async ({
    contactSupportPage,
    contactSupportConfirmationPage,
  }) => {
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactSupportPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Reference Number in a RXXXXX Format', async () => {
      await contactSupportConfirmationPage.assertEnquiryRefNoFormat()
    })
  })

  test('The Contact Research Support Reference Number increments with each form Submission- @frf_68_ref_increment', async ({
    contactSupportPage,
    contactSupportConfirmationPage,
  }) => {
    let firstRefNo: string | undefined
    let secondRefNo: string | undefined
    await test.step('Given I have navigated to the Contact Support Page', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactSupportPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to a Confirmation Page', async () => {
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Reference Number in a RXXXXX Format', async () => {
      await contactSupportConfirmationPage.assertEnquiryRefNoFormat()
      firstRefNo = await contactSupportConfirmationPage.getEnquiryRefNoString()
    })
    await test.step('When I re-submit the Contact Research Support Form', async () => {
      await contactSupportPage.goto()
      await contactSupportPage.assertOnContactSupportPage()
      await contactSupportPage.enterValuesAllMandatory()
      await contactSupportPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('And is has an incremented Reference Number', async () => {
      await contactSupportConfirmationPage.assertEnquiryRefNoFormat()
      secondRefNo = await contactSupportConfirmationPage.getEnquiryRefNoString()
      await contactSupportConfirmationPage.assertEnquiryRefNoIncrements(firstRefNo, secondRefNo)
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Feedback Form, using the link Provided - @frf_68_feedback', async ({
    contactSupportConfirmationPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I am on the Contact Research Support Confirmation Page', async () => {
      await contactSupportConfirmationPage.goto()
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('When I Click the Feedback Link provided', async () => {
      await contactSupportConfirmationPage.assertContainsFeedbackLink()
      await contactSupportConfirmationPage.txtBlockFeedbackLink.click()
    })
    await test.step('Then I am taken to the Feedback Form Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Home Page, using the button Provided - @frf_68_homepage', async ({
    contactSupportConfirmationPage,
    homePage,
  }) => {
    await test.step('Given I am on the Contact Research Support Confirmation Page', async () => {
      await contactSupportConfirmationPage.goto()
      await contactSupportConfirmationPage.assertOnContactSupportConfirmationPage()
    })
    await test.step('When I Click the Return to homepage Button provided', async () => {
      await contactSupportConfirmationPage.assertContainsHomePageButton()
      await contactSupportConfirmationPage.returnToHomePageButton.click()
    })
    await test.step('Then I am taken to the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })
})
