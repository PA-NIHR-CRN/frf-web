import { ParsedUrlQuery } from 'querystring'
import { FieldErrors } from 'react-hook-form'

import { contactResearchSupportSchema } from './schemas/contact-research-support.schema'

export function hasErrorsInSearchParams(schema: typeof contactResearchSupportSchema, searchParams: ParsedUrlQuery) {
  return Object.keys(schema).some((field) => searchParams[`${field}Error`])
}

export function getValuesFromSearchParams(schema: typeof contactResearchSupportSchema, searchParams: ParsedUrlQuery) {
  return Object.keys(schema).reduce<Record<string, string>>((values, field) => {
    if (searchParams[field]) {
      values[field] = searchParams[field] as string
      return values
    }
    values[field] = ''
    return values
  }, {})
}

export function getErrorsFromSearchParams(schema: typeof contactResearchSupportSchema, searchParams: ParsedUrlQuery) {
  return Object.keys(schema).reduce<FieldErrors>((values, field) => {
    if (searchParams[`${field}Error`]) {
      values[field] = {
        type: 'required',
        message: searchParams[`${field}Error`] as string,
      }
    }
    return values
  }, {})
}
