import { ParsedUrlQuery } from 'querystring'

import { Filters, OrderType } from '@/@types/filters'
import { ServiceTypes } from '@/@types/services'
import { UK_WIDE_COUNTRIES } from '@/constants'

const concatFilters = <T extends string | undefined>(queryFilters: T | T[]) => {
  const filters = Array.isArray(queryFilters) ? queryFilters : queryFilters?.split(',')
  return ([] as T[]).concat(filters as T).filter(Boolean) as NonNullable<T>[]
}

export const getFiltersFromQuery = (query: ParsedUrlQuery) => {
  const filters: Filters = {
    page: Number(query.page) || 1,
    serviceType: concatFilters(query.serviceType as ServiceTypes[]),
    dataType: concatFilters(query.dataType),
    geography: concatFilters(query.geography),
    costs: concatFilters(query.costs),
    excludeRegional: Boolean(query.excludeRegional),
    ...(query.q && { q: query.q as string }),
    ...(query.order && { order: query.order as OrderType }),
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
