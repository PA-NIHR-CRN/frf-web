import { useEffect } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-roboto' })

export function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('js-enabled')
  }, [])

  return (
    <>
      {/* TODO: Header Component Here */}
      <div className="govuk-width-container">
        <main className={`govuk-main-wrapper ${roboto.variable}`} role="main">
          {children}
        </main>
      </div>
      {/* TODO: Footer Component Here */}
    </>
  )
}
