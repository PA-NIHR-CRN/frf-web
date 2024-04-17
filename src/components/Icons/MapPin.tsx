import React from 'react'

function MapPin() {
  return (
    <div style={{ flexGrow: 0, flexShrink: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        data-testid="frf-icon-map-pin"
        aria-hidden
      >
        <path
          stroke="#25282B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21.027 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        ></path>
        <path
          stroke="#25282B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12.027 13a3 3 0 100-6 3 3 0 000 6z"
        ></path>
      </svg>
    </div>
  )
}

export default MapPin
