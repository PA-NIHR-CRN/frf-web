import { test } from '../../../hooks/CustomFixtures'

test.describe('DSP List Costs Filters Applied Tests - @frf_13 @frf_13_costs_applied', () => {
  test('As a user I can Filter the DSP List by Find FOC (All studies) - @frf_13_costs_applied_0', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Find FOC (All studies) Filter Option', async () => {
      await providersPage.dspFilterOptionFindFocAll.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Find FOC (All studies) ', async () => {
      await providersPage.assertCostsFilterOptionApplied('Find FOC All')
    })
  })

  test('As a user I can Filter the DSP List by Find FOC (Non-comm studies) - @frf_13_costs_applied_1', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Find FOC (Non-comm) Filter Option', async () => {
      await providersPage.dspFilterOptionFindFocNonComm.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Find FOC (Non-comm studies)', async () => {
      await providersPage.assertCostsFilterOptionApplied('Find FOC Non-comm')
    })
  })

  test('As a user I can Filter the DSP List by Find Chargeable service - @frf_13_costs_applied_2', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Find Chargeable service Filter Option', async () => {
      await providersPage.dspFilterOptionFindChargeable.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Find Chargeable service', async () => {
      await providersPage.assertCostsFilterOptionApplied('Find Chargeable')
    })
  })

  test('As a user I can Filter the DSP List by Recruit FOC (All studies) - @frf_13_costs_applied_3', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Recruit FOC (All studies) Filter Option', async () => {
      await providersPage.dspFilterOptionRecruitFocAll.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Recruit FOC (All studies) ', async () => {
      await providersPage.assertCostsFilterOptionApplied('Recruit FOC All')
    })
  })

  test('As a user I can Filter the DSP List by Recruit FOC (Non-comm studies) - @frf_13_costs_applied_4', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Recruit FOC (Non-comm) Filter Option', async () => {
      await providersPage.dspFilterOptionRecruitFocNonComm.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Recruit FOC (Non-comm studies)', async () => {
      await providersPage.assertCostsFilterOptionApplied('Recruit FOC Non-comm')
    })
  })

  test('As a user I can Filter the DSP List by Recruit Chargeable service - @frf_13_costs_applied_5', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Recruit Chargeable service Filter Option', async () => {
      await providersPage.dspFilterOptionRecruitChargeable.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Recruit Chargeable service', async () => {
      await providersPage.assertCostsFilterOptionApplied('Recruit Chargeable')
    })
  })

  test('As a user I can Filter the DSP List by Follow-up FOC (All studies) - @frf_13_costs_applied_6', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Follow-up FOC (All studies) Filter Option', async () => {
      await providersPage.dspFilterOptionFollowFocAll.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Follow-up FOC (All studies) ', async () => {
      await providersPage.assertCostsFilterOptionApplied('Follow-up FOC All')
    })
  })

  test('As a user I can Filter the DSP List by Follow-up FOC (Non-comm studies) - @frf_13_costs_applied_7', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Follow-up FOC (Non-comm) Filter Option', async () => {
      await providersPage.dspFilterOptionFollowFocNonComm.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Follow-up FOC (Non-comm studies)', async () => {
      await providersPage.assertCostsFilterOptionApplied('Follow-up FOC Non-comm')
    })
  })

  test('As a user I can Filter the DSP List by Follow-up Chargeable service - @frf_13_costs_applied_8', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('When I click the Follow-up Chargeable service Filter Option', async () => {
      await providersPage.dspFilterOptionFollowChargeable.click()
      await providersPage.waitForListReload()
    })
    await test.step('Then the Result List shows DSPs with the Cost attribute - Follow-up Chargeable service', async () => {
      await providersPage.assertCostsFilterOptionApplied('Follow-up Chargeable')
    })
  })
})
