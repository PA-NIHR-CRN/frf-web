import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Block } from '@contentful/rich-text-types'
import type { KeyValueMap } from 'contentful-management'
import type { NextApiRequest, NextApiResponse } from 'next'

import { TypeServiceProviderSkeleton } from '@/@types/generated'
import { DEFAULT_LOCALE, SEARCH_FIELDS } from '@/constants'
import { contentfulService } from '@/lib/contentful'

type Entry = { fields: KeyValueMap }

const isRichTextBlock = (block: Block) => block === Object(block) && block.nodeType === 'document'

const getRichTextContent = (block: Block) => `${documentToPlainTextString(block).replace(/\n|\r/g, ' ').trim()}`

const getServiceDescriptionTextContent = (fieldName: string, fields: KeyValueMap) =>
  isRichTextBlock(fields[fieldName]) ? getRichTextContent(fields[fieldName]) : undefined

const getTextContent = (fieldName: string, fields: KeyValueMap) => {
  const fieldContent = fields[fieldName]

  if (!fieldContent) return

  if (fieldName === 'dataSpecificsAndCoding') {
    return fieldContent
      .map((entry: Entry) => getTextContent('text', entry.fields))
      .join(', ')
      .trim()
  }

  if (fieldName === 'serviceTypes') {
    return fieldContent
      .map((entry: Entry) =>
        Object.keys(entry.fields).map((fieldName) => getServiceDescriptionTextContent(fieldName, entry.fields))
      )
      .flat()
      .filter(Boolean)
      .join(', ')
      .trim()
  }

  if (Array.isArray(fieldContent)) {
    return `${fieldContent.join(', ').trim()}`
  }

  if (isRichTextBlock(fieldContent)) {
    return getRichTextContent(fieldContent)
  }

  return `${fieldContent.trim()}`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const entry = await contentfulService.getEntryById<TypeServiceProviderSkeleton>(req.body.sys.id)

    const { fields } = entry

    const searchKeywords = SEARCH_FIELDS.map((fieldName) => getTextContent(fieldName, fields))
      .filter(Boolean)
      .join(', ')
      .trim()

    if (searchKeywords === fields.searchKeywords) {
      res.status(301).end()
      return
    }

    const manageableEntry = await contentfulService.getManageableEntryById(req.body.sys.id)

    manageableEntry.fields.searchKeywords = { [DEFAULT_LOCALE]: searchKeywords }

    const updated = await manageableEntry.update()

    await updated.publish()

    res.status(200).json({ searchKeywords })
  } catch (error) {
    res.status(500).send(`${error}`)
    return
  }
}
