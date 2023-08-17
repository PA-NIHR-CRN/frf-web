import { Cookie, expect, Locator, Page } from '@playwright/test'

import { getDomainSpecificCookieList } from '../utils/UtilFunctions'

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
  readonly linkSiteMenuContactSupport: Locator
  readonly linkSiteMenuDsp: Locator
  readonly linkSiteMenuResearchStaff: Locator
  readonly linkSiteMenuFeedback: Locator
  readonly txtLinkDescriptions: Locator
  readonly txtSiteMenuIntro: Locator
  readonly siteSeoMetaTag: Locator
  readonly btnHomeIcon: Locator
  readonly cookieBanner: Locator
  readonly cookieBannerAccept: Locator
  readonly cookieBannerReject: Locator
  readonly cookieBannerViewCookies: Locator
  readonly cookieBannerHeading: Locator
  readonly cookieBannerTxt: Locator
  readonly cookiePolicyFooterLink: Locator
  readonly cookieConfirmationMsg: Locator
  readonly cookieConfirmationPolicyLink: Locator
  readonly cookieConfirmationChangeLink: Locator
  readonly cookieConfirmationHideBtn: Locator

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
    this.linkSiteMenuFindDsp = page.locator('a[class="link--inverse govuk-heading-s mb-1 inline-block font-normal"]', {
      hasText: 'View data service providers',
    })
    this.linkSiteMenuContactSupport = page.locator(
      'a[class="link--inverse govuk-heading-s mb-1 inline-block font-normal"]',
      {
        hasText: 'Contact research support',
      }
    )
    this.linkSiteMenuDsp = page
      .locator('a[class="link--inverse govuk-heading-s mb-1 inline-block font-normal"]')
      .getByText('Data service providers', { exact: true })
    this.linkSiteMenuResearchStaff = page.locator(
      'a[class="link--inverse govuk-heading-s mb-1 inline-block font-normal"]',
      {
        hasText: 'Research support colleagues',
      }
    )
    this.linkSiteMenuFeedback = page.locator('a[class="link--inverse govuk-heading-s mb-1 inline-block font-normal"]', {
      hasText: 'Provide feedback',
    })
    this.txtLinkDescriptions = page.locator('p[class="govuk-body-s text-white"]')
    this.txtSiteMenuIntro = page.locator('p[class="govuk-heading-s max-w-[300px] font-normal text-white"]')
    this.siteSeoMetaTag = page.locator('meta[name="robots"]')
    this.btnHomeIcon = page.locator('svg[data-testid="frf-icon-home"]')
    this.cookieBanner = page.locator(
      'div[class="govuk-cookie-banner govuk-!-padding-top-5 govuk-!-padding-bottom-3 w-full"]'
    )
    this.cookieBannerAccept = page.locator('button[value="accept"]')
    this.cookieBannerReject = page.locator('button[value="reject"]')
    this.cookieBannerViewCookies = page.locator('a[href="/cookie-policy"][class="govuk-link"]', {
      hasText: 'View cookies',
    })
    this.cookieBannerHeading = page.locator('h2[class="govuk-cookie-banner__heading govuk-heading-m"]')
    this.cookieBannerTxt = page.locator('div[class="govuk-cookie-banner__content govuk-body focus:outline-0"]')
    this.cookiePolicyFooterLink = this.frfFooterLinks.locator('a[href="/cookie-policy"]')
    this.cookieConfirmationMsg = page.locator('p[data-testid="confirmation-message"]')
    this.cookieConfirmationPolicyLink = page.locator('a[class="govuk-link"][href="/cookie-policy"]', {
      hasText: 'cookie policy',
    })
    this.cookieConfirmationChangeLink = page.locator('a[class="govuk-link"][href="#cookie-banner"]')
    this.cookieConfirmationHideBtn = page.locator('button[class="govuk-button"]', { hasText: 'Hide cookie message' })
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
    await expect(this.linkSiteMenuContactSupport).toBeVisible()
    await expect(this.linkSiteMenuDsp).toBeVisible()
    await expect(this.linkSiteMenuResearchStaff).toBeVisible()
    await expect(this.linkSiteMenuFeedback).toBeVisible()
  }

  async assertSiteMenuLinkDescriptionsPresent() {
    await expect(this.txtLinkDescriptions.nth(0)).toBeVisible()
    await expect(this.txtLinkDescriptions.nth(0)).toContainText(
      'Discover more about the different data service providers'
    )
    await expect(this.txtLinkDescriptions.nth(1)).toContainText('Get in touch with research support professionals')
    await expect(this.txtLinkDescriptions.nth(2)).toContainText(
      'Information for organisations offering Find, Recruit and Follow-up data services'
    )
    await expect(this.txtLinkDescriptions.nth(3)).toContainText(
      'Information for colleagues within the various research support organisations'
    )
    await expect(this.txtLinkDescriptions.nth(4)).toContainText('Your feedback on our service')
  }

  async assertSiteMenuIntroTextPresent() {
    await expect(this.txtSiteMenuIntro).toBeVisible()
    await expect(this.txtSiteMenuIntro).toContainText('Discover more with the Find, Recruit and Follow-up website')
  }

  async assertSeoIsDisabled() {
    await expect(this.siteSeoMetaTag).toHaveAttribute('content', 'noindex,nofollow')
  }

  async assertHomeIconVisible() {
    await expect(this.btnHomeIcon).toBeVisible()
  }

  async assertHomeIconHidden() {
    await expect(this.btnHomeIcon).toBeHidden()
  }

  async assertCookieBannerAppears(visible: boolean) {
    if (visible) {
      await expect(this.cookieBanner).toBeVisible()
    } else {
      await expect(this.cookieBanner).toBeHidden()
    }
  }

  async assertCookieBannerOptionsAppear() {
    await expect(this.cookieBannerAccept).toBeVisible()
    await expect(this.cookieBannerReject).toBeVisible()
    await expect(this.cookieBannerViewCookies).toBeVisible()
    await expect(this.cookieBannerAccept).toHaveText('Accept additional cookies')
    await expect(this.cookieBannerReject).toHaveText('Reject additional cookies')
    await expect(this.cookieBannerViewCookies).toHaveText('View cookies')
  }

  async assertCookieBannerTxtContent() {
    await expect(this.cookieBannerHeading).toBeVisible()
    await expect(this.cookieBannerTxt).toBeVisible()
    await expect(this.cookieBannerHeading).toHaveText('Cookies on Find, Recruit and Follow-Up')
    await expect(this.cookieBannerTxt).toContainText('We use some essential cookies to make this service work')
    await expect(this.cookieBannerTxt).toContainText(
      'understand how people use the Find, Recruit and Follow-up website'
    )
  }

  async assertNoCookiesApplied() {
    const cookieList = await this.getCookies()
    expect(cookieList).toHaveLength(0)
  }

  async assertDecisonCookieApplied(decision: string) {
    const cookieList = await this.getCookies()
    const decisionCookieArray = getDomainSpecificCookieList(cookieList, 'test.findrecruitandfollowup.nihr.ac.uk')
    expect(decisionCookieArray).toHaveLength(1)
    if (decision.toLowerCase() == 'accept') {
      expect(decisionCookieArray[0].value).toEqual('Accept')
    } else {
      expect(decisionCookieArray[0].value).toEqual('Reject')
    }
  }

  async assertDecisonCookieExpiry() {
    const cookieList = await this.getCookies()
    const decisionCookieArray = getDomainSpecificCookieList(cookieList, 'test.findrecruitandfollowup.nihr.ac.uk')
    const epochExpireValue = decisionCookieArray[0].expires
    const expiryDate = new Date(0)
    expiryDate.setUTCSeconds(epochExpireValue)
    const currentDate = new Date()
    const differenceInDays = Math.floor((expiryDate.valueOf() - currentDate.valueOf()) / (1000 * 60 * 60 * 24))
    expect(differenceInDays).toEqual(365)
  }

  async assertGoogleAnalyticsCookiesApplied(applied: boolean) {
    const cookieList = await this.getCookies()
    const gaCookiesArray = getDomainSpecificCookieList(cookieList, '.nihr.ac.uk')
    if (applied) {
      expect(gaCookiesArray.length).toEqual(2)
      gaCookiesArray.forEach((cookie) => expect(cookie.name.startsWith('_ga')).toBeTruthy())
    } else {
      expect(cookieList.length).toEqual(1)
      expect(gaCookiesArray.length).toEqual(0)
    }
  }

  async assertYoutubeCookiesApplied(applied: boolean) {
    const cookieList = await this.getCookies()
    const ytCookiesArray = getDomainSpecificCookieList(cookieList, '.youtube.com')
    if (applied) {
      expect(ytCookiesArray.length).toEqual(2)
      expect(ytCookiesArray.some((cookie) => cookie.name == 'YSC')).toBeTruthy()
      expect(ytCookiesArray.some((cookie) => cookie.name == 'VISITOR_INFO1_LIVE')).toBeTruthy()
    } else {
      expect(cookieList.length).toEqual(1)
      expect(ytCookiesArray.length).toEqual(0)
    }
  }

  async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies()
  }

  async assertCookieConfirmationMsgAppears(decision: string) {
    await expect(this.cookieConfirmationMsg).toBeVisible()
    if (decision.toLowerCase() == 'accept') {
      await expect(this.cookieConfirmationMsg).toContainText('You’ve accepted additional cookies.')
    } else {
      await expect(this.cookieConfirmationMsg).toContainText('You’ve rejected additional cookies.')
    }
  }

  async assertCookieConfirmationPolicyLink(visible: boolean) {
    if (visible) {
      await expect(this.cookieConfirmationPolicyLink).toBeVisible()
      await expect(this.cookieConfirmationPolicyLink).toHaveText('cookie policy')
    } else {
      await expect(this.cookieConfirmationPolicyLink).toBeHidden()
    }
  }

  async assertCookieConfirmationChangeLink(visible: boolean) {
    if (visible) {
      await expect(this.cookieConfirmationChangeLink).toBeVisible()
      await expect(this.cookieConfirmationChangeLink).toHaveText('change your cookie settings')
    } else {
      await expect(this.cookieConfirmationChangeLink).toBeHidden()
    }
  }

  async assertCookieConfirmationHideButton(visible: boolean) {
    if (visible) {
      await expect(this.cookieConfirmationHideBtn).toBeVisible()
      await expect(this.cookieConfirmationHideBtn).toHaveText('Hide cookie message')
    } else {
      await expect(this.cookieConfirmationHideBtn).toBeHidden()
    }
  }
}
