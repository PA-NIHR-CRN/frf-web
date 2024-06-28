import { useRouter } from 'next/router'

import { RootLayout, RootLayoutProps } from './RootLayout'

type ServiceProviderLayoutProps = Omit<RootLayoutProps, 'backLink'>

export function ServiceProviderLayout({ children, isPreviewMode, cookieBanner, heading }: ServiceProviderLayoutProps) {
  const router = useRouter()
  return (
    <RootLayout isPreviewMode={isPreviewMode} cookieBanner={cookieBanner} heading={heading}>
      {children}
    </RootLayout>
  )
}
