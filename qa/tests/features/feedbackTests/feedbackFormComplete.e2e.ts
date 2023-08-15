import { test } from '../../../hooks/CustomFixtures'

test.describe('Feedback Form Complete Tests - @frf_8', () => {
  test('As a user I am shown a Confirmation Page, when I successfully complete the Form - @frf_8_success', async ({
    feedbackFormPage,
    feedbackFormConfirmationPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And I have entered valid values in each of the Form fields', async () => {
      await feedbackFormPage.enterAllFieldValues()
    })
    await test.step('When I Click the Submit Button', async () => {
      await feedbackFormPage.formSubmitButton.click()
    })
    await test.step('Then I am redirected to a Confirmation Page with a `Thank you` header', async () => {
      await feedbackFormConfirmationPage.assertOnFeedbackConfirmationPage()
    })
    await test.step('And the Confirmation Page has a Text block explaining follow up Actions ', async () => {
      await feedbackFormConfirmationPage.assertFeedbackPageTextBlock()
    })
    await test.step('And the Confirmation Page has a Button to return to the Home Page', async () => {
      await feedbackFormConfirmationPage.assertContainsHomePageButton()
    })
  })

  test('As a user I can navigate from the Confirmation Page to the Home Page, using the button Provided - @frf_8_homepage', async ({
    feedbackFormConfirmationPage,
    homePage,
  }) => {
    await test.step('Given I am on the Feedback Page', async () => {
      await feedbackFormConfirmationPage.goto()
      await feedbackFormConfirmationPage.assertOnFeedbackConfirmationPage()
    })
    await test.step('When I Click the Return to homepage Button provided', async () => {
      await feedbackFormConfirmationPage.assertContainsHomePageButton()
      await feedbackFormConfirmationPage.returnToHomePageButton.click()
    })
    await test.step('Then I am taken to the Home Page', async () => {
      await homePage.assertOnHomePage()
    })
  })
})
