import { test } from '../../../hooks/CustomFixtures'

test.describe('Feedback Form Tests - @frf_2', () => {
  test('As a user I have access to the Feedback Form via the Home Page - @frf_2_nav_banner', async ({
    homePage,
    commonItemsPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Home Page', async () => {
      await homePage.goto()
    })
    await test.step('When I Click the Feedback link in the banner', async () => {
      await commonItemsPage.linkFeedback.click()
    })
    await test.step('Then I am on the Feedback Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And the Feedback Form is present', async () => {
      await feedbackFormPage.assertFeedbackFormPresent()
    })
  })

  test('As a user I have access to the Feedback Form via the Site Menu - @frf_2_nav_menu', async ({
    homePage,
    commonItemsPage,
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I open the Site Menu', async () => {
      await commonItemsPage.btnClosedSiteMenu.click()
    })
    await test.step('And I Click the Provide feedback link', async () => {
      await commonItemsPage.linkSiteMenuFeedback.click()
    })
    await test.step('Then I am on the Feedback Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
    })
    await test.step('And the Feedback Form is present', async () => {
      await feedbackFormPage.assertFeedbackFormPresent()
    })
  })

  test('As a user I see Introductory Text above the Feedback Form - @frf_2_ac1_intro', async ({ feedbackFormPage }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
    })
    await test.step('When I View the Feedback Page', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('Then the Page will contain the Expected Introductory Text', async () => {
      await feedbackFormPage.assertIntroText()
    })
  })

  test('The Feedback Form contains a `How helpful was the Site` Radio button selection - @frf_2_ac1_radio_buttons', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
    })
    await test.step('When I View the Feedback Form', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('Then the Form will have a `How helpful was the website?` header', async () => {
      await feedbackFormPage.assertHelpfulHeaderPresent()
    })
    await test.step('And the directly beneath it will have 4 Radio button inputs', async () => {
      await feedbackFormPage.assertHelpfulRadioGroupPresent()
    })
    await test.step('And the 4 Radio button inputs will have the expected values', async () => {
      await feedbackFormPage.assertHelpfulRadioGroupValues()
    })
  })

  test('The Feedback Form contains a Text Area for further detailed feedback - @frf_2_ac1_text_area', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
    })
    await test.step('When I View the Feedback Form', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('Then the Form will have an Optional `any other feedback` Text Area with Character Limit', async () => {
      await feedbackFormPage.assertOtherFeedbackTxtArea()
    })
    await test.step('And the Character Count will reduce as I type in the Text Area', async () => {
      await feedbackFormPage.formOtherFeedbackTxt.type('T')
      await feedbackFormPage.assertOtherFeedbackCharCount(1199)
      await feedbackFormPage.formOtherFeedbackTxt.type('E')
      await feedbackFormPage.assertOtherFeedbackCharCount(1198)
      await feedbackFormPage.formOtherFeedbackTxt.type('S')
      await feedbackFormPage.assertOtherFeedbackCharCount(1197)
      await feedbackFormPage.formOtherFeedbackTxt.type('T')
      await feedbackFormPage.assertOtherFeedbackCharCount(1196)
    })
  })

  test('The Feedback Form contains an Optional Contact Details section - @frf_2_ac1_contact', async ({
    feedbackFormPage,
  }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
    })
    await test.step('When I View the Feedback Form', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('Then the form will have an Optional `Full name` input', async () => {
      await feedbackFormPage.assertFullNamePresent()
    })
    await test.step('And the form will have an Optional `Email address` input', async () => {
      await feedbackFormPage.assertEmailAddressPresent()
    })
    await test.step('And the form will have an Optional `Organisation name` input', async () => {
      await feedbackFormPage.assertOrgNamePresent()
    })
  })

  test('The Feedback Form has a Submit button - @frf_2_ac1_submit', async ({ feedbackFormPage }) => {
    await test.step('Given I have navigated to the Feedback Page', async () => {
      await feedbackFormPage.goto()
    })
    await test.step('When I View the Contact Research Support Form', async () => {
      await feedbackFormPage.assertOnFeedbackForm()
      await feedbackFormPage.assertFeedbackFormPresent()
    })
    await test.step('And the Form will have a Submit button', async () => {
      await feedbackFormPage.assertSubmitButtonPresent()
    })
  })
})
