import Cross from '@/components/Icons/Cross'
import Tick from '@/components/Icons/Tick'
import { List, ListItem } from '@/components/List/List'

type SuitedListProps = {
  showHeading: boolean
  items: string[] | undefined
  type: 'positive' | 'negative'
  className?: string
}

export const SuitedList = ({ showHeading, items, type, className }: SuitedListProps) => {
  const heading = type === 'positive' ? 'Suited to:' : 'Not suited to:'
  const icon = type === 'positive' ? <Tick /> : <Cross className="text-[24px] [&>path]:stroke-red" />

  if (!items || !items.length) return null

  return (
    <List heading={showHeading ? heading : undefined} aria-label={heading} className={className}>
      {items.map((item) => (
        <ListItem key={item} icon={icon}>
          {item}
        </ListItem>
      ))}
    </List>
  )
}
