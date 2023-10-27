import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Search Tests - @frf_14 @frf_14_excluded', () => {
  test('As a user I cannot search a specific DSP by Population - @frf_14_ac1_population', async ({ providersPage }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `1234567890` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('1234567890')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
      await providersPage.assertNoResultsScreen()
    })
  })

  test('As a user I cannot search a specific DSP by Not Suited To - @frf_14_ac1_not_suited', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `The Not Suited to Value` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('The Not Suited to Value')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
      await providersPage.assertNoResultsScreen()
    })
  })

  test('As a user I cannot search a specific DSP by Website Url - @frf_14_ac1_web_url', async ({ providersPage }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `willthisreallywork.com` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('willthisreallywork.com')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
      await providersPage.assertNoResultsScreen()
    })
  })

  test('As a user I cannot search a specific DSP by Video Url - @frf_14_ac1_video_url', async ({ providersPage }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I enter key phrase `willthiswork.com` into the Search Field', async () => {
      await providersPage.enterSearchPhrase('willthiswork.com')
    })
    await test.step('And I click the Search Button', async () => {
      await providersPage.dspFilterSearchBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
      await providersPage.assertNoResultsScreen()
    })
  })
})
