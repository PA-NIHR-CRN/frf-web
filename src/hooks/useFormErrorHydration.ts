import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FieldError, FormState, Path } from 'react-hook-form'

import { getErrorsFromSearchParams, hasErrorsInSearchParams, Schemas } from '@/utils/form.utils'

/**
 * This hook detects field-level errors in the URL searchParams on page load
 *
 * For js users, it extracts them and injects them into RHF state via the useEffect
 * It then clears the searchParams so that subsequent page refreshes show an empty form.
 *
 * For non-js users, server returned errors will get returned directly and bypass RHF state.
 * They are then passed directly down to the input components.
 */
export function useFormErrorHydration<T extends Record<string, unknown>>({
  schema,
  formState,
  onFoundError,
}: {
  schema: Schemas
  formState: FormState<T>
  onFoundError: (field: Path<T>, error: FieldError) => void
}) {
  const router = useRouter()

  const hasServerErrors = hasErrorsInSearchParams(schema, router.query)
  const serverErrors = getErrorsFromSearchParams(schema, router.query)

  useEffect(() => {
    if (hasServerErrors) {
      Object.keys(formState.defaultValues).forEach((field) => {
        if (router.query[`${field as string}Error`]) {
          onFoundError(field as Path<T>, {
            type: 'custom',
            message: router.query[`${field as string}Error`] as string,
          })
        }
      })

      if (formState.isSubmitSuccessful) {
        router.replace({ query: undefined }, undefined, { shallow: true })
      }
    }
  }, [router.asPath, router, hasServerErrors, onFoundError, formState.defaultValues, formState.isSubmitSuccessful])

  return {
    errors: hasServerErrors ? serverErrors : formState.errors,
  }
}
