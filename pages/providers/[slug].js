import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ContentfulService from '../../lib/contentful';

import styles from './providers.module.scss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { formatCostsTable } from '../../utils/costs.utils';
import { formatTypesOfDataList } from '../../utils/typesOfData.utils';
import { formatSuitedToList } from '../../utils/suitedTo.utils';
import YouTubeVideoIframe from '../../utils/video.utils';
import {
  formatCollapsibleBox,
  formatGoBackLink,
} from '../../utils/generic.utils';

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

  if (!provider) {
    return (
      <main>
        {formatGoBackLink(router.back, 'Back to provider list')}
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
            {formatGoBackLink(router.back, 'Back to provider list')}
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

              {/*YouTube Video*/}
              {/*TODO: Update to use new field videoURL and parse the ID */}
              {provider.fields.videoEmbed && YouTubeVideoIframe('OtmV3TPTbRs')}

              {provider.fields?.website && (
                <p>
                  <Link href={provider.fields?.website}>
                    For more information visit
                    {provider.fields?.websiteName
                      ? ' ' + provider.fields?.websiteName
                      : ' ' + provider.fields?.website}
                  </Link>
                </p>
              )}

              {provider.fields.dataSpecificsAndCoding && (
                <>
                  <h2>Data specifics and coding</h2>
                  {provider.fields.dataSpecificsAndCoding.map(
                    (item, i) =>
                      item.fields.heading &&
                      item.fields.text &&
                      formatCollapsibleBox(
                        item.fields.heading,
                        item.fields.text,
                        i
                      )
                  )}
                </>
              )}

              {provider.fields.geographicAndPopulationCoverage && (
                <>
                  <h2>Geographical and population coverage</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        provider.fields.geographicAndPopulationCoverage
                      ),
                    }}
                  ></div>
                </>
              )}

              <h2>Information governance</h2>
              <p>
                {
                  "Full details of this service provider's Information Governance process."
                }
              </p>

              <a
                href={`/providers/${provider.fields.slug}/information-governance`}
              >
                Details of Information Governance
              </a>
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
