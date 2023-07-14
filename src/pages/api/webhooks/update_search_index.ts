import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Block } from '@contentful/rich-text-types'
import { Entry } from 'contentful'
import type { KeyValueMap } from 'contentful-management'
import type { NextApiRequest, NextApiResponse } from 'next'

import { TypeServiceProviderSkeleton } from '@/@types/generated'
import { DEFAULT_LOCALE, SEARCH_FIELDS } from '@/constants'
import { contentfulService } from '@/lib/contentful'
import { logger } from '@/lib/logger'

jest.mock('@/lib/logger')

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

const updateServiceProviderKeywords = async (entry: Entry<TypeServiceProviderSkeleton>) => {
  const { fields } = entry

  const searchKeywords = SEARCH_FIELDS.map((fieldName) => getTextContent(fieldName, fields))
    .filter(Boolean)
    .join(', ')
    .trim()

  if (searchKeywords === fields.searchKeywords) {
    return
  }

  const manageableEntry = await contentfulService.getManageableEntryById(entry.sys.id)

  manageableEntry.fields.searchKeywords = { [DEFAULT_LOCALE]: searchKeywords }

  const updated = await manageableEntry.update()

  await updated.publish()

  logger.info(`Updated search keywords for "${fields.name}". New keywords: ${searchKeywords}`)

  return searchKeywords
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let searchKeywords
    if (req.body.contentType === 'serviceProvider') {
      const entry = await contentfulService.getEntryById<TypeServiceProviderSkeleton>(req.body.id)
      searchKeywords = await updateServiceProviderKeywords(entry)
    } else {
      const entries = await contentfulService.getLinkedProviders(req.body.id)
      searchKeywords = (await Promise.all(entries.items.map(updateServiceProviderKeywords))).join('')
    }
    if (searchKeywords) {
      res.status(200).json(searchKeywords)
    } else {
      res.status(301)
    }
  } catch (error) {
    res.status(500).send(`${error}`)
    return
  }
}
