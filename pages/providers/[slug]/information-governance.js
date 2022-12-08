import Head from 'next/head';
import ContentfulService from '../../../lib/contentful';

import styles from '../providers.module.scss';

export async function getServerSideProps(context) {
  const content = new ContentfulService();
  const provider = await content.getProviderBySlug(context.query.slug);
  return {
    props: { provider },
  };
}

export default function ProviderDetail({ provider }) {
  if (!provider) {
    return (
      <main>
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
            <a href={`/providers/${provider.fields.slug}`}>
              Back to {provider.fields.name}
            </a>
            <h1>Information Governance for {provider.fields.name}</h1>
          </div>
        </div>
      </main>
    </>
  );
}
