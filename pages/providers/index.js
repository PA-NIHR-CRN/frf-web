import Head from 'next/head';
import Link from 'next/link';
import ContentfulService from '../../lib/contentful';
import { useRouter } from 'next/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Fragment, useRef, useEffect, useState } from 'react';
import styles from './providers.module.scss';
import { formatServiceTypesCostsTable } from '../../utils/serviceTypes.utils';
import { formatTypesOfDataList } from '../../utils/typesOfData.utils';
import { formatSuitedToList } from '../../utils/suitedTo.utils';
import { formatDate } from '../../utils/generic.utils';

export async function getServerSideProps(context) {
  const content = new ContentfulService();

  const filterOptions = await content.getProviderFilterOptionValues();

  const filters = {
    page: parseInt(context.query.page) || 1,
    serviceType: [].concat(context.query.serviceType || null).filter(Boolean),
    dataType: [].concat(context.query.dataType || null).filter(Boolean),
    geography: [].concat(context.query.geography || null).filter(Boolean),
    excludeRegional: context.query.excludeRegional || null,
    providerOrganisation: []
      .concat(context.query.providerOrganisation || null)
      .filter(Boolean),
    q: context.query.q || null,
    order: context.query.order || null,
    costs: [].concat(context.query.costs || null).filter(Boolean),
  };

  /* TODO: how should we handle errors here? */
  const results = await content.getProvidersByFilter(filters);

  return {
    props: { filters, results, filterOptions },
  };
}

