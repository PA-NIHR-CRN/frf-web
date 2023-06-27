import { ParsedUrlQuery } from 'querystring'

import { ServiceType } from '@/constants'

import { getFiltersFromQuery, transformFilters } from './filters'

describe('getFiltersFromQuery', () => {
  it('returns the correct filters', () => {
    const query: ParsedUrlQuery = {
      page: '2',
      serviceType: ServiceType.RECRUIT,
      dataType: 'testDataType',
      geography: ['England', 'Wales'],
      costs: 'testCost',
      excludeRegional: 'true',
      q: 'test search',
      order: 'a-z',
    }

    expect(getFiltersFromQuery(query)).toStrictEqual({
      page: 2,
      serviceType: [ServiceType.RECRUIT],
      dataType: ['testDataType'],
      geography: ['England', 'Wales'],
      costs: ['testCost'],
      excludeRegional: true,
      q: 'test search',
      order: 'a-z',
    })
  })
})

describe('transformFilters', () => {
  it('adds UK wide filter when a country within the UK is selected', () => {
    const filters = {
      page: 1,
      geography: ['England'],
    }
    expect(transformFilters(filters)).toStrictEqual({
      page: 1,
      geography: ['UK wide', 'England'],
    })
  })
})
