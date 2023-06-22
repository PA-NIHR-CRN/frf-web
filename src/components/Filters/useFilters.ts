import { RefObject } from 'react'

export type OnFilterChange = (formValues: Record<string, unknown>) => void

export const useFilters = (formRef: RefObject<HTMLFormElement>, onFilterChange?: OnFilterChange) => {
  const onChange = () => {
    const formData = new FormData(formRef.current ? formRef.current : undefined)

    // https://stackoverflow.com/a/62010324
    const formDataAsObject = Object.fromEntries(
      Array.from(formData.keys()).map((key) => [
        key,
        formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key),
      ])
    )

    onFilterChange?.(formDataAsObject)
  }

  return { onChange }
}
