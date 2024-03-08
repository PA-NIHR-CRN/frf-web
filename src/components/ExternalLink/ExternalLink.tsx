import { HTMLProps, ReactNode } from 'react'

type ExternalLinkProps = HTMLProps<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

export const ExternalLink = ({ href, children, ...props }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" {...props}>
      {children} (Opens in a new tab)
    </a>
  )
}
