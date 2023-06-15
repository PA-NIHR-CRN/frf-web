import clsx from 'clsx'

import { formatServiceTypesCostsTable } from '@/utils/serviceTypes.utils'

type ServiceTypesCostTableProps = {
  costs: string[] | undefined
  findCostChargeableDescription: string | undefined
  recruitCostChargeableDescription: string | undefined
  followUpCostChargeableDescription: string | undefined
  className?: string
}

export const ServiceTypesCostTable = ({
  costs,
  findCostChargeableDescription,
  recruitCostChargeableDescription,
  followUpCostChargeableDescription,
  className,
}: ServiceTypesCostTableProps) => {
  if (!costs || !costs.length) return null

  return (
    <table className={clsx('govuk-table govuk-!-font-size-16', className)}>
      <caption className="govuk-table__caption govuk-body-m mb-2">Services available and costs:</caption>
      {formatServiceTypesCostsTable(
        costs,
        findCostChargeableDescription,
        recruitCostChargeableDescription,
        followUpCostChargeableDescription
      )}
    </table>
  )
}
