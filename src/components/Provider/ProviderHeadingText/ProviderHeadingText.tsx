import { HTMLProps } from 'react'

type ProviderHeadingTextProps = HTMLProps<HTMLHeadingElement> & {
  children: string
}

export const ProviderHeadingText = ({ children, ...props }: ProviderHeadingTextProps) => {
  return (
    <h2 className="govuk-heading-l mb-2" {...props}>
      <span className="govuk-visually-hidden">Data service provider:&nbsp;</span>
      {children}
    </h2>
  )
}
