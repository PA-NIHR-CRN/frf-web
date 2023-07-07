import axios from 'axios'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'
import { ReactNode } from 'react'
import { FieldValues, FormProps, UseFormGetValues } from 'react-hook-form'

import { FORM_ERRORS } from '@/constants/forms'

type Props<T extends FieldValues> = {
  action: string
  method: FormProps<T>['method']
  getValues: UseFormGetValues<T>
  children: ReactNode
  onError: (message: string) => void
}

export function Form<T extends FieldValues>({ action, method, children, onError, getValues }: Props<T>) {
  const router = useRouter()

  const { executeRecaptcha } = useReCaptcha()

  return (
    <form
      noValidate
      action={action}
      method={method}
      onSubmit={async (event) => {
        event.preventDefault()

        const reCaptchaToken = await executeRecaptcha('form_submit')

        if (!reCaptchaToken) {
          console.error('Google reCaptcha failed to execute')
          onError(FORM_ERRORS.fatal)
        }

        const {
          request: { responseURL },
        } = await axios.post(action, {
          reCaptchaToken,
          ...getValues(),
        })

        if (!responseURL) onError(FORM_ERRORS.fatal)

        const redirectUrl = new URL(responseURL)

        // Fatal error redirect
        if (redirectUrl.searchParams.has('fatal')) {
          onError(FORM_ERRORS.fatal)
        }

        // Confirmation page redirect
        if (redirectUrl.pathname.includes('/confirmation')) {
          return router.push(redirectUrl.pathname)
        }

        // Misc error redirect
        router.replace(`${redirectUrl.pathname}${redirectUrl.search}`)
      }}
    >
      {children}
    </form>
  )
}
