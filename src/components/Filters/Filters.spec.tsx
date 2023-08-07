import userEvent from '@testing-library/user-event'

import { render, screen, within } from '@/config/test-utils'
import { ServiceType } from '@/constants'
import { FilterOptions } from '@/lib/contentful/contentfulService'

import { Filters, FiltersProps } from './Filters'

const filterOptions: FilterOptions = {
  geography: ['UK wide', 'England', 'Wales'],
  costs: [
    'Find: Free of charge',
    'Find: Chargeable service',
    'Recruit: Free of charge',
    'Recruit: Chargeable service',
    'Follow-Up: Free of charge',
    'Follow-Up: Chargeable service',
  ],
}

const defaultProps: FiltersProps = {
  options: filterOptions,
  filters: { page: 1 },
  totalItems: 1,
}

test('Allows searching by keyword', async () => {
  const onFilterChangeSpy = jest.fn()

  render(<Filters {...defaultProps} onFilterChange={onFilterChangeSpy} />)

  const form = screen.getByRole('search', { name: 'Filter by' })
  expect(form).toHaveAttribute('method', 'get')
  expect(form).toHaveAttribute('action', '/providers')
  expect(form).toHaveAttribute('id', 'filters-form')

  const input = screen.getByLabelText('Keyword')
  expect(input).toHaveAttribute('aria-describedby', 'keyword-hint')

  const description = screen.getByText('Search by data service provider name or keyword')
  expect(description).toHaveAttribute('id', 'keyword-hint')

  const submitBtn = screen.getByRole('button', { name: 'Search' })

  await userEvent.type(input, 'Test search')
  await userEvent.click(submitBtn)
  expect(onFilterChangeSpy).toHaveBeenNthCalledWith(1, { q: 'Test search' })
})

test('Allows non-JavaScript users to apply filters', () => {
  render(<Filters {...defaultProps} />)
  expect(screen.getByRole('button', { name: 'Apply filters' })).toBeInTheDocument()
})

test('Allows users with JavaScript to apply filters', async () => {
  const onFilterChangeSpy = jest.fn()

  render(<Filters {...defaultProps} onFilterChange={onFilterChangeSpy} />)

  const input = screen.getByLabelText('Keyword')
  await userEvent.type(input, 'Test search')
  await userEvent.keyboard('{Enter}')

  expect(onFilterChangeSpy).toHaveBeenNthCalledWith(1, { q: 'Test search' })
})

test('Allows filtering by service type', async () => {
  const onFilterChangeSpy = jest.fn()

  render(<Filters {...defaultProps} onFilterChange={onFilterChangeSpy} />)

  const fieldset = screen.getByRole('group', { name: 'Type of service filters' })

  // Section can be toggled
  const title = screen.getByText('Type of service')
  expect(fieldset).toBeVisible()
  await userEvent.click(title)
  expect(fieldset).not.toBeVisible()
  await userEvent.click(title)
  expect(fieldset).toBeVisible()

  // Has expected inputs
  Object.keys(ServiceType).forEach((type) => expect(screen.getByLabelText(ServiceType[type])).toBeInTheDocument())

  // Can check filters
  const findInput = within(fieldset).getByLabelText('Find')
  const recruitInput = within(fieldset).getByLabelText('Recruit')

  await userEvent.click(findInput)
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', serviceType: 'Find' })
  await userEvent.click(recruitInput)
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', serviceType: ['Find', 'Recruit'] })
  await userEvent.click(recruitInput)
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', serviceType: 'Find' })
  await userEvent.click(findInput)
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '' })
})

