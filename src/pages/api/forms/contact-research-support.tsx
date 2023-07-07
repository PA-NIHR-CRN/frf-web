import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { ReCaptchaService } from '@/lib/reCaptchaService'
import { contactResearchSupportSchema } from '@/utils/schemas/contact-research-support.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new Error('Wrong method')
  }

  try {
    if (!req.body.token) {
      throw new Error('Missing reCaptcha token')
    }

    const reCaptcha = new ReCaptchaService({
      projectId: process.env.RECAPTCHA_PROJECT_ID,
      apiKey: process.env.RECAPTCHA_API_KEY,
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    })

    const { valid } = await reCaptcha.validateToken(req.body.token)

    if (!valid) {
      throw new Error('Invalid reCaptcha token')
    }

    await contactResearchSupportSchema.parse(req.body)

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
