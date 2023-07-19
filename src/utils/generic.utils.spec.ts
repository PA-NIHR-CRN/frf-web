import crypto from 'crypto'

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

jest.mock('crypto', () => ({
  randomBytes: jest.fn(),
}))

describe('createReferenceNumber', () => {
  beforeEach(() => {
    ;(crypto.randomBytes as jest.Mock).mockClear()
  })

  test('generates a reference number of length 5', () => {
    const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
    mockRandomBytes.mockImplementationOnce(() => Buffer.from('abcdef', 'hex'))

    const referenceNumber = createReferenceNumber()

    expect(referenceNumber).toHaveLength(5)
    expect(referenceNumber).toEqual('ABCDE')
    expect(mockRandomBytes).toHaveBeenCalledWith(4)
  })

  test('generates a reference number using uppercase hex characters', () => {
    const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
    mockRandomBytes.mockImplementationOnce(() => Buffer.from('123456', 'hex'))

    const referenceNumber = createReferenceNumber()

    expect(referenceNumber).toMatch(/^[A-F0-9]+$/)
    expect(referenceNumber).toEqual('12345')
    expect(mockRandomBytes).toHaveBeenCalledWith(4)
  })

  test('supports a custom prefix', () => {
    const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
    mockRandomBytes.mockImplementationOnce(() => Buffer.from('123456', 'hex'))

    const referenceNumber = createReferenceNumber({ prefix: 'F' })

    expect(referenceNumber).toMatch(/^F[A-F0-9]+$/)
    expect(referenceNumber).toEqual('F12345')
    expect(mockRandomBytes).toHaveBeenCalledWith(4)
  })
})
