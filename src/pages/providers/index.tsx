import clsx from 'clsx'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useRef, useState } from 'react'

import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import { Filters } from '@/components/Filters/Filters'
import Pagination from '@/components/Pagination/Pagination'
import {
  ContactResearchSupport,
  GeographicalCoverage,
  ProviderHeadingLink,
  ProviderOrganisation,
  ServiceTypesCostTable,
  ShortDescription,
  SuitedList,
  TypesOfData,
} from '@/components/Provider'
import { NoResults } from '@/components/Providers/NoResults'
import { SelectedFilters } from '@/components/SelectedFilters/SelectedFilters'
import { NEW_LIMIT, PER_PAGE } from '@/constants'
import { useProviders } from '@/hooks/useProviders'
import { contentfulService } from '@/lib/contentful'
import { formatDate, getFiltersFromQuery, numDaysBetween, pluralise, transformFilters } from '@/utils'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type ServiceProvidersProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ServiceProviders({
  items,
  filters,
  meta: { totalItems, initialPage, initialPageSize },
  filterOptions,
}: ServiceProvidersProps) {
  const showFiltersButtonRef = useRef<HTMLAnchorElement>(null)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  const showFiltersButton = () => (
    <a
      id="show-filters"
      href="#filters"
      className={clsx('govuk-button govuk-button--secondary my-0 mr-3 w-full md:mr-0 md:hidden', {
        hidden: showFiltersMobile,
      })}
      ref={showFiltersButtonRef}
      onClick={() => {
        setShowFiltersMobile(true)
      }}
    >
      Open filters
    </a>
  )

  const handleCloseFilters = () => {
    setShowFiltersMobile(false)
    setTimeout(() => {
      showFiltersButtonRef.current?.focus()
      window.scrollTo(0, 0)
    }, 0)
  }

  const { isLoading, handleFilterChange } = useProviders()

  const titleResultsText =
    totalItems === 0
      ? `(no matching search results)`
      : `(${totalItems} ${pluralise('search result', totalItems)}, page ${initialPage + 1} of ${Math.ceil(
          totalItems / initialPageSize
        )})`

  return (
    <>
      <NextSeo title={`List of data service providers ${titleResultsText} - Find, Recruit and Follow-up`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            {/* Filter panel */}
            <Filters
              options={filterOptions}
              filters={filters}
              totalItems={totalItems}
              showFiltersMobile={showFiltersMobile}
              onFilterChange={handleFilterChange}
              onRequestClose={handleCloseFilters}
            />
            <ContactResearchSupport />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            {/* Sort bar */}
            <div className="flex-wrap items-center justify-between gap-3 md:flex">
              <p className="govuk-heading-m mb-0 whitespace-nowrap">
                {`${totalItems} ${pluralise('data service provider', totalItems)} found`}
              </p>
              <div className="govuk-form-group mt-5 items-center justify-end md:my-0 md:flex">
                {/* Show filters */}
                <div>{showFiltersButton()}</div>
                {/* Sort by */}
                <div className="mt-4 items-center whitespace-nowrap md:mt-0 md:flex">
                  <label className="govuk-label mb-1 mr-2 md:mb-0" htmlFor="sort">
                    Sort by
                  </label>
                  <select id="sort" name="sort" className="govuk-select w-full md:w-auto">
                    <option>Recently published</option>
                  </select>
                </div>
              </div>
            </div>

            <SelectedFilters filters={filters} isLoading={isLoading} />

            {/* Cards */}
            {isLoading ? (
              <p className="govuk-body mt-5 min-h-[40rem]">Loading...</p>
            ) : totalItems === 0 ? (
              <NoResults />
            ) : (
              <>
                <ol className="mt-5" aria-label="Data service providers">
                  {items.map(({ sys: { createdAt, updatedAt }, fields }) => {
                    return (
                      <li key={fields.slug}>
                        <Card as="article" className="govuk-body mb-8" aria-labelledby={`article-${fields.slug}-title`}>
                          <div className="flex flex-col justify-between border-b border-grey-80 p-4">
                            <ProviderHeadingLink
                              slug={fields.slug ?? '/'}
                              isNew={numDaysBetween(new Date(createdAt), new Date()) <= NEW_LIMIT}
                            >
                              {fields.name}
                            </ProviderHeadingLink>
                            <ProviderOrganisation>{fields.providerOrganisation}</ProviderOrganisation>
                          </div>

                          <div className="p-4">
                            <div className="govuk-grid-row">
                              <div className="govuk-grid-column-three-quarters-from-desktop pr-5">
                                {/* Description */}
                                <ShortDescription>{fields.shortDescription}</ShortDescription>

                                {/* Service costs */}
                                <ServiceTypesCostTable
                                  costs={fields.costs}
                                  find={{
                                    description: fields.findCostChargeableDescription,
                                    anchor: false,
                                  }}
                                  recruit={{
                                    description: fields.recruitCostChargeableDescription,
                                    anchor: false,
                                  }}
                                  followUp={{
                                    description: fields.followUpCostChargeableDescription,
                                    anchor: false,
                                  }}
                                  className="mb-5 mt-6"
                                />

                                {/* Geography */}
                                <GeographicalCoverage
                                  geography={fields.geography}
                                  geographySupportingText={fields.geographySupportingText}
                                  regionalCoverage={fields.regionalCoverage}
                                  population={fields.population}
                                  className="mb-6"
                                />

                                {/* Suited to */}
                                <SuitedList showHeading type="positive" items={fields.suitedTo} />

                                {/* Not suited to */}
                                <SuitedList
                                  showHeading={false}
                                  type="negative"
                                  items={fields.notSuitedTo}
                                  className="mt-2"
                                />
                              </div>

                              {/* Side info */}
                              <div className="govuk-grid-column-one-quarter-from-desktop mt-6 md:mt-0 md:p-0">
                                {/* Types of Data */}
                                <TypesOfData heading="Type of data available">
                                  {fields.typesOfDataAvailableList}
                                </TypesOfData>
                              </div>
                            </div>
                          </div>

                          {/* Card footer */}
                          <div className="items-center justify-between gap-3 border-t border-grey-80 p-4 sm:flex">
                            <div className="govuk-body-s mb-3 flex flex-col flex-wrap gap-3 md:mb-0 md:flex-row">
                              <div className="whitespace-nowrap">
                                <strong>First published:</strong>
                                <span className="ml-1 mr-3">{formatDate(createdAt)}</span>
                              </div>
                              <div className="whitespace-nowrap">
                                <strong>Last updated:</strong>
                                <span className="ml-1">{formatDate(updatedAt)}</span>
                              </div>
                            </div>
                            <div>
                              <Link
                                href={`/providers/${fields.slug}`}
                                className="govuk-button mb-0 whitespace-nowrap"
                                aria-label={`View more details for ${fields.name}`}
                              >
                                View more details
                              </Link>
                            </div>
                          </div>
                        </Card>
                      </li>
                    )
                  })}
                </ol>
                <Pagination initialPage={initialPage} initialPageSize={initialPageSize} totalItems={totalItems} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  try {
    const filters = getFiltersFromQuery(query)

    const entry = await contentfulService.getProvidersByFilter(transformFilters(filters))

    if (!entry) throw new Error('Failed to fetch providers list: null entry')

    const filterOptions = await contentfulService.getProviderFilterOptionValues()

    return {
      props: {
        page: 'Data service providers (list)',
        items: entry.items,
        filterOptions,
        filters,
        meta: {
          initialPage: entry.skip / entry.limit,
          initialPageSize: PER_PAGE,
          totalItems: entry.total,
        },
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(req),
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
      },
    }
  }
}
