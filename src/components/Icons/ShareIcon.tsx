import React from 'react'

type ShareProps = {
  className?: string
}

function ShareIcon({ className }: ShareProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      aria-hidden
      data-testid="frf-icon-share"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v13"
      ></path>
    </svg>
  )
}

export default ShareIcon
