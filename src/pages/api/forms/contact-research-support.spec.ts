import { rest } from 'msw'
import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'

import reCaptchaMock from '@/mocks/reCaptcha.json'
import { setupMockServer } from '@/utils'
import { ContactResearchSupportInputs } from '@/utils/schemas/contact-research-support.schema'

import handler from './contact-research-support'

const [server] = setupMockServer()

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
  console.error = jest.fn()
})

test('Successful submission redirects to the confirmation page', async () => {
  const body: ContactResearchSupportInputs & { reCaptchaToken: string } = {
    reCaptchaToken: 'mock-token',
    enquiryType: 'data',
    supportDescription: 'help me',
    fullName: 'Test user',
    emailAddress: 'testemail@nihr.ac.uk',
    phoneNumber: '+447443121812',
    jobRole: 'Researcher',
    organisationName: 'NIHR',
    organisationType: 'commercial',
    lcrn: 'lcrnregion@nihr.ac.uk',
    studyTitle: '',
    protocolReference: '',
    cpmsId: '',
  }

  const res = await testHandler(handler, { method: 'POST', body })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support/confirmation')
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
    '/contact-research-support?supportDescriptionError=Required&emailAddressError=Email+address+must+be+a+valid+email&organisationTypeError=Organisation+type+is+required&studyTitleError=Required&protocolReferenceError=Required&cpmsIdError=Required&enquiryType=data&fullName=Test+user&emailAddress=invalid&phoneNumber=%2B447443121812&jobRole=Researcher&organisationName=NIHR&lcrn=lcrnregion%40nihr.ac.uk'
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
  expect(console.error).toHaveBeenCalledWith(new Error('Invalid reCaptcha token'))
})

test('Wrong http method redirects with an error', async () => {
  const res = await testHandler(handler, { method: 'GET' })
  expect(res.statusCode).toBe(302)
  expect(res._getRedirectUrl()).toBe('/contact-research-support?fatal=1')
  expect(console.error).toHaveBeenCalledWith(new Error('Wrong method'))
})
