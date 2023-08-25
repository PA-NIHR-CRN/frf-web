import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Entry } from 'contentful'

import { TypeEmailContactSkeleton, TypeEmailTemplateContactResearchSupport } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'
import { ContactResearchSupportInputs } from '@/utils/schemas/contact-research-support.schema'

export type MessageData = ContactResearchSupportInputs & { referenceNumber: string }

export const getNotificationMessages = (
  messageData: MessageData,
  contacts: Entry<TypeEmailContactSkeleton>[],
  contentType: TypeEmailTemplateContactResearchSupport<undefined, ''>['fields']
) => {
  const messages: EmailArgs[] = []

  const { referenceNumber } = messageData
  const { senderSubject, senderBody, teamSubject, teamBody, signature, signatureLogo } = contentType

  const templateData = {
    ...messageData,
    signatureText: documentToHtmlString(signature),
    signatureLogo,
  }

  const supportRequestMessage = {
    subject: teamSubject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(teamBody).replaceAll('&#39;', "'"),
    bodyText: documentToPlainTextString(teamBody).replaceAll('&#39;', "'"),
  } as const

  // FRF-70 AC1/AC4
  if (messageData.organisationType === 'nonCommercial' || messageData.lcrn !== 'unknown') {
    const contact = contacts.find(
      (contact) =>
        Array.isArray(contact.fields.emailAddress) &&
        contact.fields.emailAddress.includes(messageData.lcrn) &&
        contact.fields.type === 'LCRN - DA'
    )
    if (contact) {
      const { emailAddress, name, salutation } = contact.fields
      messages.push({
        ...supportRequestMessage,
        to: emailAddress as string[],
        templateData: { ...templateData, salutation, regionName: name },
      })
    }
  }

  // FRF-70 AC2/AC3
  if (messageData.organisationType === 'commercial' && messageData.lcrn === 'unknown') {
    const contactType = messageData.enquiryType === 'research' ? 'BDM' : 'FRF'
    const contact = contacts.find((contact) => contact.fields.type === contactType)
    if (contact) {
      const { emailAddress, salutation } = contact.fields
      messages.push({
        ...supportRequestMessage,
        to: emailAddress as string[],
        templateData: { ...templateData, salutation, regionName: 'Unknown' },
      })
    }
  }

  // FRF-74
  messages.push({
    to: [messageData.emailAddress],
    subject: senderSubject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(senderBody).replaceAll('&#39;', "'"),
    bodyText: documentToPlainTextString(senderBody).replaceAll('&#39;', "'"),
    templateData: {
      ...templateData,
      salutation: messageData.fullName,
      regionName:
        messageData.lcrn === 'unknown'
          ? 'Unknown'
          : contacts.find(
              (contact) =>
                Array.isArray(contact.fields.emailAddress) &&
                contact.fields.emailAddress.includes(messageData.lcrn) &&
                contact.fields.type === 'LCRN - DA'
            )?.fields.name,
    },
  })

  return messages
}
