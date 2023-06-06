import Link from 'next/link'
import { Container } from '@/components/Container/Container'

export default function Providers() {
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h2 className="govuk-heading-m">One-third column</h2>
        </div>
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-heading-m">Two-thirds column</h2>
          <Link className="govuk-button" href="/providers/detail">
            Detail
          </Link>
        </div>
      </div>
    </Container>
  )
}
