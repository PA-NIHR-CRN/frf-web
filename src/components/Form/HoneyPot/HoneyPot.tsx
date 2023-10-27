import { forwardRef } from 'react'

/**
 *  Honey pot filter to catch bots
 *  prevent autocomplete https://stackoverflow.com/a/30873633
 */
export const HoneyPot = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return (
    <>
      <div aria-hidden="true">
        <label htmlFor="potFilter" className="sr-only">
          Work email address
        </label>
        <input
          id="potFilter"
          ref={ref}
          type="search"
          autoComplete="off"
          className="sr-only"
          defaultValue=""
          tabIndex={-1}
          {...props}
        />
      </div>
    </>
  )
})
