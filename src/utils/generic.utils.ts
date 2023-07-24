import { UnresolvedLink } from 'contentful'

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

export const createReferenceNumber = ({ prefix = '', id }: { prefix?: string; id: number }) => {
  return `${prefix}${String(id).padStart(5, '0')}`
}
