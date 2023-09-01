import { expect, Locator, Page } from '@playwright/test'

//Declare Page Objects
export default class ProviderDetailsPage {
  readonly page: Page
  readonly pageTitle: Locator
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
  readonly dspDetailCoverageSupportTxt: Locator
  readonly dspDetailSectionContent: Locator
  readonly dspDetailSuitedHeader: Locator
  readonly dspDetailSuitedToSection: Locator
  readonly dspDetailSuitedToValuePhase: Locator
  readonly dspDetailSuitedToValueRecruitment: Locator
  readonly dspDetailNotSuitedSection: Locator
  readonly dspDetailNotSuitedValuePhase: Locator
  readonly dspDetailNotSuitedValueRecruitment: Locator
  readonly dspDetailVideo: Locator
  readonly linkDspDetailExternal: Locator
  readonly dspDetailSummaryInfoSection: Locator
  readonly dspDetailFundedBy: Locator
  readonly dspDetailFirstPublished: Locator
  readonly dspDetailSummaryLastUpdated: Locator
  readonly dspDetailDataContentHeader: Locator
  readonly dspDetailDataContentSubSectionBlockHeader: Locator
  readonly dspDetailDataContentSubSectionSearchTestHeader: Locator
  readonly dspDetailDataContentSubSectionGenericHeader: Locator
  readonly dspDetailDataContentTxtContent: Locator
  readonly dspDetailGeoPopulationHeader: Locator
  readonly dspDetailInfoGovHeader: Locator
  readonly dspDetailRecruitLvlTwoSection: Locator
  readonly dspDetailRecruitLvlTwoHeader: Locator
  readonly dspDetailRecruitLvlTwoCostsHeader: Locator
  readonly dspDetailRecruitLvlTwoCostsTblHeader: Locator
  readonly dspDetailRecruitLvlTwoCostsTblRow: Locator
  readonly dspDetailRecruitLvlTwoSubSectionHeader: Locator
  readonly dspDetailRecruitLvlTwoTxtContent: Locator
  readonly dspDetailFindLvlTwoSection: Locator
  readonly dspDetailFindLvlTwoHeader: Locator
  readonly dspDetailFollowLvlTwoSection: Locator
  readonly dspDetailFollowLvlTwoHeader: Locator
  readonly dspDetailCoverageGeography: Locator
  readonly dspDetailBulletList: Locator
  readonly dspDetailChrisTestPageLink: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.pageTitle = page.locator('h1[class="govuk-panel__title heading-underscore pt-1"]')
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
    this.dspDetailCoverageSupportTxt = page.locator('ul[aria-label="Coverage"] p[class="mb-0"]')
    this.dspDetailSectionContent = page.locator(
      'li[class="govuk-body govuk-!-margin-bottom-2 flex list-none items-start gap-x-2 gap-y-1"]'
    )
    this.dspDetailSuitedHeader = page.locator('h3[class="govuk-heading-s mb-3"]').nth(1)
    this.dspDetailSuitedToSection = page.locator('ul[aria-label="Suited to:"]')
    this.dspDetailSuitedToValuePhase = page.locator('ul[aria-label="Suited to:"] li', { hasText: 'Phase 2 Trials' })
    this.dspDetailSuitedToValueRecruitment = page.locator('ul[aria-label="Suited to:"] li', {
      hasText: 'Recruitment Targeting 100 to 1000 patients',
    })
    this.dspDetailNotSuitedSection = page.locator('ul[aria-label="Not suited to:"]')
    this.dspDetailNotSuitedValuePhase = page.locator('ul[aria-label="Not suited to:"] li', {
      hasText: 'Phase 1 Trials',
    })
    this.dspDetailNotSuitedValueRecruitment = page.locator('ul[aria-label="Not suited to:"] li', {
      hasText: 'Recruitment Targeting 1000+ or more patients',
    })
    this.dspDetailVideo = page.locator('iframe[class="aspect-video w-full max-w-[700px] lg:w-[450px]"]')
    this.linkDspDetailExternal = page.locator('a[class="govuk-!-margin-top-4 govuk-body inline-block"]')
    this.dspDetailSummaryInfoSection = page.locator('div[class="govuk-!-margin-top-9"]')
    this.dspDetailFundedBy = page.locator('div[class="govuk-!-margin-top-9"] p').nth(0)
    this.dspDetailFirstPublished = page.locator('div[class="govuk-!-margin-top-9"] p').nth(1)
    this.dspDetailSummaryLastUpdated = page.locator('div[class="govuk-!-margin-top-9"] p').nth(2)
    this.dspDetailDataContentHeader = page.locator('section div[data-testid="frf-dsp-section-panel"] h3', {
      hasText: 'Data content',
    })
    this.dspDetailDataContentSubSectionBlockHeader = page.locator(
      'section summary[class="govuk-details__summary"] span',

      {
        hasText: 'This is a Test Block',
      }
    )
    this.dspDetailDataContentSubSectionSearchTestHeader = page.locator(
      'section summary[class="govuk-details__summary"] span',
      {
        hasText: 'Header for FRF-120 Testing',
      }
    )
    this.dspDetailDataContentSubSectionGenericHeader = page.locator(
      'section summary[class="govuk-details__summary"] span',
      {
        hasText: 'Link To Generic Test Page',
      }
    )
    this.dspDetailDataContentTxtContent = page
      .locator('div[class="govuk-details__text [&>*>p:last-child]:mb-0"]')
      .nth(0)
    this.dspDetailGeoPopulationHeader = page.locator('section div[data-testid="frf-dsp-section-panel"] h3', {
      hasText: 'Geographical and population coverage',
    })
    this.dspDetailInfoGovHeader = page.locator('section div[data-testid="frf-dsp-section-panel"] h3', {
      hasText: 'Information governance',
    })
    this.dspDetailRecruitLvlTwoSection = page.locator('section[id="recruit"]')
    this.dspDetailRecruitLvlTwoHeader = page.locator('section[id="recruit"] h3')
    this.dspDetailRecruitLvlTwoCostsHeader = page.locator(
      'section[id="recruit"] div[class="govuk-!-margin-top-6 govuk-!-margin-bottom-6"] p'
    )
    this.dspDetailRecruitLvlTwoCostsTblHeader = page.locator(
      'section[id="recruit"] div[class="govuk-!-margin-top-6 govuk-!-margin-bottom-6"] th'
    )
    this.dspDetailRecruitLvlTwoCostsTblRow = page.locator(
      'section[id="recruit"] div[class="govuk-!-margin-top-6 govuk-!-margin-bottom-6"] td'
    )
    this.dspDetailRecruitLvlTwoSubSectionHeader = page.locator('section summary[class="govuk-details__summary"] span', {
      hasText: 'Find Test Expandible',
    })
    this.dspDetailRecruitLvlTwoTxtContent = page
      .locator('div[class="govuk-details__text [&>*>p:last-child]:mb-0"]')
      .nth(1)
    this.dspDetailFindLvlTwoSection = page.locator('section[id="find"]')
    this.dspDetailFindLvlTwoHeader = page.locator('section[id="find"] h3')
    this.dspDetailFollowLvlTwoSection = page.locator('section[id="follow-up"]')
    this.dspDetailFollowLvlTwoHeader = page.locator('section[id="follow-up"] h3')
    this.dspDetailCoverageGeography = page.locator('p[class="govuk-!-margin-bottom-1"]')
    this.dspDetailBulletList = page.locator('ul[class="govuk-list govuk-list--bullet"]')
    this.dspDetailChrisTestPageLink = page.locator(
      'a[href="https://test.findrecruitandfollowup.nihr.ac.uk/chris-testing-page"]'
    )
  }

  //Page Methods
  async goto(path: string) {
    await this.page.goto(path)
  }

  async assertOnProviderDetailsPage() {
    await expect(this.pageTitle).toBeVisible()
    await expect(this.linkBackToProviders).toBeVisible()
    await expect(this.pageTitle).toHaveText('Data Service Provider details')
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

  async assertCoverageSupportTxtPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailCoverageSupportTxt).toBeVisible()
      await expect(this.dspDetailCoverageSupportTxt).toHaveText('This is Supporting Geography Text Updated')
    } else {
      await expect(this.dspDetailCoverageSupportTxt).toBeHidden()
    }
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

  async assertDataContentPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailDataContentHeader).toBeVisible()
      await expect(this.dspDetailDataContentSubSectionBlockHeader).toBeVisible()
      await expect(this.dspDetailDataContentTxtContent).toBeHidden()
    } else {
      await expect(this.dspDetailDataContentHeader).toBeHidden()
    }
  }

  async assertDataContentTxtVisible() {
    await expect(this.dspDetailDataContentTxtContent).toBeVisible()
  }

  async assertGeoPopulationPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailGeoPopulationHeader).toBeVisible()
    } else {
      await expect(this.dspDetailGeoPopulationHeader).toBeHidden()
    }
  }

  async assertInfoGovernancePresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailInfoGovHeader).toBeVisible()
    } else {
      await expect(this.dspDetailInfoGovHeader).toBeHidden()
    }
  }

  async assertRecruitLvlTwoPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailRecruitLvlTwoSection).toBeVisible()
      await expect(this.dspDetailRecruitLvlTwoHeader).toBeVisible()
      await expect(this.dspDetailRecruitLvlTwoHeader).toHaveText('Recruit')
      await expect(this.dspDetailRecruitLvlTwoSubSectionHeader).toBeVisible()
      await expect(this.dspDetailRecruitLvlTwoTxtContent).toBeHidden()
    } else {
      await expect(this.dspDetailRecruitLvlTwoSection).toBeHidden()
      await expect(this.dspDetailRecruitLvlTwoHeader).toBeHidden()
    }
  }

  async assertRecruitLvlTwoTxtVisible() {
    await expect(this.dspDetailRecruitLvlTwoTxtContent).toBeVisible()
  }

  async assertRecruitLvlTwoCostsPresent() {
    await expect(this.dspDetailRecruitLvlTwoCostsHeader).toBeVisible()
    await expect(this.dspDetailRecruitLvlTwoCostsTblHeader).toBeVisible()
    await expect(this.dspDetailRecruitLvlTwoCostsTblRow).toBeVisible()
    await expect(this.dspDetailRecruitLvlTwoCostsHeader).toHaveText('Costs:')
  }

  async assertRecruitCostsMatch() {
    expect(await this.tblDspDetailServiceCosts.locator('tr').nth(1).locator('th').textContent()).toEqual(
      await this.dspDetailRecruitLvlTwoCostsTblHeader.textContent()
    )
    expect(await this.tblDspDetailServiceCosts.locator('tr').nth(1).locator('td').textContent()).toEqual(
      await this.dspDetailRecruitLvlTwoCostsTblRow.textContent()
    )
  }

  async assertFindLvlTwoPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailFindLvlTwoSection).toBeVisible()
      await expect(this.dspDetailFindLvlTwoHeader).toBeVisible()
      await expect(this.dspDetailFindLvlTwoHeader).toHaveText('Find')
    } else {
      await expect(this.dspDetailFindLvlTwoSection).toBeHidden()
      await expect(this.dspDetailFindLvlTwoHeader).toBeHidden()
    }
  }

  async assertFollowLvlTwoPresent(visibilty: boolean) {
    if (visibilty) {
      await expect(this.dspDetailFollowLvlTwoSection).toBeVisible()
      await expect(this.dspDetailFollowLvlTwoHeader).toBeVisible()
      await expect(this.dspDetailFollowLvlTwoHeader).toHaveText('Follow-up')
    } else {
      await expect(this.dspDetailFollowLvlTwoSection).toBeHidden()
      await expect(this.dspDetailFollowLvlTwoHeader).toBeHidden()
    }
  }

  async assertServiceLinked(service: string, linked: boolean) {
    let serviceIndex = 3
    switch (service) {
      case 'Find':
        serviceIndex = 0
        break
      case 'Recruit':
        serviceIndex = 1
        break
      case 'Follow-Up':
        serviceIndex = 2
        break
      default:
        throw new Error(`${service} is not a valid Service option`)
    }
    await expect(this.tblDspDetailServiceCosts.locator('tr').nth(serviceIndex).locator('th')).toHaveText(service)
    if (linked) {
      await expect(this.tblDspDetailServiceCosts.locator('tr').nth(serviceIndex).locator('th a')).toHaveAttribute(
        'href',
        '#' + service.toLowerCase()
      )
    } else {
      await expect(this.tblDspDetailServiceCosts.locator('tr').nth(serviceIndex).locator('th a')).not.toBeAttached()
    }
  }

  async assertUkWideOnly() {
    await expect(this.dspDetailCoverageGeography).toBeVisible()
    await expect(this.dspDetailCoverageGeography).toHaveText('Geographical: UK wide')
  }

  async clickExternalSiteLink() {
    const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), this.linkDspDetailExternal.click()])
    newPage.waitForURL('https://www.bbc.co.uk/news/health'),
      await newPage.waitForLoadState('domcontentloaded'),
      expect(await newPage.title()).toEqual('Health - BBC News')
  }

  async assertOnNewTab() {
    expect(this.page.context().pages().length).toEqual(2)
    expect(await this.page.context().pages().at(0)?.title()).toEqual(
      'Further details for Testing DSP - Find, Recruit and Follow-up'
    )
  }

  async assertSuitedToValues() {
    await expect(this.dspDetailSuitedToValuePhase).toBeVisible()
    await expect(this.dspDetailSuitedToValueRecruitment).toBeVisible()
  }

  async assertSuitedToIndicator() {
    await expect(this.dspDetailSuitedToValuePhase.locator('svg')).toHaveAttribute('data-testid', 'frf-icon-tick')
    await expect(this.dspDetailSuitedToValueRecruitment.locator('svg')).toHaveAttribute('data-testid', 'frf-icon-tick')
  }

  async assertNotSuitedToValues() {
    await expect(this.dspDetailNotSuitedValuePhase).toBeVisible()
    await expect(this.dspDetailNotSuitedValueRecruitment).toBeVisible()
  }

  async assertNotSuitedToIndicator() {
    await expect(this.dspDetailNotSuitedValuePhase.locator('svg')).toHaveAttribute('data-testid', 'frf-icon-cross')
    await expect(this.dspDetailNotSuitedValueRecruitment.locator('svg')).toHaveAttribute(
      'data-testid',
      'frf-icon-cross'
    )
  }

  async assertDspSearchResultFundedBy(expectedFundedBy: string) {
    await expect(this.dspDetailFundedBy).toContainText(expectedFundedBy, { ignoreCase: true })
  }

  async assertDspSearchResultFindServiceDescription(expectedServiceDesc: string) {
    await expect(this.dspDetailFindLvlTwoSection.locator('div p').nth(0)).toContainText(expectedServiceDesc, {
      ignoreCase: true,
    })
  }

  async assertDspSearchResultTypeOfData(expectedTypeData: string) {
    await expect(
      this.dspDetailTypeOfDataSection.nth(0).locator(this.dspDetailBulletList).locator('li p')
    ).toContainText(expectedTypeData, { ignoreCase: true })
  }

  async assertDspSearchResultWebName(expectedWebName: string) {
    await expect(this.linkDspDetailExternal).toContainText(expectedWebName, { ignoreCase: true })
  }

  async assertDspSearchResultDataContent(expectedContent: string) {
    await this.dspDetailDataContentSubSectionSearchTestHeader.click()
    await expect(
      this.dspDetailDataContentTxtContent
        .locator(this.dspDetailBulletList)
        .locator('li p', { hasText: expectedContent })
    ).toBeVisible()
  }

  async assertDspSearchResultGeoPopCoverage(expectedGeoPop: string) {
    await expect(this.dspDetailGeoPopulationHeader.locator('..').locator('..').locator('div p')).toContainText(
      expectedGeoPop,
      { ignoreCase: true }
    )
  }

  async assertDspSearchResultInfoGov(expectedGeoPop: string) {
    await expect(this.dspDetailInfoGovHeader.locator('..').locator('..').locator('div p')).toContainText(
      expectedGeoPop,
      { ignoreCase: true }
    )
  }
}
