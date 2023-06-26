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
    <List heading="Coverage:" aria-label="Coverage" className={clsx(className, 'govuk-body')}>
      <ListItem
        className="items-start"
        icon={
          <div>
            <MapPin />
          </div>
        }
      >
        <div>
          <p className="govuk-!-margin-bottom-1">Geographical: {regionalCoverage || geography.join(', ')}</p>
          {geographySupportingText && <p className="mb-0">{geographySupportingText}</p>}
        </div>
      </ListItem>
      {population && <ListItem icon={<Users />}>Population: {population}</ListItem>}
    </List>
  )
}
