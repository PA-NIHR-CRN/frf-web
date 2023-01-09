import styles from '../pages/providers/providers.module.scss';

export const formatDataSourceTable = (data) => {
  return (
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
  );
};

export const formatDataTransferTable = (dataTransfer) => {
  return (
    <table className={styles.informationGovernanceTable}>
      <tbody>
        <tr>
          <th></th>
          <th>Required?</th>
          <th>Details for this provider</th>
        </tr>
        {dataTransfer.map((item, i) => (
          <tr key={i}>
            <td>
              <b>{item.fields.label}</b>
            </td>
            <td>
              {item.fields.required === true ? (
                <span
                  className={styles.informationGovernanceTableRequiredTrue}
                ></span>
              ) : item.fields.required === false ? (
                <span
                  className={styles.informationGovernanceTableRequiredFalse}
                ></span>
              ) : (
                <span></span>
              )}
            </td>
            <td>{item.fields?.notes ? item.fields.notes : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
