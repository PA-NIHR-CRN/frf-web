import { BLOCKS, Document } from '@contentful/rich-text-types'

import { TypeEmailTemplateContactFrfCentralTeam } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailService'

import { getNotificationMessages, MessageData } from './messages.utils'

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
  const defaultMessageData: MessageData = {
    referenceNumber: 'C00029',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    details: 'details here',
    workEmailAddress: '', // honeypot
  }

  const contentType: TypeEmailTemplateContactFrfCentralTeam<undefined, ''>['fields'] = {
    title: 'Email template title',
    recipients: ['frfteam@nihr.ac.uk'],
    senderSubject: '{{referenceNumber}} - Contact FRF central team enquiry submitted',
    senderBody: body,
    teamSubject: '{{referenceNumber}} - New enquiry for FRF central team',
    teamBody: body,
    signature,
    signatureLogo: 'https://url-to-logo.png',
    sourceInbox: 'frfteam@nihr.ac.uk',
  }

  test('should generate email messages', () => {
    const expectedMessages: EmailArgs[] = [
      {
        subject: 'C00029 - New enquiry for FRF central team',
        bodyHtml: '<p>Body from contentful</p>',
        bodyText: 'Body from contentful',
        to: ['frfteam@nihr.ac.uk'],
        templateData: {
          ...defaultMessageData,
          signatureLogo: 'https://url-to-logo.png',
          signatureText: '<p>Signature from contentful</p>',
        },
        sourceInbox: 'frfteam@nihr.ac.uk',
      },
      {
        subject: 'C00029 - Contact FRF central team enquiry submitted',
        bodyHtml: '<p>Body from contentful</p>',
        bodyText: 'Body from contentful',
        to: ['testemail@nihr.ac.uk'],
        templateData: {
          ...defaultMessageData,
          signatureLogo: 'https://url-to-logo.png',
          signatureText: '<p>Signature from contentful</p>',
        },
        sourceInbox: 'frfteam@nihr.ac.uk',
      },
    ]

    const messages = getNotificationMessages(defaultMessageData, contentType)

    expect(messages).toEqual(expectedMessages)
  })
})
