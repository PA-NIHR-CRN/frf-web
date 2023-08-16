import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact FRF Form Complete Tests - @frf_39', () => {
  test('As a user I am shown a Confirmation Page, when I successfully complete the Form - @frf_39_success', async ({
    contactFrfPage,
    contactFrfConfirmationPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactFrfPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
      await contactFrfConfirmationPage.goto()
    })
    await test.step('Then I am redirected to a Confirmation Page with a `Thank you` header', async () => {
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Text block explaining follow up Actions ', async () => {
      await contactFrfConfirmationPage.assertConfirmationPageTextBlock()
    })
    await test.step('And the Confirmation Page Text Block has a Link to the Feedback page', async () => {
      await contactFrfConfirmationPage.assertContainsFeedbackLink()
    })
    await test.step('And the Confirmation Page has a Button to return to the Home Page', async () => {
      await contactFrfConfirmationPage.assertContainsHomePageButton()
    })
  })

  test('As a user I am shown a Confirmation Page with a formatted enquiry Reference Number - @frf_39_ref_format', async ({
    contactFrfPage,
    contactFrfConfirmationPage,
  }) => {
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactFrfPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
      await contactFrfConfirmationPage.goto()
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Reference Number in a CXXXXX Format', async () => {
      await contactFrfConfirmationPage.assertEnquiryRefNoFormat()
    })
  })

  test('The Contact FRF Reference Number increments with each form Submission- @frf_39_ref_increment', async ({
    contactFrfPage,
    contactFrfConfirmationPage,
  }) => {
    let firstRefNo: string | undefined
    let secondRefNo: string | undefined
    await test.step('Given I have navigated to the Contact FRF Page', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactFrfPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactFrfPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to a Confirmation Page', async () => {
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Reference Number in a CXXXXX Format', async () => {
      await contactFrfConfirmationPage.assertEnquiryRefNoFormat()
      firstRefNo = await contactFrfConfirmationPage.getEnquiryRefNoString()
    })
    await test.step('When I re-submit the Contact Research Support Form', async () => {
      await contactFrfPage.goto()
      await contactFrfPage.assertOnContactFrfPage()
      await contactFrfPage.enterValuesAllMandatory()
      await contactFrfPage.formSubmitButton.click()
      await contactFrfConfirmationPage.gotoAlt()
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('And is has an incremented Reference Number', async () => {
      await contactFrfConfirmationPage.assertEnquiryRefNoFormat()
      secondRefNo = await contactFrfConfirmationPage.getEnquiryRefNoString()
      await contactFrfConfirmationPage.assertEnquiryRefNoIncrements(firstRefNo, secondRefNo)
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Feedback Form, using the link Provided - @frf_39_feedback', async ({
    contactFrfConfirmationPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I am on the Contact Support Page', async () => {
      await contactFrfConfirmationPage.goto()
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('When I Click the Feedback Link provided', async () => {
      await contactFrfConfirmationPage.assertContainsFeedbackLink()
      await contactFrfConfirmationPage.txtBlockFeedbackLink.click()
    })
    await test.step('Then I am taken to the Feedback Form Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Home Page, using the button Provided - @frf_39_homepage', async ({
    contactFrfConfirmationPage,
    homePage,
  }) => {
    await test.step('Given I am on the Contact Support Page', async () => {
      await contactFrfConfirmationPage.goto()
      await contactFrfConfirmationPage.assertOnContactFrfConfirmationPage()
    })
    await test.step('When I Click the Return to homepage Button provided', async () => {
      await contactFrfConfirmationPage.assertContainsHomePageButton()
      await contactFrfConfirmationPage.returnToHomePageButton.click()
    })
    await test.step('Then I am taken to the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })
})
