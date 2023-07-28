import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { NextSeo } from 'next-seo'
import { ReactElement, useCallback } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { ErrorSummary, Fieldset, Form, Textarea, TextInput } from '@/components/Form'
import { RootLayout } from '@/components/Layout/RootLayout'
import { TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'
import { useFormErrorHydration } from '@/hooks/useFormErrorHydration'
import { logger } from '@/lib/logger'
import { getValuesFromSearchParams } from '@/utils/form.utils'
import {
  ContactDataServiceProviderInputs,
  contactDataServiceProviderSchema,
} from '@/utils/schemas/contact-data-service-provider.schema'

export type ContactDataServiceProviderProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactDataServiceProvider({ name, query }: ContactDataServiceProviderProps) {
  const { register, formState, setError, watch, handleSubmit } = useForm<ContactDataServiceProviderInputs>({
    resolver: zodResolver(contactDataServiceProviderSchema),
    defaultValues: getValuesFromSearchParams(contactDataServiceProviderSchema, query),
  })

  const handleFoundError = useCallback(
    (field: keyof ContactDataServiceProviderInputs, error: FieldError) => setError(field, error),
    [setError]
  )

  const { errors } = useFormErrorHydration<ContactDataServiceProviderInputs>({
    schema: contactDataServiceProviderSchema,
    formState,
    onFoundError: handleFoundError,
  })

  // Watch & update the character count for the "Study description" textarea
  const supportDescription = watch('studyDescription')
  const remainingCharacters =
    supportDescription.length >= TEXTAREA_MAX_CHARACTERS ? 0 : TEXTAREA_MAX_CHARACTERS - supportDescription.length

  const { defaultValues } = formState

  return (
    <>
      <NextSeo title={`Contact research support - Find, Recruit and Follow-up`} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds-from-desktop">
            <h2 className="govuk-heading-l">Get in touch with {name}</h2>
            <p>
              Upon submitting this form, your contact details will be shared with {name} so they can contact you to
              discuss further.
            </p>
            <Form
              method="post"
              action={`/api/forms/contact-data-service-provider/${name}`}
              handleSubmit={handleSubmit}
              onError={(message: string) =>
                setError('root.serverError', {
                  type: '400',
                  message,
                })
              }
            >
              <ErrorSummary errors={errors} />

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
                  label="Please outline which services you are interested in and, if applicable, a brief description of your research"
                  errors={errors}
                  remainingCharacters={remainingCharacters}
                  defaultValue={defaultValues?.studyDescription}
                  {...register('studyDescription')}
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

ContactDataServiceProvider.getLayout = function getLayout(
  page: ReactElement,
  { isPreviewMode }: ContactDataServiceProviderProps
) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} useEnterprise>
      <RootLayout isPreviewMode={isPreviewMode}>{page}</RootLayout>
    </ReCaptchaProvider>
  )
}

export const getServerSideProps = ({ query }: GetServerSidePropsContext) => {
  try {
    const name = query.name

    return {
      props: {
        page: `Get in touch with ${name}`,
        name,
        query,
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
