import { Lato } from 'next/font/google'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Panel } from '../Panel/Panel'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'

const primaryFont = Lato({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

type RootLayoutProps = { children: ReactNode; backLink?: ReactNode }

export function RootLayout({ children, backLink }: RootLayoutProps) {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <div className={`${primaryFont.variable} font-sans`}>
      <Header />
      <PhaseBanner phase="Beta">
        This is a new service – your{' '}
        <Link className="govuk-link" href="/feedback">
          feedback
        </Link>{' '}
        will help us to improve it.
      </PhaseBanner>
      <Panel>
        <Link href="/" className="text-white no-underline focus:text-black">
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
