import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ContentfulService from '../../lib/contentful';
import styles from './providers.module.scss';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {
  formatServiceTypesCostsTable,
  formatServiceTypeBlock,
} from '../../utils/serviceTypes.utils';
import { formatTypesOfDataList } from '../../utils/typesOfData.utils';
import { formatSuitedToList } from '../../utils/suitedTo.utils';
import YouTubeVideoIframe from '../../utils/video.utils';
import {
  formatCollapsibleBox,
  formatDate,
  formatGoBackLink,
  previewBanner,
} from '../../utils/generic.utils';
import { ServiceType } from '../../consts/serviceType.const';

export async function getServerSideProps(context) {
  const content = new ContentfulService();
  /* TODO: how should we handle errors here? */
  const provider = await content.getProviderBySlug(context.query.slug);
  return {
    props: { isPreviewMode: process.env.CONTENTFUL_PREVIEW_MODE, provider },
  };
}

export default function ProviderDetail({ isPreviewMode, provider }) {
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

      {previewBanner(isPreviewMode)}

      <main>
        <div className={styles.providerWrapper}>
          <div className={styles.detailHeading}>
            {formatGoBackLink(router.back, 'Back to provider list')}
            <h1>{provider.fields.name}</h1>
            <h3>{provider.fields.providerOrganisation}</h3>
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
                  {formatServiceTypesCostsTable(
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
              {provider.fields.videoUrl &&
                YouTubeVideoIframe(provider.fields.videoUrl)}

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
                  <h2 className={styles.providerPageSubTitle}>
                    Data specifics and coding
                  </h2>
                  {provider.fields.dataSpecificsAndCoding.map(
                    (item, i) =>
                      item.fields?.heading &&
                      item.fields?.text &&
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
                  <h2 className={styles.providerPageSubTitle}>
                    Geographical and population coverage
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(
                        provider.fields.geographicAndPopulationCoverage
                      ),
                    }}
                  ></div>
                </>
              )}

              <h2 className={styles.providerPageSubTitle}>
                Information governance
              </h2>
              <p>
                {
                  "Full details of this service provider's Information Governance process."
                }
              </p>

              <div className={styles.informationGovernanceViewBtn}>
                <a
                  href={`/providers/${provider.fields.slug}/information-governance`}
                >
                  Details of Information Governance
                </a>
              </div>

              {provider.fields.serviceTypes && (
                <>
                  {provider.fields.serviceTypes
                    .filter((item) =>
                      item.fields?.serviceType.includes(ServiceType.FIND)
                    )
                    .map((item, i) =>
                      formatServiceTypeBlock(
                        item,
                        provider.fields.costs,
                        provider.fields?.findCostChargeableDescription,
                        i
                      )
                    )}

                  {provider.fields.serviceTypes
                    .filter((item) =>
                      item.fields?.serviceType.includes(ServiceType.RECRUIT)
                    )
                    .map((item, i) =>
                      formatServiceTypeBlock(
                        item,
                        provider.fields.costs,
                        provider.fields?.recruitCostChargeableDescription,
                        i
                      )
                    )}

                  {provider.fields.serviceTypes
                    .filter((item) =>
                      item.fields?.serviceType.includes(ServiceType.FOLLOW_UP)
                    )
                    .map((item, i) =>
                      formatServiceTypeBlock(
                        item,
                        provider.fields.costs,
                        provider.fields?.followUpCostChargeableDescription,
                        i
                      )
                    )}
                </>
              )}
              <div>
                <hr />
                <p>
                  <b>First Published:</b> {formatDate(provider.sys.createdAt)}
                </p>
                <p>
                  <b>Last Updated:</b> {formatDate(provider.sys.updatedAt)}
                </p>
              </div>
            </div>
            <div className={styles.detailSecondary}>
              {provider.metadata.tags && (
                <>
                  <p>
                    <b>Types of data available</b>
                  </p>
                  {formatTypesOfDataList(provider.metadata.tags)}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
