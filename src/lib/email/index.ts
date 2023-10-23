import * as aws from 'aws-sdk'

import { EmailService } from '@/lib/email/emailService'

aws.config.update({ region: 'eu-west-2' })

const ses = new aws.SES()

export const emailService = new EmailService(ses)
