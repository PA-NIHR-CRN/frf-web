import { ParsedUrlQuery } from 'querystring'

import { Filters, OrderType } from '@/@types/filters'
import { ServiceTypes } from '@/@types/services'
import { UK_WIDE_COUNTRIES } from '@/constants'

const concatFilters = <T>(filters: T | T[]) => {
  return ([] as T[]).concat(filters).filter(Boolean) as NonNullable<T>[]
}

export const getFiltersFromQuery = (query: ParsedUrlQuery) => {
  const filters: Filters = {
    page: Number(query.page) || 1,
    ...(query.q && { q: query.q as string }),
    ...(query.order && { order: query.order as OrderType }),
    serviceType: concatFilters(query.serviceType as ServiceTypes[]),
    dataType: concatFilters(query.dataType),
    geography: concatFilters(query.geography),
    excludeRegional: Boolean(query.excludeRegional),
    costs: concatFilters(query.costs),
  }

  return filters
}

export const transformFilters = (filters: Filters) => {
  const modifiedFilters = { ...filters }

  if (modifiedFilters.geography && UK_WIDE_COUNTRIES.some((country) => modifiedFilters.geography?.includes(country))) {
    modifiedFilters.geography = ['UK wide', ...modifiedFilters.geography]
  }

  return modifiedFilters
}
