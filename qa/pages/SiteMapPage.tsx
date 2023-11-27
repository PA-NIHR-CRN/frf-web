import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ReactElement, useCallback } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { RootLayout } from '@/components/Layout/RootLayout'
import { TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'
import { useFormErrorHydration } from '@/hooks/useFormErrorHydration'
import { logger } from '@/lib/logger'
import { getValuesFromSearchParams } from '@/utils/form.utils'
import { getCookieBanner } from '@/utils/getCookieBanner'
import { FeedbackInputs, feedbackSchema } from '@/utils/schemas/feedback.schema'

export type FeedbackProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Feedback({ query }: FeedbackProps) {
  const { register, formState, setError, watch, handleSubmit } = useForm<FeedbackInputs>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: getValuesFromSearchParams(feedbackSchema, query),
  })

  const handleFoundError = useCallback(
    (field: keyof FeedbackInputs, error: FieldError) => setError(field, error),
    [setError]
  )

  const { errors } = useFormErrorHydration<FeedbackInputs>({
    schema: feedbackSchema,
    formState,
    onFoundError: handleFoundError,
  })

  // Watch & update the character count for the "Support summary" textarea
  const suggestions = watch('suggestions') || ''
  const remainingCharacters =
    suggestions.length >= TEXTAREA_MAX_CHARACTERS ? 0 : TEXTAREA_MAX_CHARACTERS - suggestions.length

  const { defaultValues } = formState

  return (
    <>
      <NextSeo
        title={`Give your feedback - Find, Recruit and Follow-up`}
        description="Let us know what you think of our new Find, Recruit and Follow-up website. Your feedback will help us to improve it."
      />
      <Container>
        <div className="govuk-grid-row">
          <h2 className="govuk-heading-l">Site Map</h2>
          <ol>
            <li>
              <Link href="/">Return to homepage</Link>
            </li>
            <li>
              <Link href="/feedback">Provide feedback on this service</Link>
            </li>
            <li>
              <Link href="/data-service-providers">Organisations providing data services</Link>
            </li>
            <li>
              <Link href="/providers">View data service providers</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Find">View all Find services</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Recruit">View all Recruit services</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Follow-Up">View all Follow-Up services</Link>
            </li>
            <li>
              <Link href="/contact-research-support">Contact research support</Link>
            </li>
            <li>
              <Link href="/research-support">Research support colleagues</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms and conditions</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie policy</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link href="https://www.accessibility-services.co.uk/certificates/national-institute-for-health-and-care-research/">
                Shaw Trust Accessibility Services
              </Link>
            </li>
            <li>
              <Link href="https://www.accessibility-services.co.uk/certificates/national-institute-for-health-and-care-research/">
                Shaw Trust Accessibility Services
              </Link>
            </li>
            <li>
              <Link href="https://www.nihr.ac.uk/">National Institute for Health and Care Research</Link>
            </li>
          </ol>
        </div>
      </Container>
    </>
  )
}

Feedback.getLayout = function getLayout(page: ReactElement, { isPreviewMode, cookieBanner, heading }: FeedbackProps) {
  return (
    <RootLayout isPreviewMode={isPreviewMode} cookieBanner={cookieBanner} heading={heading}>
      {page}
    </RootLayout>
  )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        page: 'Feedback',
        heading: 'Find, Recruit & Follow-up feedback',
        query,
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
