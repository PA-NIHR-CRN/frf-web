import { getCookie } from 'cookies-next'
import { IncomingMessage } from 'http'

import { FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { contentfulService } from '@/lib/contentful'

/**
 * Return Contentful data for the Cookie Banner if the GDPR cookie was not already set.
 *
 * Allows checking cookies on the server by passing in a request object.
 *
 * @param req HTTP request data
 */
export const getCookieBanner = async (req?: IncomingMessage) => {
  const isGDPRCookieSet = !!getCookie(FRF_GDPR_COOKIE_NAME, { req })
  return !isGDPRCookieSet ? await contentfulService.getCookieBanner() : null
}
