import { Entry } from 'contentful'

import { TypeEmailContactSkeleton } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'
import { ContactResearchSupportInputs } from '@/utils/schemas/contact-research-support.schema'

export type MessageData = ContactResearchSupportInputs & { referenceNumber: string }

export const getNotificationMessages = (messageData: MessageData, contacts: Entry<TypeEmailContactSkeleton>[]) => {
  const messages: EmailArgs[] = []

  const supportRequestMessage = {
    subject: `${messageData.referenceNumber} - New enquiry via Find, Recruit and Follow-up`,
    templateName: 'support-request' as const,
  }

  // FRF-70 AC1/AC4
  if (messageData.organisationType === 'nonCommercial' || messageData.lcrn !== 'unknown') {
    const contact = contacts.find((contact) => contact.fields.emailAddress === messageData.lcrn)
    if (contact) {
      const { emailAddress, name, salutation } = contact.fields
      messages.push({
        ...supportRequestMessage,
        to: emailAddress as string,
        templateData: { ...messageData, salutation, regionName: name },
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
        to: emailAddress as string,
        templateData: { ...messageData, salutation, regionName: 'Unknown' },
      })
    }
  }

  // FRF-74
  messages.push({
    to: messageData.emailAddress,
    subject: `${messageData.referenceNumber} - Research Support Enquiry Submitted (Find, Recruit and Follow-up)`,
    templateName: 'request-confirmation',
    templateData: {
      ...messageData,
      salutation: messageData.fullName,
      regionName:
        messageData.lcrn === 'unknown'
          ? 'Unknown'
          : contacts.find((contact) => contact.fields.emailAddress === messageData.lcrn)?.fields.name,
    },
  })

  return messages
}
