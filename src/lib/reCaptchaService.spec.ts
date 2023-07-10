import { rest } from 'msw'

import reCaptchaMock from '@/mocks/reCaptcha.json'
import { setupMockServer } from '@/utils'

import { ReCaptchaService } from './reCaptchaService'

const [server] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Valid reCaptcha token', async () => {
  const reCaptchaService = new ReCaptchaService({
    projectId: 'mock-project-id',
    siteKey: 'mock-site-key',
    apiKey: 'mock-api-key',
  })

  const { valid } = await reCaptchaService.validateToken('mock-token')

  expect(valid).toBeTruthy()
})

test('Invalid reCaptcha token', async () => {
  server.use(
    rest.post('https://recaptchaenterprise.googleapis.com/v1/projects/mock-project-id/assessments', (req, res, ctx) =>
      res(ctx.json({ ...reCaptchaMock, tokenProperties: { ...reCaptchaMock.tokenProperties, valid: false } }))
    )
  )

  const reCaptchaService = new ReCaptchaService({
    projectId: 'mock-project-id',
    siteKey: 'mock-site-key',
    apiKey: 'mock-api-key',
  })

  const { valid } = await reCaptchaService.validateToken('mock-token')

  expect(valid).toBeFalsy()
})

test('Unexpected error', async () => {
  console.log = jest.fn()

  server.use(
    rest.post('https://recaptchaenterprise.googleapis.com/v1/projects/mock-project-id/assessments', (req, res, ctx) =>
      res(ctx.json(null))
    )
  )

  const reCaptchaService = new ReCaptchaService({
    projectId: 'mock-project-id',
    siteKey: 'mock-site-key',
    apiKey: 'mock-api-key',
  })

  const { valid } = await reCaptchaService.validateToken('mock-token')

  expect(valid).toBeFalsy()
  expect(console.log).toHaveBeenCalledWith(new Error("Cannot read properties of null (reading 'tokenProperties')"))
})
