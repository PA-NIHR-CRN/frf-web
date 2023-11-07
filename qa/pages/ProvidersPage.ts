import { expect, Locator, Page } from '@playwright/test'

import { confirmStringNotNull, numDaysBetween } from '../utils/UtilFunctions'

//Declare Page Objects
export default class ProvidersPage {
  readonly page: Page
  readonly pageTitle: Locator
  readonly focAllText: string
  readonly focNoncCommText: string
  readonly chargeableText: string
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
  readonly dspResultsServiceCostsTblCell: Locator
  readonly dspResultCoverageHeader: Locator
  readonly dspResultCoverageSection: Locator
  readonly dspResultSectionContent: Locator
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
  readonly dspListLoading: Locator
  readonly dspOrderedList: Locator
  readonly dspNoResultsSection: Locator
  readonly dspNoResultsHeader: Locator
  readonly dspNoResultHelpMsg: Locator
  readonly dspNoResultHelpList: Locator
  readonly dspContactSupportBtn: Locator
  readonly dspListSortDropdown: Locator
  readonly dspListSortDropdownLbl: Locator
  readonly dspListAllPageListItems: Locator

  //Filter Objects
  readonly dspFilterMobileBtnOpen: Locator
  readonly dspFilterMobileBtnClose: Locator
  readonly dspFilterMobileIconClose: Locator
  readonly dspFilterPanel: Locator
  readonly dspFilterServiceTitle: Locator
  readonly dspFilterCoverageTitle: Locator
  readonly dspFilterCostsTitle: Locator
  readonly filterOptionLbl: Locator
  readonly dspFilterOptionFind: Locator
  readonly dspFilterOptionRecruit: Locator
  readonly dspFilterOptionFollow: Locator
  readonly dspFilterOptionUk: Locator
  readonly dspFilterOptionEngland: Locator
  readonly dspFilterOptionNi: Locator
  readonly dspFilterOptionScotland: Locator
  readonly dspFilterOptionWales: Locator
  readonly dspFilterOptionRegional: Locator
  readonly dspFilterOptionFindFocAll: Locator
  readonly dspFilterOptionFindFocNonComm: Locator
  readonly dspFilterOptionFindChargeable: Locator
  readonly dspFilterOptionRecruitFocAll: Locator
  readonly dspFilterOptionRecruitFocNonComm: Locator
  readonly dspFilterOptionRecruitChargeable: Locator
  readonly dspFilterOptionFollowFocAll: Locator
  readonly dspFilterOptionFollowFocNonComm: Locator
  readonly dspFilterOptionFollowChargeable: Locator
  readonly dspFilterServiceSection: Locator
  readonly dspFilterCoverageSection: Locator
  readonly dspFilterCostsSection: Locator
  readonly dspFilterOptionCostsFindHeader: Locator
  readonly dspFilterOptionCostsRecruitHeader: Locator
  readonly dspFilterOptionCostsFollowHeader: Locator
  readonly dspFilterSelectedPanel: Locator
  readonly dspFilterPanelClearBtn: Locator
  readonly dspFilterSelectedPanelClearLink: Locator
  readonly dspFilterSearchInput: Locator
  readonly dspFilterSearchBtn: Locator

