import type { NextApiHandler } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http'

import { defaultMock, localisedMock } from '@/mocks/serviceProvider'
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

const searchKeywords = `Genomic Profile Register, Delivered by Genomic Profile Register, Genomic Profile Register: secure, national database of genomic and health data. It provides whole genome sequencing diagnostics. Within Clinical care, individuals are asked by clinicians whether they would like to add their genome sequence and health data to the Genomic Register.  Find: The sample is sequenced and genome data is stored and can be analysed within the Genome Profile library. The number of eligible participants can be viewed by carrying out specific study criteria searches via the database.  Recruit: If individuals consent to further research, the de-identified sample and data in the National Genomic Register can be made identifiable and available, Department of Health and Social Care, England, NHS England holds data for all patients registered in England., Drug development trials, Certain rare disease, indications or cancers, Inherited diseases, Large patient cohorts, Find: Free of charge (All studies), Recruit: Free of charge (All studies), Follow-Up: Free of charge (All studies), Free of charge (all studies), Chargeable service - £XXX, Primary care Hospital in-patient and out-patient episodes Audit data Cancer registry COVID-19 data Demographics Emergency care, Primary care COVID 19 Medicines dispensed Work force Hospital in-patient and out-patient episodes Audit data Cancer registry COVID-19 data Demographics Emergency care, Genomic Profile Register Website Name, Full details of this service provider's Information Governance process., Service covers England, Northern Ireland, Scotland and Wales.  Degree of participation by care providers  The service is able to collect data under its statutory power established by the Health and Social Care Act 2012s, under section 259(1)(a), to require data from health or social care bodies, or organisations that provide publicly funded health or adult social care in England, where it has been directed to establish an information system by the Secretary of State for Health and Social Care (Secretary of State) or NHS England. Number of live participants’ data held 1.6million Total number of participants’ data held 65 million, Direct identifers in dataset mock, Clinical content mock, Data entry coding mock, Quality and variability of coding mock, Underserved groups identified mock, Frequency of data updates mock, Feasibility Service: Supports planning of Clinical trials by enabling clinical trialists to assess the feasibility of a study. Using national data sets the user can determine the number and location of patients who meet key eligibility criteria., Search criteria and code lists are based on the study protocol and agreed and validated with client, and undergoes an internal QA prior to the search being carried out Search is performed on the national datasets and Primary Care Database Any criteria that is recorded in the coded primary care database or linked datasets can be applied to the search, A high level search based on a protocol or study outline will take approximately 10 working days. More detailed search, conducted with client input may take up to 30 working days., The service is a cost recovery organisation. Costs to the user are based on the: staff time used to design and conduct the search staff time to configure and support the technical requirements to support the service payments to GP practices for their delivery of the service via primary care, Recruitment service: Supports recruitment for clinical trials by identifying suitable patients and inviting them to participate on behalf of the research organisation., The search criteria and code lists are based on the study protocol and agreed and validated with client and performed as for the Find service above Invites to potential participant sent by the service on behalf of the client in the form of a letter Search Criteria is agreed and validated through completion of Data Sharing Agreement No additional clinical checks are applied other than inclusion/exclusion criteria, Study set up may take between 1 and 3 months to start recruitment Recruitment timelines will be client and project dependent, Service is a cost recovery organisation and our costs to provide the service are based on staff time to design and conduct the search, set up and manage the technical requirements (online study platform), set up, monitoring and administrative management of practice activity for service delivery and general project management and administration of the service., The Outcomes service enable the user to follow up the participants taking part in clinical trials, and link the user with relevant data about participants., Set up and recruitment in line with recruitment process and according to timelines in protocol, The service is a cost recovery organisation and our costs to provide the service are based on staff time to design and conduct the search, set up and manage the technical requirements (online study platform), set up, monitoring and administrative management of practice activity for service delivery and general project management and administration of the service.`

test('Updates search index', async () => {
  mockContentfulResponse(defaultMock)
  mockContentfulResponse(localisedMock, 200, '/environments/dev/entries/test', true)
  mockContentfulResponse(localisedMock, 200, '/environments/dev/entries/test/published', true)

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(200)
  expect(res._getJSONData()).toStrictEqual({ searchKeywords })
})

test('Returns 301 if search keywords unchanged', async () => {
  mockContentfulResponse({
    ...defaultMock,
    items: [{ ...defaultMock.items[0], fields: { ...defaultMock.items[0].fields, searchKeywords } }],
  })

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(301)
})

test('Returns 500 if entry not found', async () => {
  mockContentfulResponse({}, 400)

  const res = await testHandler(handler, { method: 'GET', body: { sys: { id: 'test' } } })

  expect(res.statusCode).toBe(500)
  expect(res._getData()).toContain('400 Bad Request')
})
