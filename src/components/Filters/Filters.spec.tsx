import userEvent from '@testing-library/user-event'

import { render, screen, within } from '@/config/test-utils'
import { ServiceType } from '@/constants'

import { Filters } from './Filters'

const filterOptions = {
  dataType: ['Audit', 'Other'],
  geography: ['UK wide', 'England'],
  costs: [
    'Find: Free of charge',
    'Find: Chargeable service',
    'Recruit: Free of charge',
    'Recruit: Chargeable service',
    'Follow-Up: Free of charge',
    'Follow-Up: Chargeable service',
  ],
}

test('Allows searching by keyword', () => {
  render(<Filters options={filterOptions} />)
  const input = screen.getByLabelText('Keyword')
  expect(input).toHaveAttribute('aria-describedby', 'keyword-hint')
  const description = screen.getByText('Search by data service provider name or keyword')
  expect(description).toHaveAttribute('id', 'keyword-hint')
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
})

test('Allows filtering by service type', async () => {
  render(<Filters options={filterOptions} />)

  const fieldset = screen.getByRole('group', { name: 'Type of service' })
  const details = within(fieldset).getByRole('group')

  // Section can be toggled
  const title = screen.getByText('Type of service')
  await userEvent.click(title)
  expect(details).not.toHaveAttribute('open')
  await userEvent.click(title)
  expect(details).toHaveAttribute('open')

  // Has expected inputs
  Object.keys(ServiceType).forEach((type) => expect(screen.getByLabelText(ServiceType[type])).toBeInTheDocument())
})

test('Allows filtering by geography', async () => {
  render(<Filters options={filterOptions} />)

  const fieldset = screen.getByRole('group', { name: 'Geographical coverage' })
  const details = within(fieldset).getByRole('group')

  // Section can be toggled
  const title = screen.getByText('Geographical coverage')
  await userEvent.click(title)
  expect(details).not.toHaveAttribute('open')
  await userEvent.click(title)
  expect(details).toHaveAttribute('open')

  // Has expected inputs
  filterOptions.geography.forEach((item) => expect(screen.getByLabelText(item)).toBeInTheDocument())
  expect(screen.getByLabelText('Exclude regional only services')).toBeInTheDocument()
})

test('Allows filtering by costs', async () => {
  render(<Filters options={filterOptions} />)

  const fieldset = screen.getByRole('group', { name: 'Costs' })
  const details = within(fieldset).getByRole('group', { name: '' })

  // Section can be toggled
  const title = screen.getByText('Costs')
  await userEvent.click(title)
  expect(details).not.toHaveAttribute('open')
  await userEvent.click(title)
  expect(details).toHaveAttribute('open')

  const expectedInputs = ['Free of charge', 'Chargeable service']

  // Has expected inputs for Find costs
  const findFieldset = within(fieldset).getByRole('group', { name: 'Find' })
  expectedInputs.forEach((item) => expect(within(findFieldset).getByLabelText(item)).toBeInTheDocument())

  // Has expected inputs for Recruit costs
  const recruitFieldset = within(fieldset).getByRole('group', { name: 'Recruit' })
  expectedInputs.forEach((item) => expect(within(recruitFieldset).getByLabelText(item)).toBeInTheDocument())

  // Has expected inputs for Follow-Up costs
  const followUpFieldset = within(fieldset).getByRole('group', { name: 'Follow-Up' })
  expectedInputs.forEach((item) => expect(within(followUpFieldset).getByLabelText(item)).toBeInTheDocument())
})

test('Allows clearing all filters', () => {
  render(<Filters options={filterOptions} />)
  expect(screen.getByRole('button', { name: 'Clear all filters' })).toBeInTheDocument()
})

test('Allows toggling filters on mobile', async () => {
  const { rerender } = render(<Filters options={filterOptions} />)

  // Hidden by default
  expect(screen.getByTestId('filters-card')).toHaveClass('hidden')

  // Rerender with filters opened
  const onRequestCloseSpy = jest.fn()
  rerender(<Filters showFiltersMobile onRequestClose={onRequestCloseSpy} options={filterOptions} />)

  // Should now be visible
  expect(screen.getByTestId('filters-card')).not.toHaveClass('hidden')

  // Close filters
  const closeFiltersButton = screen.getByRole('link', { name: 'Return to search results' })
  expect(closeFiltersButton).toHaveAttribute('href', '#show-filters')
  await userEvent.click(closeFiltersButton)
  expect(onRequestCloseSpy).toHaveBeenCalled()
})

test('Focus is locked inside filters on mobile only', async () => {
  const { rerender } = render(<Filters options={filterOptions} />)

  // Not focus locked by default
  screen.getByRole('button', { name: 'Clear all filters' }).focus()
  await userEvent.tab()
  expect(screen.getByRole('link', { name: 'Return to search results' })).not.toHaveFocus()

  rerender(<Filters showFiltersMobile options={filterOptions} />)

  // Focus locked when shown on mobile
  screen.getByRole('button', { name: 'Clear all filters' }).focus()
  await userEvent.tab()
  expect(screen.getByRole('link', { name: 'Return to search results' })).toHaveFocus()
})
