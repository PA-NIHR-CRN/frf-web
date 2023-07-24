import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import ChevronIcon from '@/components/Icons/ChevronIcon'
import FindIcon from '@/components/Icons/FindIcon'
import FollowUpIcon from '@/components/Icons/FollowUpIcon'
import RecruitIcon from '@/components/Icons/RecruitIcon'
import { Video } from '@/components/Video/Video'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue } from '@/utils/getStaticPropsRevalidateValue'

export type HomepageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  description,
  videoUrl,
  serviceDescriptionFind,
  serviceDescriptionRecruit,
  serviceDescriptionFollowUp,
  signPostDescription1,
  signPostDescription2,
}: HomepageProps) {
  return (
    <>
      <NextSeo title="Welcome to Find, Recruit and Follow-up" />
      {/* Title, Description & Video */}
      <Container>
        <section className="flex flex-wrap items-center pt-1 lg:flex-nowrap lg:gap-4 lg:pb-3">
          <div>
            <p
              className="whitespace-pre-wrap lg:mb-0 lg:pr-6"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          {videoUrl && (
            <div className="mt-4 flex w-full justify-center lg:mt-0">
              <Video url={videoUrl} title="Video: Find, Recruit and Follow-up Intro" />
            </div>
          )}
        </section>
      </Container>

      {/* Service Info */}
      <section className="mt-7 bg-grey-30 py-6 text-center lg:mt-6 lg:py-7">
        <Container>
          <p className="govuk-body-l">
            Each of the data service providers offers, one or more of the following services:
          </p>
          <div className="my-6 grid gap-6 text-left md:grid-cols-3 lg:my-7">
            {/* Find */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-find-background)]">
                <h2 className="govuk-heading-m mb-0 pl-4 text-navy-100">Find</h2>
                <div className="bg-[var(--colour-find-foreground)] p-3 text-[3rem] text-white">
                  <FindIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col items-start justify-between p-4">
                <p>{serviceDescriptionFind}</p>
                <Link href="/providers?serviceType=Find" className="govuk-link">
                  View all Find services
                </Link>
              </div>
            </Card>
            {/* Recruit */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-recruit-background)]">
                <h2 className="govuk-heading-m mb-0 pl-4 text-navy-100">Recruit</h2>
                <div className="bg-[var(--colour-recruit-foreground)] p-3 text-[3rem]">
                  <RecruitIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col items-start justify-between p-4">
                <p>{serviceDescriptionRecruit}</p>
                <Link href="/providers?serviceType=Recruit" className="govuk-link">
                  View all Recruit services
                </Link>
              </div>
            </Card>
            {/* Follow-up */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-follow-up-background)]">
                <h2 className="govuk-heading-m mb-0 pl-4 text-navy-100">Follow-up</h2>
                <div className="bg-[var(--colour-follow-up-foreground)] p-3 text-[3rem]">
                  <FollowUpIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col items-start justify-between p-4">
                <p>{serviceDescriptionFollowUp}</p>
                <Link href="/providers?serviceType=Follow-Up" className="govuk-link">
                  View all Follow-up services
                </Link>
              </div>
            </Card>
          </div>
          <Link className="govuk-button govuk-button--start mb-0 md:p-4" href="/providers">
            View all data service providers
            <ChevronIcon className="govuk-button__start-icon" />
          </Link>
        </Container>
      </section>

      {/* Sign-posts */}
      <Container>
        <section className="mb-4 mt-7 text-left lg:mt-9">
          <div className="grid gap-7 md:grid-cols-2 lg:gap-8">
            <Card className="p-5 lg:p-6">
              <div className="pb-0">
                <h2 className="govuk-heading-m heading-underscore mb-0 text-navy-100">Get support for your research</h2>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between pt-4">
                <p>{signPostDescription1}</p>
                <div>
                  <Link
                    className="govuk-button govuk-button--secondary mb-0 mt-2 text-left"
                    href="/contact-research-support"
                  >
                    Contact research support
                  </Link>
                </div>
              </div>
            </Card>
            <Card className="p-5 lg:p-6">
              <div className="pb-0">
                <h2 className="govuk-heading-m heading-underscore mb-0 text-navy-100">
                  Organisations providing data services
                </h2>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between pt-4">
                <p>{signPostDescription2}</p>
                <div>
                  <Link className="govuk-button govuk-button--secondary mb-0 mt-2 text-left" href="#">
                    Find out more
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const entry = await contentfulService.getHomePage()
    if (!entry) throw new Error('Null entry')
    return {
      props: {
        page: 'Homepage',
        ...entry.fields,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch homepage content (${error})`)
  }
}
