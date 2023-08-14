import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { Mock } from 'ts-mockery'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { defaultMock } from '@/mocks/contactResearchSupport'
import { prismaMock } from '@/mocks/prisma'
import { setupMockServer } from '@/utils'
import { ContactDataServiceProviderInputs } from '@/utils/schemas/contact-data-service-provider.schema'

import handler from './index'

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

  const body: ContactDataServiceProviderInputs = {
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    studyDescription: 'Study description here',
    workEmailAddress: '', // honeypot
  }

  const createMock = jest.mocked(prisma.dataServiceProviderRequest.create)
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
    studyDescription: 'Study description here',
  })

  const res = await testHandler(handler, {
    method: 'POST',
    body: { ...body },
    query: { slug: 'genonmic-profile-register' },
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-data-service-provider/genonmic-profile-register/confirmation/D00999')

  // Form data is saved in the database
  expect(prismaMock.dataServiceProviderRequest.create).toHaveBeenCalledWith({
    data: {
      fullName: 'Test user',
      emailAddress: 'testemail@nihr.ac.uk',
      phoneNumber: '+447443121812',
      jobRole: 'Researcher',
      organisationName: 'NIHR',
      studyDescription: 'Study description here',
    },
  })
  expect(prismaMock.dataServiceProviderRequest.update).toHaveBeenCalledWith({
    where: { id: 999 },
    data: { referenceNumber: 'D00999' },
  })

  // Email notifications are sent with a reference number
  expect(sendEmailSpy).toHaveBeenCalledTimes(2)

  const [emailOne, emailTwo] = sendEmailSpy.mock.calls

  expect(emailOne[0].to).toBe('mockregion1@nihr.ac.uk')
  expect(emailOne[0].templateData.referenceNumber).toEqual('D00999')
  expect(emailTwo[0].to).toBe('testemail@nihr.ac.uk')
  expect(emailTwo[0].templateData.referenceNumber).toEqual('D00999')
})

test('Validation error redirects back to the form with the errors and original values persisted', async () => {
  const body: Partial<ContactDataServiceProviderInputs> = {
    fullName: undefined,
    emailAddress: undefined,
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    studyDescription: 'Study description here',
    workEmailAddress: '', // honeypot
  }

  const res = await testHandler(handler, {
    method: 'POST',
    body,
    query: { slug: 'genonmic-profile-register' },
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe(
    '/contact-data-service-provider/genonmic-profile-register?fullNameError=Required&emailAddressError=Required&phoneNumber=%2B447443121812&jobRole=Researcher&organisationName=NIHR&studyDescription=Study+description+here'
  )
})

test('Honeypot value caught redirects with an error', async () => {
  const res = await testHandler(handler, {
    method: 'POST',
    body: {
      workEmailAddress: 'I am a bot',
    },
    query: { slug: 'genonmic-profile-register' },
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-data-service-provider/genonmic-profile-register?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Bot request caught in honeypot: I am a bot'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, {
    method: 'GET',
    query: { slug: 'genonmic-profile-register' },
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-data-service-provider/genonmic-profile-register?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})

test('Missing data service provider', async () => {
  const res = await testHandler(handler, {
    method: 'GET',
    params: {},
  })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/500')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})
