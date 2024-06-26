import { expect, Locator, Page } from '@playwright/test'

import { convertPromiseStringToNumber } from '../utils/UtilFunctions'

//Declare Page Objects
export default class ContactSupportPage {
  readonly page: Page
  readonly researchLeadExampleOption: string
  readonly researchLeadChrisOption: string
  readonly pageTitle: Locator
  readonly pageHeading: Locator
  readonly contactSupportForm: Locator
  readonly contactSupportFormTxtBlocks: Locator
  readonly formAboutEnquirySectionLbl: Locator
  readonly formAboutYouSectionLbl: Locator
  readonly formAboutResearchSectionLbl: Locator
  readonly formIsEnquiryAboutLbl: Locator
  readonly formEnquiryRadioButtonGroup: Locator
  readonly formEnquiryRadioButtonData: Locator
  readonly formEnquiryRadioButtonDataLbl: Locator
  readonly formEnquiryRadioButtonResearch: Locator
  readonly formEnquiryRadioButtonResearchLbl: Locator
  readonly formSummarySupportLbl: Locator
  readonly formSummarySupportTxt: Locator
  readonly formSummarySupportGuideChars: Locator
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
  readonly formIsYourOrgLbl: Locator
  readonly formOrgRadioButtonGroup: Locator
  readonly formOrgRadioButtonComm: Locator
  readonly formOrgRadioButtonCommLbl: Locator
  readonly formOrgRadioButtonNonComm: Locator
  readonly formOrgRadioButtonNonCommLbl: Locator
  readonly formWhichRegionLbl: Locator
  readonly formResearchLeadGuideTxt: Locator
  readonly formResearchLcrnLink: Locator
  readonly formResearchLeadDropdown: Locator
  readonly formResearchStudyInput: Locator
  readonly formResearchStudyLbl: Locator
  readonly formResearchProtocolInput: Locator
  readonly formResearchProtocolLbl: Locator
  readonly formResearchCpmsInput: Locator
  readonly formResearchCpmsLbl: Locator
  readonly formResearchCpmsGuideTxt: Locator
  readonly formEmailCopyTxt: Locator
  readonly formSubmitButton: Locator
  readonly formHiddenHoneyPotInput: Locator
  readonly validationSummaryBox: Locator
  readonly validationSummaryHeading: Locator
  readonly validationSummaryList: Locator
  readonly validationSummaryEnquiryError: Locator
  readonly validationSummarySupportSummaryError: Locator
  readonly validationSummaryNameError: Locator
  readonly validationSummaryEmailError: Locator
  readonly validationSummaryJobRoleError: Locator
  readonly validationSummaryOrgNameError: Locator
  readonly validationSummaryOrgTypeError: Locator
  readonly validationSummaryLeadRegionError: Locator
  readonly validationFieldEnquiryError: Locator
  readonly validationFieldSupportSummaryError: Locator
  readonly validationFieldNameError: Locator
  readonly validationFieldEmailError: Locator
  readonly validationFieldJobRoleError: Locator
  readonly validationFieldOrgNameError: Locator
  readonly validationFieldOrgTypeError: Locator
  readonly validationFieldLeadRegionError: Locator
  readonly validationFieldTelephoneError: Locator
  readonly validationSummaryTelephoneError: Locator
  readonly genericErrorMsg: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.pageTitle = page.locator('h1[data-testid="page-title"]')
    this.pageHeading = page.locator('h2[class="govuk-heading-l"]')
    this.contactSupportForm = page.locator('form[action="/api/forms/contact-research-support"]')
    this.contactSupportFormTxtBlocks = page.locator('div[class="govuk-grid-column-two-thirds-from-desktop"] p')
    this.formAboutEnquirySectionLbl = page.locator('legend[class="govuk-fieldset__legend govuk-fieldset__legend--m"]', {
      hasText: 'About your enquiry',
    })
    this.formAboutYouSectionLbl = page
      .locator('legend[class="govuk-fieldset__legend govuk-fieldset__legend--m"]')
      .getByText('About you', { exact: true })
    this.formAboutResearchSectionLbl = page.locator(
      'legend[class="govuk-fieldset__legend govuk-fieldset__legend--m"]',
      { hasText: 'About your research' }
    )
    this.formIsEnquiryAboutLbl = page.locator('legend[class="govuk-fieldset__legend govuk-fieldset__legend--s"]', {
      hasText: 'Is your enquiry about',
    })
    this.formEnquiryRadioButtonGroup = this.formIsEnquiryAboutLbl
      .locator('..')
      .locator('div[data-module="govuk-radios"]')
    this.formEnquiryRadioButtonData = page.locator('input[value="data"]')
    this.formEnquiryRadioButtonDataLbl = page.locator('label[for="enquiryType"]')
    this.formEnquiryRadioButtonResearch = page.locator('input[value="research"]')
    this.formEnquiryRadioButtonResearchLbl = page.locator('label[for="enquiryType-1"]')
    this.formSummarySupportLbl = page.locator('label[id="supportDescription-label"]')
    this.formSummarySupportTxt = page.locator('textarea[id="supportDescription"]')
    this.formSummarySupportGuideChars = page.locator('div[id="with-hint-info"]')
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
    this.formIsYourOrgLbl = page.locator('legend[class="govuk-fieldset__legend govuk-fieldset__legend--s"]', {
      hasText: 'Is your organisation',
    })
    this.formOrgRadioButtonGroup = this.formIsYourOrgLbl.locator('..').locator('div[data-module="govuk-radios"]')
    this.formOrgRadioButtonComm = page.locator('input[value="commercial"]')
    this.formOrgRadioButtonCommLbl = page.locator('label[for="organisationType"]')
    this.formOrgRadioButtonNonComm = page.locator('input[value="nonCommercial"]')
    this.formOrgRadioButtonNonCommLbl = page.locator('label[for="organisationType-1"]')
    this.formWhichRegionLbl = page.locator('label[id="lcrn-label"]')
    this.formResearchLeadGuideTxt = page.locator('div[id="lcrn-hint"]')
    this.formResearchLcrnLink = page.locator('a[aria-label="Local Clinical Research Networks (Opens in a new window)"]')
    this.formResearchLeadDropdown = page.locator('select[name="lcrn"]')
    this.formResearchStudyInput = page.locator('input[id="studyTitle"]')
    this.formResearchStudyLbl = page.locator('label[id="studyTitle-label"]')
    this.formResearchProtocolInput = page.locator('input[id="protocolReference"]')
    this.formResearchProtocolLbl = page.locator('label[id="protocolReference-label"]')
    this.formResearchCpmsInput = page.locator('input[id="cpmsId"]')
    this.formResearchCpmsLbl = page.locator('label[id="cpmsId-label"]')
    this.formResearchCpmsGuideTxt = this.page.locator('div[id="cpmsId-hint"]')
    this.formEmailCopyTxt = this.contactSupportForm.locator('p').nth(2)
    this.formSubmitButton = page.locator('button[data-module="govuk-button"]')
    this.formHiddenHoneyPotInput = page.locator('input[name="caseReferenceNumber"]')
    this.validationSummaryBox = page.locator('div[class="govuk-error-summary"]')
    this.validationSummaryHeading = page.locator('h2[id="form-summary-errors"]')
    this.validationSummaryList = page.locator('ul[class="govuk-list govuk-error-summary__list"]')
    this.validationSummaryEnquiryError = page.locator('a[href="#enquiryType"]')
    this.validationSummarySupportSummaryError = page.locator('a[href="#supportDescription"]')
    this.validationSummaryNameError = page.locator('a[href="#fullName"]')
    this.validationSummaryEmailError = page.locator('a[href="#emailAddress"]')
    this.validationSummaryJobRoleError = page.locator('a[href="#jobRole"]')
    this.validationSummaryOrgNameError = page.locator('a[href="#organisationName"]')
    this.validationSummaryOrgTypeError = page.locator('a[href="#organisationType"]')
    this.validationSummaryLeadRegionError = page.locator('a[href="#lcrn"]')
    this.validationFieldEnquiryError = page.locator('p[id="enquiryType-error"]')
    this.validationFieldSupportSummaryError = page.locator('p[id="supportDescription-error"]')
    this.validationFieldNameError = page.locator('p[id="fullName-error"]')
    this.validationFieldEmailError = page.locator('p[id="emailAddress-error"]')
    this.validationFieldJobRoleError = page.locator('p[id="jobRole-error"]')
    this.validationFieldOrgNameError = page.locator('p[id="organisationName-error"]')
    this.validationFieldOrgTypeError = page.locator('p[id="organisationType-error"]')
    this.validationFieldLeadRegionError = page.locator('p[id="lcrn-error"]')
    this.validationFieldTelephoneError = page.locator('p[id="phoneNumber-error"]')
    this.validationSummaryTelephoneError = page.locator('a[href="#phoneNumber"]')
    this.genericErrorMsg = this.validationSummaryList.locator('li')

