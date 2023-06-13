import { render, screen, within } from '@/config/test-utils'

import { List, ListItem } from './List'

test('Unordered list', () => {
  render(
    <List aria-label="mock-list" heading="mock-list" className="custom-class">
      <ListItem>Test item 1</ListItem>
      <ListItem>Test item 2</ListItem>
    </List>
  )
  const list = screen.getByRole('list', { name: 'mock-list' })
  expect(list).toHaveClass('custom-class')
  expect(list.tagName).toBe('UL')

  const listItems = within(list).getAllByRole('listitem')

  expect(listItems).toHaveLength(2)
  expect(listItems[0]).toHaveTextContent('Test item 1')
  expect(listItems[1]).toHaveTextContent('Test item 2')
})

test('Ordered list', () => {
  render(
    <List as="ol" aria-label="mock-list">
      <ListItem>Test item 1</ListItem>
      <ListItem>Test item 2</ListItem>
    </List>
  )
  expect(screen.getByRole('list', { name: 'mock-list' }).tagName).toBe('OL')
})

test('List item with icon', () => {
  render(
    <List>
      <ListItem icon={<span data-testid="mock-icon" />}>Test item 1</ListItem>
    </List>
  )

  const list = screen.getByRole('list')
  expect(within(list).getByTestId('mock-icon')).toBeInTheDocument()
})
