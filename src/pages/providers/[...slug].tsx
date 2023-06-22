import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import { Details } from '@/components/Details/Details'
import { ExternalLink } from '@/components/ExternalLink/ExternalLink'
import DataIcon from '@/components/Icons/DataIcon'
import FindIcon from '@/components/Icons/FindIcon'
import FollowUpIcon from '@/components/Icons/FollowUpIcon'
import GlobeIcon from '@/components/Icons/GlobeIcon'
import GovernanceIcon from '@/components/Icons/GovernanceIcon'
import PrintIcon from '@/components/Icons/PrintIcon'
import RecruitIcon from '@/components/Icons/RecruitIcon'
import ShareIcon from '@/components/Icons/ShareIcon'
import { ServiceProviderLayout } from '@/components/Layout/ServiceProviderLayout'
import {
  Contact,
  GeographicalCoverage,
  ProviderHeadingText,
  ProviderOrganisation,
  Section,
  ServiceTypesCostTable,
  ShortDescription,
  SuitedList,
  TypesOfData,
} from '@/components/Provider'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { TextRenderer } from '@/components/Renderers/TextRenderer/TextRenderer'
import { ServiceType } from '@/constants'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue, getVideoID } from '@/utils'
import { formatDate } from '@/utils/date.utils'
import { formatServiceTypeBlock } from '@/utils/serviceTypes.utils'

