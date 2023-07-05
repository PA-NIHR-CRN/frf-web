import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { contactResearchSupportSchema } from '@/utils/schemas/contact-research-support.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new Error('Wrong method')
  }

  try {
    await contactResearchSupportSchema.parse(req.body)

    console.log('success')

    res.redirect(302, '/contact-research-support/confirmation')
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(
        error.errors.map(({ path: [fieldId], message }) => [`${fieldId}Error`, message])
      )

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/contact-research-support?${searchParams}`)
    }

    return res.redirect(302, `/contact-research-support?fatal=1`)
  }
}
