import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import { TypeEmailTemplateContactFrfCentralTeam } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailServiceV2'
import { ContactFrfTeamInputs } from '@/utils/schemas'

export type MessageData = ContactFrfTeamInputs & {
  referenceNumber: string
}

export const getNotificationMessages = (
  messageData: MessageData,
  contentType: TypeEmailTemplateContactFrfCentralTeam<undefined, ''>['fields']
) => {
  const messages: EmailArgs[] = []

  const { emailAddress, referenceNumber } = messageData
  const { recipients, senderSubject, senderBody, teamSubject, teamBody, signature, signatureLogo } = contentType

  const templateData = {
    ...messageData,
    signatureText: documentToHtmlString(signature),
    signatureLogo,
  }

  messages.push({
    to: recipients,
    subject: teamSubject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(teamBody),
    bodyText: documentToPlainTextString(teamBody),
    templateData,
  })

  messages.push({
    to: [emailAddress],
    subject: senderSubject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(senderBody),
    bodyText: documentToPlainTextString(senderBody),
    templateData,
  })

  return messages
}
