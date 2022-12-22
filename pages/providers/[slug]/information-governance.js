import Head from 'next/head';
import ContentfulService from '../../../lib/contentful';
import { useRouter } from 'next/router';
import styles from '../providers.module.scss';
import { formatGoBackLink } from '../../../utils/generic.utils';

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
        <title>Search results</title>
      </Head>

      <main>
        <div className={styles.container}>
          <div className={styles.detail}>
            {formatGoBackLink(router.back, 'Back to provider details')}
            <h1>Information Governance for {provider.fields.name}</h1>
          </div>
        </div>
      </main>
    </>
  );
}
