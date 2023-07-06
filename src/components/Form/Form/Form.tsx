import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Control, FieldValues, Form as ReactHookForm, FormProps } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  action: FormProps<T>['action']
  method: FormProps<T>['method']
  children: ReactNode
  onFatalError: () => void
}

const headers = { 'Content-Type': 'application/json' }

export function Form<T extends FieldValues>({ action, method, control, children, onFatalError }: Props<T>) {
  const router = useRouter()

  return (
    <ReactHookForm
      control={control}
      action={action}
      method={method}
      onSuccess={({ response }) => {
        const redirectUrl = new URL(response.url)

        // Confirmation page redirect
        if (redirectUrl.pathname.includes('/confirmation')) {
          return router.push(redirectUrl.pathname)
        }

        // Fatal error redirect
        if (redirectUrl.searchParams.has('fatal')) {
          return onFatalError()
        }

        // Misc error redirect
        router.replace(`${redirectUrl.pathname}${redirectUrl.search}`)
      }}
      headers={headers}
      noValidate
    >
      {children}
    </ReactHookForm>
  )
}