export default function SearchProviders({ filters, results, filterOptions }) {
  const searchForm = useRef();
  const resultOrderingForm = useRef();
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

  const handleFilterClear = async (event) => {
    const filterName = event.target.name;
    const filterValue = event.target.value;

    const params = Object.assign({}, router.query);

    // if we're removing a specific value then remove from the array
    // otherwise remove the filter entirely
    if (filterValue && Array.isArray(params[filterName])) {
      params[filterName] = params[filterName].filter((v) => v !== filterValue);
    } else {
      delete params[filterName];
    }

    router.push({
      pathname: '/providers',
      query: params,
    });
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

    const resultOrderingData = new FormData(resultOrderingForm.current);

    const resultOrderingDataAsObject = Object.fromEntries(
      Array.from(resultOrderingData.keys()).map((key) => [
        key,
        resultOrderingData.get(key),
      ])
    );

    router.push({
      pathname: '/providers',
      query: { ...formDataAsObject, ...resultOrderingDataAsObject },
    });
  };

  const filterCheckbox = (
    name,
    value,
    label,
    checked,
    onChangeFn = handleFilterChange
  ) => {
    return (
      <label>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChangeFn}
        />
        {label}
      </label>
    );
  };

  const renderFilterClearButton = (name, value, i) => {
    if (!value || !value.length) return;

    // "keywords" is a string
    if (name === 'q') {
      return (
        <button key={`${name}-${i}`} onClick={handleFilterClear} name={name}>
          {value} &times;
        </button>
      );
    }

    // exclude regional
    if (name === 'excludeRegional') {
      return (
        <button key={`${name}-${i}`} onClick={handleFilterClear} name={name}>
          Exclude Regional &times;
        </button>
      );
    }

    // all others are arrays
    return value.map((v, j) => (
      <button
        key={`${name}-${j}`}
        onClick={handleFilterClear}
        name={name}
        value={v}
      >
        {v} &times;
      </button>
    ));
  };

  const anyFiltersActive = (filters) => {
    const activeFilters = [
      filters.q,
      filters.serviceType,
      filters.dataType,
      filters.geography,
      filters.excludeRegional,
      filters.organisation,
      filters.providerOrganisation,
      filters.costs,
    ]
      .flat()
      .filter(Boolean);

    if (activeFilters.length) return true;
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
          <div className={styles.form}>
            <h3>Filter providers by</h3>
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
                <legend>Type of service</legend>
                {filterOptions.serviceType.map((item, i) => (
                  <Fragment key={i}>
                    {filterCheckbox(
                      'serviceType',
                      item,
                      item,
                      filters.serviceType?.includes(item)
                    )}
                  </Fragment>
                ))}
              </fieldset>
              <fieldset>
                <legend>Type of data available</legend>
                {filterOptions.dataType.map((item, i) => (
                  <Fragment key={i}>
                    {filterCheckbox(
                      'dataType',
                      item,
                      item,
                      filters.dataType?.includes(item)
                    )}
                  </Fragment>
                ))}
              </fieldset>
              <fieldset>
                <legend>Geographical coverage</legend>
                {filterOptions.geography.map((item, i) => (
                  <Fragment key={i}>
                    {filterCheckbox(
                      'geography',
                      item,
                      item,
                      filters.geography?.includes(item)
                    )}
                  </Fragment>
                ))}
                {
                  <>
                    <hr />
                    <Fragment key="excludeRegional">
                      {filterCheckbox(
                        'excludeRegional',
                        true,
                        'Exclude regional only services',
                        !!filters.excludeRegional
                      )}
                    </Fragment>
                  </>
                }
              </fieldset>
              <fieldset>
                <legend>Costs (Find)</legend>
                {filterOptions.costs
                  .filter((item) => item.includes('Find:'))
                  .map((item, i) => (
                    <Fragment key={i}>
                      {filterCheckbox(
                        'costs',
                        item,
                        item.substring(item.indexOf(':') + 1),
                        filters.costs?.includes(item)
                      )}
                    </Fragment>
                  ))}
              </fieldset>
              <fieldset>
                <legend>Costs (Recruit)</legend>
                {filterOptions.costs
                  .filter((item) => item.includes('Recruit:'))
                  .map((item, i) => (
                    <Fragment key={i}>
                      {filterCheckbox(
                        'costs',
                        item,
                        item.substring(item.indexOf(':') + 1),
                        filters.costs?.includes(item)
                      )}
                    </Fragment>
                  ))}
              </fieldset>
              <fieldset>
                <legend>Costs (Follow-Up)</legend>
                {filterOptions.costs
                  .filter((item) => item.includes('Follow-Up:'))
                  .map((item, i) => (
                    <Fragment key={i}>
                      {filterCheckbox(
                        'costs',
                        item,
                        item.substring(item.indexOf(':') + 1),
                        filters.costs?.includes(item)
                      )}
                    </Fragment>
                  ))}
              </fieldset>
              <fieldset>
                <legend>Organisation</legend>
                {filterOptions.providerOrganisation.map((item, i) => (
                  <Fragment key={i}>
                    {filterCheckbox(
                      'providerOrganisation',
                      item.fields.name,
                      item.fields.name,
                      filters.providerOrganisation?.includes(item.fields.name)
                    )}
                  </Fragment>
                ))}
              </fieldset>
            </form>
          </div>
          <div className={styles.results}>
            <div className={styles.resultHeader}>
              <h3>{results.pagination.total} service providers found</h3>
              <form
                method="get"
                action="/search"
                onSubmit={handleFiltersSubmit}
                ref={resultOrderingForm}
              >
                <label>Sort by</label>
                <select
                  key="order"
                  name="order"
                  className={styles.resultSorting}
                  onChange={handleFilterChange}
                  defaultValue={filters.order || 'published'}
                >
                  <option value={'a-z'}>Alphabetical (ascending)</option>
                  <option value={'z-a'}>Alphabetical (descending)</option>
                  <option value={'updated'}>Recently updated</option>
                  <option value={'published'}>Recently published</option>
                  <option value={'highest-population'}>
                    Population coverage (highest)
                  </option>
                  <option value={'lowest-population'}>
                    Population coverage (lowest)
                  </option>
                </select>
              </form>
            </div>

            {anyFiltersActive(filters) && (
              <div>
                {Object.keys(filters)
                  .filter((filterName) =>
                    [
                      'q',
                      'serviceType',
                      'dataType',
                      'geography',
                      'organisation',
                      'providerOrganisation',
                      'costs',
                      'excludeRegional',
                    ].includes(filterName)
                  )
                  .map((filterName, i) =>
                    renderFilterClearButton(filterName, filters[filterName], i)
                  )}
                <Link href="/providers">Clear filters</Link>
              </div>
            )}

            {results.items &&
              results.items.map((item) => (
                <div key={item.fields.slug} className={styles.resultItem}>
                  <h2>
                    <a href={`/providers/${item.fields.slug}`}>
                      {item.fields.name}
                    </a>
                  </h2>
                  <p>{item.fields.providerOrganisation.fields.name}</p>
                  <hr />
                  <div className={styles.providerDetailsContainer}>
                    <div className={styles.providerDetailsPrimary}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: documentToHtmlString(
                            item.fields.shortDescription
                          ),
                        }}
                      ></div>

                      {item.fields.costs && (
                        <>
                          <h3>Services available and costs:</h3>
                          {formatServiceTypesCostsTable(
                            item.fields.costs,
                            item.fields?.findCostChargeableDescription,
                            item.fields?.recruitCostChargeableDescription,
                            item.fields?.followUpCostChargeableDescription
                          )}
                        </>
                      )}

                      <h3>Coverage</h3>
                      <dl>
                        <dt>Geographical:</dt>
                        <dd>
                          {item.fields?.regionalCoverage ||
                            item.fields.geography.join(', ')}
                        </dd>
                        <dt>Population:</dt>
                        <dd>{item.fields.population}</dd>
                      </dl>
                      {item.fields.suitedTo && (
                        <>
                          <h3>Suited to:</h3>
                          {formatSuitedToList(item.fields.suitedTo)}
                        </>
                      )}
                    </div>
                    {item.fields.dataType && (
                      <div className={styles.providerDetailsSecondary}>
                        <p>
                          <b>Types of data available</b>
                        </p>
                        {formatTypesOfDataList(item.fields.dataType)}
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className={styles.providerFooter}>
                    <div>
                      <b>First Published:</b> {formatDate(item.sys.createdAt)}
                    </div>
                    <div>
                      <b>Last Updated:</b> {formatDate(item.sys.updatedAt)}
                    </div>
                    <div className={styles.providerViewBtn}>
                      <a href={`/providers/${item.fields.slug}`}>
                        View more details
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            {!results.items.length && (
              <div>
                <h2>There are no matching results</h2>
                <p>Improve your search results by:</p>
                <ul>
                  <li> Removing filters</li>
                  <li>Double-checking your spelling</li>
                  <li>Using fewer key words Searching</li>
                  <li>Double-checking your spelling Using fewer key words</li>
                  <li>Searching for something less specific</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
