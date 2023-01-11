import Head from 'next/head';
import ContentfulService from '../../../lib/contentful';
import { useRouter } from 'next/router';
import styles from '../providers.module.scss';
import { formatGoBackLink, previewBanner } from '../../../utils/generic.utils';
import {
  formatDataSourceTable,
  formatDataTransferTable,
} from '../../../utils/informationGov.utils';
import { Fragment } from 'react';

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
      /* TODO: make this better */
      <main>
        {formatGoBackLink(router.back, 'Back to provider details')}
        <h1>404 not found</h1>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Information Governance</title>
      </Head>

      {previewBanner(isPreviewMode)}

      <main>
        <div className={styles.providerWrapper}>
          <div>
            {formatGoBackLink(router.back, 'Back to provider details')}
            <h1>Information Governance for {provider.fields.name}</h1>
            <p>
              As the providers of the Find, Recruit and Follow-up service, the
              National Institute for Health and Care Research are working
              closely with the Health Research Authority to develop a clearly
              defined set of guidelines for sharing the information governance
              process that providers are following with their data.
            </p>
          </div>

          <div className={styles.informationGovernancePageDetail}>
            {provider.fields.informationGovernance && (
              <>
                <h2 className={styles.providerPageSubTitle}>Data source</h2>
                {formatDataSourceTable(provider.fields.informationGovernance)}

                <h2 className={styles.providerPageSubTitle}>
                  Data processing activities
                </h2>
                <h4 className={styles.providerPageSubTitle}>
                  Transfer of personal data to a third party data controller
                </h4>
                {formatDataTransferTable(
                  provider.fields.informationGovernance.fields.dataTransfer
                )}
              </>
            )}

            {provider.fields.serviceTypes && (
              <>
                {provider.fields.serviceTypes
                  .filter((item) => item.fields?.serviceType.includes('Find'))
                  .map((item, i) => (
                    <Fragment key={i}>
                      <div
                        className={
                          styles.informationGovernanceServiceTypeTitleFind
                        }
                      >
                        <h2>Find</h2>
                        <p>
                          Determining numbers of potentially eligible research
                          participants
                        </p>
                      </div>
                      {item.fields.informationGovernance &&
                        formatDataTransferTable(
                          item.fields.informationGovernance
                        )}
                    </Fragment>
                  ))}

                {provider.fields.serviceTypes
                  .filter((item) =>
                    item.fields?.serviceType.includes('Recruit')
                  )
                  .map((item, i) => (
                    <Fragment key={i}>
                      <div
                        className={
                          styles.informationGovernanceServiceTypeTitleRecruit
                        }
                      >
                        <h2>Recruit</h2>
                        <p>
                          Approaching potentially eligible research participants
                        </p>
                      </div>
                      {item.fields.informationGovernance &&
                        formatDataTransferTable(
                          item.fields.informationGovernance
                        )}
                    </Fragment>
                  ))}

                {provider.fields.serviceTypes
                  .filter((item) =>
                    item.fields?.serviceType.includes('Follow-Up')
                  )
                  .map((item, i) => (
                    <Fragment key={i}>
                      <div
                        className={
                          styles.informationGovernanceServiceTypeTitleFollowUp
                        }
                      >
                        <h2>Follow-Up</h2>
                        <p>
                          Using data sources to link to patient records for
                          follow-up information
                        </p>
                      </div>
                      {item.fields.informationGovernance &&
                        formatDataTransferTable(
                          item.fields.informationGovernance
                        )}
                    </Fragment>
                  ))}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
