import styles from '../pages/providers/providers.module.scss';

export const formatCostsTable = (
  costs,
  findDescription,
  recruitDescription,
  followUpDescription
) => {
  let findRow;
  let recruitRow;
  let followUpRow;

  costs.forEach((cost, i) => {
    if (cost.includes('Find:')) {
      findRow = formatSingleCostRow(cost, findDescription, i);
    }
    if (cost.includes('Recruit:')) {
      recruitRow = formatSingleCostRow(cost, recruitDescription, i);
    }
    if (cost.includes('Follow-Up:')) {
      followUpRow = formatSingleCostRow(cost, followUpDescription, i);
    }
  });

  return (
    <table>
      <tbody>
        {findRow}
        {recruitRow}
        {followUpRow}
      </tbody>
    </table>
  );
};

const formatSingleCostRow = (cost, description, key) => {
  const costSplit = cost.split(':');
  return (
    <tr key={key}>
      <td className={styles.providerCostTableTypeColumn}>{costSplit[0]}</td>
      <td>{description || costSplit[1].trim()}</td>
    </tr>
  );
};
