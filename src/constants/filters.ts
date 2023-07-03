import { FilterKey } from '@/@types/filters'

export const UK_WIDE_COUNTRIES = ['England', 'Northern Ireland', 'Scotland', 'Wales']

// Filters which can be modified from the side panel/selected filters panel
export const SELECTABLE_FILTERS: FilterKey[] = ['q', 'serviceType', 'geography', 'costs', 'excludeRegional']

// Content model fields which should be included in search indexing
export const SEARCH_FIELDS = [
  'name',
  'providerOrganisation',
  'shortDescription',
  'fundedBy',
  'geography',
  'geographySupportingText',
  'regionalCoverage',
  'suitedTo',
  'costs',
  'findCostChargeableDescription',
  'recruitCostChargeableDescription',
  'followUpCostChargeableDescription',
  'typesOfDataAvailableList',
  'typesOfDataAvailableDetail',
  'websiteName',
  'informationGovernance',
  'geographicAndPopulationCoverage',
]
