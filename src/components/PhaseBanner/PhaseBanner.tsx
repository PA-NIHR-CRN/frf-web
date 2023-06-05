type PhaseBannerProps = {
  children: React.ReactNode
  phase: 'Alpha' | 'Beta'
}

export function PhaseBanner({ children, phase }: PhaseBannerProps) {
  return (
    <div className="govuk-phase-banner">
      <div className="govuk-width-container">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">{phase}</strong>
          <span className="govuk-phase-banner__text">{children}</span>
        </p>
      </div>
    </div>
  )
}
