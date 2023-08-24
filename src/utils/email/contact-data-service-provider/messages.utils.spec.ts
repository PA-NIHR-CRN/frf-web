import { BLOCKS, Document } from '@contentful/rich-text-types'

import { TypeEmailTemplateContactDataServiceProvider } from '@/@types/generated'
import { EmailArgs } from '@/lib/email/emailServiceV2'

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
    dspName: 'Test DSP',
    dspEmail: 'testdsp@nihr.ac.uk',
    referenceNumber: 'D00029',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    studyDescription: 'Study description here',
    workEmailAddress: '', // honeypot
  }

  const contentType: TypeEmailTemplateContactDataServiceProvider<undefined, ''>['fields'] = {
    senderSubject: '{{referenceNumber}} - Your enquiry has been sent to {{dspName}} (Find, Recruit & Follow-up)',
    senderBody: body,
    teamSubject: '{{referenceNumber}} - New enquiry via Find, Recruit & Follow-up',
    teamBody: body,
    signature,
    signatureLogo: 'https://url-to-logo.png',
  }

  test('should generate feedback message', () => {
    const expectedMessages: EmailArgs[] = [
      {
        subject: 'D00029 - New enquiry via Find, Recruit & Follow-up',
        bodyHtml: '<p>Body from contentful</p>',
        bodyText: 'Body from contentful',
        to: [defaultMessageData.dspEmail],
        templateData: {
          ...defaultMessageData,
          signatureLogo: 'https://url-to-logo.png',
          signatureText: '<p>Signature from contentful</p>',
        },
      },
      {
        subject: 'D00029 - Your enquiry has been sent to Test DSP (Find, Recruit & Follow-up)',
        bodyHtml: '<p>Body from contentful</p>',
        bodyText: 'Body from contentful',
        to: ['testemail@nihr.ac.uk'],
        templateData: {
          ...defaultMessageData,
          signatureLogo: 'https://url-to-logo.png',
          signatureText: '<p>Signature from contentful</p>',
        },
      },
    ]

    const messages = getNotificationMessages(defaultMessageData, contentType)

    expect(messages).toEqual(expectedMessages)
  })
})
