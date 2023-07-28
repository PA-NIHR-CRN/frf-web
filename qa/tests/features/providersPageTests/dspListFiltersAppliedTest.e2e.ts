import { test } from '../../../hooks/CustomFixtures'
import { convertPromiseStringToNumber } from '../../../utils/UtilFunctions'

test.describe('DSP List Filters Applied Behaviour Tests - @frf_13 @frf_13_applied_behaviours', () => {
  test('As a user I can Select the Find Service Type Filter via the Home Page - @frf_13_applied_behaviours_ac2_0', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I am on the FRF Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })
    await test.step('When I click the `View all Find Services` link', async () => {
      await homePage.linkDspIntroServiceBoxesFind.click()
    })
    await test.step('And I am taken to the DSP List page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then the Selected Filters Panel is Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And the Find Filter appears as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('find', true)
    })
    await test.step('And the Find Filter option is checked on the Filter Panel', async () => {
      await providersPage.assertFilterOptionIsChecked('Find')
    })
    await test.step('And the Result List is Filtered to include DSPs with the Find Service Type', async () => {
      await providersPage.assertServiceTypeFilterOptionApplied('Find')
    })
  })

  test('As a user I can Select the Recruit Service Type Filter via the Home Page - @frf_13_applied_behaviours_ac2_1', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I am on the FRF Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })
    await test.step('When I click the `View all Recruit Services` link', async () => {
      await homePage.linkDspIntroServiceBoxesRecruit.click()
    })
    await test.step('And I am taken to the DSP List page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then the Selected Filters Panel is Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And the Recruit Filter appears as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('recruit', true)
    })
    await test.step('And the Recruit Filter option is checked on the Filter Panel', async () => {
      await providersPage.assertFilterOptionIsChecked('Recruit')
    })
    await test.step('And the Result List is Filtered to include DSPs with the Recruit Service Type', async () => {
      await providersPage.assertServiceTypeFilterOptionApplied('Recruit')
    })
  })

  test('As a user I can Select the Follow-Up Service Type Filter via the Home Page - @frf_13_applied_behaviours_ac2_2', async ({
    homePage,
    providersPage,
  }) => {
    await test.step('Given I am on the FRF Home Page', async () => {
      await homePage.goto()
      await homePage.assertOnHomePage()
    })
    await test.step('When I click the `View all Follow-up Services` link', async () => {
      await homePage.linkDspIntroServiceBoxesFollow.click()
    })
    await test.step('And I am taken to the DSP List page', async () => {
      await providersPage.assertOnProvidersPage()
    })
    await test.step('Then the Selected Filters Panel is Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And the Follow-Up Filter appears as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('follow-up', true)
    })
    await test.step('And the Follow-Up Filter option is checked on the Filter Panel', async () => {
      await providersPage.assertFilterOptionIsChecked('Follow-up')
    })
    await test.step('And the Result List is Filtered to include DSPs with the Follow-Up Service Type', async () => {
      await providersPage.assertServiceTypeFilterOptionApplied('Follow-Up')
    })
  })

  test('As a user I can Exclude Regional Only Services from the DSP List - @frf_13_applied_behaviours_ac4', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I apply Filters that Leave a Single DSP with Regional Services', async () => {
      await providersPage.applyFilter('Find')
      await providersPage.applyFilter('Follow-up FOC Non-Comm')
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the Exclude Regional Only Services Filter Option', async () => {
      await providersPage.dspFilterOptionRegional.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
    })
  })

  test('As a user I can Filter the DSP List by UK Wide Coverage Only - @frf_13_applied_behaviours_ac5_0', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the UK Wide Filter Option', async () => {
      await providersPage.dspFilterOptionUk.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List is Filtered to include DSPs with only UK Wide Coverage', async () => {
      await providersPage.assertCoverageFilterOptionApplied('Uk wide')
    })
  })

  test('As a user I can Filter the DSP List by English Coverage & it includes UK Wide - @frf_13_applied_behaviours_ac5_1', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the England Filter Option', async () => {
      await providersPage.dspFilterOptionEngland.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with English Coverage, including UK Wide', async () => {
      await providersPage.assertCoverageFilterOptionApplied('England')
    })
  })

  test('As a user I can Filter the DSP List by NI Coverage & it includes UK Wide - @frf_13_applied_behaviours_ac5_2', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Northern Ireland Filter Option', async () => {
      await providersPage.dspFilterOptionNi.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with NI Coverage, including UK Wide', async () => {
      await providersPage.assertCoverageFilterOptionApplied('Northern Ireland')
    })
  })

  test('As a user I can Filter the DSP List by Scottish Coverage & it includes UK Wide - @frf_13_applied_behaviours_ac5_3', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Scotland Filter Option', async () => {
      await providersPage.dspFilterOptionScotland.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with Scottish Coverage, including UK Wide', async () => {
      await providersPage.assertCoverageFilterOptionApplied('Scotland')
    })
  })

  test('As a user I can combine Filters in the same Category to Widen my Search Criteria - @frf_13_applied_behaviours_ac8_0', async ({
    providersPage,
  }) => {
    let strTotalNoOfDsp: string | undefined
    let numTotalNoOfDsp: number
    let strCurrentNoOfDsp: string | undefined
    let numCurrentNoOfDsp: number
    let previousNoOfDsp: number
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And No Filters are Applied', async () => {
      strTotalNoOfDsp = await providersPage.getPageTitleNumber()
      numTotalNoOfDsp = convertPromiseStringToNumber(strTotalNoOfDsp)
    })
    await test.step('When I click the England Filter Option', async () => {
      await providersPage.dspFilterOptionEngland.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Reduced', async () => {
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsReduced(numTotalNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('When I click the Northern Ireland Filter Option', async () => {
      await providersPage.dspFilterOptionNi.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Increased', async () => {
      previousNoOfDsp = numCurrentNoOfDsp
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsIncreased(previousNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('When I click the Scotland Filter Option', async () => {
      await providersPage.dspFilterOptionScotland.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Increased', async () => {
      previousNoOfDsp = numCurrentNoOfDsp
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsIncreased(previousNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('When I click the Wales Filter Option', async () => {
      await providersPage.dspFilterOptionWales.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Increased to Now Include All DSPs', async () => {
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsEqual(numTotalNoOfDsp, numCurrentNoOfDsp)
    })
  })

  test('As a user I can combine Filters in the across Categories to Narrow my Search Criteria - @frf_13_applied_behaviours_ac8_1', async ({
    providersPage,
  }) => {
    let strTotalNoOfDsp: string | undefined
    let numTotalNoOfDsp: number
    let strCurrentNoOfDsp: string | undefined
    let numCurrentNoOfDsp: number
    let previousNoOfDsp: number
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And No Filters are Applied', async () => {
      strTotalNoOfDsp = await providersPage.getPageTitleNumber()
      numTotalNoOfDsp = convertPromiseStringToNumber(strTotalNoOfDsp)
    })
    await test.step('When I click the Find Filter Option', async () => {
      await providersPage.dspFilterOptionFind.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Reduced', async () => {
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsReduced(numTotalNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('When I click the Wales Filter Option', async () => {
      await providersPage.dspFilterOptionWales.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Reduced', async () => {
      previousNoOfDsp = numCurrentNoOfDsp
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsReduced(previousNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('When I click the Recruit FOC All Studies Filter Option', async () => {
      await providersPage.dspFilterOptionRecruitFocAll.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will be Reduced', async () => {
      previousNoOfDsp = numCurrentNoOfDsp
      strCurrentNoOfDsp = await providersPage.getPageTitleNumber()
      numCurrentNoOfDsp = convertPromiseStringToNumber(strCurrentNoOfDsp)
      await providersPage.assertResultsReduced(previousNoOfDsp, numCurrentNoOfDsp)
    })
    await test.step('And the Result List Shows Results that Match the Applied Filters', async () => {
      await providersPage.assertServiceTypeFilterOptionApplied('Find')
      await providersPage.assertCoverageFilterOptionApplied('Wales')
      await providersPage.assertCostsFilterOptionApplied('Recruit FOC All')
    })
  })
})
