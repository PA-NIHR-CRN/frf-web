import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class HomePage {
  readonly page: Page
  readonly btnProviders: Locator
  readonly headingPageTitle: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.btnProviders = page.locator('a', { hasText: 'Providers' })
    this.headingPageTitle = page.locator('h1[class="govuk-heading-l"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('')
  }

  async assertOnHomePage() {
    await expect(this.page).toHaveURL('')
    await expect(this.btnProviders).toBeVisible()
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Find, Recruit and Follow-up Support')
  }
}
