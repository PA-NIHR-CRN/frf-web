import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type ContactResearchSupportConfirmationProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactResearchSupportConfirmation({
  referenceNumber,
}: ContactResearchSupportConfirmationProps) {
  return (
    <>
      <NextSeo title="Thank you for contacting research support" />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Thank you</h2>
            <p>
              Your enquiry has been sent to the relevant research support team and they will be in touch in due course.
            </p>
            <p>
              {referenceNumber && `Your enquiry reference number is ${referenceNumber}. `}A copy of your enquiry will be
              sent to your email address.
            </p>
            <p>
              <Link href="/feedback">What did you think of this website?</Link> (takes 30 seconds)
            </p>
            <Link href="/" className="govuk-button" data-module="govuk-button">
              Return to homepage
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  try {
    const referenceNumber = query.referenceNumber ?? ''

    return {
      props: {
        page: 'Thank you for contacting research support',
        referenceNumber,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(req),
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
      },
    }
  }
}
