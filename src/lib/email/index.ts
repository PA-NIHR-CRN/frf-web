import { strict as assert } from 'assert'
import * as aws from 'aws-sdk'

import { EmailService } from '@/lib/email/emailService'

const { SES_ACCESS_KEY_ID, SES_SECRET_KEY } = process.env

assert(SES_ACCESS_KEY_ID)
assert(SES_SECRET_KEY)

aws.config.update({
  accessKeyId: SES_ACCESS_KEY_ID,
  secretAccessKey: SES_SECRET_KEY,
  region: 'eu-west-2',
})

const ses = new aws.SES()

export const emailService = new EmailService(ses)
