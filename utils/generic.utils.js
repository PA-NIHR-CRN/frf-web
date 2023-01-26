import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import styles from '../pages/providers/providers.module.scss';

export const formatCollapsibleBox = (heading, text, key) => {
  return (
    <details key={key}>
      <summary>{heading}</summary>
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(text),
        }}
      ></div>
    </details>
  );
};

export const formatGoBackLink = (routerBackFn, label) => {
  return (
    <div className={styles.goBackLink}>
      <a onClick={routerBackFn}>{label}</a>
    </div>
  );
};

export const previewBanner = (isPreviewMode) => {
  if (isPreviewMode && parseInt(isPreviewMode) === 1) {
    return (
      <div className="preview-mode">
        You are viewing the preview site, which shows draft content from
        Contentful.
      </div>
    );
  }
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

export const formatTooltip = (description) => {
  return (
    <div className={styles.tooltip}>
      (?)
      <span className={styles.tooltiptext}>{description}</span>
    </div>
  );
};

export const formatTags = (tagList, tagGroup) => {
  const tags = [];
  tagList.forEach((tag) => {
    if (tag.sys.id?.startsWith(tagGroup)) {
      const tagName = tag.sys.id
        .replace(tagGroup, '')
        .replace(/([A-Z])/g, ' $1')
        .trim();
      tags.push(tagName);
    }
  });
  return tags;
};
