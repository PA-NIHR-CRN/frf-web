import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class CookiePolicyPage {
  readonly page: Page
  readonly headingPageTitle: Locator
  readonly changeCookieBtn: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.headingPageTitle = page.locator('h2[class="govuk-heading-l"]')
    this.changeCookieBtn = page.locator('a[href="/cookie-policy?change-settings=1"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('cookie-policy')
  }

  async assertOnCookiePolicyPage() {
    await expect(this.headingPageTitle).toBeVisible()
    await expect(this.headingPageTitle).toHaveText('Cookie Policy')
    await expect(this.page).toHaveURL('cookie-policy')
  }

  async assertChangeCookieOptionAvailable() {
    await expect(this.changeCookieBtn).toBeVisible()
    await expect(this.changeCookieBtn).toHaveText('Change cookie settings')
  }
}
