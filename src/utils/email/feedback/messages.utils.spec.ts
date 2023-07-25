import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils'

describe('getNotificationMessages', () => {
  const defaultMessageData: MessageData = {
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    organisationName: 'NIHR',
    referenceNumber: 'ABC123',
  }

  test('should generate feedback message', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 FRF - feedback received',
      templateName: 'feedback',
      to: 'frfteam@nihr.ac.uk',
      templateData: {
        ...defaultMessageData,
        fullName: 'Test user',
        referenceNumber: 'ABC123',
      },
    }

    const messages = getNotificationMessages(defaultMessageData)

    expect(messages).toContainEqual(expectedMessage)
  })
})
