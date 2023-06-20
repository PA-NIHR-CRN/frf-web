import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class HomePage {
  readonly page: Page
  readonly btnProviders: Locator
  readonly paragraphIntroText: Locator
  readonly iframeIntroVideo: Locator
  readonly iframePlayerIntroVideo: Locator
  readonly paragraphDspIntroText: Locator
  readonly dspIntroServiceBoxes: Locator
  readonly dspIntroServiceBoxFindTitle: Locator
  readonly dspIntroServiceBoxRecruitTitle: Locator
  readonly dspIntroServiceBoxFollowTitle: Locator
  readonly dspIntroServiceBoxesText: Locator
  readonly linkDspIntroServiceBoxesFind: Locator
  readonly linkDspIntroServiceBoxesRecruit: Locator
  readonly linkDspIntroServiceBoxesFollow: Locator
  readonly additonalServicesSections: Locator
  readonly titleGetSupportSection: Locator
  readonly titleBecomeDspSection: Locator
  readonly additonalServicesSectionsDescText: Locator
  readonly btnGetSupport: Locator
  readonly btnBecomeDsp: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.btnProviders = page.locator('a', { hasText: 'View all data service providers' })
    this.paragraphIntroText = page.locator('p[class="whitespace-pre-wrap lg:mb-0 lg:pr-6"]')
    this.iframeIntroVideo = page.locator('iframe[title="Video: Find, Recruit and Follow-up Intro"]')
    this.iframePlayerIntroVideo = page
      .frameLocator('iframe[title="Video: Find, Recruit and Follow-up Intro"]')
      .locator('div[id="player"]')
    this.paragraphDspIntroText = page.locator('p[class="govuk-body-l"]')
    this.dspIntroServiceBoxes = page.locator('div[class="shadow-card flex h-full flex-col bg-white"]')
    this.dspIntroServiceBoxFindTitle = page.locator('h2[class="govuk-heading-m mb-0 pl-4 text-navy-100"]', {
      hasText: 'Find',
    })
    this.dspIntroServiceBoxRecruitTitle = page.locator('h2[class="govuk-heading-m mb-0 pl-4 text-navy-100"]', {
      hasText: 'Recruit',
    })
    this.dspIntroServiceBoxFollowTitle = page.locator('h2[class="govuk-heading-m mb-0 pl-4 text-navy-100"]', {
      hasText: 'Follow-up',
    })
    this.dspIntroServiceBoxesText = page.locator(
      'div[class="govuk-body mb-0 flex flex-grow flex-col items-start justify-between p-4"] p'
    )
    this.linkDspIntroServiceBoxesFind = page.locator('a', { hasText: 'View all Find services' })
    this.linkDspIntroServiceBoxesRecruit = page.locator('a', { hasText: 'View all Recruit services' })
    this.linkDspIntroServiceBoxesFollow = page.locator('a', { hasText: 'View all Follow-up services' })
    this.additonalServicesSections = page.locator('div[class="shadow-card flex h-full flex-col bg-white p-5 lg:p-6"]')
    this.titleGetSupportSection = page.locator('h2[class="govuk-heading-m heading-underscore mb-0 text-navy-100"]', {
      hasText: 'Get support for your research',
    })
    this.titleBecomeDspSection = page.locator('h2[class="govuk-heading-m heading-underscore mb-0 text-navy-100"]', {
      hasText: 'Organisations providing data services',
    })
    this.additonalServicesSectionsDescText = page.locator(
      'div[class="flex flex-grow flex-col items-start justify-between pt-4"]'
    )
    this.btnGetSupport = page.locator('a[class="govuk-button govuk-button--secondary mb-0 mt-2 text-left"]', {
      hasText: 'Contact research support',
    })
    this.btnBecomeDsp = page.locator('a[class="govuk-button govuk-button--secondary mb-0 mt-2 text-left"]', {
      hasText: 'Find out more',
    })
  }

  //Page Methods
  async goto() {
    await this.page.goto('')
  }

  async assertOnHomePage() {
    await expect(this.page).toHaveURL('')
    await expect(this.btnProviders).toBeVisible()
  }

  async assertIntroductorySectionDisplayed() {
    await expect(this.btnProviders).toBeVisible()
    await expect(this.paragraphIntroText).toBeVisible()
    await expect(this.paragraphIntroText).toContainText('Find, Recruit and Follow-up Services')
  }

  async assertVideoPresent() {
    await expect(this.iframeIntroVideo).toBeVisible()
    await expect(this.iframePlayerIntroVideo).toBeHidden()
  }

  async assertVideoPlayable() {
    await expect(this.iframePlayerIntroVideo).toBeVisible()
  }

  async assertDspBtnPresent() {
    await expect(this.btnProviders).toBeVisible()
  }

  async assertDspIntroTextDisplayed() {
    await expect(this.paragraphDspIntroText).toBeVisible()
    await expect(this.paragraphDspIntroText).toContainText('Each of the data service providers')
  }

  async assertDspIntroBoxesDisplayed() {
    await expect(this.dspIntroServiceBoxes.nth(0)).toBeVisible()
    expect((await this.dspIntroServiceBoxes.count()).valueOf()).toBe(3)
    await expect(this.dspIntroServiceBoxFindTitle).toBeVisible()
    await expect(this.dspIntroServiceBoxRecruitTitle).toBeVisible()
    await expect(this.dspIntroServiceBoxFollowTitle).toBeVisible()
  }

  async assertDspIntroBoxesTextDisplayed() {
    await expect(this.dspIntroServiceBoxesText.nth(0)).toContainText('Identifying')
    await expect(this.dspIntroServiceBoxesText.nth(1)).toContainText('Enabling')
    await expect(this.dspIntroServiceBoxesText.nth(2)).toContainText('Collecting')
  }

  async assertDspIntroBoxesLinksDisplayed() {
    await expect(this.linkDspIntroServiceBoxesFind).toBeVisible()
    await expect(this.linkDspIntroServiceBoxesRecruit).toBeVisible()
    await expect(this.linkDspIntroServiceBoxesFollow).toBeVisible()
  }

  async assertGetSupportSectionVisible() {
    await expect(this.additonalServicesSections.nth(0)).toBeVisible()
  }

  async assertBecomeDspVisible() {
    await expect(this.additonalServicesSections.nth(1)).toBeVisible()
  }

  async assertGetSupportTitleVisible() {
    await expect(this.titleGetSupportSection).toBeVisible()
  }

  async assertBecomeDspTitleVisible() {
    await expect(this.titleBecomeDspSection).toBeVisible()
  }

  async assertGetSupportDescTextVisible() {
    await expect(this.additonalServicesSectionsDescText.nth(0)).toBeVisible()
    await expect(this.additonalServicesSectionsDescText.nth(0)).toContainText('Need help finding')
  }

  async assertBecomeDspDescTextVisible() {
    await expect(this.additonalServicesSectionsDescText.nth(1)).toBeVisible()
    await expect(this.additonalServicesSectionsDescText.nth(1)).toContainText('If you provide services')
  }

  async assertGetSupportButtonVisible() {
    await expect(this.btnGetSupport).toBeVisible()
  }

  async assertBecomeDspButtonVisible() {
    await expect(this.btnBecomeDsp).toBeVisible()
  }
}
