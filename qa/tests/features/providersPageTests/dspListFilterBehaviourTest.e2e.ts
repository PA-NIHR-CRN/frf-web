import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Filter Page Behaviour Tests - @frf_13 @frf_13_page_behaviours', () => {
  test('As a user I am shown the expected No Results Found screen when applicable - @frf_13_page_behaviours_ac3', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I apply a Filter Combination that Does Not Match any DSPs', async () => {
      await providersPage.applyFilter('Find')
      await providersPage.applyFilter('Exclude regional')
      await providersPage.applyFilter('Follow-up chargeable')
    })
    await test.step('Then there will be no Matching Results', async () => {
      await providersPage.assertNumberOfDspResults(0)
      await providersPage.assertNoResultsScreen()
    })
  })

  test('As a user I can see the Filters I have applied, via the Selected Filters Panel - @frf_13_page_behaviours_ac7_0', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And No Filters are currently selected', async () => {
      await providersPage.assertSelectedFilterPanelVisible(false)
    })
    await test.step('When I select the Follow-up Filter', async () => {
      await providersPage.applyFilter('Follow-up')
    })
    await test.step('Then the Selected Filters Panel Becomes Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And the Follow-up Filter appears as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('follow-up', true)
    })
    await test.step('When I select the England Filter', async () => {
      await providersPage.applyFilter('England')
    })
    await test.step('And I select the Exclude Regional Filter', async () => {
      await providersPage.applyFilter('Exclude Regional')
    })
    await test.step('And I select the Find FOC All Studies Filter', async () => {
      await providersPage.applyFilter('find foc all')
    })
    await test.step('And I select the Recruit Chargeable Service Filter', async () => {
      await providersPage.applyFilter('recruit chargeable')
    })
    await test.step('Then All the selected Filters appear as an Applied Filter', async () => {
      await providersPage.applyFilter('Follow-up')
      await providersPage.assertAppliedFilterPanel('England', true)
      await providersPage.assertAppliedFilterPanel('Exclude Regional', true)
      await providersPage.assertAppliedFilterPanel('find foc all', true)
      await providersPage.assertAppliedFilterPanel('recruit chargeable', true)
    })
  })

  test('As a user I can De-select Applied Filters, via the Selected Filters Panel - @frf_13_page_behaviours_ac7_1', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And No Filters are currently selected', async () => {
      await providersPage.assertSelectedFilterPanelVisible(false)
    })
    await test.step('When I select the Recruit Filter', async () => {
      await providersPage.applyFilter('Recruit')
    })
    await test.step('And I select the Recruit FOC Non-Commercial Filter', async () => {
      await providersPage.applyFilter('recruit foc non-comm')
    })
    await test.step('Then the Selected Filters Panel Becomes Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And both the selected Filters appear as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('Recruit', true)
      await providersPage.assertAppliedFilterPanel('recruit foc non-comm', true)
    })
    await test.step('When I click the Recruit Filter Panel', async () => {
      await providersPage.dspFilterSelectedPanel.locator('li', { hasText: 'recruit', hasNotText: 'Recruit:' }).click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Recruit Filter is Removed from the Selected Filters Panel', async () => {
      await providersPage.assertAppliedFilterPanel('Recruit', false)
    })
    await test.step('When I click the Recruit FOC Non-Commercial Filter Panel', async () => {
      await providersPage.dspFilterSelectedPanel
        .locator('li', { hasText: 'Recruit: Free of charge (non-commercial studies only)' })
        .click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Selected Filters Panel No Longer Appears', async () => {
      await providersPage.assertSelectedFilterPanelVisible(false)
    })
  })

  test('As a user I can Clear All Filters, via Filters Panel Button - @frf_13_page_behaviours_ac9_0', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And Multiple Filters are currently selected', async () => {
      await providersPage.applyFilter('Follow-up')
      await providersPage.applyFilter('Wales')
      await providersPage.applyFilter('Find chargeable')
    })
    await test.step('And the Selected Filters Panel is Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And all the selected Filters appear as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('Follow-up', true)
      await providersPage.assertAppliedFilterPanel('Wales', true)
      await providersPage.assertAppliedFilterPanel('Find chargeable', true)
    })
    await test.step('When I click the Clear All Filter Panel button', async () => {
      await providersPage.dspFilterPanelClearBtn.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Selected Filters Panel No Longer Appears', async () => {
      await providersPage.assertSelectedFilterPanelVisible(false)
    })
  })

  test('As a user I can Clear All Filters, via Selected Filters Panel Link - @frf_13_page_behaviours_ac9_1', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And Multiple Filters are currently selected', async () => {
      await providersPage.applyFilter('Find')
      await providersPage.applyFilter('Northern Ireland')
      await providersPage.applyFilter('Recruit chargeable')
    })
    await test.step('And the Selected Filters Panel is Visible Above the Results', async () => {
      await providersPage.assertSelectedFilterPanelVisible(true)
    })
    await test.step('And all the selected Filters appear as an Applied Filter', async () => {
      await providersPage.assertAppliedFilterPanel('Find', true)
      await providersPage.assertAppliedFilterPanel('Northern Ireland', true)
      await providersPage.assertAppliedFilterPanel('Recruit chargeable', true)
    })
    await test.step('When I click the Clear All Selected Filters Panel Link', async () => {
      await providersPage.dspFilterSelectedPanelClearLink.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Selected Filters Panel No Longer Appears', async () => {
      await providersPage.assertSelectedFilterPanelVisible(false)
    })
  })
})