    //Page Variables
    this.researchLeadExampleOption = 'LCRN Example'
    this.researchLeadChrisOption = 'Chris LCRN DA Test'
  }

  //Page Methods
  async goto() {
    await this.page.goto('contact-research-support')
  }

  async assertOnContactSupportPage() {
    await expect(this.page).toHaveURL('contact-research-support')
    await expect(this.pageTitle).toBeVisible()
    await expect(this.pageHeading).toBeVisible()
    await expect(this.pageTitle).toHaveText('Get support for your research')
    await expect(this.pageHeading).toHaveText('Contact research support')
  }

  async assertContactSupportFormPresent() {
    await expect(this.contactSupportForm).toBeVisible()
  }

  async assertIntroText() {
    await expect(this.contactSupportFormTxtBlocks.first()).toBeVisible()
    await expect(this.contactSupportFormTxtBlocks.first()).toContainText(
      'The UK offers multiple services and teams of professionals who can support you'
    )
    await expect(this.contactSupportFormTxtBlocks.nth(1)).toContainText(
      'to access this support please complete the form below'
    )
  }

  async assertAboutEnquirySectionPresent() {
    await expect(this.formAboutEnquirySectionLbl).toBeVisible()
  }

  async assertIsEnquiryAboutLabelPresent() {
    await expect(this.formIsEnquiryAboutLbl).toBeVisible()
  }

  async assertEnquiryRadioGroupPresent() {
    await expect(this.formEnquiryRadioButtonGroup).toBeVisible()
    expect(await this.formEnquiryRadioButtonGroup.locator('div[class="govuk-radios__item"]').count()).toEqual(2)
  }

  async assertEnquiryRadioGroupValues() {
    await expect(this.formEnquiryRadioButtonData).toBeVisible()
    await expect(this.formEnquiryRadioButtonResearch).toBeVisible()
    await expect(this.formEnquiryRadioButtonDataLbl).toHaveText('Identifying appropriate data services')
    await expect(this.formEnquiryRadioButtonResearchLbl).toHaveText('General enquiry about research support')
  }

  async assertEnquirySupportSummary() {
    await expect(this.formSummarySupportLbl).toBeVisible()
    await expect(this.formSummarySupportTxt).toBeVisible()
    await expect(this.formSummarySupportGuideChars).toBeVisible()
    await expect(this.formSummarySupportLbl).toHaveText('Please provide a summary of the support you need')
    await expect(this.formSummarySupportGuideChars).toHaveText('You have 1200 characters remaining')
  }

  async assertSupportSummaryCharCount(expectedCount: number) {
    const charsGuideText = await this.formSummarySupportGuideChars.textContent()
    const charsNumberEndIndex = charsGuideText?.indexOf('characters')
    const currentCharsCount = convertPromiseStringToNumber(charsGuideText?.substring(8, charsNumberEndIndex))
    expect(currentCharsCount).toEqual(expectedCount)
  }

  async assertAboutYouSectionPresent() {
    await expect(this.formAboutYouSectionLbl).toBeVisible()
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

  async assertIsYourOrgLabelPresent() {
    await expect(this.formIsYourOrgLbl).toBeVisible()
  }

  async assertOrgRadioGroupPresent() {
    await expect(this.formOrgRadioButtonGroup).toBeVisible()
    expect(await this.formOrgRadioButtonGroup.locator('div[class="govuk-radios__item"]').count()).toEqual(2)
  }

  async assertOrgRadioGroupValues() {
    await expect(this.formOrgRadioButtonComm).toBeVisible()
    await expect(this.formOrgRadioButtonNonComm).toBeVisible()
    await expect(this.formOrgRadioButtonCommLbl).toHaveText('Commercial')
    await expect(this.formOrgRadioButtonNonCommLbl).toHaveText('Non-commercial')
  }

  async assertAboutResearchSectionPresent() {
    await expect(this.formAboutResearchSectionLbl).toBeVisible()
  }

  async assertWhichRegionLabelPresent() {
    await expect(this.formWhichRegionLbl).toBeVisible()
    await expect(this.formWhichRegionLbl).toHaveText('Which region will take a lead in supporting your research?')
  }

  async assertResearchLeadGuideBlockPresent() {
    await expect(this.formResearchLeadGuideTxt).toBeVisible()
    await expect(this.formResearchLcrnLink).toBeVisible()
    await expect(this.formResearchLcrnLink).toHaveText('Local Clinical Research Networks')
  }

  async assertLeadRegionInputPresent() {
    await expect(this.formResearchLeadDropdown).toBeVisible()
  }

  async assertStudyTitlePresent() {
    await expect(this.formResearchStudyLbl).toBeVisible()
    await expect(this.formResearchStudyInput).toBeVisible()
    await expect(this.formResearchStudyLbl).toHaveText('Study title (optional)')
  }

  async assertProtocolRefPresent() {
    await expect(this.formResearchProtocolLbl).toBeVisible()
    await expect(this.formResearchProtocolInput).toBeVisible()
    await expect(this.formResearchProtocolLbl).toHaveText('Protocol reference (optional)')
  }

  async assertCpmsIdPresent() {
    await expect(this.formResearchCpmsLbl).toBeVisible()
    await expect(this.formResearchCpmsLbl).toHaveText('CPMS ID (optional)')
    await expect(this.formResearchCpmsGuideTxt).toBeVisible()
    await expect(this.formResearchCpmsGuideTxt).toContainText('A unique study identifier')
    await expect(this.formResearchCpmsInput).toBeVisible()
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
    await expect(this.validationSummaryEnquiryError).toBeVisible()
    await expect(this.validationSummarySupportSummaryError).toBeVisible()
    await expect(this.validationSummaryNameError).toBeVisible()
    await expect(this.validationSummaryEmailError).toBeVisible()
    await expect(this.validationSummaryJobRoleError).toBeVisible()
    await expect(this.validationSummaryOrgNameError).toBeVisible()
    await expect(this.validationSummaryOrgTypeError).toBeVisible()
    await expect(this.validationSummaryLeadRegionError).toBeVisible()
    await expect(this.validationSummaryEnquiryError).toHaveText('Select the type of enquiry')
    await expect(this.validationSummarySupportSummaryError).toHaveText('Enter a summary of the support you need')
    await expect(this.validationSummaryNameError).toHaveText('Enter your full name')
    await expect(this.validationSummaryEmailError).toHaveText('Enter a valid email address')
    await expect(this.validationSummaryJobRoleError).toHaveText('Enter your job role')
    await expect(this.validationSummaryOrgNameError).toHaveText('Enter your organisation name')
    await expect(this.validationSummaryOrgTypeError).toHaveText('Select the type of organisation')
    await expect(this.validationSummaryLeadRegionError).toHaveText('Select a lead region')
  }

  async assertValidationSummaryLinks(field: string) {
    switch (field.toLowerCase()) {
      case 'enquiry':
        await expect(this.formEnquiryRadioButtonData).toBeFocused()
        break
      case 'summary':
        await expect(this.formSummarySupportTxt).toBeFocused()
        break
      case 'job':
        await expect(this.formJobRoleInput).toBeFocused()
        break
      case 'region':
        await expect(this.formResearchLeadDropdown).toBeFocused()
        break
      default:
        throw new Error(`${field} is not a valid option`)
    }
  }

  async assertValidationMandatoryFieldMessages() {
    await expect(this.validationFieldEnquiryError).toBeVisible()
    await expect(this.validationFieldSupportSummaryError).toBeVisible()
    await expect(this.validationFieldNameError).toBeVisible()
    await expect(this.validationFieldEmailError).toBeVisible()
    await expect(this.validationFieldJobRoleError).toBeVisible()
    await expect(this.validationFieldOrgNameError).toBeVisible()
    await expect(this.validationFieldOrgTypeError).toBeVisible()
    await expect(this.validationFieldLeadRegionError).toBeVisible()
    await expect(this.validationFieldEnquiryError).toContainText('Select the type of enquiry')
    await expect(this.validationFieldSupportSummaryError).toContainText('Enter a summary of the support you need')
    await expect(this.validationFieldNameError).toContainText('Enter your full name')
    await expect(this.validationFieldEmailError).toContainText('Enter a valid email address')
    await expect(this.validationFieldJobRoleError).toContainText('Enter your job role')
    await expect(this.validationFieldOrgNameError).toContainText('Enter your organisation name')
    await expect(this.validationFieldOrgTypeError).toContainText('Select the type of organisation')
    await expect(this.validationFieldLeadRegionError).toContainText('Select a lead region')
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
    await this.formEnquiryRadioButtonResearch.click()
    await this.formSummarySupportTxt.type('Testing Value')
    await this.formFullNameInput.type('Testing Name')
    await this.formEmailAddressInput.type('dummy.test@nihr.ac.uk')
    await this.formJobRoleInput.type('Testing Job')
    await this.formOrgNameInput.type('Testing Org')
    await this.formOrgRadioButtonNonComm.click()
    await this.formResearchLeadDropdown.selectOption(this.researchLeadChrisOption)
  }

  async assertSupportSummaryContent(expectedTextContent: string) {
    expect(await this.formSummarySupportTxt.inputValue()).toEqual(expectedTextContent)
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

  async assertOnContactSupportErrorPage() {
    await expect(this.page).toHaveURL('contact-research-support?fatal=1')
    await expect(this.pageHeading).toBeVisible()
    await expect(this.pageHeading).toHaveText('Contact research support')
  }
}
