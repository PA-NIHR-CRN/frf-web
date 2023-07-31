import { EMAIL_FRF_INBOX } from '@/constants'
import { EmailArgs } from '@/lib/email/emailService'
import { ContactDataServiceProviderInputs } from '@/utils/schemas/contact-data-service-provider.schema'

export type MessageData = ContactDataServiceProviderInputs & { dspName: string; referenceNumber: string }

export const getNotificationMessages = (messageData: MessageData) => {
  const messages: EmailArgs[] = []

  const { emailAddress, dspName, referenceNumber } = messageData

  messages.push({
    to: EMAIL_FRF_INBOX,
    subject: `${referenceNumber} - New enquiry via Find, Recruit & Follow-up`,
    templateName: 'data-service-provider/dsp-confirmation',
    templateData: {
      ...messageData,
    },
  })

  messages.push({
    to: emailAddress,
    subject: `${messageData.referenceNumber} - Your enquiry has been sent to ${dspName} (Find, Recruit & Follow-up)`,
    templateName: 'data-service-provider/researcher-confirmation',
    templateData: {
      ...messageData,
    },
  })

  return messages
}
