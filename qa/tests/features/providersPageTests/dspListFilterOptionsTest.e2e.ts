import { devices } from '@playwright/test'

import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Filter Options Tests - @frf_13 @frf_13_options', () => {
  test('As a user I can expand and collapse the Filter Panel on Mobile View - @frf_13_options_ac1', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I am on a Mobile View', async () => {
      await providersPage.page.setViewportSize(devices['iPhone 13'].viewport)
    })
    await test.step('Then there will be an Open Filters button', async () => {
      await providersPage.assertMobileFilterToggle('open')
    })
    await test.step('And I can click the Open Filters button to Expand the Filter Panel', async () => {
      await providersPage.dspFilterMobileBtnOpen.click()
      await providersPage.assertFilterPanelVisibility('visible')
    })
    await test.step('And there will now be a Close Filters button and `X` icon', async () => {
      await providersPage.assertMobileFilterToggle('close')
    })
    await test.step('And I can click the Close Filters button to Collapse the Filter Panel', async () => {
      await providersPage.dspFilterMobileBtnClose.click()
      await providersPage.assertFilterPanelVisibility('closed')
    })
    await test.step('And there will again be an Open Filters button', async () => {
      await providersPage.assertMobileFilterToggle('open')
    })
    await test.step('When I click the Open Filters button to Expand the Filter Panel', async () => {
      await providersPage.dspFilterMobileBtnOpen.click()
      await providersPage.assertFilterPanelVisibility('visible')
    })
    await test.step('Then there will again be a Close Filters button and `X` icon', async () => {
      await providersPage.assertMobileFilterToggle('close')
    })
    await test.step('And I can click the `X` Icon to Collapse the Filter Panel', async () => {
      await providersPage.dspFilterMobileIconClose.click()
      await providersPage.assertFilterPanelVisibility('closed')
    })
    await test.step('And there will again be an Open Filters button', async () => {
      await providersPage.assertMobileFilterToggle('open')
    })
  })

  test('As a user I have the expected Filter Categories available - @frf_13_options_ac4_0', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I see the Filter Panel', async () => {
      await providersPage.assertFilterPanelVisibility('visible')
    })
    await test.step('Then there will be a `Type of service` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Type of service')
    })
    await test.step('And there will be a `Geographical coverage` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Geographical coverage')
    })
    await test.step('And there will be a `Costs` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Costs')
    })
  })

  test('As a user I have the expected Type of Service Filter Options available - @frf_13_options_ac4_1', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I see the `Type of service` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Type of service')
    })
    await test.step('Then there will be a `Find` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Find')
    })
    await test.step('And there will be a `Recruit` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Recruit')
    })
    await test.step('And there will be a `Follow-Up` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Follow-Up')
    })
  })

  test('As a user I have the expected Geographical Coverage Filter Options available - @frf_13_options_ac4_2', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I see the `Geographical Coverage` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Geographical coverage')
    })
    await test.step('Then there will be a `UK wide` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('UK wide')
    })
    await test.step('And there will be a `England` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('England')
    })
    await test.step('And there will be a `Northern Ireland` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Northern Ireland')
    })
    await test.step('And there will be a `Scotland` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Scotland')
    })
    await test.step('And there will be a `Wales` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Wales')
    })
    await test.step('And there will be a `Exclude Regional` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Exclude Regional')
    })
  })

  test('As a user I have the expected Costs Filter Options available - @frf_13_options_ac4_3', async ({
    providersPage,
  }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I see the `Costs` Filter Category', async () => {
      await providersPage.assertFilterCategoryPresent('Costs')
    })
    await test.step('Then there will be a `Find` Filter Header', async () => {
      await providersPage.assertFilterCategoryHeaderPresent('Find')
    })
    await test.step('And there will be a `Free of charge (All studies)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Find FOC All')
    })
    await test.step('And there will be a `Free of charge (non-commercial studies only)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Find FOC Non-Comm')
    })
    await test.step('And there will be a `Chargeable service` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Find Chargeable')
    })
    await test.step('Then there will be a `Recruit` Filter Header', async () => {
      await providersPage.assertFilterCategoryHeaderPresent('Recruit')
    })
    await test.step('And there will be a `Free of charge (All studies)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Recruit FOC All')
    })
    await test.step('And there will be a `Free of charge (non-commercial studies only)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Recruit FOC Non-Comm')
    })
    await test.step('And there will be a `Chargeable service` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Recruit Chargeable')
    })
    await test.step('Then there will be a `Follow-Up` Filter Header', async () => {
      await providersPage.assertFilterCategoryHeaderPresent('Recruit')
    })
    await test.step('And there will be a `Free of charge (All studies)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Follow-Up FOC All')
    })
    await test.step('And there will be a `Free of charge (non-commercial studies only)` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Follow-Up FOC Non-Comm')
    })
    await test.step('And there will be a `Chargeable service` Filter Option', async () => {
      await providersPage.assertFilterOptionPresent('Follow-Up Chargeable')
    })
  })

  test('As a user I can Expand and Collapse each Filter Category - @frf_13_options_ac6', async ({ providersPage }) => {
    await test.step('Given I have navigated to the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I see the Filter Panel', async () => {
      await providersPage.assertFilterPanelVisibility('visible')
    })
    await test.step('Then the `Type of service` Filter Category will be expanded', async () => {
      await providersPage.assertFilterCategoryState('Type of service', 'expanded')
    })
    await test.step('And the `Geographical coverage` Filter Category will be expanded', async () => {
      await providersPage.assertFilterCategoryState('Geographical coverage', 'expanded')
    })
    await test.step('And the `Costs` Filter Category will be expanded', async () => {
      await providersPage.assertFilterCategoryState('Costs', 'expanded')
    })
    await test.step('When I click the `Type of service` Filter Category', async () => {
      await providersPage.dspFilterServiceTitle.click()
    })
    await test.step('Then the `Type of service` Filter Category will collapse', async () => {
      await providersPage.assertFilterCategoryState('Type of service', 'collapsed')
    })
    await test.step('When I click the `Type of service` Filter Category again', async () => {
      await providersPage.dspFilterServiceTitle.click()
    })
    await test.step('Then the `Type of service` Filter Category will expand', async () => {
      await providersPage.assertFilterCategoryState('Type of service', 'expanded')
    })
    await test.step('When I click the `Geographical coverage` Filter Category', async () => {
      await providersPage.dspFilterCoverageTitle.click()
    })
    await test.step('Then the `Geographical coverage` Filter Category will collapse', async () => {
      await providersPage.assertFilterCategoryState('Geographical coverage', 'collapsed')
    })
    await test.step('When I click the `Geographical coverage` Filter Category again', async () => {
      await providersPage.dspFilterCoverageTitle.click()
    })
    await test.step('Then the `Geographical coverage` Filter Category will expand', async () => {
      await providersPage.assertFilterCategoryState('Geographical coverage', 'expanded')
    })
    await test.step('When I click the `Costs` Filter Category', async () => {
      await providersPage.dspFilterCostsTitle.click()
    })
    await test.step('Then the `Costs` Filter Category will collapse', async () => {
      await providersPage.assertFilterCategoryState('Costs', 'collapsed')
    })
    await test.step('When I click the `Costs` Filter Category again', async () => {
      await providersPage.dspFilterCostsTitle.click()
    })
    await test.step('Then the `Costs` Filter Category will expand', async () => {
      await providersPage.assertFilterCategoryState('Costs', 'expanded')
    })
  })
})
