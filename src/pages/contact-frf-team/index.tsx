import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import { ReactElement, useCallback } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { ErrorSummary, Fieldset, Form, HoneyPot, Textarea, TextInput } from '@/components/Form'
import { RootLayout } from '@/components/Layout/RootLayout'
import { TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'
import { useFormErrorHydration } from '@/hooks/useFormErrorHydration'
import { logger } from '@/lib/logger'
import { getValuesFromSearchParams } from '@/utils/form.utils'
import { getCookieBanner } from '@/utils/getCookieBanner'
import { ContactFrfTeamInputs, contactFrfTeamSchema } from '@/utils/schemas/contact-frf-team.schema'

export type ContactFrfTeamProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactFrfTeam({ query }: ContactFrfTeamProps) {
  const { register, formState, setError, watch, handleSubmit } = useForm<ContactFrfTeamInputs>({
    resolver: zodResolver(contactFrfTeamSchema),
    defaultValues: getValuesFromSearchParams(contactFrfTeamSchema, query),
  })

  const handleFoundError = useCallback(
    (field: keyof ContactFrfTeamInputs, error: FieldError) => setError(field, error),
    [setError]
  )

  const { errors } = useFormErrorHydration<ContactFrfTeamInputs>({
    schema: contactFrfTeamSchema,
    formState,
    onFoundError: handleFoundError,
  })

  // Watch & update the character count for the "Study description" textarea
  const details = watch('details')
  const remainingCharacters = details.length >= TEXTAREA_MAX_CHARACTERS ? 0 : TEXTAREA_MAX_CHARACTERS - details.length

  const { defaultValues } = formState

  return (
    <>
      <NextSeo title={`Contact Find, Recruit and Follow-up specialist team - Find, Recruit and Follow-up`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Contact Find, Recruit and Follow-up central team</h2>
            <p>
              The Find, Recruit and Follow-up central team manage the content of this website and can be contacted in
              relation to general enquiries about Find, Recruit and Follow-up advisory support.
            </p>
            <p>
              If you would like to get in touch with the team, please complete the form below and a member of the team
              will respond to your enquiry.
            </p>
            <p>All fields are required unless marked as optional.</p>
            <Form
              method="post"
              action={`/api/forms/contact-frf-team`}
              handleSubmit={handleSubmit}
              onError={(message: string) =>
                setError('root.serverError', {
                  type: '400',
                  message,
                })
              }
            >
              <ErrorSummary errors={errors} />
              <HoneyPot {...register('workEmailAddress')} />
              <Fieldset>
                <TextInput
                  label="Full name"
                  errors={errors}
                  defaultValue={defaultValues?.fullName}
                  {...register('fullName')}
                />
                <TextInput
                  label="Email address"
                  errors={errors}
                  defaultValue={defaultValues?.emailAddress}
                  {...register('emailAddress')}
                />
                <TextInput
                  required={false}
                  label="Telephone (optional)"
                  hint="For international numbers please include the country code"
                  errors={errors}
                  defaultValue={defaultValues?.phoneNumber}
                  autocomplete="tel"
                  {...register('phoneNumber')}
                />
                <TextInput
                  label="Job role"
                  errors={errors}
                  defaultValue={defaultValues?.jobRole}
                  {...register('jobRole')}
                />
                <TextInput
                  label="Organisation name"
                  errors={errors}
                  defaultValue={defaultValues?.organisationName}
                  {...register('organisationName')}
                />
                <Textarea
                  label="Please provide details of your enquiry"
                  errors={errors}
                  remainingCharacters={remainingCharacters}
                  defaultValue={defaultValues?.details}
                  {...register('details')}
                />
              </Fieldset>

              <p>We will email you a copy of this form for your records</p>

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

ContactFrfTeam.getLayout = function getLayout(
  page: ReactElement,
  { isPreviewMode, cookieBanner }: ContactFrfTeamProps
) {
  return (
    <RootLayout isPreviewMode={isPreviewMode} cookieBanner={cookieBanner}>
      {page}
    </RootLayout>
  )
}

export const getServerSideProps = async ({ query, req }: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        page: `Contact Find, Recruit and Follow-up specialist team`,
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
