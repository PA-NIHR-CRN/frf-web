import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'
import { logger } from '@/lib/logger'

export type ContactFrfTeamConfirmationProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactFrfTeamConfirmation({ referenceNumber }: ContactFrfTeamConfirmationProps) {
  return (
    <>
      <NextSeo title="Thank you for contacting the Find, Recruit and Follow-up specialist team - Find, Recruit and Follow-up" />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Thank you</h2>
            <p>We have received your enquiry and will be in touch in due course.</p>
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

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const referenceNumber = String(query.referenceNumber)

  try {
    return {
      props: {
        page: `Thank you for contacting the Find, Recruit and Follow-up specialist team`,
        referenceNumber,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      redirect: {
        destination: '/500',
      },
    }
  }
}
