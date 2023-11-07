import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'

import { Filters } from '@/@types/filters'
import { ServiceType } from '@/constants'

import { SelectedFilters } from './SelectedFilters'

test('Displays selected filters with correct links', () => {
  const mockFilters: Filters = {
    page: 2,
    serviceType: [ServiceType.FIND, ServiceType.RECRUIT],
    dataType: [],
    geography: ['UK wide'],
    costs: [],
    excludeRegional: false,
    order: 'a-z',
    q: 'test',
  }

  mockRouter.query = {
    page: '2',
    serviceType: [ServiceType.FIND, ServiceType.RECRUIT],
    geography: ['UK wide'],
    q: 'test',
  }

  render(<SelectedFilters filters={mockFilters} />)

  expect(screen.getByRole('list', { name: 'Selected filters' })).toBeInTheDocument()

  screen.getAllByText(/Clear filter:/).forEach((el) => expect(el).toHaveClass('govuk-visually-hidden'))

  // Service type
  expect(screen.getByRole('link', { name: 'Clear filter: Find' })).toHaveAttribute(
    'href',
    '/providers?page=2&serviceType=Recruit&geography=UK+wide&q=test'
  )
  expect(screen.getByRole('link', { name: 'Clear filter: Recruit' })).toHaveAttribute(
    'href',
    '/providers?page=2&serviceType=Find&geography=UK+wide&q=test'
  )

  // Geography
  expect(screen.getByRole('link', { name: 'Clear filter: UK wide' })).toHaveAttribute(
    'href',
    '/providers?page=2&serviceType=Find&serviceType=Recruit&q=test'
  )

  // Keyword
  expect(screen.getByRole('link', { name: 'Clear filter: test' })).toHaveAttribute(
    'href',
    '/providers?page=2&serviceType=Find&serviceType=Recruit&geography=UK+wide'
  )

  // Order is not shown as a filter
  expect(screen.queryByText('a-z')).not.toBeInTheDocument()

  // Exclude regional is not shown as a filter when `false`
  expect(screen.queryByRole('link', { name: 'Clear filter: Exclude regional' })).not.toBeInTheDocument()

  // Clear filters link
  expect(screen.getByRole('link', { name: 'Clear all search criteria filters' })).toHaveAttribute('href', '/providers')
})

test('Displays exclude regional filter when `true`', () => {
  const mockFilters: Filters = {
    page: 2,
    excludeRegional: true,
  }

  mockRouter.query = {
    page: '2',
    excludeRegional: 'true',
  }

  render(<SelectedFilters filters={mockFilters} />)

  expect(screen.getByRole('list', { name: 'Selected filters' })).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Clear filter: Exclude Regional' })).toHaveAttribute(
    'href',
    '/providers?page=2'
  )
})

test('Does not show selected filters panel if no filters selected', () => {
  const mockFilters: Filters = {
    page: 2,
    order: 'a-z',
  }

  render(<SelectedFilters filters={mockFilters} />)

  expect(screen.queryByRole('list', { name: 'Selected filters' })).not.toBeInTheDocument()
})
