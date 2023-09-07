import { test } from '../../../hooks/CustomFixtures'

test.describe.only('DSP List Sorting Tests - @frf_12', () => {
  test('As a user I can Sort the List of DSP`s Alphabetically - @frf_12_alphabetical', async ({ providersPage }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I can see the `Sort by` dropdown', async () => {
      await providersPage.assertDspSortDropdownPresent()
    })
    await test.step('When I select the `Alphabetical (descending)` Sort Option', async () => {
      await providersPage.selectDspSortDropdownOption('descending')
      await providersPage.assertSelectedSortOption('descending')
    })
    await test.step('Then the DSPs are Shown in Descending Alphabetical Order', async () => {
      await providersPage.assertDspListAlphabetical('Descending')
    })
    await test.step('When I select the `Alphabetical (ascending)` Sort Option', async () => {
      await providersPage.selectDspSortDropdownOption('ascending')
      await providersPage.assertSelectedSortOption('ascending')
    })
    await test.step('Then the DSPs are Shown in Ascending Alphabetical Order', async () => {
      await providersPage.assertDspListAlphabetical('Ascending')
    })
  })

  test('As a user I can Sort the List of DSP`s by most Recently Updated - @frf_12_updated', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I can see the `Sort by` dropdown', async () => {
      await providersPage.assertDspSortDropdownPresent()
    })
    await test.step('When I select the `Recently updated` Sort Option', async () => {
      await providersPage.selectDspSortDropdownOption('updated')
      await providersPage.assertSelectedSortOption('updated')
    })
    await test.step('Then the DSPs are Shown by the most Recently Updated', async () => {
      await providersPage.assertDspListRecentlyUpdated()
    })
  })

  test('As a user I can Sort the List of DSP`s by most Recently Published - @frf_12_published', async ({
    providersPage,
  }) => {
    await test.step('Given I am on the DSP List Page', async () => {
      await providersPage.goto()
      await providersPage.assertOnProvidersPage()
    })
    await test.step('And I can see the `Sort by` dropdown', async () => {
      await providersPage.assertDspSortDropdownPresent()
    })
    await test.step('When I select the `Recently published` Sort Option', async () => {
      await providersPage.selectDspSortDropdownOption('published')
      await providersPage.assertSelectedSortOption('published')
    })
    await test.step('Then the DSPs are Shown by the most Recently Published', async () => {
      await providersPage.assertDspListRecentlyPublished()
    })
  })
})
