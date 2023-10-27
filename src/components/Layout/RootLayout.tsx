import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'

import { TypeCookieBanner } from '@/@types/generated'
import { CookieBanner } from '@/components/CookieBanner/CookieBanner'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Panel } from '../Panel/Panel'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'
import { WarningBanner } from '../WarningBanner/WarningBanner'

const primaryFont = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

export type RootLayoutProps = {
  children: ReactNode
  heading?: string
  backLink?: ReactNode
  isPreviewMode?: boolean
  cookieBanner?: TypeCookieBanner<undefined, ''> | null
}

export function RootLayout({
  children,
  backLink,
  heading = 'Find, Recruit and Follow-up',
  isPreviewMode,
  cookieBanner,
}: RootLayoutProps) {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <div className={`${primaryFont.variable} font-sans`}>
      {cookieBanner && <CookieBanner content={cookieBanner} />}
      <WarningBanner isPreviewMode={!!isPreviewMode} isTestEnvironment={process.env.NEXT_PUBLIC_APP_ENV === 'uat'} />
      <Header />
      <main id="main-content" className="govuk-main-wrapper" role="main">
        <PhaseBanner phase="Beta">
          This is a new service – your{' '}
          <Link className="govuk-link govuk-link--no-visited-state" href="/feedback">
            feedback
          </Link>{' '}
          will help us to improve it.
        </PhaseBanner>
        {heading && <Panel>{heading}</Panel>}
        {backLink}
        {children}
      </main>
      <Footer />
    </div>
  )
}
