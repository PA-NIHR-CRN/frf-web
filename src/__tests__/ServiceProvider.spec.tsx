import userEvent from '@testing-library/user-event'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/serviceProvider'
import ServiceProvider, { GetStaticProps, getStaticProps, ServiceProviderProps } from '@/pages/providers/[...slug]'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const fields = defaultMock.items[0].fields
const slug = [fields.slug]

const getComponent = async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getStaticProps({ params: { slug } } as GetStaticProps)) as {
    props: ServiceProviderProps
  }

  return ServiceProvider.getLayout(<ServiceProvider {...props} />)
}

test('Service provider detail', async () => {
  render(await getComponent())

  // Back link
  expect(screen.getByRole('link', { name: 'Back to list of data service providers' })).toHaveAttribute(
    'href',
    '/providers'
  )

  // Provider heading
  expect(screen.getByRole('heading', { name: `Data service provider: ${fields.name}`, level: 2 })).toBeInTheDocument()

  // Provider org
  expect(screen.getByRole('heading', { name: fields.providerOrganisation, level: 3 })).toBeInTheDocument()

  // Short description
  expect(screen.getByTestId('frf-dsp-description')).toBeInTheDocument()

  // Services available and costs
  expect(screen.getByRole('table', { name: 'Services available and costs:' })).toBeInTheDocument()

  // Coverage
  expect(screen.getByRole('list', { name: 'Coverage' })).toBeInTheDocument()
  expect(screen.getByText('Geographical: England')).toBeInTheDocument()
  expect(screen.getByText(fields.geographySupportingText)).toBeInTheDocument()
  expect(screen.getByText('Population: 35,000,000')).toBeInTheDocument()

  // Suited to
  const suitedToList = screen.getByRole('list', { name: 'Suited to:' })
  expect(within(suitedToList).getAllByRole('listitem')).toHaveLength(4)

  // Not suited to
  const notSuitedToList = screen.getByRole('list', { name: 'Not suited to:' })
  expect(within(notSuitedToList).getAllByRole('listitem')).toHaveLength(1)

  // Video
  const videoIframe = screen.getByTitle(`Video: ${fields.name}`)
  expect(videoIframe).toHaveAttribute('src', 'https://www.youtube.com/embed/3WUh1huCUrM')

  // More information
  expect(
    screen.getByRole('link', {
      name: `For more information visit ${fields.websiteName} (Opens in a new window)`,
    })
  )

  // Published date & Last updated date
  expect(screen.getByText('Funded by:')).toBeInTheDocument()
  expect(screen.getByText(fields.fundedBy)).toBeInTheDocument()
  expect(screen.getByText('First published:')).toBeInTheDocument()
  expect(screen.getByText('8 June 2023')).toBeInTheDocument()
  expect(screen.getByText('Last updated:')).toBeInTheDocument()
  expect(screen.getByText('22 June 2023')).toBeInTheDocument()

  // Contact
  const heading = screen.getByRole('heading', { name: 'Contact data service provider', level: 3 })
  expect(heading).toBeInTheDocument()
  expect(heading.nextSibling).toHaveTextContent(
    'If you think Genomic Profile Register might be able to help with your study you can contact them directly using this service.'
  )
  expect(screen.getAllByRole('link', { name: 'Get in touch with Genomic Profile Register' })[0]).toHaveAttribute(
    'href',
    '/'
  )
})

