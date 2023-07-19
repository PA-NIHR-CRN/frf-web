import { TagIds } from '@/constants'

import { createReferenceNumber, formatTags, TagList } from './generic.utils'

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

describe('createReferenceNumber', () => {
  test('generates a reference number of length 5', () => {
    expect(createReferenceNumber({ id: 1 })).toEqual('00001')
    expect(createReferenceNumber({ id: 5 })).toEqual('00005')
    expect(createReferenceNumber({ id: 15 })).toEqual('00015')
    expect(createReferenceNumber({ id: 200 })).toEqual('00200')
    expect(createReferenceNumber({ id: 6125 })).toEqual('06125')
    expect(createReferenceNumber({ id: 136125 })).toEqual('136125')
  })

  test('supports a custom prefix', () => {
    const referenceNumber = createReferenceNumber({ id: 5, prefix: 'F' })
    expect(referenceNumber).toMatch(/^F[A-F0-9]+$/)
    expect(referenceNumber).toEqual('F00005')
  })
})
