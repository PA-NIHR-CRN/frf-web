import * as aws from 'aws-sdk'

import { EmailService } from '@/lib/email/emailService'
import { EmailServiceV2 } from '@/lib/email/emailServiceV2'

aws.config.update({ region: 'eu-west-1' })

const ses = new aws.SES()

export const emailService = new EmailService(ses)

export const emailServiceV2 = new EmailServiceV2(ses)
