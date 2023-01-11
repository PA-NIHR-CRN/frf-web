import Head from 'next/head';
import Link from 'next/link';

import { previewBanner } from '../utils/generic.utils';

export async function getServerSideProps() {
  return {
    props: { isPreviewMode: process.env.CONTENTFUL_PREVIEW_MODE },
  };
}

export default function Home({ isPreviewMode }) {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
      {previewBanner(isPreviewMode)}
      <main>
        <h1>Find, Recruit & Follow-up </h1>
        <p>
          Each of the data service providers offers one, two or all of the
          following three services:
        </p>

        <h2>Find</h2>
        <p>
          Identifying potential numbers of participants to support the planning
          of appropriate placement of studies in the UK.
        </p>
        <p>
          <Link href="/providers?serviceType=Find">View all Find services</Link>
        </p>

        <h2>Recruit</h2>
        <p>
          Enabling individuals identified by data analysis to be approached
          about taking part in research.
        </p>
        <p>
          <Link href="/providers?serviceType=Recruit">
            View all Recruit services
          </Link>
        </p>

        <h2>Follow-up</h2>
        <p>
          Collecting participant specific events and outcomes by matching to
          existing data sets.
        </p>
        <p>
          <Link href="/providers?serviceType=Follow-up">
            View all Follow-up services
          </Link>
        </p>
      </main>
    </div>
  );
}
