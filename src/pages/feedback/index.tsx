import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import { ReactElement, useCallback } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { ErrorSummary, Fieldset, Form, HoneyPot, Radio, RadioGroup, Textarea, TextInput } from '@/components/Form'
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
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Let us know what you think</h2>
            <p>The Find, Recruit and Follow-Up (FRF) website is new and we would appreciate your feedback.</p>
            <p>All fields are required unless marked as optional.</p>
            <Form
              method="post"
              action="/api/forms/feedback"
              handleSubmit={handleSubmit}
              onError={(message: string) =>
                setError('root.serverError', {
                  type: '400',
                  message,
                })
              }
            >
              <ErrorSummary errors={errors} />
              <HoneyPot {...register('caseReferenceNumber')} />
              <div>
                <RadioGroup
                  label="How helpful was the Find, Recruit and Follow-up (FRF) website?"
                  errors={errors}
                  defaultValue={defaultValues?.helpfulness}
                  {...register('helpfulness')}
                >
                  <Radio value="very-helpful" label="Very helpful" />
                  <Radio value="somewhat-helpful" label="Somewhat helpful" />
                  <Radio value="neither-helpful-or-unhelpful" label="Neither helpful or unhelpful" />
                  <Radio value="not-at-all-helpful" label="Not at all helpful" />
                </RadioGroup>
                <Textarea
                  required={false}
                  label="Please provide us with any other feedback on your experience of our website or suggestions for improvement. (optional)"
                  errors={errors}
                  remainingCharacters={remainingCharacters}
                  defaultValue={defaultValues?.suggestions}
                  {...register('suggestions')}
                />
              </div>

              <Fieldset
                className="govuk-!-margin-top-7"
                legend="We may wish to contact you to follow up on your feedback. If you are happy for us to do so please provide your contact details."
                legendSize="s"
              >
                <TextInput
                  required={false}
                  label="Full name (optional)"
                  errors={errors}
                  defaultValue={defaultValues?.fullName}
                  className="govuk-!-margin-top-4"
                  {...register('fullName')}
                />
                <TextInput
                  required={false}
                  label="Email address (optional)"
                  errors={errors}
                  defaultValue={defaultValues?.emailAddress}
                  {...register('emailAddress')}
                />
                <TextInput
                  required={false}
                  label="Organisation name (optional)"
                  errors={errors}
                  defaultValue={defaultValues?.organisationName}
                  {...register('organisationName')}
                />
              </Fieldset>

              <div className="govuk-button-group">
                <button
                  data-module="govuk-button"
                  className={clsx('govuk-button', { 'pointer-events-none': formState.isLoading })}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
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
