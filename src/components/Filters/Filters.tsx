import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import CollapseIcon from '@/components/Icons/CollapseIcon'
import FindIcon from '@/components/Icons/FindIcon'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'

const FilterCategory = ({ title, children }: { title: string; children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <fieldset className="govuk-fieldset pb-3 pt-0 first-of-type:mt-5">
      <legend className="govuk-fieldset__legend mb-0 flex w-full justify-between border-t border-grey-120 pt-3">
        <h1 className="govuk-fieldset__heading">{title}</h1>
        <button className={clsx('text-lg', { 'rotate-180': isOpen })} onClick={() => setIsOpen(!isOpen)} type="button">
          <CollapseIcon />
        </button>
      </legend>
      <div className={clsx('overflow-hidden pt-3', { 'sr-only': !isOpen })}>{children}</div>
    </fieldset>
  )
}

export function Filters() {
  return (
    <Card className="h-screen">
      <div className="flex items-center bg-[var(--panel-bg-color)] p-3 pl-4">
        <h2 className="govuk-heading-m m-0 font-normal text-white">Filter by</h2>
      </div>
      <form className="p-4">
        {/* Keyword */}
        <div className="govuk-form-group mb-3">
          <label className="govuk-label mb-2" htmlFor="event-name">
            Keyword
          </label>
          <div className="relative">
            <input
              className="govuk-input h-auto rounded-3xl border-2 border-navy-100 p-2 pl-4"
              id="event-name"
              name="event-name"
              type="text"
              aria-describedby="keyword-hint"
            />
            <button className="absolute right-4 top-[12px] text-lg" aria-label="Search">
              <FindIcon />
            </button>
          </div>
          <div id="keyword-hint" className="govuk-hint pt-3 text-sm">
            Search by data service provider name or keyword
          </div>
        </div>

        {/* Type of service */}
        <FilterCategory title="Type of service">
          <p className="mb-0 text-sm text-navy-100">Checkboxes</p>
        </FilterCategory>

        {/* Source of data */}
        <FilterCategory title="Source of data">
          <p className="mb-0 text-sm text-navy-100">Checkboxes</p>
        </FilterCategory>

        {/* Geographical coverage */}
        <FilterCategory title="Geographical coverage">
          <p className="mb-0 text-sm text-navy-100">Checkboxes</p>
        </FilterCategory>

        {/* Costs */}
        <FilterCategory title="Costs">
          <p className="mb-0 text-sm text-navy-100">Checkboxes</p>
        </FilterCategory>

        {/* Clear all */}
        <div className="mt-5 text-center">
          <Button secondary>Clear all filters</Button>
        </div>
      </form>
    </Card>
  )
}
