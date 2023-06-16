import { List, ListItem } from '@/components/List/List'
import { TagIds } from '@/constants'

import { formatTags, TagList } from './generic.utils'

export const formatTypesOfDataList = (dataTypes: TagList) => {
  const tags = formatTags(dataTypes, TagIds.DATA_TYPE)
  return (
    <List heading="Types of data available" aria-label="Types of data available" className="px-3 text-sm">
      {tags.map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </List>
  )
}
