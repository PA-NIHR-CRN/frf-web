import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class FeedbackFormPage {
  readonly page: Page
  readonly headingPageTitle: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('feedback')
  }

  async assertOnPrivacyPage() {
    await expect(this.page).toHaveURL('feedback')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Let us know what you think')
  }
}
