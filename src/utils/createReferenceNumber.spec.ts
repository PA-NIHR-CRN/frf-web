import crypto from 'crypto'

import { createReferenceNumber } from './createReferenceNumber'

jest.mock('crypto', () => ({
  randomBytes: jest.fn(),
}))

describe('createReferenceNumber', () => {
  beforeEach(() => {
    ;(crypto.randomBytes as jest.Mock).mockClear()
  })

  test('should generate a reference number of length 5', () => {
    const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
    mockRandomBytes.mockImplementationOnce(() => Buffer.from('abcdef', 'hex'))

    const referenceNumber = createReferenceNumber()

    expect(referenceNumber).toHaveLength(5)
    expect(referenceNumber).toEqual('ABCDE')
    expect(mockRandomBytes).toHaveBeenCalledWith(4)
  })

  test('should generate a reference number using uppercase hex characters', () => {
    const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
    mockRandomBytes.mockImplementationOnce(() => Buffer.from('123456', 'hex'))

    const referenceNumber = createReferenceNumber()

    expect(referenceNumber).toMatch(/^[A-F0-9]+$/)
    expect(referenceNumber).toEqual('12345')
    expect(mockRandomBytes).toHaveBeenCalledWith(4)
  })
})
