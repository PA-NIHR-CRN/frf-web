import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

import { TypeCookieBanner } from '@/@types/generated'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { FRF_GDPR_COOKIE_ACCEPT_VALUE, FRF_GDPR_COOKIE_NAME, FRF_GDPR_COOKIE_REJECT_VALUE } from '@/constants/cookies'
import { getGDPRCookieExpiryDate } from '@/utils/date.utils'

export type CookieBannerProps = {
  content: TypeCookieBanner<undefined, ''>
}

enum CookieBannerView {
  Hidden,
  Selection,
  Accepted,
  Rejected,
}

export const CookieBanner = ({ content }: CookieBannerProps) => {
  const [view, setView] = useState(CookieBannerView.Hidden)

  const regionRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    const isCookieSet = !!getCookie(FRF_GDPR_COOKIE_NAME)

    // Set initial visibility on client
    if (view === CookieBannerView.Hidden && !isCookieSet) {
      setView(CookieBannerView.Selection)
    }

    // Set focus on confirmation screen
    if (view === CookieBannerView.Accepted || view === CookieBannerView.Rejected) {
      regionRef.current?.focus()
    }

    // Set focus after clicking "change settings"
    if (view === CookieBannerView.Selection && isCookieSet) {
      regionRef.current?.focus()
    }
  }, [view])

  const handleAccept: MouseEventHandler = () => {
    setView(CookieBannerView.Accepted)
    setCookie(FRF_GDPR_COOKIE_NAME, FRF_GDPR_COOKIE_ACCEPT_VALUE, { expires: getGDPRCookieExpiryDate(), secure: true })
  }

  const handleReject: MouseEventHandler = () => {
    setView(CookieBannerView.Rejected)
    setCookie(FRF_GDPR_COOKIE_NAME, FRF_GDPR_COOKIE_REJECT_VALUE, { expires: getGDPRCookieExpiryDate(), secure: true })
  }

  const handleHide: MouseEventHandler = () => {
    setView(CookieBannerView.Hidden)
  }

  const handleViewCookiePolicy: MouseEventHandler = (event) => {
    event.preventDefault()
    setView(CookieBannerView.Hidden)
    router.push('/cookie-policy')
  }

  const handleChange: MouseEventHandler = (e) => {
    e.preventDefault()
    setView(CookieBannerView.Selection)
  }

  const renderSelection = () => {
    return (
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-cookie-banner__heading govuk-heading-m">Cookies on Find, Recruit and Follow-Up</h2>

            {content.fields.description && (
              <div className="govuk-cookie-banner__content govuk-body focus:outline-0" tabIndex={-1} ref={regionRef}>
                <RichTextRenderer>{content.fields.description}</RichTextRenderer>
              </div>
            )}
          </div>
        </div>

        <div className="govuk-button-group">
          <button value="accept" type="button" name="cookies" className="govuk-button" onClick={handleAccept}>
            Accept additional cookies
          </button>
          <button value="reject" type="button" name="cookies" className="govuk-button" onClick={handleReject}>
            Reject additional cookies
          </button>
          <Link className="govuk-link" href="/cookie-policy">
            View cookies
          </Link>
        </div>
      </div>
    )
  }

  const renderConfirmation = () => {
    return (
      <div className="govuk-cookie-banner__message govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-cookie-banner__content focus:outline-0" tabIndex={-1} ref={regionRef}>
              <p className="govuk-body" data-testid="confirmation-message">
                You’ve {view === CookieBannerView.Accepted ? 'accepted' : 'rejected'} additional cookies. You can view
                the{' '}
                <Link className="govuk-link" href="/cookie-policy" onClick={handleViewCookiePolicy}>
                  cookie policy
                </Link>{' '}
                or{' '}
                <a className="govuk-link" href="#cookie-banner" onClick={handleChange}>
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
            </div>
          </div>
        </div>
        <div className="govuk-button-group">
          <button className="govuk-button" onClick={handleHide}>
            Hide cookie message
          </button>
        </div>
      </div>
    )
  }

  if (view === CookieBannerView.Hidden) return null

  return (
    <div
      className="govuk-cookie-banner govuk-!-padding-top-5 govuk-!-padding-bottom-3 fixed bottom-0 left-0 z-10 w-full"
      data-nosnippet=""
      role="region"
      aria-label="Cookies on Find, Recruit and Follow-Up"
    >
      {view === CookieBannerView.Selection ? renderSelection() : renderConfirmation()}
    </div>
  )
}
