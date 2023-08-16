import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Search Details Tests - @frf_14 @frf_14_details', () => {
  test('As a user I want to be able to search a specific DSP by `Funded By` field - @frf_14_ac1_funded_by', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `FundedBysearch` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('FundedBysearch')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `FundedBysearch` in its Funded By field', async () => {
      await providerDetailsPage.assertDspSearchResultFundedBy('FundedBysearch')
    })
  })

  test('As a user I want to be able to search a specific DSP by Service Description - @frf_14_ac1_service_desc', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `unique find service desc` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('unique find service desc')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `unique find service desc` in its Find Service Description', async () => {
      await providerDetailsPage.assertDspSearchResultFindServiceDescription('unique find service desc')
    })
  })

  test('As a user I want to be able to search a specific DSP by Type of Data (Detail) - @frf_14_ac1_tod_detail', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `low level data` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('low level data')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `low level data` in its Type of data section', async () => {
      await providerDetailsPage.assertDspSearchResultTypeOfData('low level data')
    })
  })

  test('As a user I want to be able to search a specific DSP by Website Name - @frf_14_ac1_web_name', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `I really do think` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('I really do think')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `I really do think` in its Website Name', async () => {
      await providerDetailsPage.assertDspSearchResultWebName('I really do think')
    })
  })

  test('As a user I want to be able to search a specific DSP by Data Content - @frf_14_ac1_data_content', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Rumpelstiltskin` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Rumpelstiltskin')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `Rumpelstiltskin` in its Data Content section', async () => {
      await providerDetailsPage.assertDspSearchResultDataContent('Rumpelstiltskin')
    })
  })

  test('As a user I want to be able to search a specific DSP by Geographical and Population Coverage - @frf_14_ac1_geo_pop_cov', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Geo and Pop` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Geo and Pop')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `Geo and Pop` in its Geographical and Population Coverage section', async () => {
      await providerDetailsPage.assertDspSearchResultGeoPopCoverage('Geo and Pop')
    })
  })

  test('As a user I want to be able to search a specific DSP by Information Governance - @frf_14_ac1_info_gov', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `Info Governance Search Term` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('Info Governance Search Term')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the DSP list shows a single result', async () => {
      await providersPage.assertNumberOfDspResults(1)
    })
    await test.step('When I click the `View more details` button', async () => {
      await providersPage.btnViewMoreDetails.click()
    })
    await test.step('Then the DSPs detail contains `Info Governance Search Term` in its Information Governance section', async () => {
      await providerDetailsPage.assertDspSearchResultInfoGov('Info Governance Search Term')
    })
  })
})
