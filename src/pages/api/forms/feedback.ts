import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

// import { contentfulService } from '@/lib/contentful'
// import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
// import { prisma } from '@/lib/prisma'
import { ReCaptchaService } from '@/lib/reCaptchaService'
// import { createReferenceNumber, getNotificationMessages } from '@/utils'
import { feedbackSchema } from '@/utils/schemas/feedback.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Wrong method')
    }

    // reCaptcha token generation can only happen in the form onSubmit event due to a 2 minute TTL
    // The parameter must be optional so that non-js submissions can still be sent
    if (req.body.reCaptchaToken) {
      const reCaptcha = new ReCaptchaService({
        projectId: process.env.RECAPTCHA_PROJECT_ID,
        apiKey: process.env.RECAPTCHA_API_KEY,
        siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      })

      const { valid } = await reCaptcha.validateToken(req.body.reCaptchaToken)

      if (!valid) {
        throw new Error('Invalid reCaptcha token')
      }
    }

    // const referenceNumber = createReferenceNumber()

    await feedbackSchema.parse(req.body)

    // delete req.body.reCaptchaToken
    // await prisma.supportRequest.create({ data: { ...req.body, referenceNumber } })

    // Send emails
    // const contacts = await contentfulService.getEmailContacts()
    // const messages = getNotificationMessages({ ...req.body, referenceNumber }, contacts)
    // await Promise.all(messages.map(emailService.sendEmail))

    res.redirect(302, `/feedback/confirmation`)
  } catch (error) {
    if (error instanceof ZodError) {
      // Create an object containing the Zod validation errors
      const fieldErrors = Object.fromEntries(
        error.errors.map(({ path: [fieldId], message }) => [`${fieldId}Error`, message])
      )

      // Insert the original values
      Object.keys(feedbackSchema.shape).forEach((field) => {
        if (req.body[field]) {
          fieldErrors[field] = req.body[field]
        }
      })

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/feedback?${searchParams}`)
    }

    logger.error(error)
    return res.redirect(302, `/feedback?fatal=1`)
  }
}
