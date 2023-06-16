import Link from 'next/link'
import { ReactNode } from 'react'

import { Container } from '../Container/Container'
import { RootLayout } from './RootLayout'

export function ServiceProviderLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      backLink={
        <Container>
          <Link href="/providers" className="govuk-back-link">
            Back to list of data service providers
          </Link>
        </Container>
      }
    >
      {children}
    </RootLayout>
  )
}
