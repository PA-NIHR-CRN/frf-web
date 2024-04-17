import { useId } from 'react'

function Users() {
  const id = useId()
  return (
    <div style={{ flexShrink: 0, flexGrow: 0 }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" aria-hidden>
        <g stroke="#25282B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" clipPath={`url(#${id})`}>
          <path d="M17.027 21v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
        </g>
        <defs>
          <clipPath id={id}>
            <path fill="#fff" d="M.027 0h24v24h-24z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Users
