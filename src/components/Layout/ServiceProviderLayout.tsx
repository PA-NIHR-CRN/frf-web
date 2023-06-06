import { ReactNode } from 'react'
import { RootLayout } from './RootLayout'
import Link from 'next/link'
import { Container } from '../Container/Container'

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
