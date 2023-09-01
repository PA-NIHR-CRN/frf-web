import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class TermsConditionsPage {
  readonly page: Page
  readonly headingPageTitle: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h1[class="govuk-panel__title heading-underscore pt-1"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('terms-and-conditions')
  }

  async assertOnAccessibilityPage() {
    await expect(this.page).toHaveURL('terms-and-conditions')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Terms and Conditions')
  }
}
