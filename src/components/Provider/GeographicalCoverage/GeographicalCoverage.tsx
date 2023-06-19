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
    <List heading="Coverage:" aria-label="Coverage" className={className}>
      <ListItem icon={<MapPin />} className="flex-wrap">
        Geographical: {regionalCoverage || geography.join(', ')}
        {geographySupportingText && <p className="ml-[36px]">{geographySupportingText}</p>}
      </ListItem>
      {population && <ListItem icon={<Users />}>Population: {population}</ListItem>}
    </List>
  )
}
