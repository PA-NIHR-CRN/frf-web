import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import type { KeyValueMap } from 'contentful-management'
import type { NextApiRequest, NextApiResponse } from 'next'

import { DEFAULT_LOCALE, SEARCH_FIELDS } from '@/constants'
import { contentfulService } from '@/lib/contentful'

const getTextContent = (fieldName: string, fields: KeyValueMap) => {
  const fieldContent = fields[fieldName]?.[DEFAULT_LOCALE]
  if (!fieldContent) return
  if (Array.isArray(fieldContent)) {
    return `${fieldContent.join(', ').trim()}`
  } else if (fieldContent === Object(fieldContent) && fieldContent.nodeType === 'document') {
    return `${documentToPlainTextString(fieldContent).replace(/\n|\r/g, ' ').trim()}`
  } else {
    return `${fieldContent.trim()}`
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const entry = await contentfulService.getProviderEntryById(req.body.sys.id)

    const { fields } = entry

    const searchKeywords = SEARCH_FIELDS.map((fieldName) => getTextContent(fieldName, fields))
      .filter(Boolean)
      .join(', ')
      .trim()

    if (searchKeywords === fields.searchKeywords?.[DEFAULT_LOCALE]) {
      res.status(301).end()
      return
    }

    fields.searchKeywords = { [DEFAULT_LOCALE]: searchKeywords }

    const updated = await entry.update()

    await updated.publish()

    res.status(200).json({ searchKeywords })
  } catch (error) {
    res.status(500).send(`${error}`)
    return
  }
}
