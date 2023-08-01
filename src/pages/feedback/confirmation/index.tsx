/* eslint-disable @typescript-eslint/no-unused-vars */
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'

export type FeedbackConfirmationProps = InferGetStaticPropsType<typeof getStaticProps>

export default function FeedbackConfirmation(props: FeedbackConfirmationProps) {
  return (
    <>
      <NextSeo title={`Thank you for your feedback - Find, Recruit and Follow-up`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Thank you</h2>
            <p>If you have provided contact details we may contact you in the near future for further feedback.</p>
            <Link href="/" className="govuk-button" data-module="govuk-button">
              Return to homepage
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      page: 'Feedback Confirmation',
      isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
    },
  }
}
