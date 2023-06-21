import Link from 'next/link'
import { Fragment } from 'react'

import { Container } from '@/components/Container/Container'
import { menu } from '@/constants/menu'

export default function Browse() {
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ul>
            {menu.map((column, key) => (
              <Fragment key={key}>
                {column.map((item, key) => {
                  if (!item.link) {
                    return (
                      <li key={key}>
                        <span className="govuk-heading-m">{item.text}</span>
                      </li>
                    )
                  }

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
