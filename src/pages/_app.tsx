import { RootLayout } from '@/components/Layout/RootLayout'
import type { AppProps } from 'next/app'

import '../globals.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  )
}

export default App
