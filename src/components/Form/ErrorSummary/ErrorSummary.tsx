import { FieldErrors } from 'react-hook-form'

type ErrorSummaryProps = {
  errors: FieldErrors
}

export function ErrorSummary({ errors }: ErrorSummaryProps) {
  if (Object.keys(errors).length === 0) return null

  return (
    <div className="govuk-error-summary">
      <div role="alert">
        <h2 className="govuk-error-summary__title">There is a problem</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {Object.keys(errors).map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{errors[id]?.message as string}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
