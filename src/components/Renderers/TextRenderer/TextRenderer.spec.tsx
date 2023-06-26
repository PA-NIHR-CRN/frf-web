import { BLOCKS, Document } from '@contentful/rich-text-types'

import { render, screen } from '@/config/test-utils'

import { TextRenderer } from './TextRenderer'

test('Text renderer', () => {
  const children: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Hello, World!',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  }
  const className = 'custom-class'

  render(<TextRenderer className={className}>{children}</TextRenderer>)

  // Assert that the HTML content is rendered correctly
  const htmlElement = screen.getByText('Hello, World!')
  expect(htmlElement).toBeInTheDocument()

  // Assert that the component has the correct class name
  expect(htmlElement.parentElement).toHaveClass(className)
})
