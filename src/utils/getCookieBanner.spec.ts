import { getCookie } from 'cookies-next'
import { IncomingMessage } from 'http'

import { FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { contentfulService } from '@/lib/contentful'

import { getCookieBanner } from './getCookieBanner'

jest.mock('@/lib/contentful')
jest.mock('cookies-next')

const mockRequest = {} as IncomingMessage

beforeEach(jest.clearAllMocks)

describe('getCookieBanner', () => {
  it('should call getCookie with FRF_GDPR_COOKIE_NAME and request object', async () => {
    getCookieBanner(mockRequest)

    expect(getCookie).toHaveBeenCalledWith(FRF_GDPR_COOKIE_NAME, { req: mockRequest })
  })

  it('should return null if GDPR cookie is set', async () => {
    ;(getCookie as jest.Mock).mockReturnValue(true)

    const result = await getCookieBanner(mockRequest)

    expect(result).toBeNull()
  })

  it('should call contentfulService.getCookieBanner() if GDPR cookie is not set', async () => {
    ;(getCookie as jest.Mock).mockReturnValue(false)

    await getCookieBanner(mockRequest)

    expect(contentfulService.getCookieBanner).toHaveBeenCalledTimes(1)
  })

  it('should return the result of contentfulService.getCookieBanner() if GDPR cookie is not set', async () => {
    const mockContentfulData = { message: 'Cookie Banner Content' }
    ;(getCookie as jest.Mock).mockReturnValue(false)
    ;(contentfulService.getCookieBanner as jest.Mock).mockResolvedValue(mockContentfulData)

    const result = await getCookieBanner(mockRequest)

    expect(result).toEqual(mockContentfulData)
  })
})
