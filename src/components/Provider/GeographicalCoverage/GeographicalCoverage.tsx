import clsx from 'clsx'

import MapPin from '@/components/Icons/MapPin'
import Users from '@/components/Icons/Users'
import { List, ListItem } from '@/components/List/List'

type GeographicalCoverageProps = {
  regionalCoverage: string | undefined
  population: string | undefined
  geography: string[]
  geographySupportingText: string | undefined
  className?: string
}

export const GeographicalCoverage = ({
  regionalCoverage,
  population,
  geography,
  geographySupportingText,
  className,
}: GeographicalCoverageProps) => {
  return (
    <List heading="Coverage:" aria-label="Coverage" className={clsx(className, 'text-sm')}>
      <ListItem icon={<MapPin />} className="flex-wrap">
        Geographical: {regionalCoverage || geography.join(', ')}
        {geographySupportingText && <p className="mb-0 ml-[36px] w-full text-sm">{geographySupportingText}</p>}
      </ListItem>
      {population && <ListItem icon={<Users />}>Population: {population}</ListItem>}
    </List>
  )
}
