import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container/Container'
import { contentfulService } from '@/lib/contentful'
import { logger } from '@/lib/logger'

export type ContactDataServiceProviderConfirmationProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactDataServiceProviderConfirmation({
  name,
  referenceNumber,
}: ContactDataServiceProviderConfirmationProps) {
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-l">Thank you</h2>
          <p>Your enquiry has been sent to {name}.</p>
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
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const slug = String(query.slug)
  const referenceNumber = String(query.referenceNumber)

  try {
    const entry = await contentfulService.getProviderBySlug(slug)

    if (!entry) throw new Error('Failed to fetch provider by slug: null entry')

    const {
      fields: { name },
    } = entry

    return {
      props: {
        page: `Confirmation - Contact data service provider - ${name}`,
        name,
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
