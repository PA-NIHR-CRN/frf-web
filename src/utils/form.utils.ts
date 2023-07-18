import { ParsedUrlQuery } from 'querystring'
import { FieldError, FieldErrors } from 'react-hook-form'

import { contactResearchSupportSchema } from './schemas/contact-research-support.schema'
import { feedbackSchema } from './schemas/feedback.schema'

export type Schemas = typeof contactResearchSupportSchema | typeof feedbackSchema

/**
 * Checks if there's any form errors present in the URL searchParams for a given schema
 * @param schema Zod validation schema
 * @param searchParams URL Search Params object
 * @returns boolean
 */
export function hasErrorsInSearchParams(schema: Schemas, searchParams: ParsedUrlQuery) {
  return Object.keys(schema.shape).some((field) => searchParams[`${field}Error`])
}

/**
 * Extracts the persisted form values state from the URL searchParams for a given schema
 * @param schema Zod validation schema
 * @param searchParams URL Search Params object
 * @returns Dictionary with key/value pair of the form field and its value
 */
export function getValuesFromSearchParams(schema: Schemas, searchParams: ParsedUrlQuery) {
  return Object.fromEntries(
    Object.keys(schema.shape).map((field) => {
      if (searchParams[field]) return [field, searchParams[field]]
      return [field, '']
    })
  )
}

/**
 * Extracts the persisted form error state from the URL searchParams for a given schema
 * @param schema Zod validation schema
 * @param searchParams URL Search Params object
 * @returns Dictionary with key/value pair of the form field and its error message
 */
export function getErrorsFromSearchParams(schema: Schemas, searchParams: ParsedUrlQuery) {
  const keys = Object.keys(schema.shape)

  // https://github.com/microsoft/TypeScript/issues/44373
  const keysArray: Array<(typeof keys)[number]> = Object.keys(schema.shape)

  return keysArray.reduce<FieldErrors>((errors, field) => {
    if (searchParams[`${field}Error`]) {
      const error: FieldError = {
        type: 'custom',
        message: searchParams[`${field}Error`] as string,
      }
      errors[field] = error
    }
    return errors
  }, {})
}
