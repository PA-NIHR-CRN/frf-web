import clsx from 'clsx'
import { ReactNode, useId } from 'react'

import { Button } from '@/components/Button/Button'
import { Card } from '@/components/Card/Card'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import CollapseIcon from '@/components/Icons/CollapseIcon'
import FindIcon from '@/components/Icons/FindIcon'
import { ServiceType } from '@/constants'
import { FilterOptions } from '@/lib/contentfulService'

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
}

export function Filters({ options }: FiltersProps) {
  return (
    <Card>
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
              className="govuk-input h-auto rounded-3xl border-2 border-navy-100 p-2 pl-4 pr-9"
              id="event-name"
              name="event-name"
              type="text"
              aria-describedby="keyword-hint"
            />
            <button
              className="focus:focusable absolute right-3 top-[8px] p-[4px] text-lg outline-0"
              aria-label="Search"
            >
              <FindIcon />
            </button>
          </div>
          <div id="keyword-hint" className="govuk-hint pt-3 text-sm">
            Search by data service provider name or keyword
          </div>
        </div>

        {/* Type of service */}
        <FilterCategory title="Type of service">
          {Object.keys(ServiceType).map((item, i) => (
            <Checkbox key={i} name="serviceType" value={ServiceType[item]} small>
              {ServiceType[item]}
            </Checkbox>
          ))}
        </FilterCategory>

        {/* Source of data */}
        <FilterCategory title="Source of data">
          {options.dataType.map((item, i) => (
            <Checkbox key={i} name="dataType" value={item} small>
              {item}
            </Checkbox>
          ))}
        </FilterCategory>

        {/* Geographical coverage */}
        <FilterCategory title="Geographical coverage">
          {options.geography.map((item, i) => (
            <Checkbox key={i} name="geography" value={item} small>
              {item}
            </Checkbox>
          ))}
          {/* Exclude Regionl */}
          <hr className="my-2 border-dotted border-grey-120" />
          <Checkbox name="excludeRegional" value="true" small>
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
                <Checkbox key={i} name="costs" value={item} small>
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
                <Checkbox key={i} name="costs" value={item} small>
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
                <Checkbox key={i} name="costs" value={item} small>
                  {item.substring(item.indexOf(':') + 1)}
                </Checkbox>
              ))}
          </fieldset>
        </FilterCategory>

        {/* Clear all */}
        <div className="border-t border-grey-120 text-center">
          <Button secondary className="w-full">
            Clear all filters
          </Button>
        </div>
      </form>
    </Card>
  )
}
