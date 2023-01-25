import styles from '../pages/providers/providers.module.scss';
import { formatTooltip } from './generic.utils';

export const formatDataSourceTable = (data) => {
  return (
    <div>
      <table className={styles.informationGovernanceTable}>
        <tbody>
          <tr>
            <td>
              <b>Patient data source:</b>
            </td>
            <td>{data.fields.patientDataSource}</td>
          </tr>
          <tr>
            <td>
              <b>Controller:</b>
            </td>
            <td>{data.fields.controller}</td>
          </tr>
          <tr>
            <td>
              <b>Type of data:</b>
            </td>
            <td>{data.fields.typeOfData}</td>
          </tr>
          <tr>
            <td>
              <b>Basis of collection:</b>
            </td>
            <td>{data.fields.basisOfCollection}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const formatDataTransferTable = (dataTransfer, serviceType = null) => {
  return (
    <>
      {formatDataTransferTableHeading(dataTransfer.fields.label, serviceType)}

      {dataTransfer.fields.dataTransfer && (
        <table className={styles.informationGovernanceTable}>
          <tbody>
            <tr>
              <th></th>
              <th>Required?</th>
              <th className={styles.informationGovernanceTableNotes}>
                Details for this provider
              </th>
            </tr>
            {dataTransfer.fields.dataTransfer.map((row, i) => (
              <tr key={i}>
                <td className={styles.informationGovernanceTableLabel}>
                  <b>{row.fields.label.fields.label}:</b>
                  {row.fields.label.fields.description &&
                    formatTooltip(row.fields.label.fields.description)}
                </td>
                <td className={styles.informationGovernanceTableRequired}>
                  {row.fields?.required === true ? (
                    <span
                      className={styles.informationGovernanceTableRequiredTrue}
                    ></span>
                  ) : row.fields?.required === false ? (
                    <span
                      className={styles.informationGovernanceTableRequiredFalse}
                    ></span>
                  ) : (
                    <span></span>
                  )}
                </td>
                <td className={styles.informationGovernanceTableNotes}>
                  {row.fields?.notes ? row.fields.notes : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

const formatDataTransferTableHeading = (label, serviceType = null) => {
  if (!serviceType) {
    return <h4 className={styles.providerPageSubTitle}>{label}</h4>;
  } else {
    return (
      <div
        className={
          styles[
            'informationGovernanceServiceTypeTitle' +
              serviceType.replace('-', '')
          ]
        }
      >
        <h2>{serviceType}</h2>
        <p>{label}</p>
      </div>
    );
  }
};
