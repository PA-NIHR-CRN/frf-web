import { EMAIL_FRF_INBOX } from '@/constants'
import { EmailArgs } from '@/lib/email/emailService'
import { ContactFrfTeamInputs } from '@/utils/schemas'

export type MessageData = ContactFrfTeamInputs & {
  referenceNumber: string
}

export const getNotificationMessages = (messageData: MessageData) => {
  const messages: EmailArgs[] = []

  const { emailAddress, referenceNumber } = messageData

  messages.push({
    to: EMAIL_FRF_INBOX,
    subject: `${referenceNumber} - New enquiry for FRF central team`,
    templateName: 'contact-frf-team/frf-confirmation',
    templateData: {
      ...messageData,
    },
  })

  messages.push({
    to: emailAddress,
    subject: `${messageData.referenceNumber} - Contact FRF central team enquiry submitted`,
    templateName: 'contact-frf-team/request-confirmation',
    templateData: {
      ...messageData,
    },
  })

  return messages
}
