import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { contentfulService } from '@/lib/contentful'
import { emailServiceV2 as emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { getNotificationMessages } from '@/utils/email/contact-frf-team/messages.utils'
import { createReferenceNumber } from '@/utils/generic.utils'
import { contactFrfTeamSchema } from '@/utils/schemas/contact-frf-team.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Wrong method')
    }

    // Check for automated bot requests
    if (req.body.workEmailAddress) {
      throw new Error(`Bot request caught in honeypot: ${req.body.workEmailAddress}`)
    }

    await contactFrfTeamSchema.parse(req.body)

    delete req.body.workEmailAddress // Clear honeypot before db entry

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
    if (req.body.emailAddress) {
      const emailTemplate = await contentfulService.getEmailTemplateByType('emailTemplateContactFrfCentralTeam')

      if (emailTemplate) {
        const messages = getNotificationMessages({ ...req.body, referenceNumber }, emailTemplate.fields)
        await Promise.all(messages.map(emailService.sendEmail))
      }
    }

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
