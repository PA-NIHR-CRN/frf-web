import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/contactResearchSupport'
import ContactResearchSupport, {
  ContactResearchSupportProps,
  getServerSideProps,
} from '@/pages/contact-research-support'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock axios
jest.mock('axios')
jest.mock('@/lib/logger')

beforeEach(() => {
  console.error = jest.fn()
  mockRouter.push('/contact-research-support')
  mockContentfulResponse(defaultMock)
  jest.clearAllMocks()
})

test('Initial form state', async () => {
  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(<ContactResearchSupport {...props} />)

  expect(screen.getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  expect(
    screen.getByText(
      'The UK offers multiple services and teams of professionals who can support you with identifying appropriate data services or wider support with planning and delivering your study in the UK.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'If you would like to access this support please complete the form below and a professional from the relevant research support infrastructure will get in touch to respond to your request'
    )
  ).toBeInTheDocument()

  expect(screen.getByRole('heading', { name: 'About your enquiry', level: 3 })).toBeInTheDocument()

  // Is your enquiry about
  expect(screen.getByLabelText('Is your enquiry about')).toBeInTheDocument()
  expect(screen.getByLabelText('Identifying appropriate data services')).toBeInTheDocument()
  expect(screen.getByLabelText('General enquiry about research support')).toBeInTheDocument()

  // Please provide a summary of the support you need
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toBeInTheDocument()
  expect(screen.getByText('You have 500 characters remaining')).toBeInTheDocument()

  // Fieldset - About you
  const about = within(screen.getByRole('group', { name: 'About you' }))

  // Name
  expect(about.getByLabelText('Full name')).toBeInTheDocument()

  // Email
  expect(about.getByLabelText('Email address')).toBeInTheDocument()

  // Phone
  expect(about.getByLabelText('Phone number')).toBeInTheDocument()
  expect(about.getByText('For international numbers please include the country code')).toBeInTheDocument()

  // Job
  expect(about.getByLabelText('Job role')).toBeInTheDocument()

  // Org name
  expect(about.getByLabelText('Organisation name')).toBeInTheDocument()

  // Org type
  expect(about.getByLabelText('Is your organisation')).toBeInTheDocument()
  expect(about.getByLabelText('Commercial')).toBeInTheDocument()
  expect(about.getByLabelText('Non-commercial')).toBeInTheDocument()

  // Fieldset - About your research
  const research = within(screen.getByRole('group', { name: 'About your research' }))

  // Region
  const regionSelect = research.getByLabelText('Which region will take a lead in supporting your research?')
  expect(regionSelect).toBeInTheDocument()
  expect(
    research.getByText(
      'This is the region within which the Chief Investigator or Clinical Trials Unit (CTU) is based (or for Commercial Studies the lead region selected by the Sponsor).'
    )
  ).toBeInTheDocument()

  expect(research.getByText(/If you are unsure which region to select, please visit/)).toBeInTheDocument()
  expect(research.getByText(/Local Clinical Research Networks/)).toHaveAttribute('href', '#')
  expect(research.getByText(/or email supportmystudy@nihr.ac.uk/)).toBeInTheDocument()

  expect(within(regionSelect).getByText('-')).toHaveAttribute('selected')
  expect(within(regionSelect).getByText('-')).toHaveValue('')
  expect(within(regionSelect).getByText('Mock region 1')).toHaveValue('mockregion1@nihr.ac.uk')
  expect(within(regionSelect).getByText('Mock region 2')).toHaveValue('mockregion2@nihr.ac.uk')
  expect(within(regionSelect).queryByText('Unknown')).not.toBeInTheDocument()

  // Study title (optional)
  expect(research.getByLabelText('Study title (optional)')).toBeInTheDocument()

  // Protocol reference (optional)
  expect(research.getByLabelText('Protocol reference (optional)')).toBeInTheDocument()

  // CPMS ID (optional)
  expect(research.getByLabelText('CPMS ID (optional)')).toBeInTheDocument()
  expect(
    research.getByText(
      'A unique study identifier given to all eligible studies recorded on the NIHR CRN Central Portfolio Management System (CPMS) database.'
    )
  ).toBeInTheDocument()

  // Form CTAs
  expect(screen.getByText('We will email you a copy of this form for your records')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Save and continue' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Cancel' })).toHaveAttribute('href', '/')
})

