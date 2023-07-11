import '../globals.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { ReactElement, ReactNode, useEffect } from 'react'

import { RootLayout } from '@/components/Layout/RootLayout'
import { gtmVirtualPageView } from '@/lib/gtm'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps<{ isPreviewMode?: boolean; page?: string }> & {
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
    Component.getLayout ?? ((page) => <RootLayout isPreviewMode={pageProps.isPreviewMode}>{page}</RootLayout>)

  return getLayout(
    <>
      <DefaultSeo
        title="Find, Recruit and Follow-up"
        description="Find, Recruit and Follow-up service."
        dangerouslySetAllPagesToNoFollow={disableSeo}
        dangerouslySetAllPagesToNoIndex={disableSeo}
      />
      <Component {...pageProps} />
    </>,
    pageProps
  )
}

export default App
