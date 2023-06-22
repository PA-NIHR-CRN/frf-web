import React from 'react'

function DataIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-[1em] w-[1em]"
      fill="none"
      aria-hidden
      data-testid="frf-icon-data"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M28 4H12a4 4 0 00-4 4v32a4 4 0 004 4h24a4 4 0 004-4V16L28 4z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M28 4v12h12m-8 10H16m16 8H16m4-16h-4"
      ></path>
    </svg>
  )
}

export default DataIcon
