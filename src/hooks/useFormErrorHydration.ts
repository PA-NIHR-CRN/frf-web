import { useRouter } from 'next-router-mock'
import { useEffect } from 'react'
import { FieldError, FormState, Path } from 'react-hook-form'

import { getErrorsFromSearchParams, hasErrorsInSearchParams } from '@/utils/form.utils'
import {
  ContactResearchSupportInputs,
  contactResearchSupportSchema,
} from '@/utils/schemas/contact-research-support.schema'

/**
 * Detects field errors in the URL searchParams on load and injects them into RHF state
 * After injecting into state, the searchParams are cleared so that subsequent page refreshes clear the form.
 */
export function useFormErrorHydration<T extends ContactResearchSupportInputs>({
  formState,
  onFoundError,
}: {
  formState: FormState<T>
  onFoundError: (field: Path<T>, error: FieldError) => void
}) {
  const router = useRouter()

  const fields = Object.keys(formState.defaultValues)
  const hasServerErrors = hasErrorsInSearchParams(contactResearchSupportSchema, router.query)
  const serverErrors = getErrorsFromSearchParams(contactResearchSupportSchema, router.query)

  useEffect(() => {
    if (hasServerErrors) {
      fields.forEach((field) => {
        if (router.query[`${field as string}Error`]) {
          onFoundError(field as Path<T>, { type: 'custom', message: router.query[`${field as string}Error`] as string })
        }
      })

      router.replace({ query: undefined }, undefined, { shallow: true })
    }
  }, [router.asPath])

  return {
    errors: hasServerErrors ? serverErrors : formState.errors,
  }
}
