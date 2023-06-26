import { render, screen } from '@testing-library/react'
import React from 'react'

import { NoResults } from './NoResults'

test('should render the component with the correct content', () => {
  render(<NoResults />)

  const headingElement = screen.getByRole('heading', { name: 'There are no matching results.', level: 3 })
  const listElement = screen.getByRole('list')

  expect(headingElement).toBeInTheDocument()
  expect(listElement).toBeInTheDocument()

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(4)

  const listItemContents = [
    'Removing filters',
    'Double-checking your spelling',
    'Using fewer keywords',
    'Searching for something less specific',
  ]

  listItemContents.forEach((content) => {
    const listItem = screen.getByText(content)
    expect(listItem).toBeInTheDocument()
  })
})
