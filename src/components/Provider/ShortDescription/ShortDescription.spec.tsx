import { BLOCKS, Document } from '@contentful/rich-text-types'

import { render, screen } from '@/config/test-utils'

import { ShortDescription } from './ShortDescription'

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

test('Short description', () => {
  render(<ShortDescription>{description}</ShortDescription>)
  expect(screen.getByText(mockValue)).toBeInTheDocument()
  expect(screen.getByTestId('frf-dsp-description')).toBeInTheDocument()
})
