type WarningBannerProps = {
  isPreviewMode: boolean
  isTestEnvironment: boolean
}

export function WarningBanner({ isPreviewMode, isTestEnvironment }: WarningBannerProps) {
  if (isPreviewMode) {
    return (
      <div className="govuk-tag govuk-tag--yellow govuk-base govuk-!-padding-2 sticky top-0 z-10 block text-center opacity-95">
        You are viewing the preview site, which includes draft content (not for onwards sharing).
      </div>
    )
  }

  if (isTestEnvironment) {
    return (
      <div className="govuk-tag govuk-tag--orange govuk-base govuk-!-padding-2 sticky top-0 z-10 block text-center opacity-95">
        You are viewing the test site.
      </div>
    )
  }

  return null
}
