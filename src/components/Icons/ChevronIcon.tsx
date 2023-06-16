type ChevronIconProps = {
  className?: string
}

function ChevronIcon({ className }: ChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      aria-hidden
      className={className}
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
    </svg>
  )
}

export default ChevronIcon
