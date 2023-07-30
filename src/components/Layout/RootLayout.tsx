import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'

import { TypeCookieBanner } from '@/@types/generated'
import { CookieBanner } from '@/components/CookieBanner/CookieBanner'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Panel } from '../Panel/Panel'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'
import { PreviewBanner } from '../PreviewBanner/PreviewBanner'

const primaryFont = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

export type RootLayoutProps = {
  children: ReactNode
  backLink?: ReactNode
  isPreviewMode?: boolean
  cookieBanner?: TypeCookieBanner<undefined, ''> | null
}

export function RootLayout({ children, backLink, isPreviewMode, cookieBanner }: RootLayoutProps) {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <div className={`${primaryFont.variable} font-sans`}>
      {cookieBanner && <CookieBanner content={cookieBanner} />}
      <PreviewBanner isPreviewMode={!!isPreviewMode} />
      <Header />
      <PhaseBanner phase="Beta">
        This is a new service – your{' '}
        <Link className="govuk-link govuk-link--no-visited-state" href="/feedback">
          feedback
        </Link>{' '}
        will help us to improve it.
      </PhaseBanner>
      <Panel>
        <Link
          href="/"
          className="text-white no-underline focus:text-black"
          aria-label="Go to the Find, Recruit and Follow-up homepage"
        >
          Find, Recruit and Follow-up
        </Link>
      </Panel>
      {backLink}
      <main id="main-content" className="govuk-main-wrapper" role="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
