import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'

import { contentfulService } from '@/lib/contentful'
import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { ReCaptchaService } from '@/lib/reCaptchaService'
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

    await contactDataServiceProviderSchema.parse(req.body)

    delete req.body.reCaptchaToken
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
      fields: { name: dspName },
    } = entry

    // Send emails
    const messages = getNotificationMessages({ ...req.body, referenceNumber, dspName })
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
