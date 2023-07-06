import { ReactNode } from 'react'

export function Fieldset({ children, legend }: { children: ReactNode; legend?: string }) {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset">
        {legend && <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">{legend}</legend>}
        {children}
      </fieldset>
    </div>
  )
}
