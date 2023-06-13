import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class CommonItemsPage {
  readonly page: Page
  readonly linkPrivacy: Locator
  readonly linkAccessibility: Locator
  readonly frfHeader: Locator
  readonly frfFooterLinks: Locator
  readonly frfFooterLogos: Locator
  readonly frfServiceTitle: Locator
  readonly nihrLogo: Locator
  readonly bannerGdsBeta: Locator
  readonly linkFeedback: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.linkPrivacy = page.locator('a', { hasText: 'Privacy policy' })
    this.linkAccessibility = page.locator('a', { hasText: 'Accessibility' })
    this.frfHeader = page.locator('div[data-testid="frf-panel"]')
    this.frfFooterLinks = page.locator('div[data-testid="frf-footer-links"]')
    this.frfFooterLogos = page.locator('div[data-testid="frf-footer-logos"]')
    this.frfServiceTitle = page.locator('h1[class="govuk-panel__title heading-underscore"]')
    this.nihrLogo = page.locator('img[alt="National Institute for Health and Care Research logo"]')
    this.bannerGdsBeta = page.locator('strong[class="govuk-tag govuk-phase-banner__content__tag"]')
    this.linkFeedback = page.locator('a', { hasText: 'feedback' })
  }

  //Page Methods
  async assertHeaderFooterItemsAppear() {
    await expect(this.frfHeader).toBeVisible()
    await expect(this.frfFooterLinks).toBeVisible()
    await expect(this.linkPrivacy).toBeVisible()
    await expect(this.linkAccessibility).toBeVisible()
  }

  async assertServiceTitleCorrect() {
    await expect(this.frfServiceTitle).toBeVisible()
    await expect(this.frfServiceTitle).toHaveText('Find, Recruit and Follow-up')
  }

  async assertNihrLogoPresent() {
    await expect(this.nihrLogo).toBeVisible()
  }

  async assertBetaGdsBannerAppears() {
    await expect(this.bannerGdsBeta).toBeVisible()
    await expect(this.bannerGdsBeta).toHaveText('Beta')
  }

  async assertFeedbackLinkAppears() {
    await expect(this.linkFeedback).toBeVisible()
  }
}
