import clsx from 'clsx'
import React from 'react'

type HomeProps = {
  className?: string
}

function HomeIcon({ className }: HomeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={clsx(className, 'h-[2.5rem] w-[2.5rem]')}
      aria-hidden
      data-testid="frf-icon-home"
    >
      <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"></path>
    </svg>
  )
}

export default HomeIcon
