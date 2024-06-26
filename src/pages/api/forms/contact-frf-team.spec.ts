import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { Mock } from 'ts-mockery'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { defaultMock } from '@/mocks/contactFrfCentralTeam'
import { prismaMock } from '@/mocks/prisma'
import { setupMockServer } from '@/utils'
import { ContactFrfTeamInputs } from '@/utils/schemas/contact-frf-team.schema'

import handler from './contact-frf-team'

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
  mockContentfulResponse(defaultMock)
  console.error = jest.fn()
})

test('Successful submission redirects to the confirmation page', async () => {
  const sendEmailSpy = jest.spyOn(emailService, 'sendEmail').mockImplementation(Mock.noop)

  const body: ContactFrfTeamInputs = {
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    details: 'details here',
    caseReferenceNumber: '', // honeypot
  }

  const createMock = jest.mocked(prisma.frfTeamRequest.create)
  createMock.mockResolvedValueOnce({
    id: 999,
    createdAt: new Date('123'),
    updatedAt: new Date('123'),
    referenceNumber: '',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    details: 'details here',
  })

  const res = await testHandler(handler, {
    method: 'POST',
    body,
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-frf-team/confirmation/C00999')

  // Form data is saved in the database
  expect(prismaMock.frfTeamRequest.create).toHaveBeenCalledWith({
    data: {
      fullName: 'Test user',
      emailAddress: 'testemail@nihr.ac.uk',
      phoneNumber: '+447443121812',
      jobRole: 'Researcher',
      organisationName: 'NIHR',
      details: 'details here',
    },
  })
  expect(prismaMock.frfTeamRequest.update).toHaveBeenCalledWith({
    where: { id: 999 },
    data: { referenceNumber: 'C00999' },
  })

  // Email notifications are sent with a reference number
  expect(sendEmailSpy).toHaveBeenCalledTimes(2)

  const [emailOne, emailTwo] = sendEmailSpy.mock.calls

  expect(emailOne[0].to).toEqual(['frfteam@nihr.ac.uk'])
  expect(emailOne[0].templateData.referenceNumber).toEqual('C00999')
  expect(emailOne[0].templateData.signatureText).toEqual('<p><b>Find, Recruit and Follow-up</b></p>')
  expect(emailOne[0].templateData.signatureLogo).toEqual(
    'https://www.nihr.ac.uk/layout/4.0/assets/external/nihr-logo.png'
  )

  expect(emailTwo[0].to).toEqual(['testemail@nihr.ac.uk'])
  expect(emailTwo[0].templateData.referenceNumber).toEqual('C00999')
  expect(emailTwo[0].templateData.signatureText).toEqual('<p><b>Find, Recruit and Follow-up</b></p>')
  expect(emailTwo[0].templateData.signatureLogo).toEqual(
    'https://www.nihr.ac.uk/layout/4.0/assets/external/nihr-logo.png'
  )
})

test('Validation error redirects back to the form with the errors and original values persisted', async () => {
  const body: Partial<ContactFrfTeamInputs> = {
    fullName: undefined,
    emailAddress: undefined,
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    details: 'details here',
    caseReferenceNumber: '', // honeypot
  }

  const res = await testHandler(handler, {
    method: 'POST',
    body,
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe(
    '/contact-frf-team?fullNameError=Required&emailAddressError=Required&phoneNumber=%2B447443121812&jobRole=Researcher&organisationName=NIHR&details=details+here'
  )
})

test('Honeypot value caught redirects with an error', async () => {
  const res = await testHandler(handler, {
    method: 'POST',
    body: {
      caseReferenceNumber: 'I am a bot',
    },
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-frf-team?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Bot request caught in honeypot: I am a bot'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, {
    method: 'GET',
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-frf-team?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})

test('Missing data service provider', async () => {
  const res = await testHandler(handler, {
    method: 'GET',
    params: {},
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-frf-team?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})
