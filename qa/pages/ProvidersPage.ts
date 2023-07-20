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

  //Filter Objects
  readonly dspFilterMobileBtnOpen: Locator
  readonly dspFilterMobileBtnClose: Locator
  readonly dspFilterMobileIconClose: Locator
  readonly dspFilterPanel: Locator
  readonly dspFilterServiceTitle: Locator
  readonly dspFilterCoverageTitle: Locator
  readonly dspFilterCostsTitle: Locator
  readonly dspFilterOptionFind: Locator
  readonly dspFilterOptionFindLbl: Locator
  readonly dspFilterOptionRecruit: Locator
  readonly dspFilterOptionRecruitLbl: Locator
  readonly dspFilterOptionFollow: Locator
  readonly dspFilterOptionFollowLbl: Locator
  readonly dspFilterOptionUk: Locator
  readonly dspFilterOptionUkLbl: Locator
  readonly dspFilterOptionEngland: Locator
  readonly dspFilterOptionEnglandLbl: Locator
  readonly dspFilterOptionNi: Locator
  readonly dspFilterOptionNiLbl: Locator
  readonly dspFilterOptionScotland: Locator
  readonly dspFilterOptionScotlandLbl: Locator
  readonly dspFilterOptionWales: Locator
  readonly dspFilterOptionWalesLbl: Locator
  readonly dspFilterOptionRegional: Locator
  readonly dspFilterOptionRegionalLbl: Locator
  readonly dspFilterOptionFindFocAll: Locator
  readonly dspFilterOptionFindFocAllLbl: Locator
  readonly dspFilterOptionFindFocNonComm: Locator
  readonly dspFilterOptionFindFocNonCommLbl: Locator
  readonly dspFilterOptionFindChargeable: Locator
  readonly dspFilterOptionFindChargeableLbl: Locator
  readonly dspFilterOptionRecruitFocAll: Locator
  readonly dspFilterOptionRecruitFocAllLbl: Locator
  readonly dspFilterOptionRecruitFocNonComm: Locator
  readonly dspFilterOptionRecruitFocNonCommLbl: Locator
  readonly dspFilterOptionRecruitChargeable: Locator
  readonly dspFilterOptionRecruitChargeableLbl: Locator
  readonly dspFilterOptionFollowFocAll: Locator
  readonly dspFilterOptionFollowFocAllLbl: Locator
  readonly dspFilterOptionFollowFocNonComm: Locator
  readonly dspFilterOptionFollowFocNonCommLbl: Locator
  readonly dspFilterOptionFollowChargeable: Locator
  readonly dspFilterOptionFollowChargeableLbl: Locator

  readonly dspFilterServiceSection: Locator
  readonly dspFilterCoverageSection: Locator
  readonly dspFilterCostsSection: Locator

  readonly dspFilterOptionCostsFindHeader: Locator
  readonly dspFilterOptionCostsRecruitHeader: Locator
  readonly dspFilterOptionCostsFollowHeader: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page

    //List Locators
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

    //Filter Locators
    this.dspFilterMobileBtnOpen = page.locator('a[id="show-filters"]')
    this.dspFilterMobileBtnClose = page.locator(
      'a[href="#show-filters"][class=" govuk-button govuk-button--secondary w-full text-center md:hidden"]'
    )
    this.dspFilterMobileIconClose = page.locator('a[href="#show-filters"][aria-label="Close filters"]')
    this.dspFilterPanel = page.locator('div[id="filters"]')
    this.dspFilterServiceTitle = page.locator('details span[class="govuk-body m-0"]', { hasText: 'Type of service' })
    this.dspFilterServiceSection = page.locator('legend[class="govuk-visually-hidden"]', {
      hasText: 'Type of service filters',
    })
    this.dspFilterCoverageTitle = page.locator('details span[class="govuk-body m-0"]', {
      hasText: 'Geographical coverage',
    })
    this.dspFilterCoverageSection = page.locator('legend[class="govuk-visually-hidden"]', {
      hasText: 'Geographical coverage filters',
    })
    this.dspFilterCostsTitle = page.locator('details span[class="govuk-body m-0"]', { hasText: 'Costs' })
    this.dspFilterCostsSection = page.locator('legend[class="govuk-visually-hidden"]', { hasText: 'Costs filters' })
    this.dspFilterOptionFind = page.locator('input[name="serviceType"][id=":Rqebb6:"]')
    this.dspFilterOptionFindLbl = page.locator('label[for=":Rqebb6:"]')
    this.dspFilterOptionRecruit = page.locator('input[name="serviceType"][id=":R1aebb6:"]')
    this.dspFilterOptionRecruitLbl = page.locator('label[for=":R1aebb6:"]')
    this.dspFilterOptionFollow = page.locator('input[name="serviceType"][id=":R1qebb6:"]')
    this.dspFilterOptionFollowLbl = page.locator('label[for=":R1qebb6:"]')
    this.dspFilterOptionUk = page.locator('input[name="geography"][id=":R2qibb6:"]')
    this.dspFilterOptionUkLbl = page.locator('label[for=":R2qibb6:"]')
    this.dspFilterOptionEngland = page.locator('input[name="geography"][id=":R4qibb6:"]')
    this.dspFilterOptionEnglandLbl = page.locator('label[for=":R4qibb6:"]')
    this.dspFilterOptionNi = page.locator('input[name="geography"][id=":R6qibb6:"]')
    this.dspFilterOptionNiLbl = page.locator('label[for=":R6qibb6:"]')
    this.dspFilterOptionScotland = page.locator('input[name="geography"][id=":R8qibb6:"]')
    this.dspFilterOptionScotlandLbl = page.locator('label[for=":R8qibb6:"]')
    this.dspFilterOptionWales = page.locator('input[name="geography"][id=":Raqibb6:"]')
    this.dspFilterOptionWalesLbl = page.locator('label[for=":Raqibb6:"]')
    this.dspFilterOptionRegional = page.locator('input[name="excludeRegional"][id=":R1qibb6:"]')
    this.dspFilterOptionRegionalLbl = page.locator('label[for=":R1qibb6:"]')
    this.dspFilterOptionFindFocAll = page.locator('input[name="costs"][id=":Rcqmbb6:"]')
    this.dspFilterOptionFindFocAllLbl = page.locator('label[for=":Rcqmbb6:"]')
    this.dspFilterOptionFindFocNonComm = page.locator('input[name="costs"][id=":Rkqmbb6:"]')
    this.dspFilterOptionFindFocNonCommLbl = page.locator('label[for=":Rkqmbb6:"]')
    this.dspFilterOptionFindChargeable = page.locator('input[name="costs"][id=":Rsqmbb6:"]')
    this.dspFilterOptionFindChargeableLbl = page.locator('label[for=":Rsqmbb6:"]')
    this.dspFilterOptionRecruitFocAll = page.locator('input[name="costs"][id=":Rdambb6:"]')
    this.dspFilterOptionRecruitFocAllLbl = page.locator('label[for=":Rdambb6:"]')
    this.dspFilterOptionRecruitFocNonComm = page.locator('input[name="costs"][id=":Rlambb6:"]')
    this.dspFilterOptionRecruitFocNonCommLbl = page.locator('label[for=":Rlambb6:"]')
    this.dspFilterOptionRecruitChargeable = page.locator('input[name="costs"][id=":Rtambb6:"]')
    this.dspFilterOptionRecruitChargeableLbl = page.locator('label[for=":Rtambb6:"]')
    this.dspFilterOptionFollowFocAll = page.locator('input[name="costs"][id=":Rdqmbb6:"]')
    this.dspFilterOptionFollowFocAllLbl = page.locator('label[for=":Rdqmbb6:"]')
    this.dspFilterOptionFollowFocNonComm = page.locator('input[name="costs"][id=":Rlqmbb6:"]')
    this.dspFilterOptionFollowFocNonCommLbl = page.locator('label[for=":Rlqmbb6:"]')
    this.dspFilterOptionFollowChargeable = page.locator('input[name="costs"][id=":Rtqmbb6:"]')
    this.dspFilterOptionFollowChargeableLbl = page.locator('label[for=":Rtqmbb6:"]')
    this.dspFilterOptionCostsFindHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-find-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
    )
    this.dspFilterOptionCostsRecruitHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-recruit-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
    )
    this.dspFilterOptionCostsFollowHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-follow-up-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
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

  async assertMobileFilterToggle(buttonType: string) {
    if (buttonType.toLowerCase() == 'close') {
      await expect(this.dspFilterMobileBtnClose).toBeVisible()
      await expect(this.dspFilterMobileBtnClose).toHaveText('Close filters')
      await expect(this.dspFilterMobileIconClose).toBeVisible()
      await expect(this.dspFilterMobileBtnOpen).toBeHidden()
    } else {
      await expect(this.dspFilterMobileBtnOpen).toBeVisible()
      await expect(this.dspFilterMobileBtnOpen).toHaveText('Open filters')
      await expect(this.dspFilterMobileIconClose).toBeHidden()
      await expect(this.dspFilterMobileBtnClose).toBeHidden()
    }
  }

  async assertFilterPanelVisibility(filterState: string) {
    if (filterState.toLowerCase() == 'visible') {
      await expect(this.dspFilterPanel).toBeVisible()
    } else {
      await expect(this.dspFilterPanel).toBeHidden()
    }
  }

  async assertFilterCategoryPresent(category: string) {
    switch (category.toLowerCase()) {
      case 'type of service':
        await expect(this.dspFilterServiceTitle).toBeVisible()
        break
      case 'geographical coverage':
        await expect(this.dspFilterCoverageTitle).toBeVisible()
        break
      case 'costs':
        await expect(this.dspFilterCostsTitle).toBeVisible()
        break
      default:
        throw new Error(`${category} is not a valid Filter Category option`)
    }
  }

  async assertFilterOptionPresent(option: string) {
    switch (option.toLowerCase()) {
      case 'find':
        await expect(this.dspFilterOptionFind).toBeVisible()
        await expect(this.dspFilterOptionFindLbl).toBeVisible()
        await expect(this.dspFilterOptionFind).toHaveValue('Find')
        await expect(this.dspFilterOptionFindLbl).toHaveText('Find')
        break
      case 'recruit':
        await expect(this.dspFilterOptionRecruit).toBeVisible()
        await expect(this.dspFilterOptionRecruitLbl).toBeVisible()
        await expect(this.dspFilterOptionRecruit).toHaveValue('Recruit')
        await expect(this.dspFilterOptionRecruitLbl).toHaveText('Recruit')
        break
      case 'follow-up':
        await expect(this.dspFilterOptionFollow).toBeVisible()
        await expect(this.dspFilterOptionFollowLbl).toBeVisible()
        await expect(this.dspFilterOptionFollow).toHaveValue('Follow-Up')
        await expect(this.dspFilterOptionFollowLbl).toHaveText('Follow-Up')
        break
      case 'uk wide':
        await expect(this.dspFilterOptionUk).toBeVisible()
        await expect(this.dspFilterOptionUkLbl).toBeVisible()
        await expect(this.dspFilterOptionUk).toHaveValue('UK wide')
        await expect(this.dspFilterOptionUkLbl).toHaveText('UK wide')
        break
      case 'england':
        await expect(this.dspFilterOptionEngland).toBeVisible()
        await expect(this.dspFilterOptionEnglandLbl).toBeVisible()
        await expect(this.dspFilterOptionEngland).toHaveValue('England')
        await expect(this.dspFilterOptionEnglandLbl).toHaveText('England')
        break
      case 'northern ireland':
        await expect(this.dspFilterOptionNi).toBeVisible()
        await expect(this.dspFilterOptionNiLbl).toBeVisible()
        await expect(this.dspFilterOptionNi).toHaveValue('Northern Ireland')
        await expect(this.dspFilterOptionNiLbl).toHaveText('Northern Ireland')
        break
      case 'scotland':
        await expect(this.dspFilterOptionScotland).toBeVisible()
        await expect(this.dspFilterOptionScotlandLbl).toBeVisible()
        await expect(this.dspFilterOptionScotland).toHaveValue('Scotland')
        await expect(this.dspFilterOptionScotlandLbl).toHaveText('Scotland')
        break
      case 'wales':
        await expect(this.dspFilterOptionWales).toBeVisible()
        await expect(this.dspFilterOptionWalesLbl).toBeVisible()
        await expect(this.dspFilterOptionWales).toHaveValue('Wales')
        await expect(this.dspFilterOptionWalesLbl).toHaveText('Wales')
        break
      case 'exclude regional':
        await expect(this.dspFilterOptionRegional).toBeVisible()
        await expect(this.dspFilterOptionRegionalLbl).toBeVisible()
        await expect(this.dspFilterOptionRegional).toHaveValue('true')
        await expect(this.dspFilterOptionRegionalLbl).toHaveText('Exclude regional only services')
        break
      case 'find foc all':
        await expect(this.dspFilterOptionFindFocAll).toBeVisible()
        await expect(this.dspFilterOptionFindFocAllLbl).toBeVisible()
        await expect(this.dspFilterOptionFindFocAll).toHaveValue('Find: Free of charge (All studies)')
        await expect(this.dspFilterOptionFindFocAllLbl).toHaveText('Free of charge (All studies)')
        break
      case 'find foc non-comm':
        await expect(this.dspFilterOptionFindFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionFindFocNonCommLbl).toBeVisible()
        await expect(this.dspFilterOptionFindFocNonComm).toHaveValue(
          'Find: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionFindFocNonCommLbl).toHaveText('Free of charge (non-commercial studies only)')
        break
      case 'find chargeable':
        await expect(this.dspFilterOptionFindChargeable).toBeVisible()
        await expect(this.dspFilterOptionFindChargeableLbl).toBeVisible()
        await expect(this.dspFilterOptionFindChargeable).toHaveValue('Find: Chargeable service')
        await expect(this.dspFilterOptionFindChargeableLbl).toHaveText('Chargeable service')
        break
      case 'recruit foc all':
        await expect(this.dspFilterOptionRecruitFocAll).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocAllLbl).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocAll).toHaveValue('Recruit: Free of charge (All studies)')
        await expect(this.dspFilterOptionRecruitFocAllLbl).toHaveText('Free of charge (All studies)')
        break
      case 'recruit foc non-comm':
        await expect(this.dspFilterOptionRecruitFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocNonCommLbl).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocNonComm).toHaveValue(
          'Recruit: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionRecruitFocNonCommLbl).toHaveText(
          'Free of charge (non-commercial studies only)'
        )
        break
      case 'recruit chargeable':
        await expect(this.dspFilterOptionRecruitChargeable).toBeVisible()
        await expect(this.dspFilterOptionRecruitChargeableLbl).toBeVisible()
        await expect(this.dspFilterOptionRecruitChargeable).toHaveValue('Recruit: Chargeable service')
        await expect(this.dspFilterOptionRecruitChargeableLbl).toHaveText('Chargeable service')
        break
      case 'follow-up foc all':
        await expect(this.dspFilterOptionFollowFocAll).toBeVisible()
        await expect(this.dspFilterOptionFollowFocAllLbl).toBeVisible()
        await expect(this.dspFilterOptionFollowFocAll).toHaveValue('Follow-Up: Free of charge (All studies)')
        await expect(this.dspFilterOptionFollowFocAllLbl).toHaveText('Free of charge (All studies)')
        break
      case 'follow-up foc non-comm':
        await expect(this.dspFilterOptionFollowFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionFollowFocNonCommLbl).toBeVisible()
        await expect(this.dspFilterOptionFollowFocNonComm).toHaveValue(
          'Follow-Up: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionFollowFocNonCommLbl).toHaveText('Free of charge (non-commercial studies only)')
        break
      case 'follow-up chargeable':
        await expect(this.dspFilterOptionFollowChargeable).toBeVisible()
        await expect(this.dspFilterOptionFollowChargeableLbl).toBeVisible()
        await expect(this.dspFilterOptionFollowChargeable).toHaveValue('Follow-Up: Chargeable service')
        await expect(this.dspFilterOptionFollowChargeableLbl).toHaveText('Chargeable service')
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
  }

  async assertFilterCategoryHeaderPresent(header: string) {
    switch (header.toLowerCase()) {
      case 'find':
        await expect(this.dspFilterOptionCostsFindHeader).toBeVisible()
        await expect(this.dspFilterOptionCostsFindHeader).toHaveText('Find')
        break
      case 'recruit':
        await expect(this.dspFilterOptionCostsRecruitHeader).toBeVisible()
        await expect(this.dspFilterOptionCostsRecruitHeader).toHaveText('Recruit')
        break
      case 'follow-up':
        await expect(this.dspFilterOptionCostsFollowHeader).toBeVisible()
        await expect(this.dspFilterOptionCostsFollowHeader).toHaveText('Follow--Up')
        break
      default:
        throw new Error(`${header} is not a valid Filter Category option`)
    }
  }

  async assertFilterCategoryState(category: string, state: string) {
    let categoryLocator: Locator
    let sectionLocator: Locator
    switch (category.toLowerCase()) {
      case 'type of service':
        categoryLocator = this.dspFilterServiceTitle
        sectionLocator = this.dspFilterServiceSection
        break
      case 'geographical coverage':
        categoryLocator = this.dspFilterCoverageTitle
        sectionLocator = this.dspFilterCoverageSection
        break
      case 'costs':
        categoryLocator = this.dspFilterCostsTitle
        sectionLocator = this.dspFilterCostsSection
        break
      default:
        throw new Error(`${category} is not a valid Filter Category option`)
    }
    switch (state.toLowerCase()) {
      case 'expanded':
        expect(await categoryLocator.locator('..').locator('..').locator('..').getAttribute('open')).not.toBeNull()
        await expect(sectionLocator).toBeVisible()
        break
      case 'collapsed':
        expect(await categoryLocator.locator('..').locator('..').locator('..').getAttribute('open')).toBeNull()
        await expect(sectionLocator).toBeHidden()
        break
      default:
        throw new Error(`${state} is not a valid state option`)
    }
  }
}
