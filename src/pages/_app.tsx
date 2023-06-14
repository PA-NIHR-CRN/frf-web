import '../globals.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { RootLayout } from '@/components/Layout/RootLayout'
import { DefaultSeo } from 'next-seo'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const disableSeo = process.env.NEXT_PUBLIC_APP_ENV !== 'prod'

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <RootLayout>{page}</RootLayout>)

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