  //Initialize Page Objects
  constructor(page: Page) {
    this.page = page
    this.focAllText = 'Free of charge (All studies)'
    this.focNoncCommText = 'Free of charge (non-commercial studies only)'
    this.chargeableText = 'Chargeable service'

    //List Locators
    this.pageTitle = page.locator('h1[class="govuk-panel__title heading-underscore pt-1"]')
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
    this.dspResultsServiceCostsTblCell = page.locator('td[class="govuk-table__cell govuk-body-s pl-4"]')
    this.dspResultCoverageHeader = page.locator('h3[class="govuk-heading-s mb-3"]', { hasText: 'Coverage:' })
    this.dspResultCoverageSection = page.locator('ul[aria-label="Coverage"]')
    this.dspResultSectionContent = page.locator(
      'li[class="govuk-body govuk-!-margin-bottom-2 flex list-none items-start gap-x-2 gap-y-1"]'
    )
    this.dspResultCoverageTxt = page.locator('p[class="govuk-!-margin-bottom-1"]')
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
      'div[class="[&>ul>li_p]:mb-1 [&>ul_li_p]:text-sm [&>ul_ul]:pt-1 [&>ul_ul_li:not(:last-child)]:mb-0"] ul[class="govuk-list govuk-list--bullet"]'
    )
    this.dspListLoading = page.locator('p[class="govuk-body mt-5 min-h-[40rem]"]')
    this.dspOrderedList = page.locator('ol[aria-label="Data service providers"]')
    this.dspNoResultsSection = page.locator('div[class="govuk-!-margin-top-8 govuk-body"]')
    this.dspNoResultsHeader = page.locator('h3[class="govuk-heading-l"]')
    this.dspNoResultHelpMsg = page.locator('p[id="improve-search-results"]')
    this.dspNoResultHelpList = page.locator('ul[aria-labelledby="improve-search-results"]')
    this.dspContactSupportBtn = page.locator('a[class="govuk-button govuk-button--secondary"]')
    this.dspListSortDropdown = page.locator('select[id="order"]')
    this.dspListSortDropdownLbl = page.locator('label[for="order"]')
    this.dspListAllPageListItems = page.locator('ul[class="govuk-pagination__list"] li')