test('Allows filtering by geography', async () => {
  const onFilterChangeSpy = jest.fn()

  render(<Filters {...defaultProps} onFilterChange={onFilterChangeSpy} />)

  const fieldset = screen.getByRole('group', { name: 'Geographical coverage filters' })

  // Section can be toggled
  const title = screen.getByText('Geographical coverage')
  expect(fieldset).toBeVisible()
  await userEvent.click(title)
  expect(fieldset).not.toBeVisible()
  await userEvent.click(title)
  expect(fieldset).toBeVisible()

  // Has expected inputs
  filterOptions.geography.forEach((item) => expect(screen.getByLabelText(item)).toBeInTheDocument())
  expect(screen.getByLabelText('Exclude regional only services')).toBeInTheDocument()

  // Can check filters
  await userEvent.click(within(fieldset).getByLabelText('England'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', geography: 'England' })
  await userEvent.click(within(fieldset).getByLabelText('UK wide'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', geography: ['UK wide', 'England'] })
})

test('Allows filtering by costs', async () => {
  const onFilterChangeSpy = jest.fn()

  render(<Filters {...defaultProps} onFilterChange={onFilterChangeSpy} />)

  const fieldset = screen.getByRole('group', { name: 'Costs filters' })

  // Section can be toggled
  const title = screen.getByText('Costs')
  expect(fieldset).toBeVisible()
  await userEvent.click(title)
  expect(fieldset).not.toBeVisible()
  await userEvent.click(title)
  expect(fieldset).toBeVisible()

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

  // Can check Find cost filters
  await userEvent.click(within(findFieldset).getByLabelText('Free of charge'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '', costs: 'Find: Free of charge' })
  await userEvent.click(within(findFieldset).getByLabelText('Chargeable service'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({
    q: '',
    costs: ['Find: Free of charge', 'Find: Chargeable service'],
  })

  // Can check Recruit cost filters
  await userEvent.click(within(recruitFieldset).getByLabelText('Free of charge'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({
    q: '',
    costs: ['Find: Free of charge', 'Find: Chargeable service', 'Recruit: Free of charge'],
  })

  // Can check Follow-up cost filters
  await userEvent.click(within(followUpFieldset).getByLabelText('Free of charge'))
  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({
    q: '',
    costs: ['Find: Free of charge', 'Find: Chargeable service', 'Recruit: Free of charge', 'Follow-Up: Free of charge'],
  })
})

test('Default input states are correct in relation to the currently enabled filters', () => {
  render(
    <Filters
      {...defaultProps}
      filters={{
        q: 'Test search',
        page: 1,
        serviceType: [ServiceType.FIND],
        geography: ['England'],
        excludeRegional: true,
        costs: ['Find: Free of charge', 'Recruit: Free of charge', 'Follow-Up: Free of charge'],
      }}
    />
  )

  // Keyword input has correct default value
  expect(screen.getByLabelText('Keyword')).toHaveValue('Test search')

  // Correct service types are checked
  expect(screen.getByLabelText('Find')).toBeChecked()
  expect(screen.getByLabelText('Recruit')).not.toBeChecked()

  // Correct geographies are checked
  expect(screen.getByLabelText('England')).toBeChecked()
  expect(screen.getByLabelText('Wales')).not.toBeChecked()
  expect(screen.getByLabelText('Exclude regional only services')).toBeChecked()

  // Correct costs are checked
  const findFieldset = screen.getByRole('group', { name: 'Find' })
  expect(within(findFieldset).getByLabelText('Free of charge')).toBeChecked()
  expect(within(findFieldset).getByLabelText('Chargeable service')).not.toBeChecked()
  const recruitFieldset = screen.getByRole('group', { name: 'Recruit' })
  expect(within(recruitFieldset).getByLabelText('Free of charge')).toBeChecked()
  expect(within(recruitFieldset).getByLabelText('Chargeable service')).not.toBeChecked()
  const followUpFieldset = screen.getByRole('group', { name: 'Follow-Up' })
  expect(within(followUpFieldset).getByLabelText('Free of charge')).toBeChecked()
  expect(within(followUpFieldset).getByLabelText('Chargeable service')).not.toBeChecked()
})

test('Allows clearing all filters', () => {
  render(<Filters {...defaultProps} />)
  expect(screen.getByRole('link', { name: 'Clear all filters' })).toHaveAttribute('href', '/providers')
})

test('Clears the search query after the search input is emptied', async () => {
  const onFilterChangeSpy = jest.fn()

  render(
    <Filters
      {...defaultProps}
      filters={{
        q: 'Test search',
        page: 1,
      }}
      onFilterChange={onFilterChangeSpy}
    />
  )

  await userEvent.clear(screen.getByLabelText('Keyword'))

  expect(onFilterChangeSpy).toHaveBeenLastCalledWith({ q: '' })
})

test('Allows toggling filters on mobile', async () => {
  const { rerender } = render(<Filters {...defaultProps} />)

  // Hidden by default
  expect(screen.getByTestId('filters-card')).toHaveClass('hidden')

  // Rerender with filters opened
  const onRequestCloseSpy = jest.fn()
  rerender(<Filters showFiltersMobile onRequestClose={onRequestCloseSpy} {...defaultProps} />)

  // Should now be visible
  expect(screen.getByTestId('filters-card')).not.toHaveClass('hidden')

  // Close filters
  const closeFiltersButtons = screen.getAllByRole('link', { name: 'Close filters' })
  closeFiltersButtons.forEach((element) => expect(element).toHaveAttribute('href', '#show-filters'))
  await userEvent.click(closeFiltersButtons[0])
  await userEvent.click(closeFiltersButtons[1])
  expect(onRequestCloseSpy).toHaveBeenCalledTimes(2)
})

test('Informs mobile users of the current number of search results', () => {
  const { rerender } = render(<Filters {...defaultProps} totalItems={5} />)
  expect(screen.getByText('5 data service providers found')).toBeInTheDocument()
  rerender(<Filters {...defaultProps} totalItems={1} />)
  expect(screen.getByText('1 data service provider found')).toBeInTheDocument()
})
