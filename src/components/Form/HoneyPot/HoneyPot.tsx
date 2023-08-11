import { forwardRef } from 'react'

export const HoneyPot = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return <input ref={ref} type="text" className="sr-only" defaultValue="" tabIndex={-1} autoComplete="off" {...props} />
})
