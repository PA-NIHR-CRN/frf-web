import { test } from '../../../hooks/CustomFixtures'
import { convertPromiseStringToNumber } from '../../../utils/UtilFunctions'

test.describe('DSP List Search Summary Tests - @frf_14 @frf_14_summary', () => {
  test('As a user I want to be able to search a specific DSP by Name - @frf_14_ac1_name', async ({ providersPage }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `lolapalooza` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('lolapalooza')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `lolapalooza` in its name', async () => {
      await providersPage.assertDspSearchResultName('lolapalooza')
    })
  })

  test('As a user I want to be able to search a specific DSP by Organisation - @frf_14_ac1_org', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `lolapalooza` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Incorporated')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `Incorporated` in its Organisation field', async () => {
      await providersPage.assertDspSearchResultOrg('Incorporated')
    })
  })

  test('As a user I want to be able to search a specific DSP by Description - @frf_14_ac1_desc', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `mcSearchface` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('mcSearchface')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `mcSearchface` in its Description', async () => {
      await providersPage.assertDspSearchResultDescription('mcSearchface')
    })
  })

  test('As a user I want to be able to search for DSPs by Geographical Coverage - @frf_14_ac1_geo_cov', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Wales` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Wales')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then each DSP shown contains `Wales` in its Geographical Coverage', async () => {
      await providersPage.assertCoverageFilterOptionApplied('Wales')
    })
  })

  test('As a user I want to be able to search a specific DSP by Geography Supporting Text - @frf_14_ac1_geo_support', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Oh My Supporting` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Oh My Supporting')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `Oh My Supporting` in its Supporting Text', async () => {
      await providersPage.assertDspSearchResultGeoSupportTxt('Oh My Supporting')
    })
  })

  test('As a user I want to be able to search a specific DSP by Regional Coverage - @frf_14_ac1_regional', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Wow Loads` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Wow Loads')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `Wow Loads` in its Regional Coverage', async () => {
      await providersPage.assertDspSearchResultRegionalCoverage('Wow Loads')
    })
  })

  test('As a user I want to be able to search a specific DSP by Suited To - @frf_14_ac1_suited', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `The Suited to Value` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('The Suited to Value')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `The Suited to Value` in its Suited to section', async () => {
      await providersPage.assertDspSearchResultSuitedTo('The Suited to Value')
    })
  })

  test('As a user I want to be able to search a specific DSP by Cost Description - @frf_14_ac1_cost_desc', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `very specific Find` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('very specific Find')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `very specific Find` in its Find Cost Description', async () => {
      await providersPage.assertDspSearchResultCostDescription('very specific Find')
    })
  })

  test('As a user I want to be able to search a specific DSP by Type of Data (List) - @frf_14_ac1_tod_list', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `High Level Data` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('High Level Data')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('And the DSP shown contains `High Level Data` in its Type of Data List', async () => {
      await providersPage.assertDspSearchResultTypeOfData('High Level Data')
    })
  })

  test('As a user I want to be able to clear the search - @frf_14_ac2', async ({ providersPage }) => {
    let numTotalNoOfDsp: number
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And No Search has been Applied', async () => {
      numTotalNoOfDsp = convertPromiseStringToNumber(await providersPage.getPageTitleNumber())
    })
    await test.step('When I enter key phrase `lolapalooza` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('lolapalooza')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I remove the key phrase from the Search Field', async () => {
      await providersPage.removeSearchPhrase()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List will now Include All DSPs', async () => {
      await providersPage.assertNumberOfDspResults(numTotalNoOfDsp)
    })
  })
})
