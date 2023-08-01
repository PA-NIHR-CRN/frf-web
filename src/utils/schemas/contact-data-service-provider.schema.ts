import * as z from 'zod'

import { PHONE_NUMBER_REGEX, TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'

export type ContactDataServiceProviderInputs = z.infer<typeof contactDataServiceProviderSchema>

export const contactDataServiceProviderSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Enter a full name' }),
    emailAddress: z.string().email('Enter a valid email address').min(1, { message: 'Enter an email address' }),
    phoneNumber: z
      .string()
      .regex(PHONE_NUMBER_REGEX, {
        message: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192',
      })
      .optional()
      .or(z.literal('')),
    jobRole: z.string().min(1, { message: 'Enter a job role' }),
    organisationName: z.string().min(1, { message: 'Enter an organisation name' }),
    studyDescription: z
      .string()
      .min(1, { message: 'Enter a description of your study/studies and services of interest' })
      .refine((val) => val.split(' ').length <= TEXTAREA_MAX_CHARACTERS, {
        message: `Description of your study/studies and services of interest exceeds the maximum of ${TEXTAREA_MAX_CHARACTERS} characters`,
      }),
  })
  .required()
