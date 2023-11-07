import userEvent from '@testing-library/user-event'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock, requiredFieldsOnlyMock } from '@/mocks/serviceProvider'
import ServiceProvider, { GetStaticProps, getStaticProps, ServiceProviderProps } from '@/pages/providers/[...slug]'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const fields = defaultMock.items[0].fields
const slug = [fields.slug]

const getComponent = async () => {
  const { props } = (await getStaticProps({ params: { slug } } as GetStaticProps)) as {
    props: ServiceProviderProps
  }

  return ServiceProvider.getLayout(<ServiceProvider {...props} />, { ...props, isPreviewMode: false })
}

beforeEach(() => {
  mockContentfulResponse(defaultMock)
})

test('Service provider detail', async () => {
  render(await getComponent())

  // Page heading
  expect(screen.getByRole('heading', { name: 'Data Service Provider details', level: 1 })).toBeInTheDocument()

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
  expect(screen.getByRole('link', { name: 'See more about find' })).toHaveAttribute('href', '#find')
  expect(screen.getByRole('link', { name: 'See more about recruit' })).toHaveAttribute('href', '#recruit')
  expect(screen.getByRole('link', { name: 'See more about follow-up' })).toHaveAttribute('href', '#follow-up')

  // Types of data available
  expect(screen.getByRole('heading', { name: 'Type of data available:', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Primary care')).toBeInTheDocument()
  expect(screen.getByText('COVID 19')).toBeInTheDocument()
  expect(screen.getByText('Medicines dispensed')).toBeInTheDocument()
  expect(screen.getByText('Work force')).toBeInTheDocument()
  expect(screen.getByText('Hospital in-patient and out-patient episodes')).toBeInTheDocument()
  expect(screen.getByText('Audit data')).toBeInTheDocument()
  expect(screen.getByText('Cancer registry')).toBeInTheDocument()
  expect(screen.getByText('COVID-19 data')).toBeInTheDocument()
  expect(screen.getByText('Demographics')).toBeInTheDocument()
  expect(screen.getByText('Emergency care')).toBeInTheDocument()

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
  expect(videoIframe).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/3WUh1huCUrM')

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
})

test('Sidebar', async () => {
  render(await getComponent())

  const sidebar = within(screen.getByTestId('frf-dsp-sidebar'))

  // Contact
  const heading = sidebar.getByRole('heading', { name: 'Contact data service provider', level: 3 })
  expect(heading).toBeInTheDocument()
  expect(heading.nextSibling).toHaveTextContent(
    'If you think Genomic Profile Register might be able to help with your study you can contact them directly using this service.'
  )
  expect(sidebar.getByRole('link', { name: 'Get in touch with Genomic Profile Register' })).toHaveAttribute(
    'href',
    '/contact-data-service-provider/genomic-profile-register'
  )

  // Support
  expect(sidebar.getByRole('heading', { name: 'Get support for your research', level: 3 })).toBeInTheDocument()
  expect(
    sidebar.getByText(
      'Need help finding appropriate data services, or any other part of the UK journey to getting your study started? The UK offers multiple services and teams of professionals who can support you.'
    )
  ).toBeInTheDocument()
  expect(sidebar.getByRole('link', { name: 'Contact research support' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )
})

test('Data content', async () => {
  const user = userEvent.setup()

  render(await getComponent())

  expect(screen.getByRole('heading', { name: 'Data content', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Direct identifers in dataset'))
  expect(screen.getByText('Clinical content'))
  expect(screen.getByText('Data entry coding'))
  expect(screen.getByText('Quality and variability of coding'))
  expect(screen.getByText('Underserved groups identified'))
  expect(screen.getByText('Frequency of data updates'))

  // Assert that the details component toggles content
  expect(screen.getByText('Frequency of data updates mock')).not.toBeVisible()
  await user.click(screen.getByText('Frequency of data updates'))
  expect(screen.getByText('Frequency of data updates mock')).toBeVisible()
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

test('Find', async () => {
  const user = userEvent.setup()

  render(await getComponent())

  expect(screen.getByTestId('frf-dsp-section-find')).toHaveAttribute('id', 'find')

  const section = within(screen.getByTestId('frf-dsp-section-find'))
  expect(section.getByRole('heading', { name: 'Find', level: 3 })).toBeInTheDocument()
  expect(section.getByText('Feasibility Service:')).toBeVisible()
  expect(section.getByText('How the service works:')).toBeVisible()
  expect(section.getByText('Expected timelines:')).toBeVisible()
  expect(section.getByText('Costs:')).toBeVisible()
  expect(
    section.getByText('The service is a cost recovery organisation. Costs to the user are based on the:')
  ).toBeVisible()

  // Assert that the details component toggles content
  expect(section.getByText('Statistical disclosure controls mock')).not.toBeVisible()
  await user.click(section.getByText('Statistical disclosure controls'))
  expect(section.getByText('Statistical disclosure controls mock')).toBeVisible()
})

test('Recruit', async () => {
  const user = userEvent.setup()

  render(await getComponent())

  expect(screen.getByTestId('frf-dsp-section-recruit')).toHaveAttribute('id', 'recruit')

  const section = within(screen.getByTestId('frf-dsp-section-recruit'))
  expect(section.getByRole('heading', { name: 'Recruit', level: 3 })).toBeInTheDocument()
  expect(
    section.getByText(
      'Recruitment service: Supports recruitment for clinical trials by identifying suitable patients and inviting them to participate on behalf of the research organisation.'
    )
  ).toBeVisible()
  expect(section.getByText('How the service works:')).toBeVisible()
  expect(section.getByText('Expected timelines:')).toBeVisible()
  expect(section.getByText('Costs:')).toBeVisible()
  expect(
    section.getByText(
      'Service is a cost recovery organisation and our costs to provide the service are based on staff time to design and conduct the search, set up and manage the technical requirements (online study platform), set up, monitoring and administrative management of practice activity for service delivery and general project management and administration of the service.'
    )
  ).toBeVisible()

  // Assert that the details component toggles content
  expect(section.getByText('Specific regulatory approvals mock')).not.toBeVisible()
  await user.click(section.getByText('Specific regulatory approvals'))
  expect(section.getByText('Specific regulatory approvals mock')).toBeVisible()
})

test('Follow-up', async () => {
  const user = userEvent.setup()

  render(await getComponent())

  expect(screen.getByTestId('frf-dsp-section-follow-up')).toHaveAttribute('id', 'follow-up')

  const section = within(screen.getByTestId('frf-dsp-section-follow-up'))
  expect(section.getByRole('heading', { name: 'Follow-up', level: 3 })).toBeInTheDocument()
  expect(section.getByText('How the service works:')).toBeVisible()
  expect(section.getByText('Expected timelines:')).toBeVisible()
  expect(section.getByText('Costs:')).toBeVisible()
  expect(
    section.getByText(
      'The service is a cost recovery organisation and our costs to provide the service are based on staff time to design and conduct the search, set up and manage the technical requirements (online study platform), set up, monitoring and administrative management of practice activity for service delivery and general project management and administration of the service.'
    )
  ).toBeVisible()

  // Assert that the details component toggles content
  expect(section.getByText('Further cost details mock')).not.toBeVisible()
  await user.click(section.getByText('Further cost details'))
  expect(section.getByText('Further cost details mock')).toBeVisible()
})

test('Service provider with only required content types', async () => {
  mockContentfulResponse(requiredFieldsOnlyMock)

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

  // Coverage
  expect(screen.getByRole('list', { name: 'Coverage' })).toBeInTheDocument()
  expect(screen.getByText('Geographical: UK wide')).toBeInTheDocument()

  // First published / Last published
  expect(screen.getByText('First published:')).toBeInTheDocument()
  expect(screen.getByText('5 June 2023')).toBeInTheDocument()
  expect(screen.getByText('Last updated:')).toBeInTheDocument()
  expect(screen.getByText('23 June 2023')).toBeInTheDocument()

  // Contact
  const sidebarColumn = screen.getByTestId('frf-dsp-sidebar')
  const heading = within(sidebarColumn).getByRole('heading', { name: 'Contact data service provider', level: 3 })
  expect(heading).toBeInTheDocument()
  expect(heading.nextSibling).toHaveTextContent(
    'If you think Genomic Profile Register might be able to help with your study you can contact them directly using this service.'
  )
  expect(
    within(sidebarColumn).getByRole('link', { name: 'Get in touch with Genomic Profile Register' })
  ).toHaveAttribute('href', '/contact-data-service-provider/genomic-profile-register')

  // Non-required fields
  expect(screen.queryByRole('table', { name: 'Services available and costs:' })).not.toBeInTheDocument()
  expect(screen.queryByText(fields.geographySupportingText)).not.toBeInTheDocument()
  expect(screen.queryByText('Population: 35,000,000')).not.toBeInTheDocument()

  expect(screen.queryByRole('list', { name: 'Suited to:' })).not.toBeInTheDocument()
  expect(screen.queryByRole('list', { name: 'Not suited to:' })).not.toBeInTheDocument()
  expect(screen.queryByTitle(`Video: ${fields.name}`)).not.toBeInTheDocument()
  expect(
    screen.queryByRole('link', {
      name: `For more information visit ${fields.websiteName} (Opens in a new window)`,
    })
  ).not.toBeInTheDocument()
  expect(screen.queryByText('Funded by:')).not.toBeInTheDocument()

  // Sidebar
  const sidebar = within(screen.getByTestId('frf-dsp-sidebar'))
  expect(sidebar.queryByRole('heading', { name: 'Type of data available', level: 3 })).not.toBeInTheDocument()
  expect(sidebar.getByRole('heading', { name: 'Contact data service provider', level: 3 })).toBeInTheDocument()
  expect(sidebar.getByRole('heading', { name: 'Get support for your research', level: 3 })).toBeInTheDocument()
})
