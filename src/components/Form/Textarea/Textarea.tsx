import clsx from 'clsx'
import { forwardRef, ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

import { ErrorInline } from '../ErrorInline/ErrorInline'

type TextareaProps = {
  label: string
  name: string
  hint?: ReactNode
  errors: FieldErrors
  defaultValue: string | undefined
  remainingWords?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, errors, hint, remainingWords, defaultValue, ...rest }, ref) => {
    const error = errors[rest.name]

    return (
      <div className={clsx('govuk-form-group', { 'govuk-form-group--error': !!error })}>
        <div className="govuk-label-wrapper">
          <label id={`${rest.name}-label`} className="govuk-label govuk-label--s" htmlFor={rest.name}>
            {label}
          </label>
          {hint && (
            <div id={`${rest.name}-hint`} className="govuk-hint">
              {hint}
            </div>
          )}
        </div>
        <ErrorInline name={rest.name} errors={errors} />
        <textarea
          className={clsx('govuk-textarea', {
            'govuk-textarea--error': !!error,
            'govuk-!-margin-bottom-1': typeof remainingWords !== 'undefined',
          })}
          id={rest.name}
          aria-invalid={!!error ? 'true' : 'false'}
          aria-describedby={clsx({
            [`${rest.name}-hint`]: hint,
            [`${rest.name}-error`]: error,
          })}
          defaultValue={defaultValue}
          {...rest}
          ref={ref}
          rows={5}
        />
        <p className="js-disabled-hide text-darkGrey">You have {remainingWords} words remaining</p>
      </div>
    )
  }
)
