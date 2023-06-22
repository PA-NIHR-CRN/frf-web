import React from 'react'

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-[1em] w-[1em]"
      fill="none"
      aria-hidden
      data-testid="frf-icon-globe"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20zM4 24h40"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M24 4a30.6 30.6 0 018 20 30.6 30.6 0 01-8 20 30.6 30.6 0 01-8-20 30.6 30.6 0 018-20v0z"
      ></path>
    </svg>
  )
}

export default GlobeIcon
