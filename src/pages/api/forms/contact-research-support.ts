import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { contentfulService } from '@/lib/contentful'
import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { getNotificationMessages } from '@/utils/email/contact-research-support/messages.utils'
import { createReferenceNumber } from '@/utils/generic.utils'
import { contactResearchSupportSchema } from '@/utils/schemas/contact-research-support.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Wrong method')
    }

    // Check for automated bot requests
    if (req.body.workEmailAddress) {
      throw new Error(`Bot request caught in honeypot: ${req.body.workEmailAddress}`)
    }

    await contactResearchSupportSchema.parse(req.body)

    delete req.body.workEmailAddress // Clear honeypot before db entry

    const { id } = await prisma.supportRequest.create({ data: { ...req.body } })

    const referenceNumber = createReferenceNumber({ id, prefix: 'R' })
    await prisma.supportRequest.update({
      where: {
        id,
      },
      data: {
        referenceNumber,
      },
    })

    // Send emails
    const contacts = await contentfulService.getEmailContacts()
    const messages = getNotificationMessages({ ...req.body, referenceNumber }, contacts)
    await Promise.all(messages.map(emailService.sendEmail))

    res.redirect(302, `/contact-research-support/confirmation/${referenceNumber}`)
  } catch (error) {
    if (error instanceof ZodError) {
      // Create an object containing the Zod validation errors
      const fieldErrors = Object.fromEntries(
        error.errors.map(({ path: [fieldId], message }) => [`${fieldId}Error`, message])
      )

      // Insert the original values
      Object.keys(contactResearchSupportSchema.shape).forEach((field) => {
        if (req.body[field]) {
          fieldErrors[field] = req.body[field]
        }
      })

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/contact-research-support?${searchParams}`)
    }

    logger.error(error)
    return res.redirect(302, `/contact-research-support?fatal=1`)
  }
}
