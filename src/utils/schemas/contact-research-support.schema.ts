import * as z from 'zod'

import { PHONE_NUMBER_REGEX, TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'

export type ContactResearchSupportInputs = z.infer<typeof contactResearchSupportSchema>

export const contactResearchSupportSchema = z
  .object({
    enquiryType: z.enum(['data', 'research'], {
      errorMap: () => ({
        message: 'Is your enquiry about is required',
      }),
    }),
    supportDescription: z
      .string()
      .min(1, { message: 'Please provide a summary of the support you need is required' })
      .refine((val) => val.split(' ').length <= TEXTAREA_MAX_CHARACTERS, {
        message: `Please provide a summary of the support you need exceeds the maximum of ${TEXTAREA_MAX_CHARACTERS} characters`,
      }),
    fullName: z.string().min(1, { message: 'Full name is required' }),
    emailAddress: z
      .string()
      .email('Email address must be a valid email')
      .min(1, { message: 'Email address is required' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(PHONE_NUMBER_REGEX, { message: 'Phone number is not a recognised format' }),
    jobRole: z.string().min(1, { message: 'Job role is required' }),
    organisationName: z.string().min(1, { message: 'Organisation name is required' }),
    organisationType: z.enum(['commercial', 'nonCommercial'], {
      errorMap: () => ({ message: 'Is your enquiry about is required' }),
    }),
    lcrn: z.string().min(1, { message: 'Which region will take a lead in supporting your research is required' }),
    studyTitle: z.string().optional(),
    protocolReference: z.string().optional(),
    cpmsId: z.string().optional(),
  })
  .required()
