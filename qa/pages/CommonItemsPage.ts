import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class CommonItemsPage {
  readonly page: Page
  readonly linkPrivacy: Locator
  readonly linkAccessibility: Locator
  readonly frfBanner: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.linkPrivacy = page.locator('a', { hasText: 'Privacy policy' })
    this.linkAccessibility = page.locator('a', { hasText: 'Accessibility' })
    this.frfBanner = page.locator('div[data-testid="frf-panel"]')
  }

  //Page Methods
  async assertBannerItemsAppear() {
    await expect(this.frfBanner).toBeVisible()
    await expect(this.linkPrivacy).toBeVisible()
    await expect(this.linkAccessibility).toBeVisible()
  }
}
