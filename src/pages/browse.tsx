import Link from 'next/link'
import { Fragment, ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import { RootLayout } from '@/components/Layout/RootLayout'
import { menu } from '@/constants/menu'

export default function Browse() {
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ul data-testid="browse-links">
            {menu.map((column, key) => (
              <Fragment key={key}>
                {column.map((item, key) => {
                  if (!item.link) return
                  return (
                    <li key={key}>
                      <Link className="govuk-heading-s mb-1" href={item.link}>
                        {item.text}
                      </Link>
                      <p className="govuk-body-s">{item.description}</p>
                    </li>
                  )
                })}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}

Browse.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout heading="Discover more">{page}</RootLayout>
}
