import clsx from 'clsx'
import { ReactNode } from 'react'

export function Fieldset({
  children,
  legend,
  className,
}: {
  children: ReactNode
  legend?: string
  className?: string
}) {
  return (
    <div className={clsx('govuk-form-group', className)}>
      <fieldset className="govuk-fieldset">
        {legend && <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">{legend}</legend>}
        {children}
      </fieldset>
    </div>
  )
}
