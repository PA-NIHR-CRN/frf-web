import { Container } from '@/components/Container/Container'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <h1 className="govuk-heading-l">Find, Recruit and Follow-up Support</h1>
      <Link className="govuk-button" href="/providers">
        Providers
      </Link>
    </Container>
  )
}
