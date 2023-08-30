import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'
import { contentfulService } from '@/lib/contentful'
import { logger } from '@/lib/logger'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type ContactDataServiceProviderConfirmationProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactDataServiceProviderConfirmation({
  name,
  referenceNumber,
}: ContactDataServiceProviderConfirmationProps) {
  return (
    <>
      <NextSeo title={`Thank you for contacting ${name} - Find, Recruit and Follow-up`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
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
    </>
  )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
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
        page: `Thank you for contacting ${name}`,
        heading: 'Thank you for your enquiry',
        name,
        referenceNumber,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(req),
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
