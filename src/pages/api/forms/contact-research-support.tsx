import type { NextApiRequest, NextApiResponse } from 'next'
import { ValidationError } from 'yup'

import { contactResearchSupportSchema } from '@/utils/schemas/contact-research-support.schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.error(`Unsupported request method ${req.method}`)
    return res.status(405)
  }

  try {
    await contactResearchSupportSchema.validate(req.body, { abortEarly: false })

    res.redirect(302, '/contact-research-support/confirmation')
  } catch (error) {
    if (error instanceof ValidationError) {
      const validationErrors = error.inner

      const fieldErrors = Object.keys(contactResearchSupportSchema.fields).reduce<Record<string, string>>(
        (acc, key) => {
          const foundError = validationErrors.filter((error) => error.path === key)

          if (foundError.length) {
            acc[`${key}Error`] = foundError[0]?.message
          }

          if (req.body[key]) {
            acc[key] = req.body[key]
          }

          return acc
        },
        {}
      )

      const searchParams = new URLSearchParams(fieldErrors)

      return res.redirect(302, `/contact-research-support?${searchParams}`)
    }

    return res.redirect(302, `/contact-research-support?error=fatal`)
  }
}
