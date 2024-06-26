import React from 'react'

function Tick() {
  return (
    <div style={{ flexShrink: 0, flexGrow: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        aria-hidden
        data-testid="frf-icon-tick"
      >
        <path
          stroke="#00703C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20.053 6L9.038 17l-5.007-5"
        ></path>
      </svg>
    </div>
  )
}

export default Tick
