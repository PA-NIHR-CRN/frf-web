import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className={clsx('govuk-footer', 'py-0')} role="contentinfo">
      <div className="bg-navy-100 text-white" data-testid="frf-footer-links">
        <div className="govuk-width-container">
          <div className="flex h-[var(--footer-links-panel-height)] items-center">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list mb-0 flex w-full md:justify-end">
              <li className="govuk-footer__inline-list-item">
                <Link className="govuk-footer__link link--inverse" href="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li className="govuk-footer__inline-list-item">
                <Link className="govuk-footer__link link--inverse" href="/accessibility">
                  Accessibility
                </Link>
              </li>
              <li className="govuk-footer__inline-list-item ml-auto md:ml-0">&copy; NIHR 2022</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer logos temporarily commented out - these may return once we have confirmation from client */}
      {/* <div className={clsx('bg-white')} data-testid="frf-footer-logos">
        <div className="govuk-width-container">
          <div className="m-auto flex max-w-[320px] flex-wrap items-center justify-center gap-8 py-7 sm:max-w-none md:flex-nowrap lg:justify-between">
            <a href="#" target="_blank" className="max-w-[240px] lg:w-auto">
              <Image
                src="/assets/logos/nihr.svg"
                width={240}
                height={24}
                alt="National Institute for Health and Care Research logo (opens in a new window)"
                className="mx-auto"
              />
            </a>
            <a href="#" target="_blank" className="max-w-[240px] lg:w-auto">
              <Image
                src="/assets/logos/hsc-public-health-agency.svg"
                width={253}
                height={97}
                alt="HSC Public Health Agency logo (opens in a new window)"
                className="mx-auto"
              />
            </a>
            <a href="#" target="_blank" className="max-w-[240px] lg:w-auto">
              <Image
                src="/assets/logos/nhs-scotland.svg"
                width={153}
                height={130}
                alt="NHS Scotland logo (opens in a new window)"
                className="mx-auto"
              />
            </a>
            <a href="#" target="_blank" className="max-w-[240px] lg:w-auto">
              <Image
                src="/assets/logos/health-and-care-research-wales.svg"
                width={168}
                height={106}
                alt="Health Care Research Wales logo (opens in a new window)"
                className="mx-auto"
              />
            </a>
          </div>
        </div>
      </div> */}
    </footer>
  )
}
