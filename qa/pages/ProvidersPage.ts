import { expect, Locator, Page } from '@playwright/test'

import { numDaysBetween } from '../utils/UtilFunctions'

//Declare Page Objects
export default class ProvidersPage {
  readonly page: Page
  readonly btnViewMoreDetails: Locator
  readonly dspListArticle: Locator
  readonly dspListPageTitle: Locator
  readonly dspResultArticle: Locator
  readonly dspResultHeader: Locator
  readonly dspResultBody: Locator
  readonly dspResultFooter: Locator
  readonly dspResultTitle: Locator
  readonly dspResultOrgName: Locator
  readonly dspResultOverview: Locator
  readonly dspResultServicesCostsHeader: Locator
  readonly dspResultServiceCostsTbl: Locator
  readonly dspResultServiceCostsTblHeader: Locator
  readonly dspResultCoverageHeader: Locator
  readonly dspResultCoverageTxt: Locator
  readonly dspResultCoverageSupportTxt: Locator
  readonly dspResultSuitedHeader: Locator
  readonly dspResultSuitedList: Locator
  readonly dspResultFirstPublishedHeader: Locator
  readonly dspResultFirstPublishedValue: Locator
  readonly dspResultLastUpdatedHeader: Locator
  readonly dspResultLastUpdatedValue: Locator
  readonly dspResultNewIcon: Locator
  readonly dspResultPaginationSection: Locator
  readonly dspResultPaginationList: Locator
  readonly dspNextPageOption: Locator
  readonly dspPrevPageOption: Locator
  readonly dspCurrentPageIndicator: Locator
  readonly dspListPageTabTitle: Locator
  readonly dspListPageOneOption: Locator
  readonly dspListPageTwoOption: Locator
  readonly dspListTypeDataHeader: Locator
  readonly dspListTypeDataList: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //Locators
    this.btnViewMoreDetails = page.locator('a[class="govuk-button mb-0 whitespace-nowrap"]')
    this.dspListArticle = page.locator('ol[class="mt-5"]')
    this.dspListPageTitle = page.locator('p[class="govuk-heading-m mb-0 whitespace-nowrap"]')
    this.dspResultArticle = page.locator('article[class="shadow-card flex h-full flex-col bg-white govuk-body mb-8"]')
    this.dspResultHeader = page.locator('div[class="flex flex-col justify-between border-b border-grey-80 p-4"]')
    this.dspResultBody = page.locator('div[class="govuk-grid-column-three-quarters-from-desktop pr-5"]')
    this.dspResultFooter = page.locator(
      'div[class="items-center justify-between gap-3 border-t border-grey-80 p-4 sm:flex"]'
    )
    this.dspResultTitle = page.locator('a[class="text-black"]')
    this.dspResultOrgName = page.locator('h4[class="govuk-body-m mb-0 text-darkGrey"]')
    this.dspResultOverview = page.locator('div[data-testid="frf-dsp-description"]')
    this.dspResultServicesCostsHeader = page.locator('caption[class="govuk-table__caption govuk-body-m mb-2"]')
    this.dspResultServiceCostsTbl = page.locator(
      'table[class="govuk-table govuk-!-font-size-16 table-fixed mb-5 mt-6"]'
    )
    this.dspResultServiceCostsTblHeader = page.locator('th[scope="row"]')
    this.dspResultCoverageHeader = page.locator('h3[class="govuk-heading-s mb-3"]', { hasText: 'Coverage:' })
    this.dspResultCoverageTxt = page.locator('ul[aria-label="Coverage"] li')
    this.dspResultCoverageSupportTxt = page.locator('p[class="mb-0"]')
    this.dspResultSuitedHeader = page.locator('h3[class="govuk-heading-s mb-3"]', { hasText: 'Suited to:' })
    this.dspResultSuitedList = page.locator('ul[aria-label="Suited to:"]')
    this.dspResultFirstPublishedHeader = page.locator('strong', { hasText: 'First published:' })
    this.dspResultFirstPublishedValue = page.locator('span[class="ml-1 mr-3"]')
    this.dspResultLastUpdatedHeader = page.locator('strong', { hasText: 'Last updated:' })
    this.dspResultLastUpdatedValue = page.locator('span[class="ml-1"]')
    this.dspResultNewIcon = page.locator(
      'strong[class="govuk-tag govuk-tag--red ml-3 rounded-xl border-0 bg-coral-140 uppercase text-white"]'
    )
    this.dspResultPaginationSection = page.locator('nav[class="govuk-pagination"]')
    this.dspResultPaginationList = page.locator('ul[class="govuk-pagination__list"]')
    this.dspNextPageOption = page.locator('a[class="govuk-link govuk-pagination__link"][rel="next"]')
    this.dspPrevPageOption = page.locator('a[class="govuk-link govuk-pagination__link"][rel="prev"]')
    this.dspCurrentPageIndicator = page.locator('a[aria-current="page"]')
    this.dspListPageTabTitle = page.locator('head title')
    this.dspListPageOneOption = page.locator('a[aria-label="Page 1"]')
    this.dspListPageTwoOption = page.locator('a[aria-label="Page 2"]')
    this.dspListTypeDataHeader = page.locator(
      'h3[class="govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-3 md:mt-0"]'
    )
    this.dspListTypeDataList = page.locator(
      'div[class="[&>ul>li_p]:mb-1 [&>ul_li_p]:text-sm [&>ul_ul]:pt-1 [&>ul_ul_li:not(:last-child)]:mb-0"] ul[class="list-disc pl-4"]'
    )
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers')
  }

  async assertOnProvidersPage() {
    await expect(this.page).toHaveURL('/providers')
    await expect(this.btnViewMoreDetails.nth(0)).toBeVisible()
    await expect(this.btnViewMoreDetails).toHaveCount(4)
  }

  async assertDspListAppears() {
    await expect(this.dspListArticle).toBeVisible()
    await expect(this.dspResultArticle.nth(0)).toBeVisible()
    await expect(this.dspResultHeader.nth(0)).toBeVisible()
    await expect(this.dspResultBody.nth(0)).toBeVisible()
    await expect(this.dspResultFooter.nth(0)).toBeVisible()
  }

  async assertDspListPageLimit() {
    await expect(this.dspListArticle).toBeVisible()
    await expect(this.dspResultArticle).toHaveCount(4)
    await expect(this.dspResultHeader).toHaveCount(4)
    await expect(this.dspResultBody).toHaveCount(4)
    await expect(this.dspResultFooter).toHaveCount(4)
  }

  async assertPageTitle() {
    const titleText = await this.dspListPageTitle.textContent()
    const txtResTitleNo = await this.getPageTitleNumber()
    const splitIndex = titleText?.indexOf(' ')

    if (txtResTitleNo && splitIndex !== undefined) {
      const txtResTitleTxt = titleText?.substring(splitIndex, titleText.length)
      expect(parseInt(txtResTitleNo)).not.toBeNaN()
      expect(txtResTitleTxt?.trim()).toBe('data service providers found')
    }
  }

  async assertDspListAlphabetical() {
    await expect(this.dspListArticle).toBeVisible()
    await expect(this.dspResultHeader.nth(0)).toBeVisible()
    const titleElements = await this.dspResultTitle.all()
    const actualTitleOrder: Array<string | null> = []

    for (const title of titleElements) {
      const titleText = await title.textContent()
      if (titleText !== null) {
        actualTitleOrder.push(titleText.toLowerCase())
      }
    }
    const expectedTitleOrder = JSON.parse(JSON.stringify(actualTitleOrder))
    expect(actualTitleOrder).toEqual(expectedTitleOrder.sort())
  }

  async assertDspNameOrg() {
    const titleText = await this.dspResultTitle.nth(0).textContent()
    if (titleText !== null) {
      expect(titleText.substring(titleText.indexOf(':') + 1, titleText.length).trim()).toEqual(
        'Genomic Profile Register'
      )
    }
    expect(await this.dspResultOrgName.nth(0).textContent()).toEqual('Genomic Profile Register')
  }

  async assertDspOverviewPresent() {
    await expect(this.dspResultOverview.nth(0)).toBeVisible()
    await expect(this.dspResultOverview.nth(0).locator('p').nth(0)).toContainText(
      'Genomic Profile Register: secure, national database of genomic and health data'
    )
  }

  async assertDspServicesCosts() {
    await expect(this.dspResultServiceCostsTbl.nth(0)).toBeVisible()
    await expect(this.dspResultServicesCostsHeader.nth(0)).toBeVisible()
    expect(await this.dspResultServicesCostsHeader.nth(0).textContent()).toEqual('Services available and costs:')
    expect(
      await this.dspResultServiceCostsTbl.nth(0).locator(this.dspResultServiceCostsTblHeader.nth(0)).textContent()
    ).toEqual('Find')
    expect(
      await this.dspResultServiceCostsTbl.nth(0).locator(this.dspResultServiceCostsTblHeader.nth(1)).textContent()
    ).toEqual('Recruit')
    expect(
      await this.dspResultServiceCostsTbl.nth(0).locator(this.dspResultServiceCostsTblHeader.nth(2)).textContent()
    ).toEqual('Follow-Up')
  }

  async assertDspCoverage() {
    await expect(this.dspResultCoverageHeader.nth(0)).toBeVisible()
  }

  async assertDspCoverageSupport() {
    await expect(this.dspResultCoverageSupportTxt.nth(0)).toBeVisible()
    await expect(this.dspResultCoverageSupportTxt.nth(0)).toHaveText(
      'NHS England holds data for all patients registered in England.'
    )
  }

  async assertDspCoverageUkFirst() {
    await expect(this.dspResultCoverageTxt.nth(0)).toContainText('Geographical: UK wide')
  }

  async assertDspSuitedTo() {
    await expect(this.dspResultSuitedHeader.nth(0)).toBeVisible()
    await expect(this.dspResultSuitedList.nth(0)).toBeVisible()
    await expect(this.dspResultSuitedList.nth(0).locator('li')).toHaveCount(4)
    expect(await this.dspResultSuitedList.nth(0).locator('li').nth(0).textContent()).toEqual('Drug development trials')
    expect(await this.dspResultSuitedList.nth(0).locator('li').nth(3).textContent()).toEqual('Large patient cohorts')
  }

  async assertDspFirstPubLastUpdate() {
    await expect(this.dspResultFirstPublishedHeader.nth(0)).toBeVisible()
    await expect(this.dspResultLastUpdatedHeader.nth(0)).toBeVisible()
    expect(await this.dspResultFirstPublishedValue.nth(0).textContent()).toEqual('8 June 2023')
    expect(await this.dspResultLastUpdatedValue.nth(0).textContent()).toContain('2023')
  }

  async assertDspIsNew() {
    const firstPublishedValue = await this.dspResultFirstPublishedValue.nth(0).textContent()
    if (firstPublishedValue !== null) {
      const strPublishDate = new Date(firstPublishedValue).toLocaleDateString()
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate())
      const strCurrentDate = new Date(currentDate).toLocaleDateString()

      const alignedCurrentDate = new Date(strCurrentDate)
      const alignedPublishDate = new Date(strPublishDate)
      const daysDifference = numDaysBetween(alignedCurrentDate, alignedPublishDate)
      expect(daysDifference).toBeLessThan(90)
    }
  }

  async assertDspNewIconAppears() {
    await expect(this.dspResultHeader.nth(0).locator(this.dspResultNewIcon)).toBeVisible()
    expect(await this.dspResultHeader.nth(0).locator(this.dspResultNewIcon).textContent()).toEqual('New')
  }

  async assertDspResultsGreaterThanFour() {
    const txtResTitleNo = await this.getPageTitleNumber()
    if (txtResTitleNo !== undefined) {
      expect(parseInt(txtResTitleNo)).toBeGreaterThan(4)
    }
  }

  async assertPageControlPresent() {
    await expect(this.dspResultPaginationSection).toBeVisible()
    await expect(this.dspResultPaginationList).toBeVisible()
  }

  async assertPageNextPresent() {
    await expect(this.dspNextPageOption).toBeVisible()
  }

  async assertPageNextHidden() {
    await expect(this.dspNextPageOption).not.toBeVisible()
  }

  async assertPagePrevPresent() {
    await expect(this.dspPrevPageOption).toBeVisible()
  }

  async assertPagePrevHidden() {
    await expect(this.dspPrevPageOption).not.toBeVisible()
  }

  async assertCurrentPage(pageNo: string) {
    await expect(this.dspCurrentPageIndicator).toHaveText(`${pageNo}`)
  }

  async assertCurrentPageTitle(pageNo: string) {
    await this.page.waitForURL(`https://test.findrecruitandfollowup.nihr.ac.uk/providers?page=${pageNo}`)
    const pageCount = await this.dspResultPaginationList.locator('li').count()
    const txtResTitleNo = await this.getPageTitleNumber()
    expect(await this.dspListPageTabTitle.textContent()).toBe(
      `List of data service providers (${txtResTitleNo} search results, page ${pageNo} of ${pageCount}) - Find, Recruit and Follow-up`
    )
  }

  async getPageTitleNumber(): Promise<string | undefined> {
    await expect(this.dspListPageTitle).toBeVisible()
    const titleText = await this.dspListPageTitle.textContent()
    const txtResTitleNo = titleText?.split(' ').at(0)
    return txtResTitleNo
  }

  async assertDspTypeOfData() {
    await expect(this.dspListTypeDataHeader.nth(0)).toBeVisible()
    await expect(this.dspListTypeDataList.nth(0)).toBeVisible()
    await expect(this.dspListTypeDataList.nth(0).locator('li')).toHaveCount(3)
    await expect(this.dspListTypeDataList.nth(0).locator('li').nth(0)).toHaveText('Primary care')
    await expect(this.dspListTypeDataList.nth(0).locator('li').nth(2)).toHaveText('Participant reported')
  }
}
