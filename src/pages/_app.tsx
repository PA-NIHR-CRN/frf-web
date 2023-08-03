import '../globals.scss'

import { getCookie } from 'cookies-next'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { ReactElement, ReactNode, useEffect } from 'react'

import { TypeCookieBanner } from '@/@types/generated'
import { RootLayout } from '@/components/Layout/RootLayout'
import { FRF_GDPR_COOKIE_NAME } from '@/constants/cookies'
import { gtmVirtualPageView } from '@/lib/gtm'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps<{
  isPreviewMode?: boolean
  page?: string
  cookieBanner?: TypeCookieBanner<undefined, ''>
}> & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const disableSeo = process.env.NEXT_PUBLIC_APP_ENV !== 'prod'

  const router = useRouter()

  useEffect(() => {
    gtmVirtualPageView({
      pageTypeName: pageProps.page || null,
      url: router.asPath,
    })
  }, [pageProps, router.asPath])

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <RootLayout isPreviewMode={pageProps.isPreviewMode} cookieBanner={pageProps.cookieBanner}>
        {page}
      </RootLayout>
    ))

  const isGDPRCookieSet = getCookie(FRF_GDPR_COOKIE_NAME)

  return getLayout(
    <>
      <DefaultSeo
        title="Find, Recruit and Follow-up"
        description="Find, Recruit and Follow-up service."
        dangerouslySetAllPagesToNoFollow={disableSeo}
        dangerouslySetAllPagesToNoIndex={disableSeo}
      />
      <Component {...pageProps} />
      {isGDPRCookieSet && (
        <Script
          id="gtm-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'analytics_storage': 'granted'
            });
          `,
          }}
        />
      )}
    </>,
    pageProps
  )
}

export default App
