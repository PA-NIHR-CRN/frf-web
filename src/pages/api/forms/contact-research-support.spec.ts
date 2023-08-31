import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { Mock } from 'ts-mockery'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { defaultMock, emailContactsMock } from '@/mocks/contactResearchSupport'
import { prismaMock } from '@/mocks/prisma'
import { setupMockServer } from '@/utils'
import { ContactResearchSupportInputs } from '@/utils/schemas/contact-research-support.schema'

import handler from './contact-research-support'

const [server, mockContentfulResponse] = setupMockServer()

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>

const testHandler = async (handler: NextApiHandler, options: RequestOptions) => {
  const req = createRequest<ApiRequest>(options)
  const res = createResponse<APiResponse>()
  await handler(req, res)
  return res
}

beforeEach(() => {
  jest.clearAllMocks()
  mockContentfulResponse(defaultMock, 200, undefined, false, { once: true })
  mockContentfulResponse(emailContactsMock, 200, undefined, false, { once: true })
  console.error = jest.fn()
})

test('Successful submission redirects to the confirmation page', async () => {
  const sendEmailSpy = jest.spyOn(emailService, 'sendEmail').mockImplementation(Mock.noop)

  const body: ContactResearchSupportInputs = {
    enquiryType: 'data',
    supportDescription: 'help me',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    organisationType: 'nonCommercial',
    lcrn: 'Mock region 1',
    studyTitle: '',
    protocolReference: '',
    cpmsId: '',
    workEmailAddress: '', // honeypot
  }

  const createMock = jest.mocked(prisma.supportRequest.create)
  createMock.mockResolvedValueOnce({
    id: 999,
    createdAt: new Date('123'),
    updatedAt: new Date('123'),
    referenceNumber: '',
    enquiryType: 'data',
    supportDescription: 'help me',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    organisationType: 'nonCommercial',
    lcrn: 'Mock region 1',
    studyTitle: '',
    protocolReference: '',
    cpmsId: '',
  })

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support/confirmation/R00999')

  // Form data is saved in the database
  expect(prismaMock.supportRequest.create).toHaveBeenCalledWith({
    data: {
      enquiryType: 'data',
      supportDescription: 'help me',
      fullName: 'Test user',
      emailAddress: 'testemail@nihr.ac.uk',
      phoneNumber: '+447443121812',
      jobRole: 'Researcher',
      organisationName: 'NIHR',
      organisationType: 'nonCommercial',
      lcrn: 'Mock region 1',
      studyTitle: '',
      protocolReference: '',
      cpmsId: '',
    },
  })
  expect(prismaMock.supportRequest.update).toHaveBeenCalledWith({
    where: { id: 999 },
    data: { referenceNumber: 'R00999' },
  })

  // Email notifications are sent with a reference number
  expect(sendEmailSpy).toHaveBeenCalledTimes(2)

  const [emailOne, emailTwo] = sendEmailSpy.mock.calls

  expect(emailOne[0].to).toEqual(['mockregion1@nihr.ac.uk'])
  expect(emailOne[0].templateData.referenceNumber).toEqual(expect.any(String))
  expect(emailOne[0].templateData.signatureText).toEqual('<p><b>Find, Recruit and Follow-up</b></p>')
  expect(emailOne[0].templateData.signatureLogo).toEqual(
    'https://www.nihr.ac.uk/layout/4.0/assets/external/nihr-logo.png'
  )

  expect(emailTwo[0].to).toEqual(['testemail@nihr.ac.uk'])
  expect(emailTwo[0].templateData.referenceNumber).toEqual(expect.any(String))
  expect(emailTwo[0].templateData.signatureText).toEqual('<p><b>Find, Recruit and Follow-up</b></p>')
  expect(emailTwo[0].templateData.signatureLogo).toEqual(
    'https://www.nihr.ac.uk/layout/4.0/assets/external/nihr-logo.png'
  )
})

test('Validation error redirects back to the form with the errors and original values persisted', async () => {
  const body: Partial<ContactResearchSupportInputs> = {
    enquiryType: 'data',
    fullName: 'Test user',
    emailAddress: 'invalid',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    lcrn: 'Mock region 1',
    workEmailAddress: '', // honeypot
  }

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe(
    '/contact-research-support?supportDescriptionError=Required&emailAddressError=Enter+a+valid+email+address&organisationTypeError=Select+the+type+of+organisation&studyTitleError=Required&protocolReferenceError=Required&cpmsIdError=Required&enquiryType=data&fullName=Test+user&emailAddress=invalid&phoneNumber=%2B447443121812&jobRole=Researcher&organisationName=NIHR&lcrn=Mock+region+1'
  )
})

test('Honeypot value caught redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'POST', body: { workEmailAddress: 'I am a bot' } })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Bot request caught in honeypot: I am a bot'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'GET' })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})
