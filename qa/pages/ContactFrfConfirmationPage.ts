import { expect, Locator, Page } from '@playwright/test'

import { convertPromiseStringToNumber, extractRefNoDigits } from '../utils/UtilFunctions'

//Declare Page Objects
export default class ContactFrfTeamConfirmationPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly confirmTextBlocks: Locator
  readonly txtBlockFeedbackLink: Locator
  readonly returnToHomePageButton: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
    this.confirmTextBlocks = page.locator('div[class="govuk-grid-column-two-thirds-from-desktop"] p')
    this.txtBlockFeedbackLink = this.confirmTextBlocks.locator('a[href="/feedback"]')
    this.returnToHomePageButton = page.locator('a[class="govuk-button"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('contact-frf-team/confirmation/C00001')
  }

  async assertOnContactFrfConfirmationPage() {
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Thank you')
    expect(this.page.url()).toContain('contact-frf-team/confirmation/C')
  }

  async assertConfirmationPageTextBlock() {
    await expect(this.confirmTextBlocks.first()).toBeVisible()
    await expect(this.confirmTextBlocks.first()).toContainText(
      'We have received your enquiry and will be in touch in due course.'
    )
    await expect(this.confirmTextBlocks.nth(1)).toContainText(
      'A copy of your enquiry will be sent to your email address.'
    )
    await expect(this.confirmTextBlocks.nth(2)).toContainText('(takes 30 seconds)')
  }

  async assertContainsFeedbackLink() {
    await expect(this.txtBlockFeedbackLink).toBeVisible()
    await expect(this.txtBlockFeedbackLink).toHaveText('What did you think of this website?')
  }

  async assertContainsHomePageButton() {
    await expect(this.returnToHomePageButton).toBeVisible()
    await expect(this.returnToHomePageButton).toHaveText('Return to homepage')
  }

  async assertEnquiryRefNoFormat() {
    const actualRefNo = await this.getEnquiryRefNoString()
    expect(actualRefNo).toMatch(/C\d{5}$/)
  }

  async getEnquiryRefNoString(): Promise<string | undefined> {
    const containingText = await this.confirmTextBlocks.nth(1).textContent()
    const actualRefNo = containingText?.substring(33, 39)
    return actualRefNo
  }

  async assertEnquiryRefNoIncrements(firstRefNo: string | undefined, secondRefNo: string | undefined) {
    firstRefNo = extractRefNoDigits(firstRefNo, 'C')
    secondRefNo = extractRefNoDigits(secondRefNo, 'C')
    let incrementedFirstRefNo = convertPromiseStringToNumber(firstRefNo)
    incrementedFirstRefNo++
    expect(incrementedFirstRefNo).toEqual(convertPromiseStringToNumber(secondRefNo))
  }
}
