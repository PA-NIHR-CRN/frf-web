import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode, useId, useRef } from 'react'
import FocusLock from 'react-focus-lock'

import { Filters } from '@/@types/filters'
import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { OnFilterChange, useFilters } from '@/components/Filters/useFilters'
import CollapseIcon from '@/components/Icons/CollapseIcon'
import Cross from '@/components/Icons/Cross'
import FindIcon from '@/components/Icons/FindIcon'
import { ServiceType } from '@/constants'
import { FilterOptions } from '@/lib/contentfulService'
import { pluralise } from '@/utils'

const FilterCategory = ({ title, children }: { title: string; children: ReactNode }) => {
  const id = useId()
  return (
    <fieldset
      className="govuk-fieldset govuk-checkboxes--small pt-0 first-of-type:mt-5"
      aria-labelledby={`${id}-title`}
    >
      <details open className="group/details border-t border-grey-120 open:pb-3">
        <summary className="group/summary flex cursor-pointer py-2 outline-none">
          <div className="group-focus/summary:focusable-text flex w-full items-start justify-between py-1">
            <span className="govuk-body m-0" id={`${id}-title`}>
              {title}
            </span>
            <span className={clsx('text-lg', 'group-open/details:rotate-180')}>
              <CollapseIcon />
            </span>
          </div>
        </summary>
        {children}
      </details>
    </fieldset>
  )
}

export type FiltersProps = {
  options: FilterOptions
  filters: Filters
  totalItems: number
  showFiltersMobile?: boolean
  onFilterChange?: OnFilterChange
  onRequestClose?: () => void
}

export function Filters({
  options,
  filters,
  showFiltersMobile,
  totalItems,
  onRequestClose,
  onFilterChange,
}: FiltersProps) {
  const formRef = useRef(null)
  const { onChange } = useFilters(formRef, onFilterChange)
  return (
    <FocusLock disabled={!showFiltersMobile}>
      <Card
        id="filters"
        data-testid="filters-card"
        className={clsx(
          'left-0 top-0 z-50 mb-5 w-full overflow-y-scroll target:block md:mb-0 md:block md:overflow-y-auto [.js-enabled_&]:fixed [.js-enabled_&]:md:static',
          { hidden: !showFiltersMobile }
        )}
      >
        <div className="flex items-center justify-between bg-[var(--panel-bg-color)] p-3 pl-4">
          <h2 id="filter-by" className="govuk-heading-m m-0 font-normal text-white">
            Filter by
          </h2>
          <a
            href="#show-filters"
            className="text-white focus:text-black md:hidden"
            aria-label="Return to search results"
            onClick={(event) => {
              onRequestClose?.()
              event.preventDefault()
            }}
          >
            <Cross className="text-[2em]" />
          </a>
        </div>
        <form
          role="search"
          method="get"
          action="/providers"
          /* onSubmit={handleSubmit} */
          ref={formRef}
          className="p-4"
          aria-labelledby="filter-by"
        >
          <p className="govuk-heading-m mb-5 whitespace-nowrap md:hidden">
            {`${totalItems} ${pluralise('data service provider', totalItems)} found`}
          </p>
          {/* Keyword */}
          <div className="govuk-form-group mb-3">
            <label className="govuk-label mb-2" htmlFor="keyword">
              Keyword
            </label>
            <p id="keyword-hint" className="govuk-hint mb-3 text-sm">
              Search by data service provider name or keyword
            </p>
            <div className="relative">
              <input
                className="govuk-input h-auto rounded-3xl border-2 border-navy-100 p-2 pl-[2.8rem] pr-4"
                id="keyword"
                name="q"
                type="text"
                aria-describedby="keyword-hint"
                defaultValue={filters.q}
              />
              <div className="absolute left-2 top-[8px] p-[2px] text-lg outline-0 md:p-[4px]">
                <FindIcon />
              </div>
            </div>
            <Button type="submit" secondary className="mb-0 mt-3 w-full">
              Search
            </Button>
          </div>

          {/* Type of service */}
          <FilterCategory title="Type of service">
            {Object.keys(ServiceType).map((item, i) => (
              <Checkbox
                key={i}
                small
                name="serviceType"
                value={ServiceType[item]}
                onChange={onChange}
                checked={filters.serviceType?.includes(ServiceType[item])}
              >
                {ServiceType[item]}
              </Checkbox>
            ))}
          </FilterCategory>

          {/* Geographical coverage */}
          <FilterCategory title="Geographical coverage">
            {options.geography.map((item, i) => (
              <Checkbox
                key={i}
                small
                name="geography"
                value={item}
                onChange={onChange}
                checked={filters.geography?.includes(item)}
              >
                {item}
              </Checkbox>
            ))}
            {/* Exclude Regional */}
            <hr className="my-2 border-dotted border-grey-120" />
            <Checkbox small name="excludeRegional" value="true" onChange={onChange} checked={!!filters.excludeRegional}>
              Exclude regional only services
            </Checkbox>
          </FilterCategory>

          {/* Costs */}
          <FilterCategory title="Costs">
            {/* Costs: Find */}
            <fieldset>
              <legend className="govuk-fieldset__legend bg-[var(--colour-find-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100">
                {ServiceType.FIND}
              </legend>
              {options.costs
                .filter((item) => item.includes(ServiceType.FIND + ':'))
                .map((item, i) => (
                  <Checkbox
                    key={i}
                    small
                    name="costs"
                    value={item}
                    onChange={onChange}
                    checked={filters.costs?.includes(item)}
                  >
                    {item.substring(item.indexOf(':') + 1)}
                  </Checkbox>
                ))}
            </fieldset>
            {/* Costs: Recruit */}
            <fieldset className="mt-2">
              <legend className="govuk-fieldset__legend bg-[var(--colour-recruit-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100">
                {ServiceType.RECRUIT}
              </legend>
              {options.costs
                .filter((item) => item.includes(ServiceType.RECRUIT + ':'))
                .map((item, i) => (
                  <Checkbox
                    key={i}
                    small
                    name="costs"
                    value={item}
                    onChange={onChange}
                    checked={filters.costs?.includes(item)}
                  >
                    {item.substring(item.indexOf(':') + 1)}
                  </Checkbox>
                ))}
            </fieldset>
            {/* Costs: Follow-up */}
            <fieldset className="mt-2">
              <legend className="govuk-fieldset__legend bg-[var(--colour-follow-up-background)] px-7 py-1 text-sm font-bold uppercase tracking-wide text-navy-100">
                {ServiceType.FOLLOW_UP}
              </legend>
              {options.costs
                .filter((item) => item.includes(ServiceType.FOLLOW_UP + ':'))
                .map((item, i) => (
                  <Checkbox
                    key={i}
                    small
                    name="costs"
                    value={item}
                    onChange={onChange}
                    checked={filters.costs?.includes(item)}
                  >
                    {item.substring(item.indexOf(':') + 1)}
                  </Checkbox>
                ))}
            </fieldset>
          </FilterCategory>

          {/* Clear all */}
          <div className="border-t border-grey-120 text-center">
            <Button secondary type="submit" className="mb-3 w-full [.js-enabled_&]:hidden">
              Apply filters
            </Button>
            <Link className="govuk-button govuk-button--secondary w-full text-center" href="/providers">
              Clear all filters
            </Link>
          </div>
        </form>
      </Card>
    </FocusLock>
  )
}
