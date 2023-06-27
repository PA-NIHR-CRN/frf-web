import { ServiceTypes } from '@/@types/services'

export type OrderType = 'updated' | 'a-z' | 'z-a' | 'highest-population' | 'lowest-population'

export interface Filters {
  page: number
  q?: string
  serviceType?: ServiceTypes[]
  geography?: string[]
  dataType?: string[]
  costs?: string[]
  excludeRegional?: boolean
  order?: OrderType
}

export type FilterKey = keyof Filters
export type FilterValue = Filters[FilterKey]
