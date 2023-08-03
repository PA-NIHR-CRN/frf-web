import dayjs from 'dayjs'
import MockDate from 'mockdate'

import { formatDate, getGDPRCookieExpiryDate } from '@/utils/date.utils'

beforeEach(() => {
  MockDate.set(new Date('2001-01-01'))
})

afterEach(() => {
  MockDate.reset()
})

describe('formatDate', () => {
  it('returns a correctly formatted date', () => {
    expect(formatDate(dayjs().toISOString())).toEqual('1 January 2001')
  })
})

describe('getGDPRCookieExpiryDate', () => {
  it('returns the correct expiry date', () => {
    expect(getGDPRCookieExpiryDate().toDateString()).toEqual('Tue Jan 01 2002')
  })
})
