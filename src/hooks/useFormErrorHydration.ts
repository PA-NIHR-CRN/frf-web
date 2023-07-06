import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FieldError, FormState, Path } from 'react-hook-form'

import { getErrorsFromSearchParams, hasErrorsInSearchParams } from '@/utils/form.utils'
import {
  ContactResearchSupportInputs,
  contactResearchSupportSchema,
} from '@/utils/schemas/contact-research-support.schema'

/**
 * This hook detects field-level errors in the URL searchParams on page load
 *
 * For js users, it extracts them and injects them into RHF state via the useEffect
 * It then clears the searchParams so that subsequent page refreshes show an empty form.
 *
 * For non-js users, server returned errors will get returned directly and bypass RHF state.
 * They are then passed directly down to the input components.
 */
export function useFormErrorHydration<T extends ContactResearchSupportInputs>({
  formState,
  onFoundError,
}: {
  formState: FormState<T>
  onFoundError: (field: Path<T>, error: FieldError) => void
}) {
  const router = useRouter()

  const hasServerErrors = hasErrorsInSearchParams(contactResearchSupportSchema, router.query)
  const serverErrors = getErrorsFromSearchParams(contactResearchSupportSchema, router.query)

  useEffect(() => {
    if (hasServerErrors) {
      Object.keys(formState.defaultValues).forEach((field) => {
        if (router.query[`${field as string}Error`]) {
          onFoundError(field as Path<T>, { type: 'custom', message: router.query[`${field as string}Error`] as string })
        }
      })

      router.replace({ query: undefined }, undefined, { shallow: false })
    }
  }, [router.asPath, router, hasServerErrors, onFoundError, formState.defaultValues])

  return {
    errors: hasServerErrors ? serverErrors : formState.errors,
  }
}
