import { expect, Locator, Page } from '@playwright/test'

import { convertPromiseStringToNumber } from '../utils/UtilFunctions'

//Declare Page Objects
export default class ContactFrfPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly contactFrfForm: Locator
  readonly contactFrfFormTxtBlocks: Locator
  readonly formEnquiryDetailsLbl: Locator
  readonly formEnquiryDetailsTxt: Locator
  readonly formEnquiryDetailsGuideChars: Locator
  readonly formFullNameLbl: Locator
  readonly formFullNameInput: Locator
  readonly formEmailAddressLbl: Locator
  readonly formEmailAddressInput: Locator
  readonly formTelephoneLbl: Locator
  readonly formTelephoneInput: Locator
  readonly formJobRoleLbl: Locator
  readonly formJobRoleInput: Locator
  readonly formOrgNameLbl: Locator
  readonly formOrgNameInput: Locator
  readonly formEmailCopyTxt: Locator
  readonly formSubmitButton: Locator
  readonly formHiddenHoneyPotInput: Locator
  readonly validationSummaryBox: Locator
  readonly validationSummaryHeading: Locator
  readonly validationSummaryList: Locator
  readonly validationSummaryEnquiryDetailsError: Locator
  readonly validationSummarySupportSummaryError: Locator
  readonly validationSummaryNameError: Locator
  readonly validationSummaryEmailError: Locator
  readonly validationSummaryJobRoleError: Locator
  readonly validationSummaryOrgNameError: Locator
  readonly validationFieldNameError: Locator
  readonly validationFieldEmailError: Locator
  readonly validationFieldJobRoleError: Locator
  readonly validationFieldOrgNameError: Locator
  readonly validationFieldEnquiryDetailsError: Locator
  readonly validationFieldTelephoneError: Locator
  readonly validationSummaryTelephoneError: Locator
  readonly genericErrorMsg: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
    this.contactFrfForm = page.locator('form[action="/api/forms/contact-frf-team"]')
    this.contactFrfFormTxtBlocks = page.locator('div[class="govuk-grid-column-two-thirds-from-desktop"] p')
    this.formEnquiryDetailsLbl = page.locator('label[id="details-label"]')
    this.formEnquiryDetailsTxt = page.locator('textarea[id="details"]')
    this.formEnquiryDetailsGuideChars = page.locator('div[id="with-hint-info"]')
    this.formFullNameLbl = page.locator('label[id="fullName-label"]')
    this.formFullNameInput = page.locator('input[id="fullName"]')
    this.formEmailAddressLbl = page.locator('label[id="emailAddress-label"]')
    this.formEmailAddressInput = page.locator('input[id="emailAddress"]')
    this.formTelephoneLbl = page.locator('label[id="phoneNumber-label"]')
    this.formTelephoneInput = page.locator('input[id="phoneNumber"]')
    this.formJobRoleLbl = page.locator('label[id="jobRole-label"]')
    this.formJobRoleInput = page.locator('input[id="jobRole"]')
    this.formOrgNameLbl = page.locator('label[id="organisationName-label"]')
    this.formOrgNameInput = page.locator('input[id="organisationName"]')
    this.formEmailCopyTxt = this.contactFrfForm.locator('p')
    this.formSubmitButton = page.locator('button[data-module="govuk-button"]')
    this.formHiddenHoneyPotInput = page.locator('input[name="workEmailAddress"]')
    this.validationSummaryBox = page.locator('div[class="govuk-error-summary"]')
    this.validationSummaryHeading = page.locator('h2[id="form-summary-errors"]')
    this.validationSummaryList = page.locator('ul[class="govuk-list govuk-error-summary__list"]')
    this.validationSummaryEnquiryDetailsError = page.locator('a[href="#details"]')
    this.validationSummarySupportSummaryError = page.locator('a[href="#supportDescription"]')
    this.validationSummaryNameError = page.locator('a[href="#fullName"]')
    this.validationSummaryEmailError = page.locator('a[href="#emailAddress"]')
    this.validationSummaryJobRoleError = page.locator('a[href="#jobRole"]')
    this.validationSummaryOrgNameError = page.locator('a[href="#organisationName"]')
    this.validationFieldNameError = page.locator('p[id="fullName-error"]')
    this.validationFieldEmailError = page.locator('p[id="emailAddress-error"]')
    this.validationFieldJobRoleError = page.locator('p[id="jobRole-error"]')
    this.validationFieldOrgNameError = page.locator('p[id="organisationName-error"]')
    this.validationFieldEnquiryDetailsError = page.locator('p[id="details-error"]')
    this.validationFieldTelephoneError = page.locator('p[id="phoneNumber-error"]')
    this.validationSummaryTelephoneError = page.locator('a[href="#phoneNumber"]')
    this.genericErrorMsg = this.validationSummaryList.locator('li')
  }

  //Page Methods
  async goto() {
    await this.page.goto('contact-frf-team')
  }

  async assertOnContactFrfPage() {
    await expect(this.page).toHaveURL('contact-frf-team')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Contact Find, Recruit and Follow-up central team')
  }

  async assertContactFrfFormPresent() {
    await expect(this.contactFrfForm).toBeVisible()
  }

  async assertIntroText() {
    await expect(this.contactFrfFormTxtBlocks.first()).toBeVisible()
    await expect(this.contactFrfFormTxtBlocks.first()).toContainText(
      'The Find, Recruit and Follow-up central team manage the content of this website'
    )
    await expect(this.contactFrfFormTxtBlocks.nth(1)).toContainText(
      'If you would like to get in touch with the team, please complete the form below'
    )
    await expect(this.contactFrfFormTxtBlocks.nth(2)).toHaveText('All fields are required unless marked as optional.')
  }

  async assertEnquiryDetails() {
    await expect(this.formEnquiryDetailsLbl).toBeVisible()
    await expect(this.formEnquiryDetailsTxt).toBeVisible()
    await expect(this.formEnquiryDetailsGuideChars).toBeVisible()
    await expect(this.formEnquiryDetailsLbl).toHaveText('Please provide details of your enquiry')
    await expect(this.formEnquiryDetailsGuideChars).toHaveText('You have 1200 characters remaining')
  }

  async assertEnquiryDetailsCharCount(expectedCount: number) {
    const charsGuideText = await this.formEnquiryDetailsGuideChars.textContent()
    const charsNumberEndIndex = charsGuideText?.indexOf('characters')
    const currentCharsCount = convertPromiseStringToNumber(charsGuideText?.substring(8, charsNumberEndIndex))
    expect(currentCharsCount).toEqual(expectedCount)
  }

  async assertFullNamePresent() {
    await expect(this.formFullNameLbl).toBeVisible()
    await expect(this.formFullNameInput).toBeVisible()
    await expect(this.formFullNameLbl).toHaveText('Full name')
  }

  async assertEmailAddressPresent() {
    await expect(this.formEmailAddressLbl).toBeVisible()
    await expect(this.formEmailAddressInput).toBeVisible()
    await expect(this.formEmailAddressLbl).toHaveText('Email address')
  }

  async assertTelephonePresent() {
    await expect(this.formTelephoneLbl).toBeVisible()
    await expect(this.formTelephoneInput).toBeVisible()
    await expect(this.formTelephoneLbl).toHaveText('Telephone (optional)')
  }

  async assertJobRolePresent() {
    await expect(this.formJobRoleLbl).toBeVisible()
    await expect(this.formJobRoleInput).toBeVisible()
    await expect(this.formJobRoleLbl).toHaveText('Job role')
  }

  async assertOrgNamePresent() {
    await expect(this.formOrgNameLbl).toBeVisible()
    await expect(this.formOrgNameInput).toBeVisible()
    await expect(this.formOrgNameLbl).toHaveText('Organisation name')
  }

  async assertEmailCopyTxtPresent() {
    await expect(this.formEmailCopyTxt).toBeVisible()
    await expect(this.formEmailCopyTxt).toHaveText('We will email you a copy of this form for your records')
  }

  async assertSubmitButtonPresent() {
    await expect(this.formSubmitButton).toBeVisible()
    await expect(this.formSubmitButton).toHaveText('Submit')
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

  async assertValidationSummaryMandatoryMessages() {
    await expect(this.validationSummaryNameError).toBeVisible()
    await expect(this.validationSummaryEmailError).toBeVisible()
    await expect(this.validationSummaryJobRoleError).toBeVisible()
    await expect(this.validationSummaryOrgNameError).toBeVisible()
    await expect(this.validationSummaryEnquiryDetailsError).toBeVisible()
    await expect(this.validationSummaryNameError).toHaveText('Enter your full name')
    await expect(this.validationSummaryEmailError).toHaveText('Enter a valid email address')
    await expect(this.validationSummaryJobRoleError).toHaveText('Enter your job role')
    await expect(this.validationSummaryOrgNameError).toHaveText(
      'Enter your organisation name, Local Clinical Research Network or Devolved Nation'
    )
    await expect(this.validationSummaryEnquiryDetailsError).toHaveText(
      'Enter a description of your study(ies) and/ or service(s) of interest'
    )
  }

  async assertValidationSummaryLinks(field: string) {
    switch (field.toLowerCase()) {
      case 'enquiry':
        await expect(this.formEnquiryDetailsTxt).toBeFocused()
        break
      case 'name':
        await expect(this.formFullNameInput).toBeFocused()
        break
      case 'org':
        await expect(this.formOrgNameInput).toBeFocused()
        break
      default:
        throw new Error(`${field} is not a valid option`)
    }
  }

  async assertValidationMandatoryFieldMessages() {
    await expect(this.validationFieldNameError).toBeVisible()
    await expect(this.validationFieldEmailError).toBeVisible()
    await expect(this.validationFieldJobRoleError).toBeVisible()
    await expect(this.validationFieldOrgNameError).toBeVisible()
    await expect(this.validationFieldEnquiryDetailsError).toBeVisible()
    await expect(this.validationFieldNameError).toContainText('Enter your full name')
    await expect(this.validationFieldEmailError).toContainText('Enter a valid email address')
    await expect(this.validationFieldJobRoleError).toContainText('Enter your job role')
    await expect(this.validationFieldOrgNameError).toContainText(
      'Enter your organisation name, Local Clinical Research Network or Devolved Nation'
    )
    await expect(this.validationFieldEnquiryDetailsError).toContainText(
      'Enter a description of your study(ies) and/ or service(s) of interest'
    )
  }

  async assertValidationTelephoneFieldMessagePresent(visible: boolean) {
    if (visible) {
      await expect(this.validationFieldTelephoneError).toBeVisible()
      await expect(this.validationFieldTelephoneError).toContainText(
        'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
      )
    } else {
      await expect(this.validationFieldTelephoneError).toBeHidden()
    }
  }

  async assertValidationSummaryTelephoneMessagePresent(visible: boolean) {
    if (visible) {
      await expect(this.validationSummaryTelephoneError).toBeVisible()
      await expect(this.validationSummaryTelephoneError).toHaveText(
        'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
      )
    } else {
      await expect(this.validationSummaryTelephoneError).toBeHidden()
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

  async enterValuesAllMandatory() {
    await this.formFullNameInput.type('Testing Name')
    await this.formEmailAddressInput.type('chris.mcneill@nihr.ac.uk')
    await this.formJobRoleInput.type('Testing Job')
    await this.formOrgNameInput.type('Testing Org')
    await this.formEnquiryDetailsTxt.type('Testing FRF Value')
  }

  async assertEnquiryDetailsContent(expectedTextContent: string) {
    expect(await this.formEnquiryDetailsTxt.inputValue()).toEqual(expectedTextContent)
  }

  async enterValueAsSpamBot() {
    await this.formHiddenHoneyPotInput.type('spam@bot.com')
  }

  async assertGenericErrorMsg() {
    await expect(this.genericErrorMsg).toBeVisible()
    await expect(this.genericErrorMsg).toHaveText(
      'An unexpected error occured whilst processing the form, please try again later.'
    )
  }

  async assertOnContactFrfErrorPage() {
    await expect(this.page).toHaveURL('contact-frf-team?fatal=1')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Contact Find, Recruit and Follow-up central team')
  }
}
