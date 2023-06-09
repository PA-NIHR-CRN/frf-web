import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ProvidersPage {
  readonly page: Page
  readonly btnDetail: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.btnDetail = page.locator('a', { hasText: 'Detail' })
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers')
  }

  async assertOnProvidersPage() {
    await expect(this.page).toHaveURL('/providers')
    await expect(this.btnDetail).toBeVisible()
    await expect(this.btnDetail).toHaveText('Detail')
  }
}
