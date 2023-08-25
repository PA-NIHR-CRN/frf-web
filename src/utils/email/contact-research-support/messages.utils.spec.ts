import { BLOCKS, Document } from '@contentful/rich-text-types'
import { Entry } from 'contentful'
import { Mock } from 'ts-mockery'

import { TypeEmailContactSkeleton, TypeEmailTemplateContactResearchSupport } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils' // Replace with the correct path to your module

const body: Document = {
  data: {},
  content: [
    {
      data: {},
      content: [{ data: {}, marks: [], value: 'Body from contentful', nodeType: 'text' }],
      nodeType: BLOCKS.PARAGRAPH,
    },
  ],
  nodeType: BLOCKS.DOCUMENT,
}

const signature: Document = {
  data: {},
  content: [
    {
      data: {},
      content: [{ data: {}, marks: [], value: 'Signature from contentful', nodeType: 'text' }],
      nodeType: BLOCKS.PARAGRAPH,
    },
  ],
  nodeType: BLOCKS.DOCUMENT,
}

describe('getNotificationMessages', () => {
  const contacts = [
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: ['lcrn@example.com'],
        name: 'Region 0',
        salutation: 'Mx.',
        type: 'LCRN - DA',
      },
    }),
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: ['bdm@example.com'],
        name: 'Region 1',
        salutation: 'Mr.',
        type: 'BDM',
      },
    }),
    Mock.of<Entry<TypeEmailContactSkeleton>>({
      fields: {
        emailAddress: ['frf@example.com'],
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

  const contentType: TypeEmailTemplateContactResearchSupport<undefined, ''>['fields'] = {
    title: 'Email template title',
    senderSubject: '{{referenceNumber}} - Research Support Enquiry Submitted (Find, Recruit and Follow-up)',
    senderBody: body,
    teamSubject: '{{referenceNumber}} - New enquiry via Find, Recruit and Follow-up',
    teamBody: body,
    signature,
    signatureLogo: 'https://url-to-logo.png',
  }

  test('should generate support request message for non-commercial organisation or known LCRN', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['lcrn@example.com'],
      templateData: {
        ...defaultMessageData,
        salutation: 'Mx.',
        regionName: 'Region 0',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const messages = getNotificationMessages(defaultMessageData, contacts, contentType)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('support request message for non-commercial organisation or known LCRN with a duplicate email address', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - New enquiry via Find, Recruit and Follow-up',
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['lcrn@example.com'],
      templateData: {
        ...defaultMessageData,
        salutation: 'Mx.',
        regionName: 'Region 0',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const contactsWithDuplicateLcrnEmail = [
      Mock.of<Entry<TypeEmailContactSkeleton>>({
        fields: {
          emailAddress: ['lcrn@example.com'],
          name: 'Region 3',
          salutation: 'Dr',
          type: 'BDM',
        },
      }),
    ].concat(contacts)

    const messages = getNotificationMessages(defaultMessageData, contactsWithDuplicateLcrnEmail, contentType)

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
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['bdm@example.com'],
      templateData: {
        ...messageData,
        salutation: 'Mr.',
        regionName: 'Unknown',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const messages = getNotificationMessages(messageData, contacts, contentType)

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
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['frf@example.com'],
      templateData: {
        ...messageData,
        salutation: 'Ms.',
        regionName: 'Unknown',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const messages = getNotificationMessages(messageData, contacts, contentType)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('should generate request confirmation message', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - Research Support Enquiry Submitted (Find, Recruit and Follow-up)',
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['researcher@example.com'],
      templateData: {
        ...defaultMessageData,
        salutation: 'John Doe',
        regionName: 'Region 0',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const messages = getNotificationMessages(defaultMessageData, contacts, contentType)

    expect(messages).toContainEqual(expectedMessage)
  })

  test('should generate request confirmation message for LCRNs containing a duplicate email address with a BDM', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 - Research Support Enquiry Submitted (Find, Recruit and Follow-up)',
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['researcher@example.com'],
      templateData: {
        ...defaultMessageData,
        salutation: 'John Doe',
        regionName: 'Region 0',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
    }

    const contactsWithDuplicateLcrnEmail = [
      Mock.of<Entry<TypeEmailContactSkeleton>>({
        fields: {
          emailAddress: ['lcrn@example.com'],
          name: 'Region 3',
          salutation: 'Dr',
          type: 'BDM',
        },
      }),
    ].concat(contacts)

    const messages = getNotificationMessages(defaultMessageData, contactsWithDuplicateLcrnEmail, contentType)

    expect(messages).toContainEqual(expectedMessage)
  })
})
