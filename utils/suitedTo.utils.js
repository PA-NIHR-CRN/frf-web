import styles from '../pages/providers/providers.module.scss';

export const formatSuitedToList = (positiveList, negativeList) => {
  return (
    <>
      {positiveList && (
        <ul
          className={styles.yesNoListPositive}
          style={{ marginBottom: negativeList ? '0' : '12px' }}
        >
          {positiveList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {negativeList && (
        <ul className={styles.yesNoListNegative}>
          {negativeList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};
