import { Details } from '@/components/Details/Details'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { TextRenderer } from '@/components/Renderers/TextRenderer/TextRenderer'
import { ServiceProviderProps } from '@/pages/providers/[...slug]'

export const formatServiceTypesCostsTable = (
  costs: string[],
  findDescription: string | undefined,
  recruitDescription: string | undefined,
  followUpDescription: string | undefined
) => {
  let findRow
  let recruitRow
  let followUpRow

  costs.forEach((cost, i) => {
    if (cost.includes('Find:')) {
      findRow = formatSingleServiceTypeCostRow(cost, findDescription, i)
    }
    if (cost.includes('Recruit:')) {
      recruitRow = formatSingleServiceTypeCostRow(cost, recruitDescription, i)
    }
    if (cost.includes('Follow-Up:')) {
      followUpRow = formatSingleServiceTypeCostRow(cost, followUpDescription, i)
    }
  })

  return (
    <tbody>
      {findRow}
      {recruitRow}
      {followUpRow}
    </tbody>
  )
}

const formatSingleServiceTypeCostRow = (cost: string, costDescription: string | undefined, key: number) => {
  const costSplit = cost.split(':')
  const costDescriptionText = costDescription ? ` - ${costDescription}` : ''
  return (
    <tr key={key} className="govuk-table__row border-t border-grey-120">
      <th
        scope="row"
        className={`govuk-table__cell govuk-body-s bg-[var(--colour-${costSplit[0].toLowerCase()}-background)] p-2 text-center align-middle font-bold uppercase tracking-wider text-navy-100 md:w-[136px]`}
      >
        {costSplit[0]}
      </th>
      <td className="govuk-table__cell govuk-body-s pl-4">{`${costSplit[1].trim()}${costDescriptionText}`}</td>
    </tr>
  )
}

type Fields = ServiceProviderProps['fields']
type ServiceType = NonNullable<Fields['serviceTypes']>[number]
type Costs = Fields['costs']
type CostDescription =
  | Fields['findCostChargeableDescription']
  | Fields['recruitCostChargeableDescription']
  | Fields['followUpCostChargeableDescription']

export const formatServiceTypeBlock = (serviceType: ServiceType, costs: Costs, costDescription: CostDescription) => {
  if (!serviceType) return null

  const { fields } = serviceType

  return (
    <>
      {fields.description && <TextRenderer>{fields.description}</TextRenderer>}

      {fields.howTheServiceWorks && (
        <>
          <p className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-6">How the service works:</p>
          <TextRenderer>{fields.howTheServiceWorks}</TextRenderer>
        </>
      )}

      {fields.expectedTimelines && (
        <>
          <p className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-6">Expected timelines:</p>
          <TextRenderer>{fields.expectedTimelines}</TextRenderer>
        </>
      )}

      {costs &&
        costs
          .filter((item) => item.includes(fields.serviceType + ':'))
          .map((item, i) => (
            <div key={i} className="govuk-!-margin-top-6 govuk-!-margin-bottom-6">
              <p className="govuk-heading-s govuk-!-margin-bottom-2">Costs:</p>
              <table className="govuk-table">
                <tbody className="govuk-table__body">{formatSingleServiceTypeCostRow(item, costDescription, i)}</tbody>
              </table>
            </div>
          ))}

      {fields.costDescription && (
        <RichTextRenderer className="govuk-!-margin-bottom-6">{fields.costDescription}</RichTextRenderer>
      )}

      {fields.additionalInformation &&
        fields.additionalInformation.map(
          (item, i) =>
            item?.fields.heading &&
            item.fields.text && (
              <Details key={i} heading={item.fields.heading}>
                <TextRenderer>{item.fields.text}</TextRenderer>
              </Details>
            )
        )}
    </>
  )
}
