import { UnresolvedLink } from 'contentful'
import crypto from 'crypto'

import type { TagIds } from '@/constants'

export type TagList = UnresolvedLink<'Tag'>[]

type TagGroup = (typeof TagIds)[keyof typeof TagIds]

export const formatTags = (tagList: TagList, tagGroup: TagGroup) => {
  const tags: string[] = []

  tagList.forEach((tag) => {
    if (tag.sys.id?.startsWith(tagGroup)) {
      const tagName = tag.sys.id
        .replace(tagGroup, '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
      tags.push(tagName)
    }
  })

  return tags
}

export const createReferenceNumber = (options?: { prefix: string }) => {
  const referenceNumber = crypto.randomBytes(4).toString('hex').slice(0, 5).toUpperCase()
  if (options?.prefix) return `${options.prefix}${referenceNumber}`
  return referenceNumber
}
