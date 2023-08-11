import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { Mock } from 'ts-mockery'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { defaultMock } from '@/mocks/contactResearchSupport'
import { prismaMock } from '@/mocks/prisma'
import { setupMockServer } from '@/utils'
import { FeedbackInputs } from '@/utils/schemas/feedback.schema'

import handler from './feedback'

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

  const body: FeedbackInputs & { workEmailAddress: string } = {
    workEmailAddress: '', // Honeypot
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    organisationName: 'NIHR',
  }

  const createMock = jest.mocked(prisma.feedback.create)
  createMock.mockResolvedValueOnce({
    id: 1,
    createdAt: new Date('123'),
    updatedAt: new Date('123'),
    referenceNumber: '1',
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    organisationName: 'NIHR',
  })

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/confirmation')

  // Form data is saved in the database
  expect(prismaMock.feedback.create).toHaveBeenCalledWith({
    data: { ...body },
  })
  expect(prismaMock.feedback.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { referenceNumber: 'F00001' },
  })

  // Email notifications are sent with a reference number
  expect(sendEmailSpy).toHaveBeenCalledTimes(1)

  const [emailOne] = sendEmailSpy.mock.calls

  expect(emailOne[0].to).toBe('frfteam@nihr.ac.uk')
  expect(emailOne[0].templateData.referenceNumber).toEqual('F00001')
  expect(emailOne[0].templateData.fullName).toEqual('Test user')
})

test('Validation error redirects back to the form with the errors and original values persisted', async () => {
  const body: Partial<FeedbackInputs> & { workEmailAddress: string } = {
    workEmailAddress: '', // Honeypot
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    organisationName: 'NIHR',
  }

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe(
    '/feedback?helpfulnessError=Select+how+helpful+you+found+the+FRF+website&suggestions=great+site%21&fullName=Test+user&emailAddress=testemail%40nihr.ac.uk&organisationName=NIHR'
  )
})

test('Honeypot value caught redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'POST', body: { workEmailAddress: 'I am a bot' } })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Bot request caught in honeypot: I am a bot'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'GET' })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})

test('Successful submission without contact details does not email the FRF inbox', async () => {
  const sendEmailSpy = jest.spyOn(emailService, 'sendEmail').mockImplementation(Mock.noop)

  const body: FeedbackInputs & { workEmailAddress: string } = {
    workEmailAddress: '', // Honeypot
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: '',
    organisationName: 'NIHR',
  }

  const createMock = jest.mocked(prisma.feedback.create)
  createMock.mockResolvedValueOnce({
    id: 1,
    createdAt: new Date('123'),
    updatedAt: new Date('123'),
    referenceNumber: '1',
    helpfulness: 'very-helpful',
    suggestions: 'great site!',
    fullName: 'Test user',
    emailAddress: '',
    organisationName: 'NIHR',
  })

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/feedback/confirmation')

  expect(sendEmailSpy).not.toHaveBeenCalled()
})
