import clsx from 'clsx'

import { formatServiceTypesCostsTable } from '@/utils/serviceTypes.utils'

type ServiceTypesCostTableProps = {
  costs: string[] | undefined
  find: {
    description: string | undefined
    anchor: boolean
  }
  recruit: {
    description: string | undefined
    anchor: boolean
  }
  followUp: {
    description: string | undefined
    anchor: boolean
  }
  className?: string
}

export const ServiceTypesCostTable = ({ costs, find, recruit, followUp, className }: ServiceTypesCostTableProps) => {
  if (!costs || !costs.length) return null

  return (
    <table className={clsx('govuk-table govuk-!-font-size-16 table-fixed', className)}>
      <caption className="govuk-table__caption govuk-body-m mb-2">Services available and costs:</caption>
      {formatServiceTypesCostsTable(costs, find, recruit, followUp)}
    </table>
  )
}
