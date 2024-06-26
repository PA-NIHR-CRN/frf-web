// components/Header/Header.tsx
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useClickAway } from 'react-use'

import { menu } from '@/constants/menu'

import { BackLink } from '../BackLink/BackLink'
import { Panel } from '../Panel/Panel'
import { PhaseBanner } from '../PhaseBanner/PhaseBanner'

function Logo() {
  return (
    <div className="flex flex-col items-center gap-6 py-6 pl-4">
      <Link href="/" className="govuk-header__link" aria-label="Go to the Find, Recruit and Follow-up homepage">
        <div className="flex flex-col items-center gap-6">
          <Image src="/assets/logos/nihr-full.svg" width={244} height={24} alt="NIHR logo" />
          <Image src="/assets/logos/nihr-frf.svg" width={244} height={24} alt="Find, Recruit and Follow-up logo" />
        </div>
      </Link>
    </div>
  )
}

function MenuButton({ navOpen }: { navOpen: boolean }) {
  return (
    <div className="flex items-center">
      <Link
        href="/browse"
        className="js-disabled-show govuk-button govuk-body mb-0 ml-1 hidden items-center justify-end gap-2 bg-white stroke-navy-100 text-navy-100 underline shadow-none focus:bg-[var(--focus)] focus:stroke-black focus:text-black active:top-0"
      >
        Menu
      </Link>
      <Collapsible.Trigger asChild>
        <button
          aria-expanded={navOpen}
          aria-label={`${navOpen ? 'Hide' : 'Show'} navigation menu`}
          className={clsx(
            'js-disabled-hide govuk-button govuk-body mb-0 flex items-center justify-end gap-2 shadow-none focus:bg-[var(--focus)] focus:stroke-black focus:text-black active:top-0',
            {
              'mt-[45px] bg-[var(--nav-bg)] stroke-white pb-[52px] text-white md:mt-[24px] md:pb-[31px]': navOpen,
              'bg-white stroke-navy-100 text-navy-100': !navOpen,
            }
          )}
        >
          <span className="hidden md:block">Menu</span>
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
      id="navigation-menu"
      className={clsx('js-disabled-show mt-[-1px] min-h-[var(--nav-height)] w-full bg-[var(--nav-bg)] text-white')}
    >
      <nav data-testid="nav">
        <div className="govuk-header__container--full-width">
          <div className="govuk-grid-row py-5 lg:py-8">
            {menu.map((column, key) => (
              <div key={key} className="govuk-grid-column-one-quarter-from-desktop mb-5 lg:mb-0">
                {column.map((item, key) => {
                  if (!item.link) {
                    return (
                      <p key={key} className="govuk-heading-s max-w-[300px] font-normal text-white">
                        {item.text}
                      </p>
                    )
                  }

                  return (
                    <div
                      key={key}
                      className="mb-5 max-w-[400px] lg:mb-0 [&:not(:last-child)]:lg:min-h-[150px] [&:not(:last-child)]:xl:min-h-[145px]"
                    >
                      <Link className="link--inverse govuk-heading-s mb-1 inline-block font-normal" href={item.link}>
                        {item.text}
                      </Link>
                      <p className="govuk-body-s text-white">{item.description}</p>
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

export function Header({ heading, isPreviewMode }: { heading: string; isPreviewMode: boolean }) {
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
          className={clsx('govuk-header flex flex-col border-b bg-[var(--header-bg)]')}
          role="banner"
        >
          <div
            className={clsx(
              'govuk-header__container govuk-header__container--full-width',
              'mb-0 w-full border-b-0 pt-0'
            )}
          >
            <div className="flex items-center justify-between border-b border-grey-60">
              <Logo />
              <MenuButton navOpen={navOpen} />
            </div>
          </div>
          <MenuPanel />
          <PhaseBanner phase="Beta">
            This is a new service –{' '}
            <Link className="govuk-link govuk-link--no-visited-state" href="/feedback">
              your feedback will help us to improve it
            </Link>
            .
          </PhaseBanner>
          {heading && <Panel>{heading}</Panel>}
          <BackLink isPreviewMode={isPreviewMode} />
        </header>
      </Collapsible.Root>
    </>
  )
}
