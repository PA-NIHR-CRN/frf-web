import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ResearchSupportPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly contactFrfBtn: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h1[class="govuk-panel__title heading-underscore pt-1"]')
    this.contactFrfBtn = page.locator('a[class="govuk-button govuk-button--secondary mb-0 mt-2 text-left"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('research-support')
  }

  async assertOnResearchSupportPage() {
    await expect(this.page).toHaveURL('research-support')
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Research support teams')
  }

  async assertContactFrfButtonPresent() {
    await expect(this.contactFrfBtn).toBeVisible()
    await expect(this.contactFrfBtn).toHaveText('Contact FRF central team')
  }
}
