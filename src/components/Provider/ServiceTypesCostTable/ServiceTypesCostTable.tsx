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
    <div>
      <p id="find-section" className="visually-hidden">
        {find.description}
      </p>
      <p id="recruit-section" className="visually-hidden">
        {recruit.description}
      </p>
      <p id="follow-up-section" className="visually-hidden">
        {followUp.description}
      </p>

      <table
        className={clsx('govuk-table govuk-!-font-size-16 table-fixed', className)}
        aria-describedby="find-section recruit-section follow-up-section"
      >
        <caption className="govuk-table__caption govuk-body-m mb-2">Services available and costs:</caption>
        {formatServiceTypesCostsTable(costs, find, recruit, followUp)}
      </table>
    </div>
  )
}
/* the idea here was, to make each table have an aria label that would tell the user, if that table was in,
the find, follow-up or recruit sections, giving more context other than just services available and costs. For,
example Find opportunities: services available and costs. I have created hidden text, here is the css:
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
} 
*/

/* another solution: 
<caption className="govuk-table__caption govuk-body-m mb-2">
  Services available and costs. {find.description} {recruit.description} {followUp.description}
</caption> 
this would give extra information after the screen reader reads the caption
*/

/* i do not have access to the page because its on conentful,
there is an issue with a Contentful API request, and it's returning a 404 Not Found status.*/
