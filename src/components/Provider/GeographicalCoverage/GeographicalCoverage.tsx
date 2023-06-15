import MapPin from '@/components/Icons/MapPin'
import Users from '@/components/Icons/Users'
import { List, ListItem } from '@/components/List/List'

type GeographicalCoverageProps = {
  regionalCoverage: string | undefined
  population: number | undefined
  geography: string[]
  className?: string
}

export const GeographicalCoverage = ({
  regionalCoverage,
  population,
  geography,
  className,
}: GeographicalCoverageProps) => {
  return (
    <List heading="Coverage:" aria-label="Coverage" className={className}>
      <ListItem icon={<MapPin />}>Geographical: {regionalCoverage || geography.join(', ')}</ListItem>
      {population && <ListItem icon={<Users />}>Population: {population.toLocaleString('en-GB')}</ListItem>}
    </List>
  )
}
