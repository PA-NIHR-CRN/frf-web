import dayjs from 'dayjs'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Fragment, useRef, useState } from 'react'

import { Filters as FiltersType } from '@/@types/filters'
import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import { Filters } from '@/components/Filters/Filters'
import Pagination from '@/components/Pagination/Pagination'
import {
  GeographicalCoverage,
  ProviderHeading,
  ProviderOrganisation,
  ServiceTypesCostTable,
  ShortDescription,
  SuitedList,
} from '@/components/Provider'
import { RichTextRenderer } from '@/components/RichTextRenderer/RichTextRenderer'
import { DATE_FORMAT, NEW_LIMIT, PER_PAGE } from '@/constants'
import { contentfulService } from '@/lib/contentful'
import { numDaysBetween } from '@/utils/numDaysBetween'

export type ServiceProvidersProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ServiceProviders({
  items,
  meta: { totalItems, initialPage, initialPageSize },
  filterOptions,
}: ServiceProvidersProps) {
  const showFiltersButtonRef = useRef<HTMLAnchorElement>(null)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  const showFiltersButton = () => (
    <a
      id="show-filters"
      href="#filters"
      className="govuk-button govuk-button--secondary my-0 mr-3 md:mr-0 md:hidden"
      ref={showFiltersButtonRef}
      onClick={(event) => {
        setShowFiltersMobile(true)
        event.preventDefault()
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

  const titleSuffix = `Search results (page ${initialPage + 1} of ${Math.ceil(totalItems / initialPageSize)})`

  return (
    <>
      <NextSeo title={`Find, Recruit and Follow-up – ${titleSuffix}`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            {/* Filter panel */}
            <Filters
              options={filterOptions}
              showFiltersMobile={showFiltersMobile}
              onRequestClose={handleCloseFilters}
            />
          </div>

          <div className="govuk-grid-column-two-thirds-from-desktop">
            {/* Sort bar */}
            <div className="flex-wrap items-center justify-between gap-3 md:flex">
              <p className="govuk-heading-m mb-0 whitespace-nowrap">{totalItems} data service providers found</p>
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

            {/* Cards */}
            <ol className="mt-5" aria-label="Data service providers">
              {items.map(({ sys: { createdAt, updatedAt }, fields, metadata }) => {
                return (
                  <li key={fields.slug}>
                    <Card as="article" className="govuk-body mb-8" aria-labelledby={`article-${fields.slug}-title`}>
                      <div className="flex flex-col justify-between border-b border-grey-80 p-4">
                        <ProviderHeading
                          slug={fields.slug ?? '/'}
                          isNew={numDaysBetween(new Date(createdAt), new Date()) <= NEW_LIMIT}
                        >
                          {fields.name}
                        </ProviderHeading>
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
                              findCostChargeableDescription={fields.findCostChargeableDescription}
                              recruitCostChargeableDescription={fields.recruitCostChargeableDescription}
                              followUpCostChargeableDescription={fields.followUpCostChargeableDescription}
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
                            {fields.typesOfDataAvailableList && (
                              <>
                                <h3 className="govuk-heading-s mb-3 mt-5 md:mt-0">Type of data available</h3>
                                <RichTextRenderer
                                  document={fields.typesOfDataAvailableList}
                                  className="[&>ul>li_p]:mb-1 [&>ul_li_p]:text-sm [&>ul_ul]:pt-1 [&>ul_ul_li:not(:last-child)]:mb-0 [&_ul]:px-4"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="items-center justify-between gap-3 border-t border-grey-80 p-4 sm:flex">
                        <div className="govuk-body-s mb-3 flex flex-col flex-wrap gap-3 md:mb-0 md:flex-row">
                          <div className="whitespace-nowrap">
                            <strong>First published:</strong>
                            <span className="ml-1 mr-3">{dayjs(createdAt).format(DATE_FORMAT)}</span>
                          </div>
                          <div className="whitespace-nowrap">
                            <strong>Last updated:</strong>
                            <span className="ml-1">{dayjs(updatedAt).format(DATE_FORMAT)}</span>
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
          </div>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const filters: FiltersType = {
    page: Number(context.query.page) || 1,
  }

  const entry = await contentfulService.getProvidersByFilter(filters)

  if (!entry) throw new Error('Failed to fetch providers list: null entry')

  // const filters = {
  //   page: parseInt(context.query.page) || 1,
  //   serviceType: [].concat(context.query.serviceType || null).filter(Boolean),
  //   dataType: [].concat(context.query.dataType || null).filter(Boolean),
  //   geography: [].concat(context.query.geography || null).filter(Boolean),
  //   excludeRegional: context.query.excludeRegional || null,
  //   q: context.query.q || null,
  //   order: context.query.order || null,
  //   costs: [].concat(context.query.costs || null).filter(Boolean),
  // }

  const filterOptions = await contentfulService.getProviderFilterOptionValues()

  return {
    props: {
      items: entry.items,
      filterOptions,
      meta: {
        initialPage: entry.skip / entry.limit,
        initialPageSize: PER_PAGE,
        totalItems: entry.total,
      },
    },
  }
}
