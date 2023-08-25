import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import { TypeEmailTemplateContactDataServiceProvider } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'
import { ContactDataServiceProviderInputs } from '@/utils/schemas/contact-data-service-provider.schema'

export type MessageData = ContactDataServiceProviderInputs & {
  dspName: string
  dspEmail: string[]
  referenceNumber: string
}

export const getNotificationMessages = (
  messageData: MessageData,
  contentType: TypeEmailTemplateContactDataServiceProvider<undefined, ''>['fields']
) => {
  const messages: EmailArgs[] = []

  const { emailAddress, dspName, dspEmail, referenceNumber } = messageData
  const { senderSubject, senderBody, teamSubject, teamBody, signature, signatureLogo } = contentType

  const templateData = {
    ...messageData,
    signatureText: documentToHtmlString(signature),
    signatureLogo,
  }

  messages.push({
    to: dspEmail,
    subject: teamSubject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(teamBody),
    bodyText: documentToPlainTextString(teamBody),
    templateData,
  })

  messages.push({
    to: [emailAddress],
    subject: senderSubject.replace('{{referenceNumber}}', referenceNumber).replace('{{dspName}}', dspName),
    bodyHtml: documentToHtmlString(senderBody),
    bodyText: documentToPlainTextString(senderBody),
    templateData,
  })

  return messages
}
