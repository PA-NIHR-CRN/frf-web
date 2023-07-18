import * as z from 'zod'

import { TEXTAREA_MAX_CHARACTERS } from '@/constants/forms'

export type FeedbackInputs = z.infer<typeof feedbackSchema>

export const feedbackSchema = z
  .object({
    helpfulness: z.enum(['very-helpful', 'somewhat-helpful', 'neither-helpful-or-unhelpful', 'not-at-all-helpful'], {
      errorMap: () => ({
        message: 'Select the type of enquiry',
      }),
    }),
    suggestions: z
      .string()
      .optional()
      .refine((val) => {
        return (
          val && val.split(' ').length >= TEXTAREA_MAX_CHARACTERS,
          {
            message: `Please provide a summary of the support you need exceeds the maximum of ${TEXTAREA_MAX_CHARACTERS} characters`,
          }
        )
      }),
    fullName: z.string().optional(),
    emailAddress: z.string().optional(),
    organisationName: z.string().optional(),
  })
  .required()
