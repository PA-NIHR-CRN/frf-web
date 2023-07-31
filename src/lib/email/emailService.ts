import { SES } from 'aws-sdk'
import * as fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'

import { EMAIL_CHARSET, EMAIL_FRF_INBOX } from '@/constants'

handlebars.registerHelper('eq', (a, b) => a == b)

export type EmailArgs = {
  to: string
  subject: string
  templateName:
    | 'support-request'
    | 'request-confirmation'
    | 'feedback'
    | 'data-service-provider/dsp-confirmation'
    | 'data-service-provider/researcher-confirmation'
  templateData: Record<string, unknown>
}

export class EmailService {
  constructor(private sesClient: SES) {}

  sendEmail = async (data: EmailArgs) => {
    const htmlSource = fs.readFileSync(
      path.resolve(process.cwd(), `src/templates/emails/${data.templateName}.html.hbs`),
      {
        encoding: EMAIL_CHARSET,
      }
    )
    const textSource = fs.readFileSync(
      path.resolve(process.cwd(), `src/templates/emails/${data.templateName}.text.hbs`),
      {
        encoding: EMAIL_CHARSET,
      }
    )
    const htmlBody = handlebars.compile(htmlSource)(data.templateData)
    const textBody = handlebars.compile(textSource)(data.templateData)

    const message: SES.Types.SendEmailRequest = {
      Source: `"Find, Recruit & Follow-Up" <${EMAIL_FRF_INBOX}>`,
      Destination: {
        ToAddresses: [data.to],
      },
      Message: {
        Subject: {
          Data: data.subject,
          Charset: EMAIL_CHARSET,
        },
        Body: {
          Text: {
            Data: textBody,
            Charset: EMAIL_CHARSET,
          },
          Html: {
            Data: htmlBody,
            Charset: EMAIL_CHARSET,
          },
        },
      },
    }

    await this.sesClient.sendEmail(message).promise()
  }
}
