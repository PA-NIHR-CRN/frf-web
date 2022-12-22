import Head from 'next/head';
import { useRouter } from 'next/router';
import ContentfulService from '../../lib/contentful';

import styles from './providers.module.scss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { formatCostsTable } from '../../utils/costs.utils';
import { useEffect, useState } from 'react';
import { formatTypesOfDataList } from '../../utils/typesOfData.utils';
import { formatSuitedToList } from '../../utils/suitedTo.utils';

export async function getServerSideProps(context) {
  const content = new ContentfulService();
  /* TODO: how should we handle errors here? */
  const provider = await content.getProviderBySlug(context.query.slug);
  return {
    props: { provider },
  };
}

export default function ProviderDetail({ provider }) {
  const router = useRouter();

  const goBackLink = () => {
    return (
      <div className={styles.goBackLink}>
        <a onClick={router.back}>Back to provider list</a>
      </div>
    );
  };

  if (!provider) {
    return (
      <main>
        {goBackLink()}
        <h1>404 not found</h1>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Provider details</title>
      </Head>

      <main>
        <div>
          <div className={styles.detailHeading}>
            {goBackLink()}
            <h1>{provider.fields.name}</h1>
            <h3>{provider.fields.providerOrganisation.fields.name}</h3>
          </div>

          <div
            className={`${styles.container} ${styles.containerExtraPadding}`}
          >
            <div className={styles.detailPrimary}>
              <div
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(
                    provider.fields.shortDescription
                  ),
                }}
              ></div>

              {provider.fields.costs && (
                <>
                  <h3>Services available and costs:</h3>
                  {formatCostsTable(
                    provider.fields.costs,
                    provider.fields?.findCostChargeableDescription,
                    provider.fields?.recruitCostChargeableDescription,
                    provider.fields?.followUpCostChargeableDescription
                  )}
                </>
              )}

              <h3>Coverage</h3>
              <dl>
                <dt>Geographical:</dt>
                <dd>
                  {provider.fields?.regionalCoverage ||
                    provider.fields.geography.join(', ')}
                </dd>
                <dt>Population:</dt>
                <dd>{provider.fields.population}</dd>
              </dl>

              {(provider.fields.suitedTo || provider.fields.notSuitedTo) && (
                <>
                  <h3>Suited to:</h3>
                  {formatSuitedToList(
                    provider.fields?.suitedTo,
                    provider.fields?.notSuitedTo
                  )}
                </>
              )}
            </div>
            <div className={styles.detailSecondary}>
              {provider.fields.dataType && (
                <>
                  <p>
                    <b>Types of data available</b>
                  </p>
                  {formatTypesOfDataList(provider.fields.dataType)}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
