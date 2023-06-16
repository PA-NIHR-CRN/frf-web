import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ProviderDetailsPage {
  readonly page: Page
  readonly linkBackToProviders: Locator
  readonly headingDetailPage: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.linkBackToProviders = page.locator('a[class="govuk-back-link"]')
    this.headingDetailPage = page.locator('h2[class="govuk-heading-l"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers/detail')
  }

  async assertOnProviderDetailsPage() {
    await expect(this.page).toHaveURL('/providers/genomic-profile-register')
    await expect(this.linkBackToProviders).toBeVisible()
    await expect(this.linkBackToProviders).toHaveText('Back to list of data service providers')
    await expect(this.headingDetailPage).toBeVisible()
    await expect(this.headingDetailPage).toHaveText('Detail page')
  }
}
