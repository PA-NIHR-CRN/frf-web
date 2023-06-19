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
        className={`govuk-table__cell bg-[var(--colour-${costSplit[0].toLowerCase()}-background)] p-2 text-center align-middle font-bold uppercase tracking-wider text-navy-100 md:w-[136px]`}
      >
        {costSplit[0]}
      </th>
      <td className="govuk-table__cell pl-4">{`${costSplit[1].trim()}${costDescriptionText}`}</td>
    </tr>
  )
}
