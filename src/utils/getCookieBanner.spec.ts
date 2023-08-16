import { getCookie } from 'cookies-next'
import { IncomingMessage } from 'http'
import { Mock } from 'ts-mockery'

import { TypeCookieBanner } from '@/@types/generated'
import { FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { contentfulService } from '@/lib/contentful'

import { getCookieBanner } from './getCookieBanner'

jest.mock('@/lib/contentful')
jest.mock('cookies-next')

const mockedGetCookie = jest.mocked(getCookie)

const mockRequest = {} as IncomingMessage

beforeEach(jest.clearAllMocks)

describe('getCookieBanner', () => {
  it('should call getCookie with FRF_GDPR_COOKIE_NAME and request object', async () => {
    getCookieBanner(mockRequest)

    expect(getCookie).toHaveBeenCalledWith(FRF_GDPR_COOKIE_NAME, { req: mockRequest })
  })

  it('should return null if GDPR cookie is set', async () => {
    mockedGetCookie.mockReturnValue(true)

    const result = await getCookieBanner(mockRequest)

    expect(result).toBeNull()
  })

  it('should call contentfulService.getCookieBanner() if GDPR cookie is not set', async () => {
    mockedGetCookie.mockReturnValue(false)

    await getCookieBanner(mockRequest)

    expect(contentfulService.getCookieBanner).toHaveBeenCalledTimes(1)
  })

  it('should return the result of contentfulService.getCookieBanner() if GDPR cookie is not set', async () => {
    const mockContentfulData = Mock.of<TypeCookieBanner<undefined, ''>>({ fields: { title: 'Test cookie banner' } })
    mockedGetCookie.mockReturnValue(false)
    jest.mocked(contentfulService.getCookieBanner).mockResolvedValue(mockContentfulData)

    const result = await getCookieBanner(mockRequest)

    expect(result).toEqual(mockContentfulData)
  })
})
