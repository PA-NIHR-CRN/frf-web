import { TagIds } from '@/constants'

import { formatTags, TagList } from './generic.utils'

describe('formatTags', () => {
  const mockResponse = (id: string): TagList => [
    {
      sys: {
        id,
        linkType: 'Tag',
        type: 'Link',
      },
    },
  ]

  it('extracts and formats tags with a prefix that matches the "Data type" tag group', () => {
    const dataTypes = formatTags(mockResponse('dataTypeMockTag'), TagIds.DATA_TYPE)
    expect(dataTypes).toEqual(['Mock Tag'])
  })

  it('extracts and formats tags with a prefix that matches the "Service type" tag group', () => {
    const serviceTypes = formatTags(mockResponse('serviceTypeMockTag'), TagIds.SERVICE_TYPE)
    expect(serviceTypes).toEqual(['Mock Tag'])
  })

  it('ignores tags with a prefix that does not match the provided tag group', () => {
    expect(formatTags(mockResponse('dataTypeMockTag'), TagIds.SERVICE_TYPE)).toEqual([])
    expect(formatTags(mockResponse('invalidMockTag'), TagIds.DATA_TYPE)).toEqual([])
    expect(formatTags(mockResponse('mockTag'), TagIds.SERVICE_TYPE)).toEqual([])
    expect(formatTags(mockResponse(''), TagIds.SERVICE_TYPE)).toEqual([])
  })
})
