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

  test.only('As a user I want to see key details about a DSP - @frf_22_ac2_0', async ({ providerDetailsPage }) => {
    await test.step('Given I have navigated to the Testing DSP Details Page', async () => {
      await providerDetailsPage.goto()
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
})

//separate test for L2 sections
//separate test validating showing and not showing service costs
//separate test with supporting geo text not present
//separate test for UK wide, and one with individual countries
//separate test for Suited to Not Suited to, assert number of tick and cross + text for each (loop)
//separate test for external link going to new tab
