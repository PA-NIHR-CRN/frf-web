import React from 'react'

type PrintProps = {
  className?: string
}

function PrintIcon({ className }: PrintProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      aria-hidden
      data-testid="frf-icon-print"
      className={className}
    >
      <path
        stroke="#193E72"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
      ></path>
      <path stroke="#193E72" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14H6v8h12v-8z"></path>
    </svg>
  )
}

export default PrintIcon
