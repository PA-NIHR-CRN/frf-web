import styles from '../pages/providers/providers.module.scss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { formatCollapsibleBox } from './generic.utils';

export const formatServiceTypesCostsTable = (
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
      findRow = formatSingleServiceTypeCostRow(cost, findDescription, i);
    }
    if (cost.includes('Recruit:')) {
      recruitRow = formatSingleServiceTypeCostRow(cost, recruitDescription, i);
    }
    if (cost.includes('Follow-Up:')) {
      followUpRow = formatSingleServiceTypeCostRow(
        cost,
        followUpDescription,
        i
      );
    }
  });

  return (
    <table className={styles.providerCostTable}>
      <tbody>
        {findRow}
        {recruitRow}
        {followUpRow}
      </tbody>
    </table>
  );
};

const formatSingleServiceTypeCostRow = (cost, costDescription, key) => {
  const costSplit = cost.split(':');
  return (
    <tr key={key}>
      <td
        className={
          styles['providerCostTableTypeColumn' + costSplit[0].replace('-', '')]
        }
      >
        {costSplit[0]}
      </td>
      <td className={styles.providerCostTableDetailColumn}>
        {costDescription || costSplit[1].trim()}
      </td>
    </tr>
  );
};

export const formatServiceTypeBlock = (
  serviceType,
  costs,
  costDescription,
  key
) => {
  return (
    <div key={key}>
      <h2
        className={
          styles[
            'serviceTypeTitle' + serviceType.fields.serviceType.replace('-', '')
          ]
        }
      >
        {serviceType.fields.serviceType}
      </h2>

      {serviceType.fields.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(serviceType.fields.description),
          }}
        ></div>
      )}

      {serviceType.fields.howTheServiceWorks && (
        <>
          <p>
            <b>How the service works:</b>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                serviceType.fields.howTheServiceWorks
              ),
            }}
          ></div>
        </>
      )}

      {serviceType.fields.expectedTimelines && (
        <>
          <p>
            <b>Expected timelines:</b>
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                serviceType.fields.expectedTimelines
              ),
            }}
          ></div>
        </>
      )}

      {costs &&
        costs
          .filter((item) => item.includes(serviceType.fields.serviceType + ':'))
          .map((item, i) => (
            <div key={i}>
              <p>
                <b>Costs:</b>
              </p>
              <table className={styles.providerCostTable}>
                <tbody>
                  {formatSingleServiceTypeCostRow(item, costDescription, i)}
                </tbody>
              </table>
            </div>
          ))}

      {serviceType.fields.costDescription && (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(serviceType.fields.costDescription),
          }}
        ></div>
      )}

      {serviceType.fields.additionalInformation &&
        serviceType.fields.additionalInformation.map(
          (item, i) =>
            item.fields.heading &&
            item.fields.text &&
            formatCollapsibleBox(item.fields.heading, item.fields.text, i)
        )}
    </div>
  );
};
