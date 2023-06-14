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
  readonly btnClosedSiteMenu: Locator
  readonly btnOpenedSiteMenu: Locator
  readonly linkSiteMenuFindDsp: Locator
  readonly linkSiteMenuGetSupport: Locator
  readonly linkSiteMenuDsp: Locator
  readonly linkSiteMenuResearchStaff: Locator
  readonly linkSiteMenuFeedback: Locator
  readonly txtLinkDescriptions: Locator
  readonly txtSiteMenuInto: Locator

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
    this.btnClosedSiteMenu = page.locator('button[aria-label="Show navigation menu"]')
    this.btnOpenedSiteMenu = page.locator('button[aria-label="Hide navigation menu"]')
    this.linkSiteMenuFindDsp = page.locator('a[class="link--inverse mb-1 inline-block text-base"]', {
      hasText: 'Find data service providers',
    })
    this.linkSiteMenuGetSupport = page.locator('a[class="link--inverse mb-1 inline-block text-base"]', {
      hasText: 'Get support for your research',
    })
    this.linkSiteMenuDsp = page
      .locator('a[class="link--inverse mb-1 inline-block text-base"]')
      .getByText('Data Service Providers', { exact: true })
    this.linkSiteMenuResearchStaff = page.locator('a[class="link--inverse mb-1 inline-block text-base"]', {
      hasText: 'Research Support Staff',
    })
    this.linkSiteMenuFeedback = page.locator('a[class="link--inverse mb-1 inline-block text-base"]', {
      hasText: 'Provide feedback',
    })
    this.txtLinkDescriptions = page.locator('p[class="text-sm text-white"]')
    this.txtSiteMenuInto = page.locator('p[class="max-w-[300px] text-base text-white"]')
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

  async assertMenuIconAppearsClosed() {
    await expect(this.btnClosedSiteMenu).toBeVisible()
    expect(await this.btnClosedSiteMenu.getAttribute('data-state')).toBe('closed')
  }

  async assertMenuIconAppearsOpen() {
    await expect(this.btnOpenedSiteMenu).toBeVisible()
    expect(await this.btnOpenedSiteMenu.getAttribute('data-state')).toBe('open')
  }

  async assertSiteMenuLinksAppear() {
    await expect(this.linkSiteMenuFindDsp).toBeVisible()
    await expect(this.linkSiteMenuGetSupport).toBeVisible()
    await expect(this.linkSiteMenuDsp).toBeVisible()
    await expect(this.linkSiteMenuResearchStaff).toBeVisible()
    await expect(this.linkSiteMenuFeedback).toBeVisible()
  }

  async assertSiteMenuLinkDescriptionsPresent() {
    await expect(this.txtLinkDescriptions.nth(0)).toBeVisible()
    await expect(this.txtLinkDescriptions.nth(0)).toContainText('Discover a number of data service providers')
    await expect(this.txtLinkDescriptions.nth(1)).toContainText('Access support for your research study')
    await expect(this.txtLinkDescriptions.nth(2)).toContainText('register your organisation as a DSP')
    await expect(this.txtLinkDescriptions.nth(3)).toContainText('Support for CRNCC and DA staff')
    await expect(this.txtLinkDescriptions.nth(4)).toContainText('Your feedback on our service')
  }

  async assertSiteMenuIntroTextPresent() {
    await expect(this.txtSiteMenuInto).toBeVisible()
    await expect(this.txtSiteMenuInto).toContainText('Discover more with the New Find, Recruit and Follow-up website')
  }
}
