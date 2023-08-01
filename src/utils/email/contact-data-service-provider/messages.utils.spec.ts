import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils'

describe('getNotificationMessages', () => {
  const defaultMessageData: MessageData = {
    dspName: 'Test DSP',
    referenceNumber: 'D00029',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    studyDescription: 'Study description here',
  }

  test('should generate feedback message', () => {
    const expectedMessages: EmailArgs[] = [
      {
        subject: 'D00029 - New enquiry via Find, Recruit & Follow-up',
        templateName: 'data-service-provider/dsp-confirmation',
        to: 'frfteam@nihr.ac.uk',
        templateData: defaultMessageData,
      },
      {
        subject: 'D00029 - Your enquiry has been sent to Test DSP (Find, Recruit & Follow-up)',
        templateName: 'data-service-provider/researcher-confirmation',
        to: 'testemail@nihr.ac.uk',
        templateData: defaultMessageData,
      },
    ]

    const messages = getNotificationMessages(defaultMessageData)

    expect(messages).toEqual(expectedMessages)
  })
})
