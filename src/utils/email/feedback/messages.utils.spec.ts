import { BLOCKS, Document } from '@contentful/rich-text-types'

import { TypeEmailTemplateFeedback } from '@/@types/generated'
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
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: 'frfteam@nihr.ac.uk',
    organisationName: 'NIHR',
    referenceNumber: 'ABC123',
    workEmailAddress: '', // honeypot
  }

  const contentType: TypeEmailTemplateFeedback<undefined, ''>['fields'] = {
    title: 'Email template title',
    recipients: ['frfteam@nihr.ac.uk'],
    subject: '{{referenceNumber}} FRF - feedback received',
    body,
    signature,
    signatureLogo: 'https://url-to-logo.png',
    sourceInbox: 'frfteam@nihr.ac.uk',
  }

  test('should generate feedback message', () => {
    const expectedMessage: EmailArgs = {
      subject: 'ABC123 FRF - feedback received',
      bodyHtml: '<p>Body from contentful</p>',
      bodyText: 'Body from contentful',
      to: ['frfteam@nihr.ac.uk'],
      templateData: {
        ...defaultMessageData,
        fullName: 'Test user',
        referenceNumber: 'ABC123',
        signatureLogo: 'https://url-to-logo.png',
        signatureText: '<p>Signature from contentful</p>',
      },
      sourceInbox: 'frfteam@nihr.ac.uk',
    }

    const messages = getNotificationMessages(defaultMessageData, contentType)

    expect(messages).toContainEqual(expectedMessage)
  })
})
