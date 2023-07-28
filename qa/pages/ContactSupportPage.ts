import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ContactSupportPage {
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
    await this.page.goto('contact-research-support')
  }

  async assertOnContactSupportForm() {
    await expect(this.page).toHaveURL('contact-research-support')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Contact research support')
  }
}
