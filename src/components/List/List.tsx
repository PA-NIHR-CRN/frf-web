import clsx from 'clsx'
import { ElementType, ReactNode } from 'react'

type ListProps<Element extends ElementType = ElementType> = {
  /** Content to be rendered within the Card */
  children: ReactNode
  /** Custom class name for the Card element */
  className?: string
  /** Heading to appear above the list */
  heading?: string
  /** Element/component/tag the Card will be rendered as (default: <div>) */
  as?: Element
}

export function List<Element extends ElementType = 'ul'>({
  children,
  className,
  heading,
  as,
  ...props
}: ListProps<Element>) {
  const Component = as ?? 'ul'
  return (
    <>
      {heading && <p className="mb-3 font-bold">{heading}</p>}
      <Component className={clsx('list-disc', className)} {...props}>
        {children}
      </Component>
    </>
  )
}

type ListItemProps = {
  /** Content to be rendered within the Card */
  children: ReactNode
  /** Custom class name for the Card element */
  className?: string
  /** Icon to appear before the child content */
  icon?: ReactNode
}

export function ListItem({ children, icon, className, ...props }: ListItemProps) {
  return (
    <li
      className={clsx('[&:not(:last-child)]:mb-2', className, {
        'flex list-none gap-2': !!icon,
      })}
      {...props}
    >
      {icon}
      {children}
    </li>
  )
}
