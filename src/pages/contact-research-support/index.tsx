import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { ErrorSummary, Fieldset, Form, Option, Radio, RadioGroup, Select, Textarea, TextInput } from '@/components/Form'
import { RootLayout } from '@/components/Layout/RootLayout'
import { TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'
import { useFormErrorHydration } from '@/hooks/useFormErrorHydration'
import { contentfulService } from '@/lib/contentful'
import { getValuesFromSearchParams } from '@/utils/form.utils'
import {
  ContactResearchSupportInputs,
  contactResearchSupportSchema,
} from '@/utils/schemas/contact-research-support.schema'

export type ContactResearchSupportProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ContactResearchSupport({ lcrns, query }: ContactResearchSupportProps) {
  const { register, formState, setError, watch, handleSubmit } = useForm<ContactResearchSupportInputs>({
    resolver: zodResolver(contactResearchSupportSchema),
    defaultValues: getValuesFromSearchParams(contactResearchSupportSchema, query),
  })

  const handleFoundError = useCallback(
    (field: keyof ContactResearchSupportInputs, error: FieldError) => setError(field, error),
    [setError]
  )

  const { errors } = useFormErrorHydration<ContactResearchSupportInputs>({
    formState,
    onFoundError: handleFoundError,
  })

  // Watch & update the character count for the "Support summary" textarea
  const supportDescription = watch('supportDescription')
  const remainingCharacters =
    supportDescription.length >= TEXTAREA_MAX_CHARACTERS ? 0 : TEXTAREA_MAX_CHARACTERS - supportDescription.length

  // Show the "Unknown" select option when org type is commercial
  // Default to true to ensure non-js users can always access the option regardless of selected org type
  const organisationType = watch('organisationType')
  const [unknownOptionVisible, setUnknownOptionVisible] = useState(true)
  useEffect(() => setUnknownOptionVisible(organisationType === 'commercial'), [organisationType])

  const { defaultValues } = formState

  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-l">Contact research support</h2>
          <p>
            The UK offers multiple services and teams of professionals who can support you with identifying appropriate
            data services or wider support with planning and delivering your study in the UK.
          </p>
          <p>
            If you would like to access this support please complete the form below and a professional from the relevant
            research support infrastructure will get in touch to respond to your request
          </p>
          <Form
            method="post"
            action="/api/forms/contact-research-support"
            handleSubmit={handleSubmit}
            onError={(message: string) =>
              setError('root.serverError', {
                type: '400',
                message,
              })
            }
          >
            <ErrorSummary errors={errors} />
            <h3 className="govuk-heading-l">About your enquiry</h3>
            <Fieldset>
              <RadioGroup
                label="Is your enquiry about"
                errors={errors}
                defaultValue={defaultValues?.enquiryType}
                {...register('enquiryType')}
              >
                <Radio value="data" label="Identifying appropriate data services" />
                <Radio value="research" label="General enquiry about research support" />
              </RadioGroup>
            </Fieldset>
            <Fieldset>
              <Textarea
                label="Please provide a summary of the support you need"
                errors={errors}
                remainingCharacters={remainingCharacters}
                defaultValue={defaultValues?.supportDescription}
                {...register('supportDescription')}
              />
            </Fieldset>
            <Fieldset legend="About you">
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
                label="Phone number"
                hint="For international numbers please include the country code"
                errors={errors}
                defaultValue={defaultValues?.phoneNumber}
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

              <RadioGroup
                label="Is your organisation"
                errors={errors}
                defaultValue={defaultValues?.organisationType}
                {...register('organisationType')}
              >
                <Radio value="commercial" label="Commercial" />
                <Radio value="nonCommercial" label="Non-commercial" />
              </RadioGroup>
            </Fieldset>

            <Fieldset legend="About your research">
              <Select
                {...register('lcrn')}
                label="Which region will take a lead in supporting your research?"
                name="lcrn"
                hint={
                  <>
                    <p>
                      This is the region within which the Chief Investigator or Clinical Trials Unit (CTU) is based (or
                      for Commercial Studies the lead region selected by the Sponsor).
                    </p>
                    <p>
                      If you are unsure which region to select, please visit{' '}
                      <a href="#">Local Clinical Research Networks</a> or email supportmystudy@nihr.ac.uk
                    </p>
                  </>
                }
                errors={errors}
                defaultValue={defaultValues?.lcrn}
              >
                <Option value="" disabled>
                  -
                </Option>
                {lcrns.map(({ name, emailAddress }) => (
                  <Option key={name} value={emailAddress}>
                    {name}
                  </Option>
                ))}
                {unknownOptionVisible && <Option value="unknown">Unknown</Option>}
              </Select>

              <TextInput
                label="Study title (optional)"
                errors={errors}
                defaultValue={defaultValues?.studyTitle}
                {...register('studyTitle')}
              />
              <TextInput
                label="Protocol reference (optional)"
                errors={errors}
                defaultValue={defaultValues?.protocolReference}
                {...register('protocolReference')}
              />
              <TextInput
                label="CPMS ID (optional)"
                hint="A unique study identifier given to all eligible studies recorded on the NIHR CRN Central Portfolio Management
          System (CPMS) database."
                errors={errors}
                defaultValue={defaultValues?.cpmsId}
                {...register('cpmsId')}
              />
            </Fieldset>

            <p>We will email you a copy of this form for your records</p>

            <div className="govuk-button-group">
              <button
                data-module="govuk-button"
                className={clsx('govuk-button', { 'pointer-events-none': formState.isLoading })}
              >
                Save and continue
              </button>
              <Link className="govuk-link" href="/">
                Cancel
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}

ContactResearchSupport.getLayout = function getLayout(
  page: ReactElement,
  { isPreviewMode }: ContactResearchSupportProps
) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} useEnterprise>
      <RootLayout isPreviewMode={isPreviewMode}>{page}</RootLayout>
    </ReCaptchaProvider>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  try {
    const lcrnsEntries = await contentfulService.getLcrnsAndDevolvedAdministrations()

    if (!lcrnsEntries) throw new Error('Failed to fetch lcrn content: null entry')

    return {
      props: {
        lcrns: lcrnsEntries.map((entry) => entry.fields),
        query,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
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
