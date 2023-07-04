import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { FilterKey, Filters, FilterValue } from '@/@types/filters'
import Cross from '@/components/Icons/Cross'
import { SELECTABLE_FILTERS } from '@/constants'

export type SelectedFiltersProps = {
  filters: Filters
  isLoading?: boolean
}

export function SelectedFilters({ filters, isLoading }: SelectedFiltersProps) {
  const router = useRouter()

  const anyFiltersActive = (filters: Filters) =>
    SELECTABLE_FILTERS.map((filterName) => filters[filterName])
      .flat()
      .filter(Boolean).length

  const omitFilter = (name: string, value?: string) => {
    const filters = { ...router.query }
    if (Array.isArray(filters[name])) {
      filters[name] = (filters[name] as string[]).filter((v) => v !== value)
    } else {
      delete filters[name]
    }
    return filters
  }

  const SelectedFilter = ({ children, name, value }: { name: string; value?: string; children: ReactNode }) => (
    <li>
      <Link
        href={{ pathname: '/providers', query: omitFilter(name, value) }}
        className="govuk-body-s focus:focusable group mb-0 inline-flex items-center 
      rounded-md border py-1 pl-1 pr-2 text-black no-underline focus:focus:outline-none group-[.isLoading]/selected:pointer-events-none group-[.isLoading]/selected:opacity-50"
      >
        <Cross className="mr-1 inline group-[:not(.isLoading)]/selected:group-hover:text-coral-140" />
        <span className="govuk-visually-hidden">Clear filter:&nbsp;</span>
        {children}
      </Link>
    </li>
  )

  const renderSelectedFilters = (name: FilterKey, value: FilterValue, index: number) => {
    if (!value) return

    if (Array.isArray(value)) {
      return value.map((subValue, subIndex) => (
        <SelectedFilter key={`${name}-${subIndex}`} name={name} value={subValue}>
          {subValue}
        </SelectedFilter>
      ))
    }

    return (
      <SelectedFilter key={`${name}-${index}`} name={name}>
        {name === 'excludeRegional' ? 'Exclude Regional' : value}
      </SelectedFilter>
    )
  }

  if (!anyFiltersActive(filters)) return null

  return (
    <div
      className={clsx(
        { isLoading },
        'govuk-!-margin-top-6 govuk-!-margin-bottom-7 govuk-!-padding-2 govuk-body-m group/selected',
        'relative flex min-h-[60px] flex-wrap items-center bg-grey-50 md:flex-nowrap',
        // Bottom border
        'after:absolute after:bottom-[-6px] after:left-0 after:block after:h-[1px] after:w-full after:bg-darkGrey after:content-[""]'
      )}
    >
      <span id="selected-filters" className="whitespace-nowrap">
        Selected filters
      </span>
      <ul
        className="order-3 ml-0 mt-2 flex w-full flex-wrap gap-1 md:order-2 md:ml-4 md:mt-0 md:w-auto"
        aria-labelledby="selected-filters"
      >
        {Object.keys(filters)
          .filter((filter) => SELECTABLE_FILTERS.includes(filter))
          .map((filter, i) => renderSelectedFilters(filter, filters[filter], i))}
      </ul>
      <div className="order-2 ml-auto whitespace-nowrap pl-1 md:order-3">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/providers#filters">Clear all filters</a>
      </div>
    </div>
  )
}
