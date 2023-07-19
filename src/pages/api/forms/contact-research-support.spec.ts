import { rest } from 'msw'
import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'
import { Mock } from 'ts-mockery'

import { emailService } from '@/lib/email'
import { logger } from '@/lib/logger'
import { defaultMock } from '@/mocks/contactResearchSupport'
import { prismaMock } from '@/mocks/prisma'
import reCaptchaMock from '@/mocks/reCaptcha.json'
import { setupMockServer } from '@/utils'
import { createReferenceNumber } from '@/utils/generic.utils'
import { ContactResearchSupportInputs } from '@/utils/schemas/contact-research-support.schema'

import handler from './contact-research-support'

const [server, mockContentfulResponse] = setupMockServer()

jest.mock('@/lib/logger')

jest.mock('@/utils/generic.utils')
jest.mocked(createReferenceNumber).mockReturnValue('mock-ref-number')

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

  const body: ContactResearchSupportInputs & { reCaptchaToken: string } = {
    reCaptchaToken: 'mock-token',
    enquiryType: 'data',
    supportDescription: 'help me',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    organisationType: 'nonCommercial',
    lcrn: 'mockregion1@nihr.ac.uk',
    studyTitle: '',
    protocolReference: '',
    cpmsId: '',
  }

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support/confirmation/mock-ref-number')

  // Form data is saved in the database
  expect(createReferenceNumber).toHaveBeenCalledWith({ prefix: 'R' })
  expect(prismaMock.supportRequest.create).toHaveBeenCalledWith({
    data: { ...body, referenceNumber: 'mock-ref-number' },
  })

  // Email notifications are sent with a reference number
  expect(sendEmailSpy).toHaveBeenCalledTimes(2)

  const [emailOne, emailTwo] = sendEmailSpy.mock.calls

  expect(emailOne[0].to).toBe('mockregion1@nihr.ac.uk')
  expect(emailOne[0].templateData.referenceNumber).toEqual(expect.any(String))

  expect(emailTwo[0].to).toBe('testemail@nihr.ac.uk')
  expect(emailTwo[0].templateData.referenceNumber).toEqual(expect.any(String))
})

test('Validation error redirects back to the form with the errors and original values persisted', async () => {
  const body: Partial<ContactResearchSupportInputs> & { reCaptchaToken: string } = {
    reCaptchaToken: 'mock-token',
    enquiryType: 'data',
    fullName: 'Test user',
    emailAddress: 'invalid',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    lcrn: 'lcrnregion@nihr.ac.uk',
  }

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe(
    '/contact-research-support?supportDescriptionError=Required&emailAddressError=Enter+a+valid+email+address&organisationTypeError=Select+the+type+of+organisation&studyTitleError=Required&protocolReferenceError=Required&cpmsIdError=Required&enquiryType=data&fullName=Test+user&emailAddress=invalid&phoneNumber=%2B447443121812&jobRole=Researcher&organisationName=NIHR&lcrn=lcrnregion%40nihr.ac.uk'
  )
})

test('Invalid reCaptcha token redirects with an error', async () => {
  server.use(
    rest.post('https://recaptchaenterprise.googleapis.com/v1/projects/mock-project-id/assessments', (req, res, ctx) =>
      res(ctx.json({ ...reCaptchaMock, tokenProperties: { ...reCaptchaMock.tokenProperties, valid: false } }))
    )
  )
  const res = await testHandler(handler, { method: 'POST', body: { reCaptchaToken: 'mock-token' } })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Invalid reCaptcha token'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'GET' })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support?fatal=1')
  expect(logger.error).toHaveBeenCalledWith(new Error('Wrong method'))
})
