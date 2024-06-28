import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '../Container/Container'

export function BackLink({ isPreviewMode }: { isPreviewMode: boolean }) {
  const router = useRouter()
  const { pathname } = router

  const shouldDisplayBackLink = () => {
    return !isPreviewMode && pathname.startsWith('/providers') && pathname !== '/providers'
  }

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    router.back()
  }

  if (!shouldDisplayBackLink()) return null

  return (
    <div>
      <Container>
        <Link href="/providers" className="govuk-back-link" onClick={handleBackClick}>
          Back to list of data service providers
        </Link>
      </Container>
    </div>
  )
}
