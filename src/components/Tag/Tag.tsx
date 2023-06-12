import clsx from 'clsx'
import { ReactNode } from 'react'

export function Tag({ children, ...props }: { children: ReactNode }) {
  return (
    <strong
      className={clsx('govuk-tag', 'govuk-tag--red ml-3 rounded-xl border-0 bg-coral-100 uppercase text-white')}
      {...props}
    >
      {children}
    </strong>
  )
}