export type ServiceProviderProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ServiceProvider({ fields, videoID, videoUrl, createdAt, updatedAt }: ServiceProviderProps) {
  return (
    <>
      <NextSeo title={`Further details for ${fields.name} - Find, Recruit and Follow-up`} />
      <Container>
        <article aria-labelledby={`article-${fields.slug}-title`}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              {/* Provider name */}
              <ProviderHeadingText id={`article-${fields.slug}-title`}>{fields.name}</ProviderHeadingText>

              {/* Provider org */}
              <ProviderOrganisation as="h3">{fields.providerOrganisation}</ProviderOrganisation>
            </div>
          </div>

          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds-from-desktop">
              <div className="max-w-[var(--dsp-detail-container-max-width)]">
                {/* Description */}
                <ShortDescription className="govuk-!-margin-top-6">{fields.shortDescription}</ShortDescription>

                {/* Service costs */}
                <ServiceTypesCostTable
                  costs={fields.costs}
                  findCostChargeableDescription={fields.findCostChargeableDescription}
                  recruitCostChargeableDescription={fields.recruitCostChargeableDescription}
                  followUpCostChargeableDescription={fields.followUpCostChargeableDescription}
                  className="govuk-!-margin-top-6 govuk-!-margin-bottom-5"
                />

                {/* Geography */}
                <GeographicalCoverage
                  geography={fields.geography}
                  geographySupportingText={fields.geographySupportingText}
                  regionalCoverage={fields.regionalCoverage}
                  population={fields.population}
                  className="govuk-!-margin-bottom-6"
                />

                {/* Suited to */}
                <SuitedList showHeading type="positive" items={fields.suitedTo} />

                {/* Not suited to */}
                <SuitedList
                  showHeading={false}
                  type="negative"
                  items={fields.notSuitedTo}
                  className="govuk-!-margin-top-2"
                />

                {/* Video */}
                {videoUrl && (
                  <div className="govuk-!-margin-top-6">
                    <iframe
                      className="aspect-video w-full max-w-[700px] lg:w-[450px]"
                      src={videoUrl}
                      title="Video: Find, Recruit and Follow-up Intro"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                      srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${videoUrl}?autoplay=1><img src=https://img.youtube.com/vi/${videoID}/hqdefault.jpg alt='Video: Find, Recruit and Follow-up Intro'><span>▶</span></a>`}
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Website name & url */}
                {fields.website && fields.websiteName && (
                  <ExternalLink href={fields.website} className="govuk-!-margin-top-4 govuk-body inline-block">
                    For more information visit {fields.websiteName}
                  </ExternalLink>
                )}

                {/* Data content  */}
                {fields.dataSpecificsAndCoding && (
                  <Section heading="Data content" icon={<DataIcon />}>
                    {fields.dataSpecificsAndCoding.map((item, key) => {
                      if (!item?.fields.heading || !item.fields.text) return null
                      return (
                        <Details key={key} heading={item.fields.heading}>
                          <RichTextRenderer>{item.fields.text}</RichTextRenderer>
                        </Details>
                      )
                    })}
                  </Section>
                )}

                {/* Geographical and population coverage  */}
                {fields.geographicAndPopulationCoverage && (
                  <Section heading="Geographical and population coverage" icon={<GlobeIcon />}>
                    <TextRenderer>{fields.geographicAndPopulationCoverage}</TextRenderer>
                  </Section>
                )}

                {/* Information governance */}
                {fields.informationGovernance && (
                  <Section heading="Information governance" icon={<GovernanceIcon />}>
                    <TextRenderer>{fields.informationGovernance}</TextRenderer>
                  </Section>
                )}

                {/* Service descriptions */}
                {fields.serviceTypes && (
                  <>
                    {fields.serviceTypes
                      .filter((item) => item?.fields?.serviceType?.includes(ServiceType.FIND))
                      .map((item, key) => (
                        <Section key={key} heading="Find" icon={<FindIcon />} type="find">
                          {formatServiceTypeBlock(item, fields.costs, fields?.findCostChargeableDescription)}
                        </Section>
                      ))}

                    {fields.serviceTypes
                      .filter((item) => item?.fields?.serviceType?.includes(ServiceType.RECRUIT))
                      .map((item, key) => (
                        <Section key={key} heading="Recruit" icon={<RecruitIcon />} type="recruit">
                          {formatServiceTypeBlock(item, fields.costs, fields?.recruitCostChargeableDescription)}
                        </Section>
                      ))}

                    {fields.serviceTypes
                      .filter((item) => item?.fields?.serviceType?.includes(ServiceType.FOLLOW_UP))
                      .map((item, key) => (
                        <Section key={key} heading="Follow-up" icon={<FollowUpIcon />} type="follow_up">
                          {formatServiceTypeBlock(item, fields.costs, fields?.followUpCostChargeableDescription)}
                        </Section>
                      ))}
                  </>
                )}

                {/* Metadata */}
                <div className="govuk-!-margin-top-9">
                  <hr className="govuk-!-padding-bottom-6 text-grey-120" />
                  {fields.fundedBy && (
                    <p className="govuk-body-s">
                      <strong>Funded by:</strong> {fields.fundedBy}
                    </p>
                  )}
                  <p className="govuk-body-s">
                    <strong>First published:</strong> {formatDate(createdAt)}
                  </p>
                  <p className="govuk-body-s mb-0">
                    <strong>Last updated:</strong> {formatDate(updatedAt)}
                  </p>
                </div>

                {/* Provider Contact */}
                <Contact
                  heading="Contact data service provider"
                  contactName={`Get in touch with ${fields.name}`}
                  contactUrl="/"
                >
                  If you think {fields.name} might be able to help with your study you can contact them directly using
                  this service.
                </Contact>
              </div>
            </div>
            <div className="govuk-grid-column-one-third-from-desktop govuk-!-padding-4 govuk-!-margin-top-6 border-t-4 border-t-purple-100">
              {/* Types of Data */}
              <TypesOfData>{fields.typesOfDataAvailableDetail}</TypesOfData>

              {/* Provider Contact */}
              <Contact
                heading="Contact provider"
                contactName={`Get in touch with ${fields.name}`}
                contactUrl="/"
                footer={
                  <div className="govuk-!-margin-top-4">
                    <div className="govuk-!-margin-bottom-2 govuk-body flex items-start gap-2">
                      <div>
                        <PrintIcon className="text-navy-100" />
                      </div>
                      <Link href="/print">Print data service provider details</Link>
                    </div>
                    <div className="govuk-!-margin-bottom-2 govuk-body flex items-start gap-2">
                      <div>
                        <ShareIcon className="text-navy-100" />
                      </div>
                      <Link href="/share">Share details</Link>
                    </div>
                  </div>
                }
              >
                If you think {fields.name} might be able to help with your study you can contact them directly using
                this service.
              </Contact>

              {/* Get support */}
              <div className="govuk-!-margin-top-8 govuk-!-padding-top-4 border-t-4 border-t-purple-100">
                <h3 className="govuk-heading-m heading-underscore text-navy-100">Get support for your research</h3>
                <p>
                  Need help finding appropriate data services, or any other part of the UK journey to getting your study
                  started? The UK offers multiple services and teams of professionals who can support you.
                </p>
                <Link href="" className="govuk-button govuk-button--secondary">
                  Contact research support
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </>
  )
}

ServiceProvider.getLayout = function getLayout(page: ReactElement) {
  return <ServiceProviderLayout>{page}</ServiceProviderLayout>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type GetStaticProps = GetStaticPropsContext & { params: { slug: string[] } }

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const [slug] = params.slug

  try {
    const entry = await contentfulService.getProviderBySlug(slug)

    if (!entry) throw new Error('Failed to fetch provider by slug: null entry')

    const {
      fields: { videoUrl, ...fields },
      sys: { createdAt, updatedAt },
    } = entry
    const videoID = videoUrl ? getVideoID(videoUrl) : ''

    return {
      props: {
        fields,
        ...(videoID && {
          videoID,
          videoUrl: `https://www.youtube.com/embed/${videoID}`,
        }),
        createdAt,
        updatedAt,
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch provider content: ${error}`)
  }
}
