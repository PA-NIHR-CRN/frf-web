import React from 'react'

function GovernanceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-[1em] w-[1em]"
      fill="none"
      aria-hidden
      data-testid="frf-icon-governance"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M44 38a4 4 0 01-4 4H8a4 4 0 01-4-4V10a4 4 0 014-4h10l4 6h18a4 4 0 014 4v22z"
      ></path>
      <g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" clipPath="url(#a)">
        <path d="M28.667 27.334h-9.334c-.736 0-1.333.596-1.333 1.333v4.666c0 .737.597 1.334 1.333 1.334h9.334c.736 0 1.333-.597 1.333-1.334v-4.666c0-.737-.597-1.334-1.333-1.334z"></path>
        <path d="M20.666 27.334v-2.667a3.333 3.333 0 016.667 0v2.666"></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M16 20h16v16H16z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default GovernanceIcon
