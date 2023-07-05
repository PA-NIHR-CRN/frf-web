import * as z from 'zod'

import { MAX_WORDS } from '@/constants/forms'

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
      .refine((val) => val.split(' ').length <= MAX_WORDS, {
        message: `Please provide a summary of the support you need exceeds the maximum of ${MAX_WORDS} words`,
      }),
    fullName: z.string().min(1, { message: 'Full name is required' }),
    emailAddress: z
      .string()
      .email('Email address must be a valid email')
      .min(1, { message: 'Email address is required' }),
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
