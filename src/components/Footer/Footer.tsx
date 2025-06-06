import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={clsx('govuk-footer', 'py-0')} role="contentinfo">
      <div className="bg-navy-100 text-white" data-testid="frf-footer-links">
        <div className="govuk-width-container">
          <div className="flex items-center justify-between">
            <div>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.accessibility-services.co.uk/certificates/nihr-frf/"
                aria-label="Shaw Trust accessibility website (Opens in a new window)"
              >
                <Image src="/assets/logos/shaw-trust.png" height={57} width={189} alt="Shaw Trust Logo" />
              </a>
            </div>
            <div className="flex h-[var(--footer-links-panel-height)] items-center">
              <h2 className="govuk-visually-hidden">Support links</h2>
              <ul className="govuk-footer__inline-list mb-0 flex w-full md:justify-end">
                <li className="govuk-footer__inline-list-item">
                  <Link className="govuk-footer__link link--inverse" href="/terms-and-conditions">
                    Terms and conditions
                  </Link>
                </li>
                <li className="govuk-footer__inline-list-item">
                  <Link className="govuk-footer__link link--inverse" href="/privacy">
                    Privacy policy
                  </Link>
                </li>
                <li className="govuk-footer__inline-list-item">
                  <Link className="govuk-footer__link link--inverse" href="/cookie-policy">
                    Cookie policy
                  </Link>
                </li>
                <li className="govuk-footer__inline-list-item">
                  <Link className="govuk-footer__link link--inverse" href="/accessibility">
                    Accessibility
                  </Link>
                </li>
                <li className="govuk-footer__inline-list-item">
                  <Link className="govuk-footer__link link--inverse" href="/sitemap">
                    Sitemap
                  </Link>
                </li>
                <li className="govuk-footer__inline-list-item ml-auto md:ml-0">&copy; NIHR 2022</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('bg-white')} data-testid="frf-footer-logos">
        <div className="govuk-width-container">
          <div
            className="m-auto flex max-w-[320px] flex-wrap items-center justify-center gap-8 py-7 sm:max-w-none md:flex-nowrap lg:justify-between"
            aria-label="National Institute for Health and Care Research"
          >
            <a href="https://www.nihr.ac.uk" className="lg:w-auto">
              <Image
                src="/assets/logos/nihr-full.svg"
                width={244}
                height={24}
                alt="National Institute for Health and Care Research logo"
                className="mx-auto"
              />
            </a>
            <a
              href="https://research.hscni.net/"
              target="_blank"
              className="max-w-[240px] lg:w-auto"
              aria-label="Northern Ireland Health and Social Care (opens in a new window)"
            >
              <Image
                src="/assets/logos/hsc-public-health-agency.svg"
                width={253}
                height={97}
                alt="Northern Ireland Health and Social Care logo"
                className="mx-auto"
              />
            </a>
            <a
              href="https://www.nhsresearchscotland.org.uk"
              target="_blank"
              className="max-w-[240px] lg:w-auto"
              aria-label="NHS Scotland (opens in a new window)"
            >
              <Image
                src="/assets/logos/nhs-scotland.svg"
                width={153}
                height={130}
                alt="NHS Scotland logo"
                className="mx-auto"
              />
            </a>
            <a
              href="https://healthandcareresearchwales.org"
              target="_blank"
              className="max-w-[240px] lg:w-auto"
              aria-label="Health Care Research Wales (opens in a new window)"
            >
              <Image
                src="/assets/logos/health-and-care-research-wales.svg"
                width={168}
                height={106}
                alt="Health Care Research Wales logo"
                className="mx-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
