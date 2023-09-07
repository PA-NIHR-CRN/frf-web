import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Base Functionality Tests - @frf_11', () => {
  test('As a user I want to view a list of DSPs registered on the FRF website - @frf_11_ac1_0', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then I will be shown a list of DPSs', async () => {
      await providersPage.assertDspListAppears()
    })
    await test.step('And the Number of Results are in the Page Title', async () => {
      await providersPage.assertPageTitle()
    })
  })

  test('As a user I should see the list of DSPs limited to 4 per page - @frf_11_ac1_1', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then there are 4 DSPs Shown on the Current Page', async () => {
      await providersPage.assertDspListPageLimit()
    })
  })

  test('As a user I should see the list of DSPs is sorted Alphabetically by default - @frf_11_ac1_2', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then Sort Option `Alphabetical (ascending)` is Selected by Default', async () => {
      await providersPage.assertSelectedSortOption('ascending')
    })
    await test.step('And the DSPs are Shown in Alphabetical Order (Ascending)', async () => {
      await providersPage.assertDspListAlphabetical('Ascending')
    })
  })

  test('As a user I should see Key Top Level Information on a listed DSP - @frf_11_ac2_0', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('Then I should see the DSP Name and Organisation', async () => {
      await providersPage.assertDspNameOrg()
    })
    await test.step('And I should see the DSP Overview', async () => {
      await providersPage.assertDspOverviewPresent()
    })
    await test.step('And I should see the Type of data available', async () => {
      await providersPage.assertDspTypeOfData()
    })
    await test.step('And I should see the Services Available and Costs', async () => {
      await providersPage.assertDspServicesCosts()
    })
    await test.step('And I should see the Geographical Coverage', async () => {
      await providersPage.assertDspCoverage()
    })
    await test.step('And I should see the Geographical Supporting Text', async () => {
      await providersPage.assertDspCoverageSupport()
    })
    await test.step('And I should see the what the DSP is Suited and Not Suited to', async () => {
      await providersPage.assertDspSuitedTo()
    })
    await test.step('And I should see the First Published and Last Updated dates', async () => {
      await providersPage.assertDspFirstPubLastUpdate()
    })
    await test.step('And I should see an Option to View Details of the DSP', async () => {
      await providersPage.assertOnProvidersPage()
    })
  })

  test('As a user I expect to see "UK wide" Displayed First when Present on a DSP - @frf_11_ac2_1', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then I should see "UK wide" first the Geographical Coverage List', async () => {
      await providersPage.assertDspCoverage()
      await providersPage.assertDspCoverageUkFirst()
    })
  })

  test('As a user I should see Page Control Options when DSP list exceeds 4 - @frf_11_ac3_0', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And the DSP List exceeds 4 results', async () => {
      await providersPage.assertDspResultsGreaterThanFour()
    })
    await test.step('Then I see Page Control Options', async () => {
      await providersPage.assertPageControlPresent()
    })
    await test.step('And I see a "Next" option to view the next List Page', async () => {
      await providersPage.assertPageNextPresent()
    })
    await test.step('And I do not see a "Previous" option', async () => {
      await providersPage.assertPagePrevHidden()
    })
  })

  test('As a user I can Navigate between Next and Previous Pages - @frf_11_ac3_1', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('And I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And the DSP List exceeds 4 results', async () => {
      await providersPage.assertDspResultsGreaterThanFour()
    })
    await test.step('When I click the "Next" Option', async () => {
      await providersPage.dspNextPageOption.click()
    })
    await test.step('Then I should be on the Second DSP List Page', async () => {
      await providersPage.assertCurrentPage('2')
      await providersPage.assertCurrentPageTitle('2')
    })
    await test.step('And I should now see a "Previous" Page Option', async () => {
      await providersPage.assertPagePrevPresent()
    })
    await test.step('When I click the "Previous" Option', async () => {
      await providersPage.dspPrevPageOption.click()
    })
    await test.step('Then I should be on the First DSP List Page', async () => {
      await providersPage.assertCurrentPage('1')
      await providersPage.assertCurrentPageTitle('1')
    })
    await test.step('And I should not see a "Previous" Page Option', async () => {
      await providersPage.assertPagePrevHidden()
    })
  })

  test('As a user I can Navigate to a Specific Page - @frf_11_ac3_2', async ({ homePage, providersPage }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('And I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And the DSP List exceeds 4 results', async () => {
      await providersPage.assertDspResultsGreaterThanFour()
    })
    await test.step('When I click the "2" Page Option', async () => {
      await providersPage.dspListPageTwoOption.click()
    })
    await test.step('Then I should be on the Second DSP List Page', async () => {
      await providersPage.assertCurrentPage('2')
      await providersPage.assertCurrentPageTitle('2')
    })
    await test.step('When I click the "1" Page Option', async () => {
      await providersPage.dspListPageOneOption.click()
    })
    await test.step('Then I should be on the First DSP List Page', async () => {
      await providersPage.assertCurrentPage('1')
      await providersPage.assertCurrentPageTitle('1')
    })
  })

  test.only('As a user I should see a "New" Indicator on a DSP where Applicable- @frf_11_ac4_0', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I select the `Recently published` Sort Option', async () => {
      await providersPage.selectDspSortDropdownOption('Published')
      await providersPage.assertSelectedSortOption('Published')
    })
    await test.step('Then I am Looking at a DSP with "First Published" Date within the Last 3 Months', async () => {
      await providersPage.assertDspIsNew(true)
    })
    await test.step('And I should see a "New" indicator next to the DSP name', async () => {
      await providersPage.assertDspNewIconAppears(true)
    })
  })

  test.only('As a user I should not see a "New" Indicator on a DSP where Applicable- @frf_11_ac4_1', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I have navigated to the HomePage', async () => {
      await homePage.goto()
    })
    await test.step('When I click the View All DSPs button', async () => {
      await homePage.btnProviders.click()
    })
    await test.step('And I am on the Providers Page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I am Looking at a DSP with "First Published" Date more than 3 Months ago', async () => {
      await providersPage.assertDspIsNew(false)
    })
    await test.step('Then I should not see a "New" indicator next to the DSP name', async () => {
      await providersPage.assertDspNewIconAppears(false)
    })
  })
})
