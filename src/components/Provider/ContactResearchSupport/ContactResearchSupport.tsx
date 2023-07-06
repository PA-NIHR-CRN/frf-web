import Link from 'next/link'

export const ContactResearchSupport = () => {
  return (
    <div className="govuk-!-margin-top-8 govuk-!-padding-top-4 border-t-4 border-t-purple-100">
      <h3 className="govuk-heading-m heading-underscore text-navy-100">Get support for your research</h3>
      <p>
        Need help finding appropriate data services, or any other part of the UK journey to getting your study started?
        The UK offers multiple services and teams of professionals who can support you.
      </p>
      <Link href="/contact-research-support" className="govuk-button govuk-button--secondary">
        Contact research support
      </Link>
    </div>
  )
}