test('Sidebar', async () => {
  render(await getComponent())

  const sidebar = within(screen.getByTestId('frf-dsp-sidebar'))

  // Types of data available
  expect(sidebar.getByRole('heading', { name: 'Type of data available', level: 3 }))
  expect(sidebar.getByText('Primary care')).toBeInTheDocument()
  expect(sidebar.getByText('COVID 19')).toBeInTheDocument()
  expect(sidebar.getByText('Medicines dispensed')).toBeInTheDocument()
  expect(sidebar.getByText('Work force')).toBeInTheDocument()
  expect(sidebar.getByText('Hospital in-patient and out-patient episodes')).toBeInTheDocument()
  expect(sidebar.getByText('Audit data')).toBeInTheDocument()
  expect(sidebar.getByText('Cancer registry')).toBeInTheDocument()
  expect(sidebar.getByText('COVID-19 data')).toBeInTheDocument()
  expect(sidebar.getByText('Demographics')).toBeInTheDocument()
  expect(sidebar.getByText('Emergency care')).toBeInTheDocument()

  // Contact
  const heading = sidebar.getByRole('heading', { name: 'Contact provider', level: 3 })
  expect(heading).toBeInTheDocument()
  expect(heading.nextSibling).toHaveTextContent(
    'If you think Genomic Profile Register might be able to help with your study you can contact them directly using this service.'
  )
  expect(sidebar.getByRole('link', { name: 'Get in touch with Genomic Profile Register' })).toHaveAttribute('href', '/')

  // Support
  expect(sidebar.getByRole('heading', { name: 'Get support for your research', level: 3 })).toBeInTheDocument()
  expect(
    sidebar.getByText(
      'Need help finding appropriate data services, or any other part of the UK journey to getting your study started? The UK offers multiple services and teams of professionals who can support you.'
    )
  ).toBeInTheDocument()
  expect(sidebar.getByRole('link', { name: 'Contact research support' })).toHaveAttribute('href', '')
})

test('Data content', async () => {
  userEvent.setup()

  render(await getComponent())

  // Data content
  expect(screen.getByRole('heading', { name: 'Data content', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Direct identifers in dataset'))
  expect(screen.getByText('Clinical content'))
  expect(screen.getByText('Data entry coding'))
  expect(screen.getByText('Quality and variability of coding'))
  expect(screen.getByText('Underserved groups identified'))
  expect(screen.getByText('Frequency of data updates'))
})

test('Geographical and population coverage', async () => {
  userEvent.setup()

  render(await getComponent())

  expect(screen.getByRole('heading', { name: 'Geographical and population coverage', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Service covers England, Northern Ireland, Scotland and Wales.')).toBeInTheDocument()
  expect(screen.getByText('Degree of participation by care providers')).toBeInTheDocument()
  expect(
    screen.getByText(
      'The service is able to collect data under its statutory power established by the Health and Social Care Act 2012s, under section 259(1)(a), to require data from health or social care bodies, or organisations that provide publicly funded health or adult social care in England, where it has been directed to establish an information system by the Secretary of State for Health and Social Care (Secretary of State) or NHS England.'
    )
  ).toBeInTheDocument()
  expect(screen.getByText('Number of live participants’ data held')).toBeInTheDocument()
  expect(screen.getByText('1.6million')).toBeInTheDocument()
  expect(screen.getByText('Total number of participants’ data held')).toBeInTheDocument()
  expect(screen.getByText('65 million')).toBeInTheDocument()
})

test('Information governance', async () => {
  userEvent.setup()

  render(await getComponent())

  expect(screen.getByRole('heading', { name: 'Information governance', level: 3 })).toBeInTheDocument()
  expect(
    screen.getByText("Full details of this service provider's Information Governance process.")
  ).toBeInTheDocument()
})

test.skip('Find', async () => {
  userEvent.setup()

  render(await getComponent())

  // Find TODO
  expect(screen.getByRole('heading', { name: 'Find', level: 3 })).toBeInTheDocument()
})

test.skip('Recruit', async () => {
  userEvent.setup()

  // Recruit TODO
  expect(screen.getByRole('heading', { name: 'Recruit', level: 3 })).toBeInTheDocument()
})

test.skip('Follow-up', async () => {
  userEvent.setup()

  // Follow-up TODO
  expect(screen.getByRole('heading', { name: 'Follow-up', level: 3 })).toBeInTheDocument()
})

test.skip('Service provider with only required content types', async () => {
  // mock new response

  // Follow-up TODO
  expect(screen.getByRole('heading', { name: 'Follow-up', level: 3 })).toBeInTheDocument()
})
