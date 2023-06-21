import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import DataIcon from '@/components/Icons/DataIcon'
import FindIcon from '@/components/Icons/FindIcon'
import FollowUpIcon from '@/components/Icons/FollowUpIcon'
import GlobeIcon from '@/components/Icons/GlobeIcon'
import GovernanceIcon from '@/components/Icons/GovernanceIcon'
import RecruitIcon from '@/components/Icons/RecruitIcon'
import { ServiceProviderLayout } from '@/components/Layout/ServiceProviderLayout'
import {
  GeographicalCoverage,
  ProviderHeadingText,
  ProviderOrganisation,
  Section,
  ServiceTypesCostTable,
  ShortDescription,
  SuitedList,
} from '@/components/Provider'
import { RichTextRenderer } from '@/components/RichTextRenderer/RichTextRenderer'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue, getVideoID } from '@/utils'

export type ServiceProviderProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ServiceProvider({ fields, videoID, videoUrl, createdAt, updatedAt }: ServiceProviderProps) {
  console.log('fields', fields)
  return (
    <Container>
      <article aria-labelledby={`article-${fields.slug}-title`}>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            {/* Provider name */}
            <ProviderHeadingText id={`article-${fields.slug}-title`}>{fields.name}</ProviderHeadingText>

            {/* Provider org */}
            <ProviderOrganisation as="h3">{fields.providerOrganisation}</ProviderOrganisation>

            {/* Description */}
            <ShortDescription className="mt-6">{fields.shortDescription}</ShortDescription>

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
            <SuitedList showHeading={false} type="negative" items={fields.notSuitedTo} className="mt-2" />

            {/* Video */}
            {videoUrl && (
              <div className="mt-4">
                <iframe
                  className="aspect-video w-full max-w-[700px] lg:w-[450px]"
                  src={videoUrl}
                  title="Video: Find, Recruit and Follow-up Intro"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${videoUrl}?autoplay=1><img src=https://img.youtube.com/vi/${videoID}/hqdefault.jpg alt='Video: Find, Recruit and Follow-up Intro'><span>▶</span></a>`}
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Website name & url */}
            {fields.website && fields.websiteName && (
              <a href={fields.website} target="_blank" className="mt-4 inline-block">
                For more information visit {fields.websiteName}{' '}
                <span className="govuk-visually-hidden">(Opens in a new window)</span>
              </a>
            )}

            {/* Data content  */}
            {fields.geographicAndPopulationCoverage && (
              <>
                <Section heading="Data content" icon={<DataIcon />}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(fields.geographicAndPopulationCoverage),
                    }}
                  />
                </Section>
              </>
            )}

            {/* Geographical and population coverage  */}
            {fields.geographicAndPopulationCoverage && (
              <>
                <Section heading="Geographical and population coverage" icon={<GlobeIcon />}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(fields.geographicAndPopulationCoverage),
                    }}
                  />
                </Section>
              </>
            )}

            {/* Information governance */}
            {/* {fields.informationGovernance && <RichTextRenderer>{fields.informationGovernance}</RichTextRenderer>} */}
            {fields.geographicAndPopulationCoverage && (
              <>
                <Section heading="Information governance" icon={<GovernanceIcon />}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(fields.geographicAndPopulationCoverage),
                    }}
                  />
                </Section>
              </>
            )}

            {/* Service descriptions */}
            <Section heading="Find" icon={<FindIcon />} type="find">
              find
            </Section>

            <Section heading="Recruit" icon={<RecruitIcon />} type="recruit">
              find
            </Section>

            <Section heading="Follow-up" icon={<FollowUpIcon />} type="followUp">
              find
            </Section>

            {/* Metadata */}
            <div>
              <hr />
              <p>
                <b>First Published:</b> {createdAt}
              </p>
              <p>
                <b>Last Updated:</b> {updatedAt}
              </p>
            </div>

            {/* Contact */}
          </div>
          <div className="govuk-grid-column-one-third-from-desktop"></div>
        </div>
      </article>
    </Container>
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
