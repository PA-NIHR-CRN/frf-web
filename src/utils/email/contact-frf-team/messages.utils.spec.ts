import { EMAIL_FRF_INBOX } from '@/constants'
import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils'

describe('getNotificationMessages', () => {
  const defaultMessageData: MessageData = {
    referenceNumber: 'C00029',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    details: 'details here',
  }

  test('should generate email messages', () => {
    const expectedMessages: EmailArgs[] = [
      {
        subject: 'C00029 - New enquiry for FRF central team',
        templateName: 'contact-frf-team/frf-confirmation',
        to: EMAIL_FRF_INBOX,
        templateData: defaultMessageData,
      },
      {
        subject: 'C00029 - Contact FRF central team enquiry submitted',
        templateName: 'contact-frf-team/request-confirmation',
        to: 'testemail@nihr.ac.uk',
        templateData: defaultMessageData,
      },
    ]

    const messages = getNotificationMessages(defaultMessageData)

    expect(messages).toEqual(expectedMessages)
  })
})
