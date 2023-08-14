import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { getNotificationMessages } from '@/utils/email/feedback/messages.utils'
import { createReferenceNumber } from '@/utils/generic.utils'
import { feedbackSchema } from '@/utils/schemas/feedback.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Wrong method')
    }

    // Check for automated bot requests
    if (req.body.workEmailAddress) {
      throw new Error(`Bot request caught in honeypot: ${req.body.workEmailAddress}`)
    }

    await feedbackSchema.parse(req.body)

    delete req.body.workEmailAddress // Clear honeypot before db entry

    const { id } = await prisma.feedback.create({ data: { ...req.body } })

    const referenceNumber = createReferenceNumber({ id, prefix: 'F' })
    await prisma.feedback.update({
      where: {
        id,
      },
      data: {
        referenceNumber,
      },
    })

    // Send email
    if (req.body.emailAddress) {
      const messages = getNotificationMessages({ ...req.body, referenceNumber })
      await Promise.all(messages.map(emailService.sendEmail))
    }

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
