type PreviewBannerProps = {
  isPreviewMode: boolean
}

export function PreviewBanner({ isPreviewMode }: PreviewBannerProps) {
  if (!isPreviewMode) {
    return null
  }

  return (
    <div className="govuk-tag govuk-tag--yellow govuk-base govuk-!-padding-2 sticky top-0 z-10 block text-center opacity-95">
      You are viewing the preview site, which shows draft content from Contentful.
    </div>
  )
}
