import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class DataServiceProvidersPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly contactFrfBtn: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
    this.contactFrfBtn = page.locator('a[class="govuk-button govuk-button--secondary mb-0 mt-2 text-left"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('data-service-providers')
  }

  async assertOnDataServiceProvidersPage() {
    await expect(this.page).toHaveURL('data-service-providers')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Information for data service providers')
  }

  async assertContactFrfButtonPresent() {
    await expect(this.contactFrfBtn).toBeVisible()
    await expect(this.contactFrfBtn).toHaveText('Contact FRF central team')
  }
}
