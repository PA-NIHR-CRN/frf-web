import clsx from 'clsx'
import { ReactNode, useId } from 'react'

type CheckboxProps = {
  name: string
  value: string | number
  children: ReactNode
  small?: boolean
  className?: string
}

export function Checkbox({ name, value, small, className, children }: CheckboxProps) {
  const id = useId()
  return (
    <div className={clsx('govuk-checkboxes__item', 'float-none', className)}>
      <input className="govuk-checkboxes__input" id={id} name={name} type="checkbox" value={value} />
      <label
        className={clsx('govuk-label govuk-checkboxes__label', 'pr-0', { 'pt-[12px] text-sm': small })}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
}
