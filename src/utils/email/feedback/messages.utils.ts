import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import { TypeEmailTemplateFeedback } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailServiceV2'
import { FeedbackInputs } from '@/utils/schemas/feedback.schema'

export type MessageData = FeedbackInputs & { referenceNumber: string }

export const getNotificationMessages = (
  messageData: MessageData,
  contentType: TypeEmailTemplateFeedback<undefined, ''>['fields']
) => {
  const messages: EmailArgs[] = []

  const { referenceNumber } = messageData
  const { recipients, subject, body, signature, signatureLogo } = contentType

  messages.push({
    to: recipients,
    subject: subject.replace('{{referenceNumber}}', referenceNumber),
    bodyHtml: documentToHtmlString(body),
    bodyText: documentToPlainTextString(body),
    templateData: {
      ...messageData,
      signatureText: documentToHtmlString(signature),
      signatureLogo,
    },
  })

  return messages
}
