import { BLOCKS } from '@contentful/rich-text-types'
import { Mock } from 'ts-mockery'

import { TypeCookieBanner } from '@/@types/generated'

export const mockCookieBannerContent = Mock.of<TypeCookieBanner<undefined, ''>>({
  fields: {
    description: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'We use some essential cookies to make this service work.',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
})
