import clsx from 'clsx'
import { ReactNode } from 'react'

type DetailsProps = {
  heading: string
  children: ReactNode
  className?: string
}

export const Details = ({ heading, children, className }: DetailsProps) => {
  return (
    <details className={clsx(className, 'govuk-details mb-4')}>
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{heading}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  )
}
