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
          Work email address. Please leave this field empty. Providing information in this field will cause your form
          submission to fail. The intended purpose of this field is to prevent bots from submitting this form.
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
