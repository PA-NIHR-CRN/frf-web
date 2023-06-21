import { ElementType } from 'react'

type ProviderOrganisationProps<Element extends ElementType = ElementType> = {
  children: string
  as?: Element
}

export function ProviderOrganisation<Element extends ElementType = 'h4'>({
  as,
  children,
}: ProviderOrganisationProps<Element>) {
  const Component = as ?? 'h4'

  return <Component className="govuk-body-m mb-0 text-darkGrey">{children}</Component>
}
