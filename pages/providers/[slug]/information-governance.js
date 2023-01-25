import Head from 'next/head';
import ContentfulService from '../../../lib/contentful';
import { useRouter } from 'next/router';
import styles from '../providers.module.scss';
import { formatGoBackLink, previewBanner } from '../../../utils/generic.utils';
import {
  formatDataSourceTable,
  formatDataTransferTable,
} from '../../../utils/informationGov.utils';
import { ServiceType } from '../../../consts/serviceType.const';
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

                {provider.fields.informationGovernance.fields
                  .dataProcessingActivities && (
                  <>
                    <h2 className={styles.providerPageSubTitle}>
                      Data processing activities
                    </h2>
                    {provider.fields.informationGovernance.fields.dataProcessingActivities.map(
                      (dataTransfer, i) => (
                        <Fragment key={i}>
                          {formatDataTransferTable(dataTransfer)}
                        </Fragment>
                      )
                    )}
                  </>
                )}
              </>
            )}

            {provider.fields.serviceTypes && (
              <>
                {provider.fields.serviceTypes
                  .filter((item) =>
                    item.fields?.serviceType.includes(ServiceType.FIND)
                  )
                  .map((item, i) =>
                    item.fields.dataProcessingActivities?.map(
                      (dataTransfer, i) => (
                        <Fragment key={i}>
                          {formatDataTransferTable(
                            dataTransfer,
                            ServiceType.FIND
                          )}
                        </Fragment>
                      )
                    )
                  )}

                {provider.fields.serviceTypes
                  .filter((item) =>
                    item.fields?.serviceType.includes(ServiceType.RECRUIT)
                  )
                  .map((item, i) =>
                    item.fields.dataProcessingActivities?.map(
                      (dataTransfer, i) => (
                        <Fragment key={i}>
                          {formatDataTransferTable(
                            dataTransfer,
                            ServiceType.RECRUIT
                          )}
                        </Fragment>
                      )
                    )
                  )}

                {provider.fields.serviceTypes
                  .filter((item) =>
                    item.fields?.serviceType.includes(ServiceType.FOLLOW_UP)
                  )
                  .map((item, i) =>
                    item.fields.dataProcessingActivities?.map(
                      (dataTransfer, i) => (
                        <Fragment key={i}>
                          {formatDataTransferTable(
                            dataTransfer,
                            ServiceType.FOLLOW_UP
                          )}
                        </Fragment>
                      )
                    )
                  )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
