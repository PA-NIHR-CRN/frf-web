import { TagList } from '@/utils/generic.utils'
import { formatTypesOfDataList } from '@/utils/typesOfData.utils'

type TypesOfDataListProps = {
  tags: TagList
}

export const TypesOfDataList = ({ tags }: TypesOfDataListProps) => {
  if (!tags.length) return null

  return formatTypesOfDataList(tags)
}
