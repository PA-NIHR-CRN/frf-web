import styles from '../pages/providers/providers.module.scss';
import { TagIds } from '../consts/tags.const';
import { formatTags } from './generic.utils';

export const formatTypesOfDataList = (dataTypes) => {
  const tags = formatTags(dataTypes, TagIds.DATA_TYPE);
  return (
    <ul className={styles.yesNoListPositive}>
      {tags.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
