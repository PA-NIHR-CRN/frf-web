import { useRef } from 'react'

import { OrderType } from '@/@types/filters'

type SortProps = {
  form: string
  defaultOrder?: OrderType
}

export const Sort = ({ form, defaultOrder }: SortProps) => {
  const sortButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <label className="govuk-label mb-1 mr-2 md:mb-0" htmlFor="order">
        Sort by
      </label>
      <select
        id="order"
        name="order"
        form={form}
        defaultValue={defaultOrder || 'published'}
        className="govuk-select w-full md:w-auto"
        onChange={() => sortButtonRef.current?.click()}
      >
        <option value={'a-z'}>Alphabetical (ascending)</option>
        <option value={'z-a'}>Alphabetical (descending)</option>
        <option value={'updated'}>Recently updated</option>
        <option value={'published'}>Recently published</option>
      </select>
      <button
        type="submit"
        form={form}
        className="govuk-button govuk-button--secondary mb-0 ml-3 [.js-enabled_&]:hidden"
        ref={sortButtonRef}
      >
        Submit
      </button>
    </>
  )
}
