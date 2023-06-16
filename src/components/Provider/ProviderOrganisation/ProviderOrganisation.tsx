type ProviderOrganisationProps = {
  children: string
}

export const ProviderOrganisation = ({ children }: ProviderOrganisationProps) => {
  return (
    <h4 className="mb-0 text-darkGrey" aria-label={`Provider organisation: ${children}`}>
      {children}
    </h4>
  )
}
