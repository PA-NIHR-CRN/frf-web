import { Card } from '@/components/Card/Card'
import { Container } from '@/components/Container/Container'
import ChevronIcon from '@/components/Icons/ChevronIcon'
import FindIcon from '@/components/Icons/FindIcon'
import FollowUpIcon from '@/components/Icons/FollowUpIcon'
import RecruitIcon from '@/components/Icons/RecruitIcon'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue } from '@/utils/getStaticPropsRevalidateValue'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

export type HomepageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  title,
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
      <Head>
        <title>Find, Recruit and Follow-up</title>
        <meta name="description" content="Find, Recruit and Follow-up service." />
      </Head>

      {/* Title, Description & Video */}
      <Container>
        <section className="flex flex-wrap items-center gap-4 lg:flex-nowrap lg:pt-6">
          <div>
            <h2 className="govuk-heading-l">{title}</h2>
            <p
              className="whitespace-pre-wrap pr-12"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          {videoUrl && (
            <div className="mt-10 flex w-full justify-center">
              <iframe
                className="aspect-video w-full max-w-[700px] lg:w-[450px]"
                src={videoUrl}
                title="Video: Find, Recruit and Follow-up Intro"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${videoUrl}?autoplay=1><img src=https://img.youtube.com/vi/msizPweg3kE/hqdefault.jpg alt='Video: Find, Recruit and Follow-up Intro'><span>▶</span></a>`}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </section>
      </Container>

      {/* Service Info */}
      <section className="mt-8 bg-grey-30 pb-4 pt-12 text-center">
        <Container>
          <p className="govuk-body-l">
            Each of the data service providers offers one, two or all of the following three services:
          </p>
          <div className="my-8 grid gap-6 text-left md:grid-cols-3">
            {/* Find */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-find-background)]">
                <h3 className="govuk-heading-m mb-0 pl-5 text-navy-100">Find</h3>
                <div className="bg-[var(--colour-find-foreground)] p-4">
                  <FindIcon />
                </div>
              </div>
              <div className="flex flex-grow flex-col justify-between">
                <p>{serviceDescriptionFind}</p>
                <Link href="/providers?serviceType=Find" className="govuk-link">
                  View all Find services
                </Link>
              </div>
            </Card>
            {/* Recruit */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-recruit-background)]">
                <h3 className="govuk-heading-m mb-0 pl-5 text-navy-100">Recruit</h3>
                <div className="bg-[var(--colour-recruit-foreground)] p-4">
                  <RecruitIcon />
                </div>
              </div>
              <div className="flex flex-grow flex-col justify-between">
                <p>{serviceDescriptionRecruit}</p>
                <Link href="/providers?serviceType=Recruit" className="govuk-link">
                  View all Recruit services
                </Link>
              </div>
            </Card>
            {/* Follow-up */}
            <Card>
              <div className="flex items-center justify-between bg-[var(--colour-follow-up-background)]">
                <h3 className="govuk-heading-m mb-0 pl-5 text-navy-100">Follow-up</h3>
                <div className="bg-[var(--colour-follow-up-foreground)] p-4">
                  <FollowUpIcon />
                </div>
              </div>
              <div className="flex flex-grow flex-col justify-between">
                <p>{serviceDescriptionFollowUp}</p>
                <Link href="/providers?serviceType=Follow-up" className="govuk-link">
                  View all Follow-up services
                </Link>
              </div>
            </Card>
          </div>
          <Link className="govuk-button govuk-button--start md:p-4" href="/providers">
            View all data service providers
            <ChevronIcon className="govuk-button__start-icon" />
          </Link>
        </Container>
      </section>

      {/* Sign-posts */}
      <Container>
        <section className="my-12 text-left">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <div className="p-7 pb-0">
                <h3 className="govuk-heading-m heading-underscore mb-0 text-navy-100">Get support for your research</h3>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between p-7">
                <p>{signPostDescription1}</p>
                <div>
                  <Link className="govuk-button govuk-button--secondary mb-0 text-left" href="#">
                    Contact research support
                  </Link>
                </div>
              </div>
            </Card>
            <Card>
              <div className="p-7 pb-0">
                <h3 className="govuk-heading-m heading-underscore mb-0 text-navy-100">
                  Become a data service provider
                </h3>
              </div>
              <div className="flex flex-grow flex-col items-start justify-between p-7">
                <p>{signPostDescription2}</p>
                <div>
                  <Link className="govuk-button govuk-button--secondary mb-0 text-left" href="#">
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
    return {
      props: { ...entry.fields },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch homepage content: ${error}`)
  }
}
