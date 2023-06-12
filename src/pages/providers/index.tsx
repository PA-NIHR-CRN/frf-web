import { Filters as FiltersType } from '@/@types/filters'
import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import { Filters } from '@/components/Filters/Filters'
import Bookmark from '@/components/Icons/Bookmark'
import MapPin from '@/components/Icons/MapPin'
import Tick from '@/components/Icons/Tick'
import Users from '@/components/Icons/Users'
import Pagination from '@/components/Pagination/Pagination'
import { PER_PAGE } from '@/constants'
import { contentfulService } from '@/lib/contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

export type ServiceProvidersProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ServiceProviders({
  items,
  meta: { totalItems, initialPage, initialPageSize },
}: ServiceProvidersProps) {
  return (
    <>
      <Head>
        <title>
          Search results (page {initialPage + 1} of {Math.ceil(totalItems / initialPageSize)})
        </title>
      </Head>
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            {/* Filter panel */}
            <Filters />
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
              {items.map((item) => {
                return (
                  <Card key={item.slug} className="govuk-body mb-8">
                    <div className="flex justify-between border-b border-grey-80 p-4">
                      <div>
                        <h3 className="govuk-heading-m mb-2">
                          <Link href={`/providers/${item.slug}`} className="text-black">
                            {item.name}
                          </Link>
                          <strong className="govuk-tag govuk-tag--red ml-3 border-0">NEW</strong>
                        </h3>
                        <p className="mb-0 text-darkGrey">{item.providerOrganisation}</p>
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
                          <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(item.shortDescription) }} />

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
                                  <td className="govuk-table__cell pl-4">Free of charge (all studies)</td>{' '}
                                </tr>
                                <tr className="govuk-table__row">
                                  <th
                                    scope="row"
                                    className="govuk-table__cell bg-[var(--colour-follow-up-background)] p-2 text-center font-bold  tracking-wider text-navy-100"
                                  >
                                    FOLLOW-UP
                                  </th>
                                  <td className="govuk-table__cell pl-4">Free of charge (all studies)</td>{' '}
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Geography */}
                          <div className="mb-6">
                            <p className="mb-2 font-bold">Coverage:</p>
                            <ul>
                              <li className="mb-2 flex gap-2">
                                <MapPin />
                                <span>Geographical: England</span>
                              </li>
                              <li className="mb-2 flex gap-2">
                                <Users />
                                <span>Population: 35,000,000</span>
                              </li>
                            </ul>
                          </div>

                          {/* Suited to */}
                          <div className="mb-3">
                            <p className="mb-2 font-bold">Suited to:</p>
                            <ul>
                              <li className="mb-1 flex gap-2">
                                <Tick />
                                <span>Drug development trials</span>
                              </li>
                              <li className="mb-1 flex gap-2">
                                <Tick />
                                <span>Certain rare disease, indications or cancers</span>
                              </li>
                              <li className="mb-1 flex gap-2">
                                <Tick />
                                <span>Inherited diseases</span>
                              </li>
                              <li className="mb-1 flex gap-2">
                                <Tick />
                                <span>Large patient cohorts</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Side info */}
                        <aside className="govuk-grid-column-one-quarter p-0">
                          <h3 className="font-bold">Type of data available</h3>
                          <ul className="govuk-list govuk-list--bullet govuk-body-s mb-2 p-3">
                            <li className="mb-3">Hospital in-patient and out-patient episodes</li>
                            <li className="mb-3">Primary care</li>
                            <li className="mb-3">Other</li>
                          </ul>
                          <h3 className="font-bold">Source of data</h3>
                          <ul className="govuk-list govuk-list--bullet govuk-body-s p-3">
                            <li className="mb-3">Primary care</li>
                            <li className="mb-3">Secondary care</li>
                            <li className="mb-3">Participant reported</li>
                          </ul>
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
                        <Link href={`/providers/${item.slug}`} className="govuk-button mb-0">
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

type Entry = Awaited<ReturnType<typeof contentfulService.getProvidersByFilter>>['items'][number]

export const getServerSideProps: GetServerSideProps<{
  items: Array<Entry['fields']>
  meta: {
    initialPage: number
    initialPageSize: number
    totalItems: number
  }
}> = async (context) => {
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

  return {
    props: {
      items: entry.items.map((item) => ({
        ...item.fields,
      })),
      meta: {
        initialPage: entry.skip / entry.limit,
        initialPageSize: PER_PAGE,
        totalItems: entry.total,
      },
    },
  }
}
