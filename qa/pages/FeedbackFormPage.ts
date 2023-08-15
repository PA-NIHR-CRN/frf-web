import { expect, Locator, Page } from '@playwright/test'

import { convertPromiseStringToNumber } from '../utils/UtilFunctions'

//Declare Page Objects
export default class FeedbackFormPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly feedbackForm: Locator
  readonly feedbackFormIntroTxt: Locator
  readonly formHelpfulHeader: Locator
  readonly formHelpfulRadioButtonGroup: Locator
  readonly formHelpfulRadioButtonVery: Locator
  readonly formHelpfulRadioButtonSomewhat: Locator
  readonly formHelpfulRadioButtonNeither: Locator
  readonly formHelpfulRadioButtonNot: Locator
  readonly formHelpfulRadioButtonVeryLbl: Locator
  readonly formHelpfulRadioButtonSomewhatLbl: Locator
  readonly formHelpfulRadioButtonNeitherLbl: Locator
  readonly formHelpfulRadioButtonNotLbl: Locator
  readonly formOtherFeedbackLbl: Locator
  readonly formOtherFeedbackTxt: Locator
  readonly formOtherFeedbackGuideChars: Locator
  readonly formFullNameLbl: Locator
  readonly formFullNameInput: Locator
  readonly formEmailAddressLbl: Locator
  readonly formEmailAddressInput: Locator
  readonly formOrgNameLbl: Locator
  readonly formOrgNameInput: Locator
  readonly formSubmitButton: Locator
  readonly validationSummaryBox: Locator
  readonly validationSummaryHeading: Locator
  readonly validationSummaryList: Locator
  readonly validationSummaryHelpfulSelectError: Locator
  readonly validationSummaryEmailError: Locator
  readonly validationFieldHelpfulSelectError: Locator
  readonly validationFieldEmailError: Locator
  readonly formHiddenHoneyPotInput: Locator
  readonly genericErrorMsg: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
    this.feedbackForm = page.locator('form[action="/api/forms/feedback"]')
    this.feedbackFormIntroTxt = page.locator('div[class="govuk-grid-column-two-thirds-from-desktop"] p')
    this.formHelpfulHeader = page.locator('legend[class="govuk-fieldset__legend govuk-fieldset__legend--s"]', {
      hasText: 'How helpful was the Find, Recruit and Follow-up (FRF) website?',
    })
    this.formHelpfulRadioButtonGroup = this.formHelpfulHeader.locator('..').locator('div[data-module="govuk-radios"]')
    this.formHelpfulRadioButtonVery = page.locator('input[value="very-helpful"]')
    this.formHelpfulRadioButtonVeryLbl = page.locator('label[for="helpfulness"]')
    this.formHelpfulRadioButtonSomewhat = page.locator('input[value="somewhat-helpful"]')
    this.formHelpfulRadioButtonSomewhatLbl = page.locator('label[for="helpfulness-1"]')
    this.formHelpfulRadioButtonNeither = page.locator('input[value="neither-helpful-or-unhelpful"]')
    this.formHelpfulRadioButtonNeitherLbl = page.locator('label[for="helpfulness-2"]')
    this.formHelpfulRadioButtonNot = page.locator('input[value="not-at-all-helpful"]')
    this.formHelpfulRadioButtonNotLbl = page.locator('label[for="helpfulness-3"]')
    this.formOtherFeedbackLbl = page.locator('label[id="suggestions-label"]')
    this.formOtherFeedbackTxt = page.locator('textarea[id="suggestions"]')
    this.formOtherFeedbackGuideChars = page.locator('div[id="with-hint-info"]')
    this.formFullNameLbl = page.locator('label[id="fullName-label"]')
    this.formFullNameInput = page.locator('input[id="fullName"]')
    this.formEmailAddressLbl = page.locator('label[id="emailAddress-label"]')
    this.formEmailAddressInput = page.locator('input[id="emailAddress"]')
    this.formOrgNameLbl = page.locator('label[id="organisationName-label"]')
    this.formOrgNameInput = page.locator('input[id="organisationName"]')
    this.formSubmitButton = page.locator('button[data-module="govuk-button"]')
    this.validationSummaryBox = page.locator('div[class="govuk-error-summary"]')
    this.validationSummaryHeading = page.locator('h2[id="form-summary-errors"]')
    this.validationSummaryList = page.locator('ul[class="govuk-list govuk-error-summary__list"]')
    this.validationSummaryHelpfulSelectError = page.locator('a[href="#helpfulness"]')
    this.validationSummaryEmailError = page.locator('a[href="#emailAddress"]')
    this.validationFieldHelpfulSelectError = page.locator('p[id="helpfulness-error"]')
    this.validationFieldEmailError = page.locator('p[id="emailAddress-error"]')
    this.formHiddenHoneyPotInput = page.locator('input[name="workEmailAddress"]')
    this.genericErrorMsg = this.validationSummaryList.locator('li')
  }

  //Page Methods
  async goto() {
    await this.page.goto('feedback')
  }

  async assertOnFeedbackForm() {
    await expect(this.page).toHaveURL('feedback')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Let us know what you think')
  }

  async assertFeedbackFormPresent() {
    await expect(this.feedbackForm).toBeVisible()
  }

  async assertIntroText() {
    await expect(this.feedbackFormIntroTxt).toBeVisible()
    await expect(this.feedbackFormIntroTxt).toContainText(
      'The Find, Recruit and Follow-Up (FRF) website is new and we would appreciate your feedback.'
    )
  }

  async assertHelpfulHeaderPresent() {
    await expect(this.formHelpfulHeader).toBeVisible()
  }

  async assertHelpfulRadioGroupPresent() {
    await expect(this.formHelpfulRadioButtonGroup).toBeVisible()
    expect(await this.formHelpfulRadioButtonGroup.locator('div[class="govuk-radios__item"]').count()).toEqual(4)
  }

  async assertHelpfulRadioGroupValues() {
    await expect(this.formHelpfulRadioButtonVery).toBeVisible()
    await expect(this.formHelpfulRadioButtonSomewhat).toBeVisible()
    await expect(this.formHelpfulRadioButtonNeither).toBeVisible()
    await expect(this.formHelpfulRadioButtonNot).toBeVisible()
    await expect(this.formHelpfulRadioButtonVeryLbl).toHaveText('Very helpful')
    await expect(this.formHelpfulRadioButtonSomewhatLbl).toHaveText('Somewhat helpful')
    await expect(this.formHelpfulRadioButtonNeitherLbl).toHaveText('Neither helpful or unhelpful')
    await expect(this.formHelpfulRadioButtonNotLbl).toHaveText('Not at all helpful')
  }

  async assertOtherFeedbackTxtArea() {
    await expect(this.formOtherFeedbackLbl).toBeVisible()
    await expect(this.formOtherFeedbackTxt).toBeVisible()
    await expect(this.formOtherFeedbackGuideChars).toBeVisible()
    await expect(this.formOtherFeedbackLbl).toHaveText(
      'Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)'
    )
    await expect(this.formOtherFeedbackGuideChars).toHaveText('You have 1200 characters remaining')
  }

  async assertOtherFeedbackCharCount(expectedCount: number) {
    const charsGuideText = await this.formOtherFeedbackGuideChars.textContent()
    const charsNumberEndIndex = charsGuideText?.indexOf('characters')
    const currentCharsCount = convertPromiseStringToNumber(charsGuideText?.substring(8, charsNumberEndIndex))
    expect(currentCharsCount).toEqual(expectedCount)
  }

  async assertFullNamePresent() {
    await expect(this.formFullNameLbl).toBeVisible()
    await expect(this.formFullNameInput).toBeVisible()
    await expect(this.formFullNameLbl).toHaveText('Full name (optional)')
  }

  async assertEmailAddressPresent() {
    await expect(this.formEmailAddressLbl).toBeVisible()
    await expect(this.formEmailAddressInput).toBeVisible()
    await expect(this.formEmailAddressLbl).toHaveText('Email address (optional)')
  }

  async assertOrgNamePresent() {
    await expect(this.formOrgNameLbl).toBeVisible()
    await expect(this.formOrgNameInput).toBeVisible()
    await expect(this.formOrgNameLbl).toHaveText('Organisation name (optional)')
  }

  async assertSubmitButtonPresent() {
    await expect(this.formSubmitButton).toBeVisible()
  }

  async assertValidationSummaryPresent(visible: boolean) {
    if (visible) {
      await expect(this.validationSummaryBox).toBeVisible()
      await expect(this.validationSummaryList).toBeVisible()
    } else {
      await expect(this.validationSummaryBox).toBeHidden()
      await expect(this.validationSummaryList).toBeHidden()
    }
  }

  async assertValidationSummaryHeading() {
    await expect(this.validationSummaryHeading).toBeVisible()
    await expect(this.validationSummaryHeading).toHaveText('There is a problem')
  }

  async assertValidationSummaryMandatoryMessages(visible: boolean) {
    if (visible) {
      await expect(this.validationSummaryHelpfulSelectError).toBeVisible()
      await expect(this.validationSummaryHelpfulSelectError).toHaveText('Select how helpful you found the FRF website')
    } else {
      await expect(this.validationSummaryHelpfulSelectError).toBeHidden()
    }
  }

  async assertValidationSummaryLinks(field: string) {
    switch (field.toLowerCase()) {
      case 'helpful':
        await expect(this.formHelpfulRadioButtonVery).toBeFocused()
        break
      case 'email':
        await expect(this.formEmailAddressInput).toBeFocused()
        break
      default:
        throw new Error(`${field} is not a valid option`)
    }
  }

  async assertValidationMandatoryFieldMessages(visible: boolean) {
    if (visible) {
      await expect(this.validationFieldHelpfulSelectError).toBeVisible()
      await expect(this.validationFieldHelpfulSelectError).toContainText('Select how helpful you found the FRF website')
    } else {
      await expect(this.validationFieldHelpfulSelectError).toBeHidden()
    }
  }

  async assertValidationEmailFieldMessagePresent(visible: boolean) {
    if (visible) {
      await expect(this.validationFieldEmailError).toBeVisible()
      await expect(this.validationFieldEmailError).toContainText('Enter a valid email address')
    } else {
      await expect(this.validationFieldEmailError).toBeHidden()
    }
  }

  async assertValidationSummaryEmailMessagePresent(visible: boolean) {
    if (visible) {
      await expect(this.validationSummaryEmailError).toBeVisible()
      await expect(this.validationSummaryEmailError).toHaveText('Enter a valid email address')
    } else {
      await expect(this.validationSummaryEmailError).toBeHidden()
    }
  }

  async assertOtherFeedbackContent(expectedTextContent: string) {
    expect(await this.formOtherFeedbackTxt.inputValue()).toEqual(expectedTextContent)
  }

  async enterAllFieldValues() {
    await this.formHelpfulRadioButtonVery.click()
    await this.formOtherFeedbackTxt.type('Testing Other Feedback Value')
    await this.formFullNameInput.type('Testing Name')
    await this.formEmailAddressInput.type('chris.mcneill@nihr.ac.uk')
    await this.formOrgNameInput.type('Testing Org')
  }

  async enterValueAsSpamBot() {
    await this.formHiddenHoneyPotInput.type('spam@bot.com')
    console.log(await this.formHiddenHoneyPotInput.inputValue())
  }

  async assertGenericErrorMsg() {
    await this.page.pause()
    await expect(this.genericErrorMsg).toBeVisible()
    await expect(this.genericErrorMsg).toHaveText(
      'An unexpected error occured whilst processing the form, please try again later.'
    )
  }

  async assertOnFeedbackErrorPage() {
    await expect(this.page).toHaveURL('feedback?fatal=1')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Let us know what you think')
  }
}
