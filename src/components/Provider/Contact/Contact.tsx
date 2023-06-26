import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

type ContactProps = {
  children: ReactNode
  contactName: string
  contactUrl: string
  heading: string
  footer?: ReactNode
  className?: string
}

export const Contact = ({ heading, footer, children, contactName, contactUrl, className }: ContactProps) => {
  return (
    <div className={clsx(className, 'govuk-!-padding-4 bg-grey-30')}>
      <h3 className="govuk-heading-m">{heading}</h3>
      <div className="govuk-body">{children}</div>
      <Link href={contactUrl} className="govuk-button mb-0">
        {contactName}
      </Link>
      {footer}
    </div>
  )
}
