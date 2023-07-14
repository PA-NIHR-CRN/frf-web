import * as z from 'zod'

import { PHONE_NUMBER_REGEX, TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'

export type ContactResearchSupportInputs = z.infer<typeof contactResearchSupportSchema>

export const contactResearchSupportSchema = z
  .object({
    enquiryType: z.enum(['data', 'research'], {
      errorMap: () => ({
        message: 'Select the type of enquiry',
      }),
    }),
    supportDescription: z
      .string()
      .min(1, { message: 'Enter a summary of the support you need' })
      .refine((val) => val.split(' ').length <= TEXTAREA_MAX_CHARACTERS, {
        message: `Please provide a summary of the support you need exceeds the maximum of ${TEXTAREA_MAX_CHARACTERS} characters`,
      }),
    fullName: z.string().min(1, { message: 'Enter a full name' }),
    emailAddress: z.string().email('Enter a valid email address').min(1, { message: 'Enter an email address' }),
    phoneNumber: z
      .string()
      .min(1, { message: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192' })
      .regex(PHONE_NUMBER_REGEX, { message: 'Telephone is not a recognised format' }),
    jobRole: z.string().min(1, { message: 'Enter a job role' }),
    organisationName: z.string().min(1, { message: 'Enter an organisation name' }),
    organisationType: z.enum(['commercial', 'nonCommercial'], {
      errorMap: () => ({ message: 'Select the type of organisation' }),
    }),
    lcrn: z.string().min(1, { message: 'Select a lead region' }),
    studyTitle: z.string().optional(),
    protocolReference: z.string().optional(),
    cpmsId: z.string().optional(),
  })
  .required()
