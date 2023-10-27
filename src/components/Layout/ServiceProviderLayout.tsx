import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '../Container/Container'
import { RootLayout, RootLayoutProps } from './RootLayout'

type ServiceProviderLayoutProps = Omit<RootLayoutProps, 'backLink'>

export function ServiceProviderLayout({ children, isPreviewMode, cookieBanner, heading }: ServiceProviderLayoutProps) {
  const router = useRouter()
  return (
    <RootLayout
      isPreviewMode={isPreviewMode}
      cookieBanner={cookieBanner}
      heading={heading}
      backLink={
        !isPreviewMode && (
          <Container>
            <Link
              href="/providers"
              className="govuk-back-link"
              onClick={(event) => {
                event.preventDefault()
                router.back()
              }}
            >
              Back to list of data service providers
            </Link>
          </Container>
        )
      }
    >
      {children}
    </RootLayout>
  )
}
