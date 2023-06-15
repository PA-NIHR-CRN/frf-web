import { useEffect, ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'
import { Header } from '../Header/Header'
import { Panel } from '../Panel/Panel'
import Link from 'next/link'
import { Footer } from '../Footer/Footer'

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
