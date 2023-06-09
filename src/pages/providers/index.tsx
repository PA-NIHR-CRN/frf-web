import Link from 'next/link'
import { Container } from '@/components/Container/Container'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { contentfulService } from '@/lib/contentful'
import Tick from '@/components/Icons/Tick'
import MapPin from '@/components/Icons/MapPin'
import Users from '@/components/Icons/Users'

export default function Providers({ items, total }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('items:', items)
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <h2 className="govuk-heading-m">One-third column</h2>
        </div>

        <div className="govuk-grid-column-two-thirds">
          {/* Sort bar */}
          <div className="govuk-grid-row">
            <div className="flex items-center">
              <div className="govuk-grid-column-one-half">
                <p className="govuk-heading-m mb-0">{total} data service providers found</p>
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
              console.log('item', item.dataSpecificsAndCoding)
              return (
                <div key={item.slug} className="govuk-body mb-8 shadow-lg">
                  <div className="flex justify-between border-b border-grey-80 p-4">
                    <div>
                      <h3 className="govuk-heading-m mb-2">
                        <Link href={`/providers/${item.slug}`} className="text-black">
                          {item.name}
                          <strong className="govuk-tag govuk-tag--red">NEW</strong>
                        </Link>
                      </h3>
                      <p className="mb-0 text-darkGrey">{item.providerOrganisation}</p>
                    </div>
                    <div>bookmark</div>
                  </div>

                  <div className="p-4">
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-two-thirds">
                        <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(item.shortDescription) }} />

                        <div className="mb-5">
                          <p className="mb-2">Services available and costs:</p>
                          <table>
                            <tr>
                              <td className="bg-[var(--colour-find-background)]">FIND</td>
                              <td>Free of charge (all studies)</td>
                            </tr>
                            <tr>
                              <td className="bg-[var(--colour-recruit-background)]">RECRUIT</td>
                              <td>Chargeable service - £XXX</td>
                            </tr>
                          </table>
                        </div>

                        <div className="mb-5">
                          <p className="mb-2">Coverage:</p>
                          <ul>
                            <li className="flex gap-2">
                              <MapPin />
                              <span>Geographical: England</span>
                            </li>
                            <li className="flex gap-2">
                              <Users />
                              <span>Population: 35,000,000</span>
                            </li>
                          </ul>
                        </div>

                        <div className="mb-5">
                          <p className="mb-2">Suited to:</p>
                          <ul>
                            <li className="flex gap-2">
                              <Tick />
                              <span>Drug development trials</span>
                            </li>
                            <li className="flex gap-2">
                              <Tick />
                              <span>Certain rare disease, indications or cancers</span>
                            </li>
                            <li className="flex gap-2">
                              <Tick />
                              <span>Inherited diseases</span>
                            </li>
                            <li className="flex gap-2">
                              <Tick />
                              <span>Large patient cohorts</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="govuk-grid-column-one-third">
                        {/* {item.dataSpecificsAndCoding &&
                          item.dataSpecificsAndCoding.map((lists) => {
                            console.log('lists: ', lists.)
                          })} */}

                        <h3>Source of data</h3>
                        <ul>
                          <li>Primary care</li>
                          <li>Secondary care</li>
                          <li>Participant reported</li>
                        </ul>
                        <h3>Type of data available</h3>
                        <ul>
                          <li>Hospital in-patient and out-patient episodes</li>
                          <li>Primary care</li>
                          <li>Other</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="items-center justify-between border-t border-grey-80 p-4 md:flex">
                    <div className="govuk-body mb-0 text-sm">
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
                </div>
              )
            })}
          </div>

          <Link className="govuk-button" href="/providers/detail">
            Detail
          </Link>
        </div>
      </div>
    </Container>
  )
}

const parseServiceProviderEntries = (entry: Awaited<ReturnType<typeof contentfulService.getProvidersByFilter>>) => {
  const items = entry.items.map((item) => ({
    ...item.fields,
  }))

  return {
    items,
    total: entry.total,
  }
}

export const getServerSideProps: GetServerSideProps<ReturnType<typeof parseServiceProviderEntries>> = async () => {
  const entry = await contentfulService.getProvidersByFilter({ page: 1 })

  if (!entry) throw new Error('Failed to fetch providers list: null entry')

  return {
    props: {
      ...parseServiceProviderEntries(entry),
    },
  }
}
