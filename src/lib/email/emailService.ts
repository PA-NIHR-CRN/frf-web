import { SES } from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'

import { EMAIL_CHARSET, EMAIL_FRF_INBOX } from '@/constants'

handlebars.registerHelper('eq', (a, b) => a == b)

export type EmailArgs = {
  to: string[]
  subject: string
  bodyHtml: string
  bodyText: string
  templateData: Record<string, unknown>
}

export class EmailService {
  constructor(private sesClient: SES) {}

  sendEmail = async ({ templateData: { signatureText, ...data }, bodyHtml, bodyText, to, subject }: EmailArgs) => {
    handlebars.registerPartial('bodyHtml', handlebars.compile(bodyHtml)(data))
    handlebars.registerPartial('bodyText', handlebars.compile(bodyText)(data))
    handlebars.registerPartial('signatureText', handlebars.compile(signatureText)(data))

    const htmlSource = fs.readFileSync(path.resolve(process.cwd(), `src/templates/emails/email-template.html.hbs`), {
      encoding: EMAIL_CHARSET,
    })

    const textSource = fs.readFileSync(path.resolve(process.cwd(), `src/templates/emails/email-template.text.hbs`), {
      encoding: EMAIL_CHARSET,
    })

    const htmlBody = handlebars.compile(htmlSource)(data)
    const textBody = handlebars.compile(textSource)(data)

    const message: SES.Types.SendEmailRequest = {
      Source: `"Find, Recruit & Follow-Up" <${EMAIL_FRF_INBOX}>`,
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Subject: {
          Data: subject,
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