test('Successful submission redirects to confirmation page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/contact-research-support/confirmation' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false }))

  expect(screen.getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  await user.click(screen.getByLabelText('General enquiry about research support'))
  await user.type(
    screen.getByLabelText('Please provide a summary of the support you need'),
    'Looking for help on my research study'
  )
  await user.type(screen.getByLabelText('Full name'), 'John Terry')
  await user.type(screen.getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(screen.getByLabelText('Phone number'), '+447552121212')
  await user.type(screen.getByLabelText('Job role'), 'Researcher')
  await user.type(screen.getByLabelText('Organisation name'), 'NIHR')
  await user.click(screen.getByLabelText('Commercial'))
  await user.selectOptions(screen.getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(screen.getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(screen.getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(screen.getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(screen.getByRole('button', { name: 'Save and continue' }))

  expect(mockRouter.pathname).toBe('/contact-research-support/confirmation')
})

test('Failed submission due to a misc server error shows an error at the top of the page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/contact-research-support/?fatal=1' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false }))

  expect(screen.getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  await user.click(screen.getByLabelText('General enquiry about research support'))
  await user.type(
    screen.getByLabelText('Please provide a summary of the support you need'),
    'Looking for help on my research study'
  )
  await user.type(screen.getByLabelText('Full name'), 'John Terry')
  await user.type(screen.getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(screen.getByLabelText('Phone number'), '+447552121212')
  await user.type(screen.getByLabelText('Job role'), 'Researcher')
  await user.type(screen.getByLabelText('Organisation name'), 'NIHR')
  await user.click(screen.getByLabelText('Commercial'))
  await user.selectOptions(screen.getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(screen.getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(screen.getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(screen.getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(screen.getByRole('button', { name: 'Save and continue' }))

  expect(mockRouter.asPath).toBe('/contact-research-support?fatal=1')

  const alert = screen.getByRole('alert')
  expect(
    within(alert).getByText('An unexpected error occured whilst processing the form, please try again later.')
  ).toBeInTheDocument()
})

test('Form submission with client side validation errors', async () => {
  const user = userEvent.setup()

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false }))

  await user.click(screen.getByRole('button', { name: 'Save and continue' }))

  // Summary errors
  const alert = screen.getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Is your enquiry about is required' })).toHaveAttribute(
    'href',
    '#enquiryType'
  )
  expect(
    within(alert).getByRole('link', { name: 'Please provide a summary of the support you need is required' })
  ).toHaveAttribute('href', '#supportDescription')
  expect(within(alert).getByRole('link', { name: 'Full name is required' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Email address must be a valid email' })).toHaveAttribute(
    'href',
    '#emailAddress'
  )
  expect(within(alert).getByRole('link', { name: 'Phone number is required' })).toHaveAttribute('href', '#phoneNumber')
  expect(within(alert).getByRole('link', { name: 'Job role is required' })).toHaveAttribute('href', '#jobRole')
  expect(within(alert).getByRole('link', { name: 'Organisation name is required' })).toHaveAttribute(
    'href',
    '#organisationName'
  )
  expect(within(alert).getByRole('link', { name: 'Organisation type is required' })).toHaveAttribute(
    'href',
    '#organisationType'
  )
  expect(
    within(alert).getByRole('link', { name: 'Which region will take a lead in supporting your research is required' })
  ).toHaveAttribute('href', '#lcrn')

  // Field errors
  expect(screen.getByLabelText('Is your enquiry about')).toHaveErrorMessage('Error: Is your enquiry about is required')
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Please provide a summary of the support you need is required'
  )
  expect(screen.getByLabelText('Full name')).toHaveErrorMessage('Error: Full name is required')
  expect(screen.getByLabelText('Email address')).toHaveErrorMessage('Error: Email address must be a valid email')
  expect(screen.getByLabelText('Phone number')).toHaveErrorMessage('Error: Phone number is required')
  expect(screen.getByLabelText('Job role')).toHaveErrorMessage('Error: Job role is required')
  expect(screen.getByLabelText('Organisation name')).toHaveErrorMessage('Error: Organisation name is required')
  expect(screen.getByLabelText('Is your organisation')).toHaveErrorMessage('Error: Organisation type is required')
  expect(screen.getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Which region will take a lead in supporting your research is required'
  )
})

test('Server side field validation errors', async () => {
  mockRouter.push(
    '?enquiryTypeError=Is+your+enquiry+about+is+required&supportDescriptionError=Please+provide+a+summary+of+the+support+you+need+is+required&fullNameError=Full+name+is+required&emailAddressError=Email+address+is+required&phoneNumberError=Phone+number+is+not+a+recognised+format&jobRoleError=Job+role+is+required&organisationNameError=Organisation+name+is+required&organisationTypeError=Organisation+type+is+required&lcrnError=Which+region+will+take+a+lead+in+supporting+your+research+is+required'
  )

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false }))

  // Summary errors
  const alert = screen.getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Is your enquiry about is required' })).toHaveAttribute(
    'href',
    '#enquiryType'
  )
  expect(
    within(alert).getByRole('link', { name: 'Please provide a summary of the support you need is required' })
  ).toHaveAttribute('href', '#supportDescription')
  expect(within(alert).getByRole('link', { name: 'Full name is required' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Email address is required' })).toHaveAttribute(
    'href',
    '#emailAddress'
  )
  expect(within(alert).getByRole('link', { name: 'Phone number is not a recognised format' })).toHaveAttribute(
    'href',
    '#phoneNumber'
  )
  expect(within(alert).getByRole('link', { name: 'Job role is required' })).toHaveAttribute('href', '#jobRole')
  expect(within(alert).getByRole('link', { name: 'Organisation name is required' })).toHaveAttribute(
    'href',
    '#organisationName'
  )
  expect(within(alert).getByRole('link', { name: 'Organisation type is required' })).toHaveAttribute(
    'href',
    '#organisationType'
  )
  expect(
    within(alert).getByRole('link', { name: 'Which region will take a lead in supporting your research is required' })
  ).toHaveAttribute('href', '#lcrn')

  // Field errors
  expect(screen.getByLabelText('Is your enquiry about')).toHaveErrorMessage('Error: Is your enquiry about is required')
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Please provide a summary of the support you need is required'
  )
  expect(screen.getByLabelText('Full name')).toHaveErrorMessage('Error: Full name is required')
  expect(screen.getByLabelText('Email address')).toHaveErrorMessage('Error: Email address is required')
  expect(screen.getByLabelText('Phone number')).toHaveErrorMessage('Error: Phone number is not a recognised format')
  expect(screen.getByLabelText('Job role')).toHaveErrorMessage('Error: Job role is required')
  expect(screen.getByLabelText('Organisation name')).toHaveErrorMessage('Error: Organisation name is required')
  expect(screen.getByLabelText('Is your organisation')).toHaveErrorMessage('Error: Organisation type is required')
  expect(screen.getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Which region will take a lead in supporting your research is required'
  )
})
