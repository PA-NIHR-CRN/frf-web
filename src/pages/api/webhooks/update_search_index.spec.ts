import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'

import { DEFAULT_LOCALE } from '@/constants'
import { localisedMock } from '@/mocks/serviceProvider'
import { setupMockServer } from '@/utils'

import handler from './update_search_index'

const [server, mockContentfulResponse] = setupMockServer()

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

const searchKeywords =
  'Draft Test search test 5, Draft Test Org, Feasibility Service: Supports planning of Clinical trials by enabling clinical trialists to assess the feasibility of a study. Using national data sets the user can determine the number and location of patients who meet key eligibility criteria.  Recruitment service: Supports recruitment for clinical trials by identifying suitable patients and inviting them to participate on behalf of the research organisation.  Outcomes service: Enables researchers to follow up with patients by linking patient cohorts to rich and detailed NHS data sets to assess clinical safety and effectiveness of treatments., UK wide, Drug development trials, Certain rare disease, indications or cancers, Inherited diseases, Large patient cohorts, Find: Free of charge (All studies), Recruit: Chargeable service, Follow-Up: Free of charge (non-commercial studies only), Terms and conditions apply, £XXX, testx, Primary care sadsa Secondary care Participant reported adasdasdas, Primary care  Secondary care COVID 19 Medicines dispensed Work force Participant reported Test sub data type, test info governance'

test('Updates search index', async () => {
  mockContentfulResponse(localisedMock, 200, '/environments/dev/entries/test', true)
  mockContentfulResponse(localisedMock, 200, '/environments/dev/entries/test/published', true)

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(200)
  expect(res._getJSONData()).toStrictEqual({ searchKeywords })
})

test('Returns 301 if search keywords unchanged', async () => {
  mockContentfulResponse(
    { ...localisedMock, fields: { ...localisedMock.fields, searchKeywords: { [DEFAULT_LOCALE]: searchKeywords } } },
    200,
    '/environments/dev/entries/test',
    true
  )

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(301)
})

test('Returns 500 if entry not found', async () => {
  mockContentfulResponse({}, 400, '/environments/dev/entries/test', true)

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(500)
  expect(res._getData()).toContain('400 Bad Request')
})
