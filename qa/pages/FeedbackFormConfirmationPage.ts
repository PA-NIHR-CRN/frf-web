import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class FeedbackConfirmationPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly confirmTextBlock: Locator
  readonly returnToHomePageButton: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h1[class="govuk-panel__title heading-underscore pt-1"]')
    this.confirmTextBlock = page.locator('div[class="govuk-grid-column-two-thirds-from-desktop"] p')
    this.returnToHomePageButton = page.locator('a[class="govuk-button"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('feedback/confirmation')
  }

  async assertOnFeedbackConfirmationPage() {
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Thank you for your feedback')
    expect(this.page.url()).toContain('feedback/confirmation')
  }

  async assertFeedbackPageTextBlock() {
    await expect(this.confirmTextBlock.first()).toBeVisible()
    await expect(this.confirmTextBlock.nth(1)).toBeVisible()
    await expect(this.confirmTextBlock.first()).toHaveText(
      'Your feedback has been received and will help us to improve the FRF website.'
    )
    await expect(this.confirmTextBlock.nth(1)).toHaveText(
      'If you have provided contact details we may contact you in the near future for further feedback.'
    )
  }

  async assertContainsHomePageButton() {
    await expect(this.returnToHomePageButton).toBeVisible()
    await expect(this.returnToHomePageButton).toHaveText('Return to homepage')
  }
}
