import clsx from 'clsx'
import React from 'react'

type CrossProps = {
  className?: string
}

function Cross({ className }: CrossProps) {
  return (
    <div style={{ flexShrink: 0, flexGrow: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={clsx(className, 'h-[1em] w-[1em]')}
        fill="none"
        aria-hidden
        data-testid="frf-icon-cross"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 6L6 18M6 6l12 12"
        ></path>
      </svg>
    </div>
  )
}

export default Cross
