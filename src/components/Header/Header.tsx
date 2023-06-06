import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <>
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>
      <header
        className={clsx(
          'govuk-header',
          'flex h-[var(--header-height)] items-center border-b border-grey-60 bg-[var(--header-bg)]'
        )}
        role="banner"
      >
        <div
          className={clsx('govuk-header__container govuk-header__container--full-width', 'mb-0 w-full border-b-0 pt-0')}
        >
          <div>
            <Link
              href="/"
              className={clsx('govuk-header__link govuk-header__link--homepage', 'inline-block h-[var(--logo-height)]')}
            >
              <span className="govuk-header__logotype">
                <Image
                  src="/assets/logos/nihr.svg"
                  width={322}
                  height={32}
                  alt="National Institute for Health and Care Research logo"
                />
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
