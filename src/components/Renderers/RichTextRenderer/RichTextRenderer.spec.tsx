import { BLOCKS, Document } from '@contentful/rich-text-types'

import { render, screen } from '@/config/test-utils'

import { RichTextRenderer } from './RichTextRenderer'

test('Rich text renderer', () => {
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
      {
        nodeType: BLOCKS.UL_LIST,
        data: {},
        content: [
          {
            nodeType: BLOCKS.LIST_ITEM,
            data: {},
            content: [
              {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'List item 1',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
          {
            nodeType: BLOCKS.LIST_ITEM,
            data: {},
            content: [
              {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'List item 2',
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
  const className = 'custom-class'

  render(<RichTextRenderer className={className}>{children}</RichTextRenderer>)

  // Assert that the paragraph node is rendered correctly
  const paragraphElement = screen.getByText('Hello, World!')
  expect(paragraphElement).toBeInTheDocument()

  // Assert that the component has the correct class name
  expect(paragraphElement.parentElement).toHaveClass(className)

  // Assert that the unordered list node is rendered correctly
  const unorderedListElement = screen.getByRole('list')
  expect(unorderedListElement).toBeInTheDocument()

  // Assert that the list item nodes are rendered correctly
  const listItemElements = screen.getAllByRole('listitem')
  expect(listItemElements).toHaveLength(2)

  // Assert that the first list item contains the correct text
  const listItem1Element = screen.getByText('List item 1')
  expect(listItem1Element).toBeInTheDocument()

  // Assert that the second list item contains the correct text
  const listItem2Element = screen.getByText('List item 2')
  expect(listItem2Element).toBeInTheDocument()
})
