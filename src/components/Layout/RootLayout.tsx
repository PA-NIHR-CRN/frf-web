import { Roboto } from 'next/font/google'
import { ReactNode, useEffect } from 'react'

import { TypeCookieBanner } from '@/@types/generated'
import { CookieBanner } from '@/components/CookieBanner/CookieBanner'

import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { WarningBanner } from '../WarningBanner/WarningBanner'

const primaryFont = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

export type RootLayoutProps = {
  children: ReactNode
  heading?: string
  isPreviewMode?: boolean
  cookieBanner?: TypeCookieBanner<undefined, ''> | null
}

export function RootLayout({
  children,
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
      <Header heading={heading} isPreviewMode={!!isPreviewMode} />
      <main id="main-content" className="govuk-main-wrapper" role="main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
