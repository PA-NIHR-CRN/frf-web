import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP Details, Base Functionality Tests - @frf_22', () => {
  test('As a user I want to to see a Page with Further Details of a DSP - @frf_22_ac1', async ({
    providersPage,
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
    })
    await test.step('When I click a DSPs name', async () => {
      await providersPage.dspResultTitle.nth(0).click()
    })
    await test.step('Then I am taken to the DSP Details Page', async () => {
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('And there will be a link to return to the DSP list', async () => {
      await providerDetailsPage.assertLinkToListProvided()
    })
    await test.step('And I will be given an option to Contact Research Support', async () => {
      await providerDetailsPage.assertContactResearchPresent()
    })
    await test.step('And I will be given an option to Contact the DSP', async () => {
      await providerDetailsPage.assertContactDspPresent()
    })
  })

  test('As a user I want to see key details about a DSP - @frf_22_ac2_0', async ({ providerDetailsPage }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('Then I will see the Testing DSPs name', async () => {
      await providerDetailsPage.assertDspName('Testing DSP')
    })
    await test.step('And I will see the Testing DSPs Organisation', async () => {
      await providerDetailsPage.assertDspOrg('TESTING DSP ORG')
    })
    await test.step('And I will see a section with a Descriptive Overview of the DSP', async () => {
      await providerDetailsPage.assertDspOverview('SHORT DESCRIPTION OF THE DSP')
    })
    await test.step('And I will see a section with Services and Costs', async () => {
      await providerDetailsPage.assertServicesCostsPresent()
    })
    await test.step('And I will see a sections with Types of Data Available', async () => {
      await providerDetailsPage.assertTypeOfDataPresent()
    })
    await test.step('And I will see a section for Coverage', async () => {
      await providerDetailsPage.assertCoveragePresent('Population: 250,000')
    })
    await test.step('And I will see a section for Suitability', async () => {
      await providerDetailsPage.assertSuitedPresent()
    })
    await test.step('And I will see an embedded Video', async () => {
      await providerDetailsPage.assertVideoPresent()
    })
    await test.step('And I will have a link to an External DSP website', async () => {
      await providerDetailsPage.assertExternalLinkPresent('https://www.bbc.co.uk/news/health')
    })
    await test.step('And I will see Funded by, First Published & Last updated information', async () => {
      await providerDetailsPage.assertFundPublishUpdated('Department of Health and Social Care', '19 June 2023')
    })
  })

  test('As a user I will see any Remaining Level 2 Information present, for the DSP - @frf_22_ac2_1', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('Then I will see a Data Content section with a Collapsed Sub-section', async () => {
      await providerDetailsPage.assertDataContentPresent(true)
    })
    await test.step('And I can view the Sub-sections content by expanding it', async () => {
      await providerDetailsPage.dspDetailDataContentSubSectionHeader.click()
      await providerDetailsPage.assertDataContentTxtVisible()
    })
    await test.step('And I will see a Geographical and Population Coverage Section', async () => {
      await providerDetailsPage.assertGeoPopulationPresent(true)
    })
    await test.step('And I will see an Information Governance Section', async () => {
      await providerDetailsPage.assertInfoGovernancePresent(true)
    })
    await test.step('And I will see a Recruit Service Description with a Collapsed Sub-section', async () => {
      await providerDetailsPage.assertRecruitLvlTwoPresent(true)
    })
    await test.step('And I can view the Sub-sections content by expanding it', async () => {
      await providerDetailsPage.dspDetailRecruitLvlTwoSubSectionHeader.click()
      await providerDetailsPage.assertRecruitLvlTwoTxtVisible()
    })
    await test.step('And the Recruit sections Costs will match those in the Page Summary', async () => {
      await providerDetailsPage.assertRecruitLvlTwoCostsPresent()
      await providerDetailsPage.assertRecruitCostsMatch()
    })
  })

  test('As a user I will not see a Level 2 Section, when it has no Content - @frf_22_ac2_2', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Level 2 With No Content DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/level-2-titles-with-no-content')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('Then I will not see a Data Content section', async () => {
      await providerDetailsPage.assertDataContentPresent(false)
    })
    await test.step('And I will not see a Geographical and Population Coverage Section', async () => {
      await providerDetailsPage.assertGeoPopulationPresent(false)
    })
    await test.step('And I will not see an Information Governance Section', async () => {
      await providerDetailsPage.assertInfoGovernancePresent(false)
    })
  })

  test('As a user I will not see a Level 2 Section, when it has no Content - @frf_22_ac2_3', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Level 2 With No Content DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/level-2-titles-with-no-content')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('Then I will not see a Data Content section', async () => {
      await providerDetailsPage.assertDataContentPresent(false)
    })
    await test.step('And I will not see a Geographical and Population Coverage Section', async () => {
      await providerDetailsPage.assertGeoPopulationPresent(false)
    })
    await test.step('And I will not see an Information Governance Section', async () => {
      await providerDetailsPage.assertInfoGovernancePresent(false)
    })
  })

  test('Services in the Page summary will have a Link to the Relevant Service Description Section when Present - @frf_22_ac2_4', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('When I see the Recruit Service Header in the Page Summary', async () => {
      await providerDetailsPage.assertServicesCostsPresent()
    })
    await test.step('And there is a Recruit Service Description Present', async () => {
      await providerDetailsPage.assertRecruitLvlTwoPresent(true)
    })
    await test.step('Then the Recruit Header will have a Hyperlink to jump to the Recruit Service Description', async () => {
      await providerDetailsPage.assertServiceLinked('Recruit', true)
    })
    await test.step('When there is not a Find Service Description Present', async () => {
      await providerDetailsPage.assertFindLvlTwoPresent(false)
    })
    await test.step('And there is not a Follow-Up Service Description Present', async () => {
      await providerDetailsPage.assertFollowLvlTwoPresent(false)
    })
    await test.step('Then the Find & Follow-Up Headers will not have a Hyperlink', async () => {
      await providerDetailsPage.assertServiceLinked('Find', false)
      await providerDetailsPage.assertServiceLinked('Follow-Up', false)
    })
  })

  test('As a user I will see UK wide only, on the Coverage Section, where it Exists - @frf_22_ac2_5', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to a DSP with Mutliple Geographies selected - including UK wide', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('When I see the Coverage Section', async () => {
      await providerDetailsPage.assertCoveragePresent('Population: 250,000')
    })
    await test.step('Then I will see UK wide only', async () => {
      await providerDetailsPage.assertUkWideOnly()
    })
  })

  test('As a user I will be taken to the External DSP Site in a new tab, when I click the Link - @frf_22_ac2_6', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('When I click the External the Coverage Section', async () => {
      await providerDetailsPage.clickExternalSiteLink()
    })
    await test.step('Then I will be taken to the External Site in a new tab', async () => {
      await providerDetailsPage.assertOnNewTab()
    })
  })

  test('As a user I will see what the DSP is Suited & Not Suited To, with Visual Indicators - @frf_22_ac2_7', async ({
    providerDetailsPage,
  }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto('/providers/testing-dsp')
      await providerDetailsPage.assertOnProviderDetailsPage()
    })
    await test.step('When I see the section for Suitability', async () => {
      await providerDetailsPage.assertSuitedPresent()
    })
    await test.step('Then I will see what the DSP is Suited To', async () => {
      await providerDetailsPage.assertSuitedToValues()
    })
    await test.step('And I will see a Green Tick next to these Values', async () => {
      await providerDetailsPage.assertSuitedToIndicator()
    })
    await test.step('And I will see what the DSP is Not Suited To', async () => {
      await providerDetailsPage.assertNotSuitedToValues()
    })
    await test.step('And I will see a Red Cross next to these Values', async () => {
      await providerDetailsPage.assertNotSuitedToIndicator()
    })
  })
})
