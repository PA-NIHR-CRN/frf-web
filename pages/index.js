import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
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
          <a href="/providers?serviceType=Find">View all Find services</a>
        </p>

        <h2>Recruit</h2>
        <p>
          Enabling individuals identified by data analysis to be approached
          about taking part in research.
        </p>
        <p>
          <a href="/providers?serviceType=Recruit">View all Recruit services</a>
        </p>

        <h2>Follow-up</h2>
        <p>
          Collecting participant specific events and outcomes by matching to
          existing data sets.
        </p>
        <p>
          <a href="/providers?serviceType=Follow-up">
            View all Follow-up services
          </a>
        </p>
      </main>
    </div>
  );
}
