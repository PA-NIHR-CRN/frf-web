import { test } from '../../../hooks/CustomFixtures'

test.describe('Contact DSP Form Complete Tests - @frf_29', () => {
  test('As a user I am shown a Confirmation Page, when I successfully complete the Form - @frf_29_success', async ({
    contactDspPage,
    contactDspConfirmationPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactDspPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
      await contactDspConfirmationPage.goto('genomic-profile-register')
    })
    await test.step('Then I am redirected to a Confirmation Page with a `Thank you` header', async () => {
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('And the Confirmation Page has a Text block explaining follow up Actions ', async () => {
      await contactDspConfirmationPage.assertConfirmationPageTextBlock('Genomic Profile Register')
    })
    await test.step('And the Confirmation Page Text Block has a Link to the Feedback page', async () => {
      await contactDspConfirmationPage.assertContainsFeedbackLink()
    })
    await test.step('And the Confirmation Page has a Button to return to the Home Page', async () => {
      await contactDspConfirmationPage.assertContainsHomePageButton()
    })
  })

  test('As a user I am shown a Confirmation Page with a formatted enquiry Reference Number - @frf_29_ref_format', async ({
    contactDspPage,
    contactDspConfirmationPage,
  }) => {
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactDspPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
      await contactDspConfirmationPage.goto('genomic-profile-register')
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('And the Confirmation Page has a Reference Number in a DXXXXX Format', async () => {
      await contactDspConfirmationPage.assertEnquiryRefNoFormat()
    })
  })

  test('The Contact DSP Reference Number increments with each form Submission- @frf_29_ref_increment', async ({
    contactDspPage,
    contactDspConfirmationPage,
  }) => {
    let firstRefNo: string | undefined
    let secondRefNo: string | undefined
    await test.step('Given I have navigated to a Contact DSP Page', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
    })
    await test.step('And I have entered valid values in each of the Mandatory fields', async () => {
      await contactDspPage.enterValuesAllMandatory()
    })
    await test.step('When I Click the Submit Button', async () => {
      await contactDspPage.formSubmitButton.click()
      await contactDspConfirmationPage.goto('genomic-profile-register')
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('And the Confirmation Page has a Reference Number in a DXXXXX Format', async () => {
      await contactDspConfirmationPage.assertEnquiryRefNoFormat()
      firstRefNo = await contactDspConfirmationPage.getEnquiryRefNoString()
    })
    await test.step('When I re-submit the Contact DSP Form', async () => {
      await contactDspPage.goto('/contact-data-service-provider/genomic-profile-register')
      await contactDspPage.assertOnContactDspPage('Genomic Profile Register')
      await contactDspPage.enterValuesAllMandatory()
      await contactDspPage.formSubmitButton.click()
      await contactDspConfirmationPage.gotoAlt()
    })
    await test.step('Then I am redirected to the Confirmation Page', async () => {
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('And is has an incremented Reference Number', async () => {
      await contactDspConfirmationPage.assertEnquiryRefNoFormat()
      secondRefNo = await contactDspConfirmationPage.getEnquiryRefNoString()
      await contactDspConfirmationPage.assertEnquiryRefNoIncrements(firstRefNo, secondRefNo)
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Feedback Form, using the link Provided - @frf_29_feedback', async ({
    contactDspConfirmationPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I am on a Contact DSP Page', async () => {
      await contactDspConfirmationPage.goto('genomic-profile-register')
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('When I Click the Feedback Link provided', async () => {
      await contactDspConfirmationPage.assertContainsFeedbackLink()
      await contactDspConfirmationPage.txtBlockFeedbackLink.click()
    })
    await test.step('Then I am taken to the Feedback Form Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Home Page, using the button Provided - @frf_29_homepage', async ({
    contactDspConfirmationPage,
    homePage,
  }) => {
    await test.step('Given I am on a Contact DSP Page', async () => {
      await contactDspConfirmationPage.goto('genomic-profile-register')
      await contactDspConfirmationPage.assertOnContactDspConfirmationPage('genomic-profile-register')
    })
    await test.step('When I Click the Return to homepage Button provided', async () => {
      await contactDspConfirmationPage.assertContainsHomePageButton()
      await contactDspConfirmationPage.returnToHomePageButton.click()
    })
    await test.step('Then I am taken to the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })
})
