import clsx from 'clsx'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className={clsx('govuk-footer', 'py-0')} role="contentinfo">
      <div className={clsx('bg-navy-100 text-white')}>
        <div className="govuk-width-container">
          <div className={clsx('flex h-[var(--footer-links-panel-height)] items-center justify-end')}>
            <h2 className="govuk-visually-hidden">Support links</h2>
            <ul className="govuk-footer__inline-list mb-0">
              <li className="govuk-footer__inline-list-item">
                <a className="govuk-footer__link link--inverse" href="#">
                  Privacy policy
                </a>
              </li>
              <li className="govuk-footer__inline-list-item">
                <a className="govuk-footer__link link--inverse" href="#">
                  Accessibility
                </a>
              </li>
              <li className="govuk-footer__inline-list-item">&copy; NIHR 2022</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={clsx('bg-white')}>
        <div className="govuk-width-container">
          <div className="flex items-center justify-between gap-12 md:h-[var(--footer-logos-panel-height)]">
            <div className="flex items-center">
              <a href="#" target="_blank">
                <Image
                  src="/assets/logos/nihr.svg"
                  width={240}
                  height={24}
                  alt="National Institute for Health and Care Research logo (opens in a new window)"
                />
              </a>
            </div>
            <div className="flex items-center">
              <a href="#" target="_blank">
                <Image
                  src="/assets/logos/hsc-public-health-agency.svg"
                  width={253}
                  height={97}
                  alt="HSC Public Health Agency logo (opens in a new window)"
                />
              </a>
            </div>
            <div className="flex items-center">
              <a href="#" target="_blank">
                <Image
                  src="/assets/logos/nhs-scotland.svg"
                  width={153}
                  height={130}
                  alt="NHS Scotland logo (opens in a new window)"
                />
              </a>
            </div>
            <div className="flex items-center">
              <a href="#" target="_blank">
                <Image
                  src="/assets/logos/health-and-care-research-wales.svg"
                  width={168}
                  height={106}
                  alt="Health Care Research Wales logo (opens in a new window)"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
