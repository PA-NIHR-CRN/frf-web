import { forwardRef } from 'react'

type RadioProps = {
  label: string
  value: string
  name?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, value, ...rest }, ref) => (
  <div className="govuk-radios__item">
    <input type="radio" className="govuk-radios__input" value={value} {...rest} ref={ref} />
    <label className="govuk-label govuk-radios__label" htmlFor={rest.name}>
      {label}
    </label>
  </div>
))
