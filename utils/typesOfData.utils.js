import styles from '../pages/providers/providers.module.scss';

export const formatTypesOfDataList = (dataTypes) => {
  return (
    <ul className={styles.yesNoListPositive}>
      {dataTypes.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
