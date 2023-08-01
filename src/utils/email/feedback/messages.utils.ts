import { EMAIL_FRF_INBOX } from '@/constants'
import { EmailArgs } from '@/lib/email/emailService'
import { FeedbackInputs } from '@/utils/schemas/feedback.schema'

export type MessageData = FeedbackInputs & { referenceNumber: string }

export const getNotificationMessages = (messageData: MessageData) => {
  const messages: EmailArgs[] = []

  messages.push({
    to: EMAIL_FRF_INBOX,
    subject: `${messageData.referenceNumber} FRF - feedback received`,
    templateName: 'feedback',
    templateData: {
      ...messageData,
    },
  })

  return messages
}
