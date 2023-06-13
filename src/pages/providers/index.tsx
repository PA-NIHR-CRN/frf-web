import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Filters as FiltersType } from '@/@types/filters'
import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import { Filters } from '@/components/Filters/Filters'
import Bookmark from '@/components/Icons/Bookmark'
import Cross from '@/components/Icons/Cross'
import MapPin from '@/components/Icons/MapPin'
import Tick from '@/components/Icons/Tick'
import Users from '@/components/Icons/Users'
import { List, ListItem } from '@/components/List/List'
import Pagination from '@/components/Pagination/Pagination'
import { Tag } from '@/components/Tag/Tag'
import { NEW_LIMIT, PAGE_TITLE, PER_PAGE } from '@/constants'
import { contentfulService } from '@/lib/contentful'
import { numDaysBetween } from '@/utils/numDaysBetween'

export type ServiceProvidersProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ServiceProviders({
  items,
  meta: { totalItems, initialPage, initialPageSize },
  filterOptions,
}: ServiceProvidersProps) {
  console.log('fields', items)
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} – Search results (page ${initialPage + 1} of ${Math.ceil(totalItems / initialPageSize)})`}
      />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {/* Filter panel */}
            <Filters options={filterOptions} />
          </div>

          <div className="govuk-grid-column-two-thirds">
            {/* Sort bar */}
            <div className="govuk-grid-row">
              <div className="flex items-center">
                <div className="govuk-grid-column-one-half">
                  <p className="govuk-heading-m mb-0">{totalItems} data service providers found</p>
                </div>
                <div className="govuk-grid-column-one-half">
                  <div className="govuk-form-group mb-0 flex items-center justify-end">
                    <label className="govuk-label mb-0 mr-2" htmlFor="sort">
                      Sort by
                    </label>
                    <select id="sort" name="sort" className="govuk-select">
                      <option>Recently published</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="mt-9">
              {items.map(({ sys: { createdAt }, fields }) => {
                const isNew = numDaysBetween(new Date(createdAt), new Date()) <= NEW_LIMIT

                return (
                  <Card key={fields.slug} className="govuk-body mb-8">
                    <div className="flex justify-between border-b border-grey-80 p-4">
                      <div>
                        <h3 className="govuk-heading-m mb-2">
                          <Link href={`/providers/${fields.slug}`} className="text-black">
                            {fields.name}
                            {isNew && <span className="govuk-visually-hidden">&ndash; New</span>}
                          </Link>
                          {isNew && <Tag aria-hidden>New</Tag>}
                        </h3>
                        <p className="mb-0 text-darkGrey">{fields.providerOrganisation}</p>
                      </div>
                      <div>
                        <button>
                          <Bookmark />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="govuk-grid-row">
                        <div className="govuk-grid-column-three-quarters pr-5">
                          <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(fields.shortDescription) }} />

                          {/* Service costs */}
                          <div className="mb-5 mt-6">
                            <table className="govuk-table govuk-!-font-size-16">
                              <caption className="govuk-table__caption govuk-body-m mb-2">
                                Services available and costs:
                              </caption>
                              <tbody>
                                <tr className="govuk-table__row border-t border-grey-120">
                                  <th
                                    scope="row"
                                    className="govuk-table__cell bg-[var(--colour-find-background)] p-2 text-center font-bold   tracking-wider text-navy-100"
                                  >
                                    FIND
                                  </th>
                                  <td className="govuk-table__cell pl-4">Free of charge (all studies)</td>
                                </tr>
                                <tr className="govuk-table__row">
                                  <th
                                    scope="row"
                                    className="govuk-table__cell bg-[var(--colour-recruit-background)] p-2 text-center font-bold  tracking-wider text-navy-100"
                                  >
                                    RECRUIT
                                  </th>
                                  <td className="govuk-table__cell pl-4">Free of charge (all studies)</td>
                                </tr>
                                <tr className="govuk-table__row">
                                  <th
                                    scope="row"
                                    className="govuk-table__cell bg-[var(--colour-follow-up-background)] p-2 text-center font-bold  tracking-wider text-navy-100"
                                  >
                                    FOLLOW-UP
                                  </th>
                                  <td className="govuk-table__cell pl-4">Free of charge (all studies)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Geography */}
                          <List heading="Coverage:" className="mb-6">
                            <ListItem icon={<MapPin />}>Geographical: England</ListItem>
                            <ListItem icon={<Users />}>Population: 35,000,000</ListItem>
                          </List>

                          {/* Suited to */}
                          <List heading="Suited to:">
                            <ListItem icon={<Tick />}>Drug development trials</ListItem>
                            <ListItem icon={<Tick />}>Certain rare disease, indications or cancers</ListItem>
                            <ListItem icon={<Tick />}>Inherited diseases</ListItem>
                            <ListItem icon={<Cross />}>Large patient cohorts</ListItem>
                          </List>
                        </div>

                        {/* Side info */}
                        <aside className="govuk-grid-column-one-quarter p-0">
                          <List heading="Type of data available" className="mb-6 px-3">
                            <ListItem className="text-sm">Hospital in-patient and out-patient episodes</ListItem>
                            <ListItem className="text-sm">Certain rare disease, indications or cancers</ListItem>
                            <ListItem className="text-sm">Primary care</ListItem>
                            <ListItem className="text-sm">Other</ListItem>
                          </List>

                          <List heading="Source of data" className="px-3">
                            <ListItem className="text-sm">Primary care</ListItem>
                            <ListItem className="text-sm">Secondary care</ListItem>
                            <ListItem className="text-sm">Participant reported</ListItem>
                          </List>
                        </aside>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="items-center justify-between border-t border-grey-80 p-4 md:flex">
                      <div className="govuk-body-s mb-0">
                        <strong>First published: </strong>
                        <span className="mr-2">06/10/2021</span>
                        <strong>Last updated: </strong>
                        <span>06/10/2021</span>
                      </div>
                      <div>
                        <Link href={`/providers/${fields.slug}`} className="govuk-button mb-0">
                          View more details
                        </Link>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

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
