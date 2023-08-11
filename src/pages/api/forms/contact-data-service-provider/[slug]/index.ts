import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { contentfulService } from '@/lib/contentful'
import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { getNotificationMessages } from '@/utils/email/contact-data-service-provider/messages.utils'
import { createReferenceNumber } from '@/utils/generic.utils'
import { contactDataServiceProviderSchema } from '@/utils/schemas/contact-data-service-provider.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug

  try {
    if (req.method !== 'POST') {
      throw new Error('Wrong method')
    }

    if (!slug) {
      throw new Error('Missing DSP')
    }

    // Check for automated bot requests
    if (req.body.workEmailAddress) {
      throw new Error(`Bot request caught in honeypot: ${req.body.workEmailAddress}`)
    }

    await contactDataServiceProviderSchema.parse(req.body)

    const { id } = await prisma.dataServiceProviderRequest.create({ data: { ...req.body } })

    const referenceNumber = createReferenceNumber({ id, prefix: 'D' })
    await prisma.dataServiceProviderRequest.update({
      where: {
        id,
      },
      data: {
        referenceNumber,
      },
    })

    const entry = await contentfulService.getProviderBySlug(String(slug))

    if (!entry) throw new Error('Failed to fetch provider by slug: null entry')

    const {
      fields: { name: dspName, emailAddress: dspEmail },
    } = entry

    // Send emails
    const messages = getNotificationMessages({ ...req.body, referenceNumber, dspName, dspEmail })
    await Promise.all(messages.map(emailService.sendEmail))

    res.redirect(302, `/contact-data-service-provider/${slug}/confirmation/${referenceNumber}`)
  } catch (error) {
    if (error instanceof ZodError) {
      // Create an object containing the Zod validation errors
      const fieldErrors = Object.fromEntries(
        error.errors.map(({ path: [fieldId], message }) => [`${fieldId}Error`, message])
      )

      // Insert the original values
      Object.keys(contactDataServiceProviderSchema.shape).forEach((field) => {
        if (req.body[field]) {
          fieldErrors[field] = req.body[field]
        }
      })

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/contact-data-service-provider/${slug}?${searchParams}`)
    }
    logger.error(error)

    if (slug) return res.redirect(302, `/contact-data-service-provider/${slug}?fatal=1`)

    return res.redirect(302, `/500`)
  }
}
