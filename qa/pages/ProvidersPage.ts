import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ProvidersPage {
  readonly page: Page
  readonly btnViewMoreDetails: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.btnViewMoreDetails = page.locator('a[class="govuk-button mb-0"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers')
  }

  async assertOnProvidersPage() {
    await expect(this.page).toHaveURL('/providers')
    await expect(this.btnViewMoreDetails.nth(0)).toBeVisible()
    await expect(this.btnViewMoreDetails).toHaveCount(4)
  }
}
