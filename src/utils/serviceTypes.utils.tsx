import { Details } from '@/components/Details/Details'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { ServiceType } from '@/constants'
import { ServiceProviderProps } from '@/pages/providers/[...slug]'

export const formatServiceTypesCostsTable = (
  costs: string[],
  find: {
    description: string | undefined
    anchor: boolean
  },
  recruit: {
    description: string | undefined
    anchor: boolean
  },
  followUp: {
    description: string | undefined
    anchor: boolean
  }
) => {
  let findRow
  let recruitRow
  let followUpRow

  costs.forEach((cost, key) => {
    if (cost.includes('Find:')) {
      findRow = formatSingleServiceTypeCostRow({ key, cost, description: find.description, hasAnchor: find.anchor })
    }
    if (cost.includes('Recruit:')) {
      recruitRow = formatSingleServiceTypeCostRow({
        key,
        cost,
        description: recruit.description,
        hasAnchor: recruit.anchor,
      })
    }
    if (cost.includes('Follow-Up:')) {
      followUpRow = formatSingleServiceTypeCostRow({
        key,
        cost,
        description: followUp.description,
        hasAnchor: followUp.anchor,
      })
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

const formatSingleServiceTypeCostRow = ({
  key,
  cost,
  description,
  hasAnchor,
}: {
  cost: string
  description: string | undefined
  key: number
  hasAnchor: boolean
}) => {
  const costSplit = cost.split(':')
  return (
    <tr key={key} className="govuk-table__row border-t border-grey-120">
      <th
        scope="row"
        className={`govuk-table__cell govuk-body-s bg-[var(--colour-${costSplit[0].toLowerCase()}-background)] p-2 text-center align-middle font-bold uppercase tracking-wider text-navy-100 md:w-[136px]`}
      >
        {hasAnchor ? (
          <a
            href={`#${costSplit[0].toLowerCase()}`}
            className="text-navy-100"
            aria-label={`See more about the ${costSplit[0].toLowerCase()} service`}
          >
            {costSplit[0]}
          </a>
        ) : (
          costSplit[0]
        )}
      </th>
      <td className="govuk-table__cell pl-4">
        <p className="govuk-body-s mb-2" data-testid="cost-type">
          {costSplit[1].trim()}
        </p>
        <p className="govuk-body-s mb-0" data-testid="cost-description">
          {description}
        </p>
      </td>
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
      {fields.description && <RichTextRenderer>{fields.description}</RichTextRenderer>}

      {fields.howTheServiceWorks && (
        <>
          <p className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-6">How the service works:</p>
          <RichTextRenderer>{fields.howTheServiceWorks}</RichTextRenderer>
        </>
      )}

      {fields.expectedTimelines && (
        <>
          <p className="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-top-6">Expected timelines:</p>
          <RichTextRenderer>{fields.expectedTimelines}</RichTextRenderer>
        </>
      )}

      {costs &&
        costs
          .filter((item) => item.includes(fields.serviceType + ':'))
          .map((cost, key) => (
            <div key={key} className="govuk-!-margin-top-6 govuk-!-margin-bottom-6">
              <p className="govuk-heading-s govuk-!-margin-bottom-2" data-testid="costs-title">
                Costs:
              </p>
              <table className="govuk-table">
                <tbody className="govuk-table__body">
                  {formatSingleServiceTypeCostRow({ key, cost, description: costDescription, hasAnchor: false })}
                </tbody>
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
                <RichTextRenderer>{item.fields.text}</RichTextRenderer>
              </Details>
            )
        )}
    </>
  )
}

type ServiceTypeDataSection = NonNullable<ServiceProviderProps['fields']['serviceTypes']>[number]

export const checkFindServiceTypeExists = (serviceType: ServiceTypeDataSection) =>
  !!serviceType?.fields?.serviceType?.includes(ServiceType.FIND)

export const checkRecruitServiceTypeExists = (serviceType: ServiceTypeDataSection) =>
  !!serviceType?.fields?.serviceType?.includes(ServiceType.RECRUIT)

export const checkFollowUpServiceTypeExists = (serviceType: ServiceTypeDataSection) =>
  !!serviceType?.fields?.serviceType?.includes(ServiceType.FOLLOW_UP)
