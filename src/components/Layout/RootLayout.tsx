import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Panel } from '../Panel/Panel'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-roboto' })

type RootLayoutProps = { children: ReactNode; backLink?: ReactNode }

export function RootLayout({ children, backLink }: RootLayoutProps) {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <div className={roboto.variable}>
      <Header />
      <PhaseBanner phase="Beta">
        This is a new service – your{' '}
        <Link className="govuk-link" href="/feedback">
          feedback
        </Link>{' '}
        will help us to improve it.
      </PhaseBanner>
      <Panel>Find, Recruit and Follow-up</Panel>
      {backLink}
      <main id="main-content" className="govuk-main-wrapper" role="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
