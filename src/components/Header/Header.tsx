import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { menu } from '@/constants/menu'

function Logo() {
  return (
    <a
      href="https://www.nihr.ac.uk"
      className={clsx(
        'govuk-header__link govuk-header__link--homepage',
        'inline-block h-[var(--logo-height)] min-w-[199px] hover:m-0'
      )}
    >
      <span className="govuk-header__logotype">
        <Image
          src="/assets/logos/nihr.svg"
          width={322}
          height={32}
          alt="National Institute for Health and Care Research logo"
        />
      </span>
    </a>
  )
}

function MenuButton({ navOpen }: { navOpen: boolean }) {
  return (
    <div>
      <Link
        href="/browse"
        className="js-disabled-show govuk-button govuk-body mb-0 hidden items-center justify-end gap-2 bg-white stroke-navy-100 text-navy-100 shadow-none focus:bg-[var(--focus)] focus:stroke-black focus:text-black active:top-0"
      >
        Menu
      </Link>
      <Collapsible.Trigger asChild>
        <button
          aria-controls="navigation-menu"
          aria-expanded={navOpen}
          aria-label={`${navOpen ? 'Hide' : 'Show'} navigation menu`}
          className={clsx(
            'js-disabled-hide govuk-button govuk-body mb-0 flex items-center justify-end gap-2 shadow-none focus:bg-[var(--focus)] focus:stroke-black focus:text-black active:top-0',
            {
              'mt-[26px] bg-[var(--nav-bg)] stroke-white pb-[33px] text-white': navOpen,
              'bg-white stroke-navy-100 text-navy-100': !navOpen,
            }
          )}
        >
          <span>Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </Collapsible.Trigger>
    </div>
  )
}

function MenuPanel() {
  return (
    <Collapsible.Content
      asChild
      aria-labelledby="navigation-menu-heading"
      id="navigation-menu"
      className={clsx('js-disabled-show min-h-[var(--nav-height)] w-full bg-[var(--nav-bg)] text-white')}
    >
      <nav>
        <h2 id="navigation-menu-heading" className="govuk-visually-hidden">
          Navigation menu
        </h2>
        <div className="govuk-header__container--full-width">
          <div className="govuk-grid-row py-5 lg:py-8">
            {menu.map((column, key) => (
              <div key={key} className="govuk-grid-column-one-quarter-from-desktop mb-5 lg:mb-0">
                {column.map((item, key) => {
                  if (!item.link) {
                    return (
                      <p key={key} className="max-w-[300px] text-base text-white">
                        {item.text}
                      </p>
                    )
                  }

                  return (
                    <div
                      key={key}
                      className="mb-5 max-w-[300px] lg:mb-0 [&:not(:last-child)]:lg:min-h-[140px] [&:not(:last-child)]:xl:min-h-[110px]"
                    >
                      <Link className="link--inverse mb-1 inline-block text-base" href={item.link}>
                        {item.text}
                      </Link>
                      <p className="text-sm text-white">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </Collapsible.Content>
  )
}

export function Header() {
  const router = useRouter()
  const headerRef = useRef(null)
  const [navOpen, setNavOpen] = useState(false)

  // Close menu on route changes
  useEffect(() => setNavOpen((isOpen) => isOpen && !isOpen), [router.asPath])

  // Close menu when clicking outside of the header
  useClickAway(headerRef, () => setNavOpen(false))

  return (
    <>
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>
      <Collapsible.Root open={navOpen} onOpenChange={setNavOpen}>
        <header
          ref={headerRef}
          className={clsx('govuk-header flex flex-col items-center border-b border-grey-60 bg-[var(--header-bg)]')}
          role="banner"
        >
          <div
            className={clsx(
              'govuk-header__container govuk-header__container--full-width',
              'mb-0 w-full border-b-0 pt-0'
            )}
          >
            <div className="flex h-[var(--header-height)] items-center justify-between">
              <Logo />
              <MenuButton navOpen={navOpen} />
            </div>
          </div>
          <MenuPanel />
        </header>
      </Collapsible.Root>
    </>
  )
}
