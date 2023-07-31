import { BLOCKS, Document } from '@contentful/rich-text-types'

export const mockContent: Document = {
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
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Bold text!',
          marks: [{ type: 'bold' }],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Heading level 1',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Heading level 2',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_3,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Heading level 3',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_4,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Heading level 4',
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
        {
          nodeType: BLOCKS.EMBEDDED_ENTRY,
          data: {
            target: {
              sys: {
                contentType: { sys: { id: 'button' } },
              },
              fields: { text: 'Button text', url: '#', type: 'Primary', external: false },
            },
          },
          content: [],
        },
        {
          nodeType: BLOCKS.EMBEDDED_ENTRY,
          data: {
            target: {
              sys: {
                contentType: { sys: { id: 'button' } },
              },
              fields: { text: 'Button text secondary', url: '#', type: 'Secondary', external: true },
            },
          },
          content: [],
        },
        {
          nodeType: BLOCKS.EMBEDDED_ENTRY,
          data: {
            target: {
              sys: {
                contentType: { sys: { id: 'video' } },
              },
              fields: { title: 'Video title', url: 'https://www.youtube.com/watch?v=3WUh1huCUrM' },
            },
          },
          content: [],
        },
        {
          nodeType: BLOCKS.EMBEDDED_ASSET,
          data: {
            target: {
              fields: {
                title: 'Embedded video title',
                description: 'Embedded video description',
                file: {
                  url: '//video.mp4',
                  details: { size: 565999 },
                  fileName: 'chrome_H9Gu0JpQqH.mp4',
                  contentType: 'video/mp4',
                },
              },
            },
          },
          content: [],
        },
        {
          nodeType: BLOCKS.EMBEDDED_ASSET,
          data: {
            target: {
              fields: {
                title: 'Test image title',
                description: 'Test image description',
                file: {
                  url: '//image.jpg',
                  details: { size: 542143, image: { width: 1280, height: 874 } },
                  fileName: 'image.jpg',
                  contentType: 'image/jpeg',
                },
              },
            },
          },
          content: [],
        },
      ],
    },
  ],
}