    //Filter Locators
    this.dspFilterMobileBtnOpen = page.locator('a[id="show-filters"]')
    this.dspFilterMobileBtnClose = page.locator(
      'a[href="#show-filters"][class=" govuk-button govuk-button--secondary w-full text-center md:hidden"]'
    )
    this.dspFilterMobileIconClose = page.locator(
      'a[href="#show-filters"][aria-label="Collapse search criteria filters"]'
    )
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
    this.filterOptionLbl = page.locator('label')
    this.dspFilterOptionFind = page.locator('input[name="serviceType"][value="Find"]')
    this.dspFilterOptionRecruit = page.locator('input[name="serviceType"][value="Recruit"]')
    this.dspFilterOptionFollow = page.locator('input[name="serviceType"][value="Follow-Up"]')
    this.dspFilterOptionUk = page.locator('input[name="geography"][value="UK wide"]')
    this.dspFilterOptionEngland = page.locator('input[name="geography"][value="England"]')
    this.dspFilterOptionNi = page.locator('input[name="geography"][value="Northern Ireland"]')
    this.dspFilterOptionScotland = page.locator('input[name="geography"][value="Scotland"]')
    this.dspFilterOptionWales = page.locator('input[name="geography"][value="Wales"]')
    this.dspFilterOptionRegional = page.locator('input[name="excludeRegional"][value="true"]')
    this.dspFilterOptionFindFocAll = page.locator('input[name="costs"][value="Find: Free of charge (All studies)"]')
    this.dspFilterOptionFindFocNonComm = page.locator(
      'input[name="costs"][value="Find: Free of charge (non-commercial studies only)"]'
    )
    this.dspFilterOptionFindChargeable = page.locator('input[name="costs"][value="Find: Chargeable service"]')
    this.dspFilterOptionRecruitFocAll = page.locator(
      'input[name="costs"][value="Recruit: Free of charge (All studies)"]'
    )
    this.dspFilterOptionRecruitFocNonComm = page.locator(
      'input[name="costs"][value="Recruit: Free of charge (non-commercial studies only)"]'
    )
    this.dspFilterOptionRecruitChargeable = page.locator('input[name="costs"][value="Recruit: Chargeable service"]')
    this.dspFilterOptionFollowFocAll = page.locator(
      'input[name="costs"][value="Follow-Up: Free of charge (All studies)"]'
    )
    this.dspFilterOptionFollowFocNonComm = page.locator(
      'input[name="costs"][value="Follow-Up: Free of charge (non-commercial studies only)"]'
    )
    this.dspFilterOptionFollowChargeable = page.locator('input[name="costs"][value="Follow-Up: Chargeable service"]')
    this.dspFilterOptionCostsFindHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-find-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
    )
    this.dspFilterOptionCostsRecruitHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-recruit-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
    )
    this.dspFilterOptionCostsFollowHeader = page.locator(
      'legend[class="govuk-fieldset__legend bg-[var(--colour-follow-up-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100"]'
    )
    this.dspFilterSelectedPanel = page.locator('ul[aria-labelledby="selected-filters"]')
    this.dspFilterPanelClearBtn = page.locator('a[class="govuk-button govuk-button--secondary w-full text-center"]')
    this.dspFilterSelectedPanelClearLink = page.locator(
      'div[class="order-2 ml-auto whitespace-nowrap pl-1 md:order-3"] a'
    )
    this.dspFilterSearchInput = page.locator('input[id="keyword"]')
    this.dspFilterSearchBtn = page.locator('button[class="mb-0 mt-3 w-full govuk-button govuk-button--secondary"]')
  }

  //Page Methods
  async goto() {
    await this.page.goto('/providers')
  }

  async assertOnProvidersPage() {
    await expect(this.pageTitle).toBeVisible()
    await expect(this.btnViewMoreDetails.nth(0)).toBeVisible()
    await expect(this.pageTitle).toHaveText('List of data service providers')
    expect(this.page.url()).toContain('/providers')
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

  async assertDspListAlphabetical(ordering: string) {
    await expect(this.dspListArticle).toBeVisible()
    await expect(this.dspResultHeader.nth(0)).toBeVisible()
    const titleElements = await this.dspResultTitle.all()
    const actualTitleOrder: Array<string | null> = []

    for (const title of titleElements) {
      const titleText = await title.textContent()
      if (titleText !== null) {
        const cutOffIndex = titleText.indexOf(':') + 1
        const truncatedTitleText = titleText.substring(cutOffIndex).trim()
        actualTitleOrder.push(truncatedTitleText.toLowerCase())
      }
    }
    const expectedTitleOrder = JSON.parse(JSON.stringify(actualTitleOrder))
    expectedTitleOrder.sort()
    if (ordering.toLowerCase() == 'ascending') {
      expect(actualTitleOrder).toEqual(expectedTitleOrder)
    } else {
      expect(actualTitleOrder).toEqual(expectedTitleOrder.reverse())
    }
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
    expect(await this.dspResultSuitedList.nth(0).locator('li').nth(0).textContent()).toEqual('Large patient cohorts')
    expect(await this.dspResultSuitedList.nth(0).locator('li').nth(3).textContent()).toEqual('Drug development trials')
  }

  async assertDspFirstPubLastUpdate() {
    await expect(this.dspResultFirstPublishedHeader.nth(0)).toBeVisible()
    await expect(this.dspResultLastUpdatedHeader.nth(0)).toBeVisible()
    expect(await this.dspResultFirstPublishedValue.nth(0).textContent()).toEqual('8 June 2023')
    expect(await this.dspResultLastUpdatedValue.nth(0).textContent()).toContain('2023')
  }

  async assertDspIsNew(isNew: boolean) {
    const firstPublishedValue = await this.dspResultFirstPublishedValue.nth(0).textContent()
    if (firstPublishedValue !== null) {
      const strPublishDate = new Date(firstPublishedValue).toLocaleDateString('en-US')
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate())
      const strCurrentDate = new Date(currentDate).toLocaleDateString('en-US')

      const alignedCurrentDate = new Date(strCurrentDate)
      const alignedPublishDate = new Date(strPublishDate)
      const daysDifference = numDaysBetween(alignedCurrentDate, alignedPublishDate)
      if (isNew) {
        expect(daysDifference).toBeLessThanOrEqual(90)
      } else {
        expect(daysDifference).toBeGreaterThan(90)
      }
    }
  }

  async assertDspNewIconAppears(visible: boolean) {
    if (visible) {
      await expect(this.dspResultHeader.nth(0).locator(this.dspResultNewIcon)).toBeVisible()
      expect(await this.dspResultHeader.nth(0).locator(this.dspResultNewIcon).textContent()).toEqual('New')
    } else {
      await expect(this.dspResultHeader.nth(0).locator(this.dspResultNewIcon)).toBeHidden()
    }
  }

  async assertDspResultsGreaterThanFour() {
    const txtResTitleNo = await this.getPageTitleNumber()
    if (txtResTitleNo !== undefined) {
      expect(parseInt(txtResTitleNo)).toBeGreaterThan(4)
    }
  }

  async assertNumberOfDspResults(expectedNo: number) {
    const txtResultNo = await this.getPageTitleNumber()
    if (txtResultNo !== undefined) {
      expect(parseInt(txtResultNo)).toEqual(expectedNo)
    }
  }

  async assertNoResultsScreen() {
    await expect(this.dspNoResultsHeader).toBeVisible()
    await expect(this.dspNoResultHelpMsg).toBeVisible()
    await expect(this.dspNoResultHelpList).toBeVisible()
    await expect(this.dspNoResultsHeader).toHaveText('There are no matching results.')
    await expect(this.dspNoResultHelpMsg).toHaveText('Improve your search results by:')
    expect(await this.dspNoResultHelpList.locator('li').count()).toEqual(4)
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
        await expect(this.dspFilterOptionFind.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFind).toHaveValue('Find')
        await expect(this.dspFilterOptionFind.locator('..').locator(this.filterOptionLbl)).toHaveText('Find')
        break
      case 'recruit':
        await expect(this.dspFilterOptionRecruit).toBeVisible()
        await expect(this.dspFilterOptionRecruit.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionRecruit).toHaveValue('Recruit')
        await expect(this.dspFilterOptionRecruit.locator('..').locator(this.filterOptionLbl)).toHaveText('Recruit')
        break
      case 'follow-up':
        await expect(this.dspFilterOptionFollow).toBeVisible()
        await expect(this.dspFilterOptionFollow.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFollow).toHaveValue('Follow-Up')
        await expect(this.dspFilterOptionFollow.locator('..').locator(this.filterOptionLbl)).toHaveText('Follow-Up')
        break
      case 'uk wide':
        await expect(this.dspFilterOptionUk).toBeVisible()
        await expect(this.dspFilterOptionUk.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionUk).toHaveValue('UK wide')
        await expect(this.dspFilterOptionUk.locator('..').locator(this.filterOptionLbl)).toHaveText('UK wide')
        break
      case 'england':
        await expect(this.dspFilterOptionEngland).toBeVisible()
        await expect(this.dspFilterOptionEngland.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionEngland).toHaveValue('England')
        await expect(this.dspFilterOptionEngland.locator('..').locator(this.filterOptionLbl)).toHaveText('England')
        break
      case 'northern ireland':
        await expect(this.dspFilterOptionNi).toBeVisible()
        await expect(this.dspFilterOptionNi.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionNi).toHaveValue('Northern Ireland')
        await expect(this.dspFilterOptionNi.locator('..').locator(this.filterOptionLbl)).toHaveText('Northern Ireland')
        break
      case 'scotland':
        await expect(this.dspFilterOptionScotland).toBeVisible()
        await expect(this.dspFilterOptionScotland.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionScotland).toHaveValue('Scotland')
        await expect(this.dspFilterOptionScotland.locator('..').locator(this.filterOptionLbl)).toHaveText('Scotland')
        break
      case 'wales':
        await expect(this.dspFilterOptionWales).toBeVisible()
        await expect(this.dspFilterOptionWales.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionWales).toHaveValue('Wales')
        await expect(this.dspFilterOptionWales.locator('..').locator(this.filterOptionLbl)).toHaveText('Wales')
        break
      case 'exclude regional':
        await expect(this.dspFilterOptionRegional).toBeVisible()
        await expect(this.dspFilterOptionRegional.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionRegional).toHaveValue('true')
        await expect(this.dspFilterOptionRegional.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Exclude regional only services'
        )
        break
      case 'find foc all':
        await expect(this.dspFilterOptionFindFocAll).toBeVisible()
        await expect(this.dspFilterOptionFindFocAll.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFindFocAll).toHaveValue('Find: Free of charge (All studies)')
        await expect(this.dspFilterOptionFindFocAll.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (All studies)'
        )
        break
      case 'find foc non-comm':
        await expect(this.dspFilterOptionFindFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionFindFocNonComm.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFindFocNonComm).toHaveValue(
          'Find: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionFindFocNonComm.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (non-commercial studies only)'
        )
        break
      case 'find chargeable':
        await expect(this.dspFilterOptionFindChargeable).toBeVisible()
        await expect(this.dspFilterOptionFindChargeable.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFindChargeable).toHaveValue('Find: Chargeable service')
        await expect(this.dspFilterOptionFindChargeable.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Chargeable service'
        )
        break
      case 'recruit foc all':
        await expect(this.dspFilterOptionRecruitFocAll).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocAll.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocAll).toHaveValue('Recruit: Free of charge (All studies)')
        await expect(this.dspFilterOptionRecruitFocAll.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (All studies)'
        )
        break
      case 'recruit foc non-comm':
        await expect(this.dspFilterOptionRecruitFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocNonComm.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionRecruitFocNonComm).toHaveValue(
          'Recruit: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionRecruitFocNonComm.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (non-commercial studies only)'
        )
        break
      case 'recruit chargeable':
        await expect(this.dspFilterOptionRecruitChargeable).toBeVisible()
        await expect(this.dspFilterOptionRecruitChargeable.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionRecruitChargeable).toHaveValue('Recruit: Chargeable service')
        await expect(this.dspFilterOptionRecruitChargeable.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Chargeable service'
        )
        break
      case 'follow-up foc all':
        await expect(this.dspFilterOptionFollowFocAll).toBeVisible()
        await expect(this.dspFilterOptionFollowFocAll.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFollowFocAll).toHaveValue('Follow-Up: Free of charge (All studies)')
        await expect(this.dspFilterOptionFollowFocAll.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (All studies)'
        )
        break
      case 'follow-up foc non-comm':
        await expect(this.dspFilterOptionFollowFocNonComm).toBeVisible()
        await expect(this.dspFilterOptionFollowFocNonComm.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFollowFocNonComm).toHaveValue(
          'Follow-Up: Free of charge (non-commercial studies only)'
        )
        await expect(this.dspFilterOptionFollowFocNonComm.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Free of charge (non-commercial studies only)'
        )
        break
      case 'follow-up chargeable':
        await expect(this.dspFilterOptionFollowChargeable).toBeVisible()
        await expect(this.dspFilterOptionFollowChargeable.locator('..').locator(this.filterOptionLbl)).toBeVisible()
        await expect(this.dspFilterOptionFollowChargeable).toHaveValue('Follow-Up: Chargeable service')
        await expect(this.dspFilterOptionFollowChargeable.locator('..').locator(this.filterOptionLbl)).toHaveText(
          'Chargeable service'
        )
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

  async applyFilter(option: string) {
    switch (option.toLowerCase()) {
      case 'find':
        await this.dspFilterOptionFind.click()
        break
      case 'recruit':
        await this.dspFilterOptionRecruit.click()
        break
      case 'follow-up':
        await this.dspFilterOptionFollow.click()
        break
      case 'uk wide':
        await this.dspFilterOptionUk.click()
        break
      case 'england':
        await this.dspFilterOptionEngland.click()
        break
      case 'northern ireland':
        await this.dspFilterOptionNi.click()
        break
      case 'scotland':
        await this.dspFilterOptionScotland.click()
        break
      case 'wales':
        await this.dspFilterOptionWales.click()
        break
      case 'exclude regional':
        await this.dspFilterOptionRegional.click()
        break
      case 'find foc all':
        await this.dspFilterOptionFindFocAll.click()
        break
      case 'find foc non-comm':
        await this.dspFilterOptionFindFocNonComm.click()
        break
      case 'find chargeable':
        await this.dspFilterOptionFindChargeable.click()
        break
      case 'recruit foc all':
        await this.dspFilterOptionRecruitFocAll.click()
        break
      case 'recruit foc non-comm':
        await this.dspFilterOptionRecruitFocNonComm.click()
        break
      case 'recruit chargeable':
        await this.dspFilterOptionRecruitChargeable.click()
        break
      case 'follow-up foc all':
        await this.dspFilterOptionFollowFocAll.click()
        break
      case 'follow-up foc non-comm':
        await this.dspFilterOptionFollowFocNonComm.click()
        break
      case 'follow-up chargeable':
        await this.dspFilterOptionFollowChargeable.click()
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
    await this.waitForListReload()
  }

  async assertSelectedFilterPanelVisible(visible: boolean) {
    if (visible == true) {
      await expect(this.dspFilterSelectedPanel).toBeVisible()
    } else {
      await expect(this.dspFilterSelectedPanel).toBeHidden()
    }
  }

  async assertAppliedFilterPanel(filter: string, visible: boolean) {
    let filterPanelocator: Locator
    switch (filter.toLowerCase()) {
      case 'find':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'find', hasNotText: 'Find:' })
        break
      case 'recruit':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'recruit', hasNotText: 'Recruit:' })
        break
      case 'follow-up':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'follow-up',
          hasNotText: 'Follow-Up:',
        })
        break
      case 'uk wide':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'uk wide' })
        break
      case 'england':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'england' })
        break
      case 'northern ireland':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'northern ireland' })
        break
      case 'scotland':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'scotland' })
        break
      case 'wales':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'wales' })
        break
      case 'exclude regional':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'exclude regional' })
        break
      case 'find foc all':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'Find: Free of charge (All studies)' })
        break
      case 'find foc non-comm':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'Find: Free of charge (non-commercial studies only)',
        })
        break
      case 'find chargeable':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'Find: Chargeable service' })
        break
      case 'recruit foc all':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'Recruit: Free of charge (All studies)',
        })
        break
      case 'recruit foc non-comm':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'Recruit: Free of charge (non-commercial studies only)',
        })
        break
      case 'recruit chargeable':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'Recruit: Chargeable service' })
        break
      case 'follow-up foc all':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'Follow-Up: Free of charge (All studies)',
        })
        break
      case 'follow-up foc non-comm':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', {
          hasText: 'Follow-Up: Free of charge (non-commercial studies only)',
        })
        break
      case 'follow-up chargeable':
        filterPanelocator = this.dspFilterSelectedPanel.locator('li', { hasText: 'Follow-Up: Chargeable service' })
        break
      default:
        throw new Error(`${filter} is not a valid Filter option`)
    }
    if (visible == true) {
      await expect(filterPanelocator).toBeVisible()
    } else {
      await expect(filterPanelocator).toBeHidden()
    }
  }

  async assertFilterOptionIsChecked(option: string) {
    switch (option.toLowerCase()) {
      case 'find':
        expect(await this.dspFilterOptionFind.isChecked()).toBeTruthy()
        break
      case 'recruit':
        expect(await this.dspFilterOptionRecruit.isChecked()).toBeTruthy()
        break
      case 'follow-up':
        expect(await this.dspFilterOptionFollow.isChecked()).toBeTruthy()
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
  }

  async assertServiceTypeFilterOptionApplied(option: string) {
    const resultServiceCostsTblCount = await this.dspResultServiceCostsTbl.count()
    switch (option.toLowerCase()) {
      case 'find':
        await expect(
          this.dspResultServiceCostsTbl.locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' }).first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl.locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' }).count()
        ).toEqual(resultServiceCostsTblCount)
        break
      case 'recruit':
        await expect(
          this.dspResultServiceCostsTbl.locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' }).first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .count()
        ).toEqual(resultServiceCostsTblCount)
        break
      case 'follow-up':
        await expect(
          this.dspResultServiceCostsTbl.locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' }).first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .count()
        ).toEqual(resultServiceCostsTblCount)
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
  }

  async assertCoverageFilterOptionApplied(option: string) {
    const resultListCount = await this.dspResultArticle.count()
    await expect(this.dspResultCoverageTxt.first()).toBeVisible()
    expect(await this.dspResultCoverageTxt.count()).toEqual(resultListCount)
    switch (option.toLowerCase()) {
      case 'uk wide':
        for (const coverageTxtElement of await this.dspResultCoverageTxt.all())
          expect(await coverageTxtElement.textContent()).toEqual('Geographical: UK wide')
        break
      case 'england':
        for (const coverageTxtElement of await this.dspResultCoverageTxt.all())
          await expect(coverageTxtElement).toContainText(/UK wide|England/)
        break
      case 'northern ireland':
        for (const coverageTxtElement of await this.dspResultCoverageTxt.all())
          await expect(coverageTxtElement).toContainText(/UK wide|Northern Ireland/)
        break
      case 'scotland':
        for (const coverageTxtElement of await this.dspResultCoverageTxt.all())
          await expect(coverageTxtElement).toContainText(/UK wide|Scotland/)
        break
      case 'wales':
        for (const coverageTxtElement of await this.dspResultCoverageTxt.all())
          await expect(coverageTxtElement).toContainText(/UK wide|Wales/)
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
  }

  async assertExcludeRegionalFilterOptionApplied() {
    await expect(this.dspResultCoverageTxt).toBeVisible()
    expect(await this.dspResultCoverageTxt.textContent()).toEqual('Geographical: Wow Loads of Regional coverage')
  }

  async assertCostsFilterOptionApplied(option: string) {
    const resultListCount = await this.dspResultArticle.count()
    await expect(this.dspResultServiceCostsTbl.first()).toBeVisible()
    expect(await this.dspResultServiceCostsTbl.count()).toEqual(resultListCount)
    switch (option.toLowerCase()) {
      case 'find foc all':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'find foc non-comm':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'find chargeable':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'recruit foc all':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'recruit foc non-comm':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'recruit chargeable':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Recruit' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'follow-up foc all':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focAllText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'follow-up foc non-comm':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.focNoncCommText })
            .count()
        ).toEqual(resultListCount)
        break
      case 'follow-up chargeable':
        await expect(
          this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .first()
        ).toBeVisible()
        expect(
          await this.dspResultServiceCostsTbl
            .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Follow-Up' })
            .locator('..')
            .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
            .count()
        ).toEqual(resultListCount)
        break
      default:
        throw new Error(`${option} is not a valid Filter option`)
    }
  }

  async waitForListReload() {
    // await this.dspListLoading.waitFor()
    await this.dspListLoading.waitFor({ state: 'detached' })
    await this.dspOrderedList.or(this.dspNoResultsSection).waitFor({ state: 'visible' })
    await expect(this.dspResultArticle.first().or(this.dspNoResultsHeader)).toBeVisible()
  }

  async assertResultsReduced(previousNoResults: number, currentNoResults: number) {
    expect(currentNoResults).toBeLessThan(previousNoResults)
  }

  async assertResultsIncreased(previousNoResults: number, currentNoResults: number) {
    expect(currentNoResults).toBeGreaterThan(previousNoResults)
  }

  async assertResultsEqual(previousNoResults: number, currentNoResults: number) {
    expect(currentNoResults).toEqual(previousNoResults)
  }

  async enterSearchPhrase(searchPhrase: string) {
    await this.dspFilterSearchInput.fill(searchPhrase)
  }

  async removeSearchPhrase() {
    await this.dspFilterSearchInput.clear()
  }

  async assertDspSearchResultName(expectedName: string) {
    await expect(this.dspResultTitle.nth(0)).toContainText(expectedName, { ignoreCase: true })
  }

  async assertDspSearchResultOrg(expectedOrg: string) {
    await expect(this.dspResultOrgName.nth(0)).toContainText(expectedOrg, { ignoreCase: true })
  }

  async assertDspSearchResultDescription(expectedDesc: string) {
    await expect(this.dspResultOverview.nth(0)).toContainText(expectedDesc, { ignoreCase: true })
  }

  async assertDspSearchResultGeoSupportTxt(expectedGeoTxt: string) {
    await expect(this.dspResultCoverageSupportTxt.nth(0)).toContainText(expectedGeoTxt, { ignoreCase: true })
  }

  async assertDspSearchResultRegionalCoverage(expectedRegCov: string) {
    await expect(this.dspResultCoverageTxt.nth(0)).toContainText(expectedRegCov, { ignoreCase: true })
  }

  async assertDspSearchResultPopulation(expectedPopulation: string) {
    await expect(this.dspResultCoverageSection.locator(this.dspResultSectionContent).nth(0)).toContainText(
      expectedPopulation
    )
  }

  async assertDspSearchResultSuitedTo(expectedSuited: string) {
    await expect(this.dspResultSuitedList.nth(0)).toContainText(expectedSuited, { ignoreCase: true })
  }

  async assertDspSearchResultCostDescription(expectedCostDesc: string) {
    await expect(
      this.dspResultServiceCostsTbl
        .locator(this.dspResultServiceCostsTblHeader, { hasText: 'Find' })
        .locator('..')
        .locator(this.dspResultsServiceCostsTblCell, { hasText: this.chargeableText })
    ).toContainText(expectedCostDesc, { ignoreCase: true })
  }

  async assertDspSearchResultTypeOfData(expectedTypeData: string) {
    await expect(this.dspListTypeDataList.nth(0).locator('li').nth(0)).toContainText(expectedTypeData, {
      ignoreCase: true,
    })
  }

  async assertDspSortDropdownPresent() {
    await expect(this.dspListSortDropdown).toBeVisible()
    await expect(this.dspListSortDropdownLbl).toBeVisible()
    await expect(this.dspListSortDropdownLbl).toHaveText('Sort by')
  }

  async selectDspSortDropdownOption(option: string) {
    switch (option.toLowerCase()) {
      case 'ascending':
        await this.dspListSortDropdown.selectOption({ value: 'a-z' })
        break
      case 'descending':
        await this.dspListSortDropdown.selectOption({ value: 'z-a' })
        break
      case 'updated':
        await this.dspListSortDropdown.selectOption({ value: 'updated' })
        break
      case 'published':
        await this.dspListSortDropdown.selectOption({ value: 'published' })
        break
      default:
        throw new Error(`${option} is not a valid Sort option`)
    }
  }

  async assertSelectedSortOption(expectedOption: string) {
    const selectedOptionText = await this.dspListSortDropdown.evaluate(
      (node: HTMLSelectElement) => node.options[node.options.selectedIndex].textContent
    )
    let expectedOptionText: string
    switch (expectedOption.toLowerCase()) {
      case 'ascending':
        expectedOptionText = 'Alphabetical (ascending)'
        break
      case 'descending':
        expectedOptionText = 'Alphabetical (descending)'
        break
      case 'updated':
        expectedOptionText = 'Recently updated'
        break
      case 'published':
        expectedOptionText = 'Recently published'
        break
      default:
        throw new Error(`${expectedOption} is not a valid Sort option`)
    }
    expect(selectedOptionText).toEqual(expectedOptionText)
  }

  async assertDspListRecentlyUpdated() {
    const arrayOfResultDates = await this.gatherDspDateEpochNos('updated')
    const arrayOfExpectedResults: number[] = []
    arrayOfResultDates.forEach((result) => arrayOfExpectedResults.push(result))
    //Expect Largest to Smallest as the more recent the date the Larger the Number
    expect(arrayOfResultDates).toEqual(
      arrayOfExpectedResults.sort(function (a, b) {
        return b - a
      })
    )
  }

  async assertDspListRecentlyPublished() {
    const arrayOfResultDates = await this.gatherDspDateEpochNos('published')
    const arrayOfExpectedResults: number[] = []
    arrayOfResultDates.forEach((result) => arrayOfExpectedResults.push(result))
    //Expect Largest to Smallest as the more recent the date the Larger the Number
    expect(arrayOfResultDates).toEqual(
      arrayOfExpectedResults.sort(function (a, b) {
        return b - a
      })
    )
  }

  async gatherDspDateEpochNos(dateType: string): Promise<number[]> {
    await this.assertCurrentPage('1')
    const arrayOfDates: number[] = []
    if (dateType.toLowerCase() == 'updated') {
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultLastUpdatedValue.first().textContent())).getTime()
      )
      await this.dspListPageTwoOption.click()
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultLastUpdatedValue.nth(2).textContent())).getTime()
      )
      await this.dspListAllPageListItems.last().click()
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultLastUpdatedValue.last().textContent())).getTime()
      )
      return arrayOfDates
    } else {
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultFirstPublishedValue.first().textContent())).getTime()
      )
      await this.dspListPageTwoOption.click()
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultFirstPublishedValue.nth(2).textContent())).getTime()
      )
      await this.dspListAllPageListItems.last().click()
      arrayOfDates.push(
        new Date(confirmStringNotNull(await this.dspResultFirstPublishedValue.last().textContent())).getTime()
      )
      return arrayOfDates
    }
  }
}
