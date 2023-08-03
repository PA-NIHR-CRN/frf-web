import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

// import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { ReCaptchaService } from '@/lib/reCaptchaService'
// import { getNotificationMessages } from '@/utils/email/contact-frf-team
import { createReferenceNumber } from '@/utils/generic.utils'
import { contactFrfTeamSchema } from '@/utils/schemas/contact-frf-team.schema'

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

    await contactFrfTeamSchema.parse(req.body)

    delete req.body.reCaptchaToken
    const { id } = await prisma.frfTeamRequest.create({ data: { ...req.body } })

    const referenceNumber = createReferenceNumber({ id, prefix: 'C' })
    await prisma.frfTeamRequest.update({
      where: {
        id,
      },
      data: {
        referenceNumber,
      },
    })

    // Send emails
    // const messages = getNotificationMessages({ ...req.body, referenceNumber, dspName, dspEmail })
    // await Promise.all(messages.map(emailService.sendEmail))

    res.redirect(302, `/contact-frf-team/confirmation/${referenceNumber}`)
  } catch (error) {
    if (error instanceof ZodError) {
      // Create an object containing the Zod validation errors
      const fieldErrors = Object.fromEntries(
        error.errors.map(({ path: [fieldId], message }) => [`${fieldId}Error`, message])
      )

      // Insert the original values
      Object.keys(contactFrfTeamSchema.shape).forEach((field) => {
        if (req.body[field]) {
          fieldErrors[field] = req.body[field]
        }
      })

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/contact-frf-team?${searchParams}`)
    }
    logger.error(error)

    return res.redirect(302, `/contact-frf-team?fatal=1`)
  }
}
