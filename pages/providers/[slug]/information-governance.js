import Head from 'next/head';
import ContentfulService from '../../../lib/contentful';
import { useRouter } from 'next/router';
import styles from '../providers.module.scss';
import { formatGoBackLink } from '../../../utils/generic.utils';
import {
  formatDataSourceTable,
  formatDataTransferTable,
} from '../../../utils/informationGov.utils';

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

      <main>
        <div>
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

          {provider.fields.informationGovernance && (
            <div className={styles.informationGovernancePageDetail}>
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
            </div>
          )}
        </div>
      </main>
    </>
  );
}
