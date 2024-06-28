import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '../Container/Container'

export function BackLink({ isPreviewMode }: { isPreviewMode: boolean }) {
  const router = useRouter()
  const { pathname } = router

  if (isPreviewMode || !pathname.startsWith('/providers') || pathname === '/providers') return null

  return (
    <div>
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
    </div>
  )
}
