import { BLOCKS, Document } from '@contentful/rich-text-types'

import { render, screen } from '@/config/test-utils'

import { TypesOfData } from './TypesOfData'

const mockValue = 'Mock description text'

const description: Document = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: mockValue,
          nodeType: 'text',
        },
      ],
      nodeType: BLOCKS.PARAGRAPH,
    },
    {
      data: {},
      content: [{ data: {}, marks: [], value: '', nodeType: 'text' }],
      nodeType: BLOCKS.PARAGRAPH,
    },
  ],
  nodeType: BLOCKS.DOCUMENT,
}

test('Types of data', () => {
  render(<TypesOfData heading="Type of data available">{description}</TypesOfData>)
  expect(screen.getByRole('heading', { name: 'Type of data available', level: 3 })).toBeInTheDocument()
  expect(screen.getByText(mockValue)).toBeInTheDocument()
})
