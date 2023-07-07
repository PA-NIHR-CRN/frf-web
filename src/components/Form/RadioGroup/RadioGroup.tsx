import clsx from 'clsx'
import { Children, cloneElement, forwardRef, isValidElement, ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

import { ErrorInline } from '../ErrorInline/ErrorInline'

type RadioGroupProps = {
  children: ReactNode
  label?: string
  name: string
  hint?: ReactNode
  errors: FieldErrors
  defaultValue: string | undefined
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ children, label, errors, hint, defaultValue, ...rest }, ref) => {
    const error = errors[rest.name]

    return (
      <div className={clsx('govuk-form-group', { 'govuk-form-group--error': !!error })}>
        <div className="govuk-radios" data-module="govuk-radios">
          <div className="govuk-label-wrapper">
            <label id={`${rest.name}-label`} className="govuk-label govuk-label--s" htmlFor={`${rest.name}-0`}>
              {label}
            </label>
            {hint && (
              <div id={`${name}-hint`} className="govuk-hint">
                {hint}
              </div>
            )}
          </div>
          <ErrorInline name={rest.name} errors={errors} />
          {Children.map(children, (child, index) =>
            isValidElement(child) ? (
              <>
                {cloneElement(child, {
                  ...child.props,
                  ...rest,
                  ref,
                  id: `${rest.name}-${index}`,
                  defaultChecked: defaultValue === child.props.value,
                })}
              </>
            ) : null
          )}
        </div>
      </div>
    )
  }
)
