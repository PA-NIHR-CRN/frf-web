import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Control,
  DeepPartial,
  DefaultValues,
  SubmitHandler,
  useController,
  useForm,
  UseFormSetError,
} from 'react-hook-form'

import { Container } from '@/components/Container/Container'
import { ErrorSummary, Fieldset, Option, Radio, RadioGroup, Select, Textarea, TextInput } from '@/components/Form'
import { MAX_WORDS } from '@/constants/forms'
import { contentfulService } from '@/lib/contentful'
import { getErrorsFromSearchParams, getValuesFromSearchParams, hasErrorsInSearchParams } from '@/utils/form.utils'
import { contactResearchSupportSchema } from '@/utils/schemas/contact-research-support.schema'

function SupportDescriptionTextarea({
  control,
  defaultValue,
}: {
  control: Control<ContactResearchSupportInputs>
  defaultValue: string | undefined
}) {
  const {
    field: { value, ...field },
    formState: { errors },
  } = useController({
    name: 'supportDescription',
    control,
  })

  const numWords = value ? value.split(' ').length : 0

  return (
    <Textarea
      label="Please provide a summary of the support you need"
      errors={errors}
      remainingWords={numWords >= MAX_WORDS ? 0 : MAX_WORDS - numWords}
      defaultValue={defaultValue}
      {...field}
    />
  )
}

type ContactResearchSupportInputs = {
  enquiryType: string
  supportDescription: string
  fullName: string
  emailAddress: string
  jobRole: string
  organisationName: string
  organisationType: string
  lcrn: string
  studyTitle: string
  protocolReference: string
  cpmsId: string
}

export type ContactResearchSupportProps = InferGetServerSidePropsType<typeof getServerSideProps>

function useServerErrorHydration<T extends ContactResearchSupportInputs = ContactResearchSupportInputs>({
  defaultValues,
  setError,
  onComplete,
}: {
  defaultValues: DefaultValues<DeepPartial<T>> | undefined
  setError: UseFormSetError<T>
  onComplete: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Clear the url of any server returned errors
    router.replace({ query: undefined })

    const fields = Object.keys(defaultValues)

    const hasErrors = fields.some((field) => router.query[`${field}Error`])

    if (hasErrors) {
      fields.forEach((field) => {
        if (router.query[`${field}Error`]) {
          setError(`root.${field}`, { message: router.query[`${field}Error`] as string })
        }
      })

      onComplete()
    }
  }, [])
}

export default function ContactResearchSupport({ lcrns, query }: ContactResearchSupportProps) {
  const {
    register,
    handleSubmit,
    formState: { errors: clientErrors, defaultValues },
    control,
    setError,
  } = useForm<ContactResearchSupportInputs>({
    resolver: yupResolver(contactResearchSupportSchema),
    defaultValues: getValuesFromSearchParams(contactResearchSupportSchema, query),
  })

  const onSubmit: SubmitHandler<ContactResearchSupportInputs> = (data) => console.log(data)

  useServerErrorHydration<ContactResearchSupportInputs>({
    defaultValues,
    setError,
    onComplete: () => {
      handleSubmit(onSubmit)()
    },
  })

  const serverErrors = getErrorsFromSearchParams(contactResearchSupportSchema, query)

  const errors = hasErrorsInSearchParams(contactResearchSupportSchema, query) ? serverErrors : clientErrors

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
          <form action="/api/forms/contact-research-support" method="POST" onSubmit={handleSubmit(onSubmit)} noValidate>
            <ErrorSummary errors={errors} />
            <h3 className="govuk-heading-l">About your enquiry</h3>
            <Fieldset>
              <RadioGroup
                label="Is your enquiry about"
                errors={errors}
                defaultValue={defaultValues?.enquiryType}
                {...register('enquiryType', {
                  required: 'Is your enquiry about is required',
                })}
              >
                <Radio value="data" label="Identifying appropriate data services" />
                <Radio value="research" label="General research support" />
              </RadioGroup>
            </Fieldset>
            <Fieldset>
              <SupportDescriptionTextarea control={control} defaultValue={defaultValues?.supportDescription} />
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
                  <Option key={emailAddress} value={emailAddress}>
                    {name}
                  </Option>
                ))}
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
              <button className="govuk-button" data-module="govuk-button">
                Save and continue
              </button>
              <Link className="govuk-link" href="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const lcrnsEntries = await contentfulService.getLcrnsAndDevolvedAdministrations()

  if (!lcrnsEntries) throw new Error('Failed to fetch lcrn content: null entry')

  return {
    props: {
      lcrns: lcrnsEntries.map((entry) => entry.fields),
      query,
    },
  }
}
