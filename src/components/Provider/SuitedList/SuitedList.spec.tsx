import { render, screen, within } from '@/config/test-utils'

import { SuitedList } from './SuitedList'

const mockItems = ['Item 1', 'Item 2']

test('No list items', () => {
  render(<SuitedList items={undefined} showHeading={true} type="positive" />)
  expect(screen.queryByRole('list')).not.toBeInTheDocument()

  render(<SuitedList items={[]} showHeading={true} type="positive" />)
  expect(screen.queryByRole('list')).not.toBeInTheDocument()
})

test('Suited to', () => {
  render(<SuitedList items={mockItems} showHeading={true} type="positive" />)

  expect(screen.getByRole('list', { name: 'Suited to:' })).toBeInTheDocument()
  expect(screen.getByText('Suited to:')).toBeInTheDocument()

  const items = screen.getAllByRole('listitem')

  expect(items).toHaveLength(2)
  expect(within(items[0]).getByText('Item 1')).toBeInTheDocument()
  expect(within(items[0]).getByTestId('frf-icon-tick')).toHaveAttribute('aria-hidden')
  expect(within(items[1]).getByText('Item 2')).toBeInTheDocument()
  expect(within(items[1]).getByTestId('frf-icon-tick')).toHaveAttribute('aria-hidden')
})

test('Not suited to', () => {
  render(<SuitedList items={mockItems} showHeading={true} type="negative" />)

  expect(screen.getByRole('list', { name: 'Not suited to:' })).toBeInTheDocument()
  expect(screen.getByText('Not suited to:')).toBeInTheDocument()

  const items = screen.getAllByRole('listitem')

  expect(items).toHaveLength(2)
  expect(within(items[0]).getByText('Item 1')).toBeInTheDocument()
  expect(within(items[0]).getByTestId('frf-icon-cross')).toHaveAttribute('aria-hidden')
  expect(within(items[1]).getByText('Item 2')).toBeInTheDocument()
  expect(within(items[1]).getByTestId('frf-icon-cross')).toHaveAttribute('aria-hidden')
})

test('Without a heading', () => {
  render(<SuitedList items={mockItems} showHeading={false} type="negative" />)
  expect(screen.queryByText('Not suited to:')).not.toBeInTheDocument()
})
