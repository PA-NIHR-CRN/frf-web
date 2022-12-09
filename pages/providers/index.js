import Head from 'next/head';
import ContentfulService from '../../lib/contentful';
import { useRouter } from 'next/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Fragment, useRef, useEffect, useState } from 'react';

import styles from './providers.module.scss';
import { setRevalidateHeaders } from 'next/dist/server/send-payload';

export async function getServerSideProps(context) {
  const content = new ContentfulService();

  const page = parseInt(context.query.page) || 1;

  const filters = {
    serviceType: context.query.serviceType || null,
    dataType: context.query.dataType || null,
    population: context.query.population || null,
    geography: context.query.geography || null,
    providerOrganisation: context.query.providerOrganisation || null,
    q: context.query.q || null,
  };

  if (filters.serviceType && !Array.isArray(filters.serviceType))
    filters.serviceType = [filters.serviceType];

  if (filters.dataType && !Array.isArray(filters.dataType))
    filters.dataType = [filters.dataType];

  if (filters.geography && !Array.isArray(filters.geography))
    filters.geography = [filters.geography];

  if (
    filters.providerOrganisation &&
    !Array.isArray(filters.providerOrganisation)
  )
    filters.providerOrganisation = [filters.providerOrganisation];

  const results = await content.getProvidersByFilter(filters, page);
  const providerOrganisations = await content.getAllProviderOrganisations();

  return {
    props: { filters, results, providerOrganisations },
  };
}

export default function SearchProviders({
  filters,
  results,
  providerOrganisations,
}) {
  const searchForm = useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, []);

  const handleFiltersSubmit = async (event) => {
    event.preventDefault();
    search();
  };

  const handleFilterChange = async (event) => {
    search();
  };

  const search = () => {
    const formData = new FormData(searchForm.current);

    // https://stackoverflow.com/a/62010324
    const formDataAsObject = Object.fromEntries(
      Array.from(formData.keys()).map((key) => [
        key,
        formData.getAll(key).length > 1
          ? formData.getAll(key)
          : formData.get(key),
      ])
    );

    console.log(formDataAsObject);

    router.push({
      pathname: '/providers',
      query: formDataAsObject,
    });
  };

  const filterCheckbox = (name, value, label, checked) => {
    return (
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          defaultChecked={checked}
          onChange={handleFilterChange}
        />
        {label}
      </label>
    );
  };

  const filterRadio = (name, value, label, checked) => {
    return (
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={checked}
          onChange={handleFilterChange}
        />
        {label}
      </label>
    );
  };

  return (
    <>
      <Head>
        <title>Search results</title>
      </Head>

      <main>
        <div
          className={`${styles.container} ${
            isLoading ? styles.loading : styles.loaded
          }`}
        >
          <div className={styles.results}>
            <h1>{results.pagination.total} service providers found,</h1>

            {results.items.map((item) => (
              <div key={item.fields.slug} className={styles.resultItem}>
                <h2>
                  <a href={`/providers/${item.fields.slug}`}>
                    {item.fields.name}
                  </a>
                </h2>
                <p>Org name: {item.fields.providerOrganisation.fields.name}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(item.fields.shortDescription),
                  }}
                ></div>
                <h3>Coverage</h3>
                <dl>
                  <dt>Geographical: </dt>
                  <dd>{item.fields.geography.join(', ')}</dd>
                  <dt>Population:</dt>
                  <dd>{item.fields.population}</dd>
                </dl>
                <h3>Suited to:</h3>
                <ul>
                  {item.fields.suitedTo.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.form}>
            <form
              method="get"
              action="/search"
              onSubmit={handleFiltersSubmit}
              ref={searchForm}
            >
              <fieldset>
                <label>
                  Keywords
                  <input name="q" defaultValue={filters.q} />
                </label>
                <input type="submit" value="Search" />
              </fieldset>
              <fieldset>
                <legend>Service Type</legend>
                {filterCheckbox(
                  'serviceType',
                  'Find',
                  'Find',
                  filters.serviceType?.includes('Find')
                )}
                {filterCheckbox(
                  'serviceType',
                  'Recruit',
                  'Recruit',
                  filters.serviceType?.includes('Recruit')
                )}
                {filterCheckbox(
                  'serviceType',
                  'Follow-up',
                  'Follow-up',
                  filters.serviceType?.includes('Follow-up')
                )}
              </fieldset>
              <fieldset>
                <legend>Type of data available</legend>
                {filterCheckbox(
                  'dataType',
                  'Primary care data',
                  'Primary care data',
                  filters.dataType?.includes('Primary care data')
                )}
                {filterCheckbox(
                  'dataType',
                  'Secondary care data',
                  'Secondary care data',
                  filters.dataType?.includes('Secondary care data')
                )}
                {filterCheckbox(
                  'dataType',
                  'Participant reported data',
                  'Participant reported data',
                  filters.dataType?.includes('Participant reported data')
                )}
              </fieldset>
              <fieldset>
                <legend>Geographical coverage</legend>
                {filterCheckbox(
                  'geography',
                  'All',
                  'All',
                  filters.geography?.includes('All')
                )}
                {filterCheckbox(
                  'geography',
                  'England',
                  'England',
                  filters.geography?.includes('England')
                )}
                {filterCheckbox(
                  'geography',
                  'Northern Ireland',
                  'Northern Ireland',
                  filters.geography?.includes('Northern Ireland')
                )}
                {filterCheckbox(
                  'geography',
                  'Scotland',
                  'Scotland',
                  filters.geography?.includes('Scotland')
                )}
                {filterCheckbox(
                  'geography',
                  'Wales',
                  'Wales',
                  filters.geography?.includes('Wales')
                )}
              </fieldset>
              <fieldset>
                <legend>Population coverage</legend>
                {filterRadio(
                  'population',
                  '0-10000',
                  'Less than 10,000',
                  filters.population?.includes('0-10000'),
                  'radio'
                )}
                {filterRadio(
                  'population',
                  '10000-49999',
                  '10,000 to 49,999',
                  filters.population?.includes('10000-49999'),
                  'radio'
                )}
                {filterRadio(
                  'population',
                  '50000-199999',
                  '50,000 to 199,999',
                  filters.population?.includes('50000-199999'),
                  'radio'
                )}
                {filterRadio(
                  'population',
                  '200000-999999',
                  '200,000 to 999,999',
                  filters.population?.includes('200000-999999'),
                  'radio'
                )}
                {filterRadio(
                  'population',
                  '1000000-999999999',
                  '1,000,000 and more',
                  filters.population?.includes('1000000+'),
                  'radio'
                )}
              </fieldset>
              <fieldset>
                <legend>Organisations</legend>
                {providerOrganisations.items.map((item, i) => (
                  <Fragment key={i}>
                    {filterCheckbox(
                      'providerOrganisation',
                      item.fields.slug,
                      item.fields.name,
                      filters.providerOrganisation?.includes(item.fields.slug)
                    )}
                  </Fragment>
                ))}
              </fieldset>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
