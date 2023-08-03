import dayjs from 'dayjs'

import { DATE_FORMAT } from '@/constants'
import { FRF_GDPR_COOKIE_EXPIRY_MONTHS } from '@/constants/cookies'

/**
 * Formats a date using the default govuk format e.g. 13 June 2023
 */
export const formatDate = (date: string) => dayjs(date).format(DATE_FORMAT)

/**
 * Returns a date object representing the GDPR cookie expiry time
 */
export const getGDPRCookieExpiryDate = () => dayjs().add(FRF_GDPR_COOKIE_EXPIRY_MONTHS, 'M').toDate()
