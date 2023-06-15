import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import ChevronIcon from '@/components/Icons/ChevronIcon'
import FindIcon from '@/components/Icons/FindIcon'
import FollowUpIcon from '@/components/Icons/FollowUpIcon'
import RecruitIcon from '@/components/Icons/RecruitIcon'
import { contentfulService } from '@/lib/contentful'
import { getVideoID } from '@/utils'
import { getStaticPropsRevalidateValue } from '@/utils/getStaticPropsRevalidateValue'

export type HomepageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  title,
  description,
  videoUrl,
  videoID,
  serviceDescriptionFind,
  serviceDescriptionRecruit,
  serviceDescriptionFollowUp,
  signPostDescription1,
  signPostDescription2,
}: HomepageProps) {
  return (
    <>
      {/* Title, Description & Video */}
      <Container>
        <section className="flex flex-wrap items-center lg:flex-nowrap lg:gap-4 lg:pt-4">
          <div>
            <h2 className="govuk-heading-l mt-2 lg:mt-0">{title}</h2>
            <p
              className="whitespace-pre-wrap lg:pr-6"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          {videoUrl && (
            <div className="lg:mt-10 mt-4 flex w-full justify-center lg:mt-5">
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
        </section>
      </Container>

      {/* Service Info */}
      <section className="mt-7 bg-grey-30 py-6 text-center lg:mt-6 lg:py-7">
        <Container>
          <p className="govuk-body-l">
            Each of the data service providers offers one, two or all of the following three services:
          </p>
          <div className="my-6 grid gap-6 text-left md:grid-cols-3 lg:my-7">
            {/* Find */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-find-background)]">
                <h3 className="govuk-heading-m mb-0 pl-4 text-navy-100">Find</h3>
                <div className="bg-[var(--colour-find-foreground)] p-3">
                  <FindIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col justify-between p-4">
                <p>{serviceDescriptionFind}</p>
                <Link href="/providers?serviceType=Find" className="govuk-link">
                  View all Find services
                </Link>
              </div>
            </Card>
            {/* Recruit */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-recruit-background)]">
                <h3 className="govuk-heading-m mb-0 pl-4 text-navy-100">Recruit</h3>
                <div className="bg-[var(--colour-recruit-foreground)] p-3">
                  <RecruitIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col justify-between p-4">
                <p>{serviceDescriptionRecruit}</p>
                <Link href="/providers?serviceType=Recruit" className="govuk-link">
                  View all Recruit services
                </Link>
              </div>
            </Card>
            {/* Follow-up */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-follow-up-background)]">
                <h3 className="govuk-heading-m mb-0 pl-4 text-navy-100">Follow-up</h3>
                <div className="bg-[var(--colour-follow-up-foreground)] p-3">
                  <FollowUpIcon />
                </div>
              </div>
              <div className="govuk-body mb-0 flex flex-grow flex-col justify-between p-4">
                <p>{serviceDescriptionFollowUp}</p>
                <Link href="/providers?serviceType=Follow-up" className="govuk-link">
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
                <h3 className="govuk-heading-m heading-underscore mb-0 text-navy-100">Get support for your research</h3>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between pt-4">
                <p>{signPostDescription1}</p>
                <div>
                  <Link className="govuk-button govuk-button--secondary mb-0 mt-2 text-left" href="#">
                    Contact research support
                  </Link>
                </div>
              </div>
            </Card>
            <Card className="p-5 lg:p-6">
              <div className="pb-0">
                <h3 className="govuk-heading-m heading-underscore mb-0 text-navy-100">
                  Become a data service provider
                </h3>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between pt-4">
                <p>{signPostDescription2}</p>
                <div>
                  <Link className="govuk-button govuk-button--secondary mb-0 mt-2 text-left" href="#">
                    Becoming a data service provider
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
    if (!entry) throw new Error('Failed to fetch homepage content: null entry')
    const {
      fields: { videoUrl, ...fields },
    } = entry
    const videoID = videoUrl ? getVideoID(videoUrl) : ''
    return {
      props: {
        ...fields,
        ...(videoID && {
          videoID,
          videoUrl: `https://www.youtube.com/embed/${videoID}`,
        }),
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch homepage content: ${error}`)
  }
}
