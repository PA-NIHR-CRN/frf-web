import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
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
import RecruitIcon from '@/components/Icons/RecruitIcon'
import { ServiceProviderLayout } from '@/components/Layout/ServiceProviderLayout'
import {
  Contact,
  ContactResearchSupport,
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
import { Video } from '@/components/Video/Video'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue } from '@/utils'
import { formatDate } from '@/utils/date.utils'
import { getCookieBanner } from '@/utils/getCookieBanner'
import {
  checkFindServiceTypeExists,
  checkFollowUpServiceTypeExists,
  checkRecruitServiceTypeExists,
  formatServiceTypeBlock,
} from '@/utils/serviceTypes.utils'

export type ServiceProviderProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ServiceProvider({ fields, createdAt, updatedAt }: ServiceProviderProps) {
  const serviceTypes = fields.serviceTypes || []

  return (
    <>
      <NextSeo
        title={`${fields.name} details - Find, Recruit and Follow-up`}
        description={`Discover how ${fields.name}’s services can help support your research. Find out more about how the services work, the costs, expected timelines and type of data available.`}
      />
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
            <div className="govuk-grid-column-two-thirds-from-desktop" data-testid="frf-dsp-content">
              <div className="max-w-[var(--dsp-detail-container-max-width)]">
                {/* Description */}
                <ShortDescription className="govuk-!-margin-top-6">{fields.shortDescription}</ShortDescription>

                {/* Service costs */}
                <ServiceTypesCostTable
                  costs={fields.costs}
                  find={{
                    description: fields.findCostChargeableDescription,
                    anchor: serviceTypes.some(checkFindServiceTypeExists),
                  }}
                  recruit={{
                    description: fields.recruitCostChargeableDescription,
                    anchor: serviceTypes.some(checkRecruitServiceTypeExists),
                  }}
                  followUp={{
                    description: fields.followUpCostChargeableDescription,
                    anchor: serviceTypes.some(checkFollowUpServiceTypeExists),
                  }}
                  className="govuk-!-margin-top-6 govuk-!-margin-bottom-6"
                />

                {/* Types of Data */}
                <TypesOfData heading="Type of data available:" className="govuk-!-margin-bottom-6">
                  {fields.typesOfDataAvailableDetail}
                </TypesOfData>

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
                {fields.videoUrl && <Video url={fields.videoUrl} title={`Video: ${fields.name}`} />}

                {/* Website name & url */}
                {fields.website && (
                  <ExternalLink href={fields.website} className="govuk-!-margin-top-4 govuk-body inline-block">
                    For more information visit {fields.websiteName || fields.website}
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
                {serviceTypes.length > 0 && (
                  <>
                    {serviceTypes.filter(checkFindServiceTypeExists).map((item, key) => (
                      <Section
                        key={key}
                        id="find"
                        heading="Find"
                        icon={<FindIcon />}
                        type="find"
                        data-testid="frf-dsp-section-find"
                      >
                        {formatServiceTypeBlock(item, fields.costs, fields?.findCostChargeableDescription)}
                      </Section>
                    ))}

                    {serviceTypes.filter(checkRecruitServiceTypeExists).map((item, key) => (
                      <Section
                        key={key}
                        id="recruit"
                        heading="Recruit"
                        icon={<RecruitIcon />}
                        type="recruit"
                        data-testid="frf-dsp-section-recruit"
                      >
                        {formatServiceTypeBlock(item, fields.costs, fields?.recruitCostChargeableDescription)}
                      </Section>
                    ))}

                    {serviceTypes.filter(checkFollowUpServiceTypeExists).map((item, key) => (
                      <Section
                        key={key}
                        id="follow-up"
                        heading="Follow-up"
                        icon={<FollowUpIcon />}
                        type="follow_up"
                        data-testid="frf-dsp-section-follow-up"
                      >
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
              </div>
            </div>
            <div
              className="govuk-grid-column-one-third-from-desktop govuk-!-padding-4 md:sticky md:top-4 md:mt-6 md:border-t-4 md:border-t-purple-100"
              data-testid="frf-dsp-sidebar"
            >
              {/* Provider Contact */}
              <Contact
                heading="Contact data service provider"
                contactName={`Get in touch with ${fields.name}`}
                contactUrl={`/contact-data-service-provider/${fields.slug}`}
              >
                If you think {fields.name} might be able to help with your study you can contact them directly using
                this service.
              </Contact>

              {/* Get support */}
              <ContactResearchSupport />
            </div>
          </div>
        </article>
      </Container>
    </>
  )
}

ServiceProvider.getLayout = function getLayout(
  page: ReactElement,
  { isPreviewMode, cookieBanner, heading }: ServiceProviderProps
) {
  return (
    <ServiceProviderLayout isPreviewMode={isPreviewMode} cookieBanner={cookieBanner} heading={heading}>
      {page}
    </ServiceProviderLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export type GetStaticProps = GetStaticPropsContext & { params: { slug: string[] } }

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const [slug] = params.slug

  try {
    const entry = await contentfulService.getProviderBySlug(slug)

    if (!entry) throw new Error('Failed to fetch provider by slug: null entry')

    const {
      fields,
      sys: { createdAt, updatedAt },
    } = entry
    return {
      props: {
        page: `Data service provider (detail) - ${fields.name}`,
        heading: 'Data Service Provider details',
        fields,
        createdAt,
        updatedAt,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(),
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch provider content: ${error}`)
  }
}
