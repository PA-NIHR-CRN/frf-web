import { Entry } from 'contentful'
import { Mock } from 'ts-mockery'

import { TypeEmailContactSkeleton } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils' // Replace with the correct path to your module

describe('getNotificationMessages', () => {
  const contacts = [
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: 'lcrn@example.com',
        name: 'Region 0',
        salutation: 'Mx.',
        type: 'LCRN - DA',
      },
    }),
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: 'bdm@example.com',
        name: 'Region 1',
        salutation: 'Mr.',
        type: 'BDM',
      },
    }),
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: 'frf@example.com',
        name: 'Region 2',
        salutation: 'Ms.',
        type: 'FRF',
      },
    }),
  ]

  const defaultMessageData: MessageData = {
    organisationType: 'nonCommercial',
    lcrn: 'lcrn@example.com',
    emailAddress: 'researcher@example.com',
    fullName: 'John Doe',
    referenceNumber: 'ABC123',
    enquiryType: 'data',
    supportDescription: 'test',
    jobRole: 'test',
    organisationName: 'test',
    phoneNumber: '12345',
    studyTitle: 'test',
    protocolReference: 'test',
    cpmsId: 'test',
    workEmailAddress: '', // honeypot
  }

  test('should generate support request message for non-commercial organisation or known LCRN', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      templateName: 'support-request',
      to: 'lcrn@example.com',
      templateData: {
        ...defaultMessageData,
        salutation: 'Mx.',
        regionName: 'Region 0',
      },
    }

    const messages = getNotificationMessages(defaultMessageData, contacts)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('support request message for non-commercial organisation or known LCRN with a duplicate email address', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      templateName: 'support-request',
      to: 'lcrn@example.com',
      templateData: {
        ...defaultMessageData,
        salutation: 'Mx.',
        regionName: 'Region 0',
      },
    }

    const contactsWithDuplicateLcrnEmail = [
      Mock.of<Entry<TypeEmailContactSkeleton>>({
        fields: {
          emailAddress: 'lcrn@example.com',
          name: 'Region 3',
          salutation: 'Dr',
          type: 'BDM',
        },
      }),
    ].concat(contacts)

    const messages = getNotificationMessages(defaultMessageData, contactsWithDuplicateLcrnEmail)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('should generate support request message for commercial organisation, unknown LCRN and research enquiry type', () => {
    const messageData: MessageData = {
      ...defaultMessageData,
      organisationType: 'commercial',
      lcrn: 'unknown',
      enquiryType: 'research',
    }

    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      templateName: 'support-request',
      to: 'bdm@example.com',
      templateData: {
        ...messageData,
        salutation: 'Mr.',
        regionName: 'Unknown',
      },
    }

    const messages = getNotificationMessages(messageData, contacts)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('should generate support request message for commercial organisation, unknown LCRN and data enquiry type', () => {
    const messageData: MessageData = {
      ...defaultMessageData,
      organisationType: 'commercial',
      lcrn: 'unknown',
      enquiryType: 'data',
    }

    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      templateName: 'support-request',
      to: 'frf@example.com',
      templateData: {
        ...messageData,
        salutation: 'Ms.',
        regionName: 'Unknown',
      },
    }

    const messages = getNotificationMessages(messageData, contacts)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('should generate request confirmation message', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - Research Support Enquiry Submitted (Find, Recruit and Follow-up)',
      templateName: 'request-confirmation',
      to: 'researcher@example.com',
      templateData: {
        ...defaultMessageData,
        salutation: 'John Doe',
        regionName: 'Region 0',
      },
    }

    const messages = getNotificationMessages(defaultMessageData, contacts)

    expect(messages).toContainEqual(expectedMessage)
  })
})
