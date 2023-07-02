import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ProviderDetailsPage {
  readonly page: Page
  readonly linkBackToProviders: Locator
  readonly dspDetailName: Locator
  readonly dspDetailSidebar: Locator
  readonly contactResearchHeader: Locator
  readonly txtContactResearch: Locator
  readonly btnContactResearch: Locator
  readonly contactDspHeader: Locator
  readonly txtContactDsp: Locator
  readonly btnContactDsp: Locator
  readonly dspDetailOrgName: Locator
  readonly dspDetailOverviewSection: Locator
  readonly dspDetailServiceCostsSection: Locator
  readonly dspDetailServiceCostsHeader: Locator
  readonly tblDspDetailServiceCosts: Locator
  readonly dspDetailTypeOfDataSection: Locator
  readonly dspDetailTypeOfDataHeader: Locator
  readonly dspDetailCoverageHeader: Locator
  readonly dspDetailCoverageSection: Locator
  readonly dspDetailSectionContent: Locator
  readonly dspDetailSuitedHeader: Locator
  readonly dspDetailSuitedToSection: Locator
  readonly dspDetailNotSuitedSection: Locator
  readonly dspDetailVideo: Locator
  readonly linkDspDetailExternal: Locator
  readonly dspDetailSummaryInfoSection: Locator
  readonly dspDetailFundedBy: Locator
  readonly dspDetailFirstPublished: Locator
  readonly dspDetailSummaryLastUpdated: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.linkBackToProviders = page.locator('a[class="govuk-back-link"]')
    this.dspDetailName = page.locator('h2[class="govuk-heading-l mb-2"]')
    this.dspDetailSidebar = page.locator('div[data-testid="frf-dsp-sidebar"]')
    this.contactResearchHeader = page.locator('h3[class="govuk-heading-m heading-underscore text-navy-100"]')
    this.txtContactResearch = page.locator(
      'div[class="govuk-!-margin-top-8 govuk-!-padding-top-4 border-t-4 border-t-purple-100"] p'
    )
    this.btnContactResearch = page.locator('a[class="govuk-button govuk-button--secondary"]')
    this.contactDspHeader = page.locator('h3[class="govuk-heading-m"]')
    this.txtContactDsp = page.locator('div[class="govuk-body"]')
    this.btnContactDsp = page.locator('a[class="govuk-button mb-0"]')
    this.dspDetailOrgName = page.locator('h3[class="govuk-body-m mb-0 text-darkGrey"]')
    this.dspDetailOverviewSection = page.locator('div[data-testid="frf-dsp-description"]')
    this.dspDetailServiceCostsSection = page.locator(
      'table[class="govuk-table govuk-!-font-size-16 table-fixed govuk-!-margin-top-6 govuk-!-margin-bottom-6"] '
    )
    this.dspDetailServiceCostsHeader = page.locator('caption[class="govuk-table__caption govuk-body-m mb-2"]')
    this.tblDspDetailServiceCosts = page.locator(
      'table[class="govuk-table govuk-!-font-size-16 table-fixed govuk-!-margin-top-6 govuk-!-margin-bottom-6"] tbody'
    )
    this.dspDetailTypeOfDataSection = page.locator('div[class="govuk-!-margin-bottom-6"]') //nth 0
    this.dspDetailTypeOfDataHeader = page.locator(
      'h3[class="govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-3 md:mt-0"]'
    )
    this.dspDetailCoverageHeader = page.locator('h3[class="govuk-heading-s mb-3"]').nth(0)
    this.dspDetailCoverageSection = page.locator('ul[aria-label="Coverage"]')
    this.dspDetailSectionContent = page.locator(
      'li[class="govuk-body govuk-!-margin-bottom-2 flex list-none items-start gap-x-2 gap-y-1"]'
    )
    this.dspDetailSuitedHeader = page.locator('h3[class="govuk-heading-s mb-3"]').nth(1)
    this.dspDetailSuitedToSection = page.locator('ul[aria-label="Suited to:"]')
    this.dspDetailNotSuitedSection = page.locator('ul[aria-label="Not suited to:"]')
    this.dspDetailVideo = page.locator('iframe[class="aspect-video w-full max-w-[700px] lg:w-[450px]"]')
    this.linkDspDetailExternal = page.locator('a[class="govuk-!-margin-top-4 govuk-body inline-block"]')
    this.dspDetailSummaryInfoSection = page.locator('div[class="govuk-!-margin-top-9"]')
    this.dspDetailFundedBy = page.locator('div[class="govuk-!-margin-top-9"] p').nth(0)
    this.dspDetailFirstPublished = page.locator('div[class="govuk-!-margin-top-9"] p').nth(1)
    this.dspDetailSummaryLastUpdated = page.locator('div[class="govuk-!-margin-top-9"] p').nth(2)
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers/testing-dsp')
  }

  async assertOnProviderDetailsPage() {
    await expect(this.linkBackToProviders).toBeVisible()
    await expect(this.linkBackToProviders).toHaveText('Back to list of data service providers')
    await expect(this.dspDetailName).toBeVisible()
    await expect(this.dspDetailSidebar).toBeVisible()
  }

  async assertLinkToListProvided() {
    await expect(this.linkBackToProviders).toBeVisible()
    await expect(this.linkBackToProviders).toHaveText('Back to list of data service providers')
  }

  async assertContactResearchPresent() {
    await expect(this.contactResearchHeader).toBeVisible()
    await expect(this.contactResearchHeader).toHaveText('Get support for your research')
    await expect(this.txtContactResearch).toBeVisible()
    await expect(this.txtContactResearch).toContainText(
      'The UK offers multiple services and teams of professionals who can support you'
    )
    await expect(this.btnContactResearch).toBeVisible()
    await expect(this.btnContactResearch).toHaveText('Contact research support')
  }

  async assertContactDspPresent() {
    await expect(this.contactDspHeader).toBeVisible()
    await expect(this.contactDspHeader).toHaveText('Contact data service provider')
    await expect(this.txtContactDsp).toBeVisible()
    await expect(this.txtContactDsp).toContainText('you can contact them directly using this service')
    await expect(this.btnContactDsp).toBeVisible()
    await expect(this.btnContactDsp).toContainText('Get in touch with')
  }

  async assertDspName(expectedName: string) {
    await expect(this.dspDetailName).toBeVisible()
    const dspName = await this.dspDetailName.textContent()
    if (dspName != null) {
      const dspNameSplit = dspName?.split(':')
      expect(dspNameSplit[1].trim()).toEqual(expectedName)
    }
  }

  async assertDspOrg(expectedOrgName: string) {
    await expect(this.dspDetailOrgName).toBeVisible()
    const dspOrgName = await this.dspDetailOrgName.textContent()
    expect(dspOrgName).toEqual(expectedOrgName)
  }

  async assertDspOverview(expectedDescription: string) {
    await expect(this.dspDetailOverviewSection).toBeVisible()
    await expect(this.dspDetailOverviewSection.locator('p')).toContainText(expectedDescription)
  }

  async assertServicesCostsPresent() {
    await expect(this.dspDetailServiceCostsSection).toBeVisible()
    await expect(this.dspDetailServiceCostsHeader).toHaveText('Services available and costs:')
    await expect(this.tblDspDetailServiceCosts).toBeVisible()
  }

  async assertTypeOfDataPresent() {
    await expect(this.dspDetailTypeOfDataSection.nth(0)).toBeVisible()
    await expect(this.dspDetailTypeOfDataHeader).toBeVisible()
    await expect(this.dspDetailTypeOfDataHeader).toHaveText('Type of data available:')
  }

  async assertCoveragePresent(expectedPopulation: string) {
    await expect(this.dspDetailCoverageHeader).toBeVisible()
    await expect(this.dspDetailCoverageHeader).toHaveText('Coverage:')
    await expect(this.dspDetailCoverageSection).toBeVisible()
    await expect(this.dspDetailCoverageSection.locator(this.dspDetailSectionContent)).toHaveText(expectedPopulation)
  }

  async assertSuitedPresent() {
    await expect(this.dspDetailSuitedHeader).toBeVisible()
    await expect(this.dspDetailSuitedHeader).toHaveText('Suited to:')
    await expect(this.dspDetailSuitedToSection).toBeVisible()
    await expect(this.dspDetailNotSuitedSection).toBeVisible()
  }

  async assertVideoPresent() {
    await expect(this.dspDetailVideo).toBeVisible()
  }

  async assertExternalLinkPresent(expectedSite: string) {
    await expect(this.linkDspDetailExternal).toBeVisible()
    console.log(await this.linkDspDetailExternal.textContent())
    await expect(this.linkDspDetailExternal).toHaveText(
      'For more information visit ' + expectedSite + ' (Opens in a new window)'
    )
  }

  async assertFundPublishUpdated(expectedFunded: string, expectedPublished: string) {
    await expect(this.dspDetailSummaryInfoSection).toBeVisible()
    await expect(this.dspDetailFundedBy).toHaveText('Funded by: ' + expectedFunded)
    await expect(this.dspDetailFirstPublished).toHaveText('First published: ' + expectedPublished)
    await expect(this.dspDetailSummaryLastUpdated).toContainText('Last updated:')
  }
}
