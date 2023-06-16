import { render, screen, within } from '@/config/test-utils'

import { TypesOfDataList } from './TypesOfDataList'

test('No data types', () => {
  render(<TypesOfDataList tags={[]} />)
  expect(screen.queryByRole('list')).not.toBeInTheDocument()
})

test('Data types', () => {
  render(
    <TypesOfDataList
      tags={[
        {
          sys: {
            id: 'dataTypePrimaryCare',
            type: 'Link',
            linkType: 'Tag',
          },
        },
        {
          sys: {
            id: 'dataTypeOther',
            type: 'Link',
            linkType: 'Tag',
          },
        },
      ]}
    />
  )
  expect(screen.getByRole('list', { name: 'Types of data available' })).toBeInTheDocument()

  const listItems = screen.getAllByRole('listitem')

  expect(listItems).toHaveLength(2)
  expect(within(listItems[0]).getByText('Primary Care')).toBeInTheDocument()
  expect(within(listItems[1]).getByText('Other')).toBeInTheDocument()
})

test('Invalid tag prefix', () => {
  render(
    <TypesOfDataList
      tags={[
        {
          sys: {
            id: 'primaryCare',
            type: 'Link',
            linkType: 'Tag',
          },
        },
        {
          sys: {
            id: 'notValidOther',
            type: 'Link',
            linkType: 'Tag',
          },
        },
      ]}
    />
  )

  expect(screen.getByRole('list', { name: 'Types of data available' })).toBeInTheDocument()
  expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})
