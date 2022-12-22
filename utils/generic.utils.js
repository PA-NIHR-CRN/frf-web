import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import styles from '../pages/providers/providers.module.scss';

export const formatCollapsibleBox = (heading, text, key) => {
  return (
    <>
      <details key={key}>
        <summary>{heading}</summary>
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(text),
          }}
        ></div>
      </details>
    </>
  );
};

export const formatGoBackLink = (routerBackFn, label) => {
  return (
    <div className={styles.goBackLink}>
      <a onClick={routerBackFn}>{label}</a>
    </div>
  );
};
