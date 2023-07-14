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
  expect(screen.getByLabelText('Is your enquiry about')).toBeRequired()
  expect(screen.getByLabelText('Identifying appropriate data services')).toBeInTheDocument()
  expect(screen.getByLabelText('General enquiry about research support')).toBeInTheDocument()

  // Please provide a summary of the support you need
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toBeInTheDocument()
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toBeRequired()
  expect(screen.getByText('You have 500 characters remaining')).toBeInTheDocument()

  // Fieldset - About you
  const about = within(screen.getByRole('group', { name: 'About you' }))

  // Name
  expect(about.getByLabelText('Full name')).toBeInTheDocument()
  expect(about.getByLabelText('Full name')).toBeRequired()

  // Email
  expect(about.getByLabelText('Email address')).toBeInTheDocument()
  expect(about.getByLabelText('Email address')).toBeRequired()

  // Phone
  expect(about.getByLabelText('Telephone')).toBeInTheDocument()
  expect(about.getByLabelText('Telephone')).toBeRequired()
  expect(about.getByText('For international numbers please include the country code')).toBeInTheDocument()

  // Job
  expect(about.getByLabelText('Job role')).toBeInTheDocument()
  expect(about.getByLabelText('Job role')).toBeRequired()

  // Org name
  expect(about.getByLabelText('Organisation name')).toBeInTheDocument()
  expect(about.getByLabelText('Organisation name')).toBeRequired()

  // Org type
  expect(about.getByLabelText('Is your organisation')).toBeInTheDocument()
  expect(about.getByLabelText('Is your organisation')).toBeRequired()
  expect(about.getByLabelText('Commercial')).toBeInTheDocument()
  expect(about.getByLabelText('Non-commercial')).toBeInTheDocument()

  // Fieldset - About your research
  const research = within(screen.getByRole('group', { name: 'About your research' }))

  // Region
  const regionSelect = research.getByLabelText('Which region will take a lead in supporting your research?')
  expect(regionSelect).toBeInTheDocument()
  expect(regionSelect).toBeRequired()
  expect(
    research.getByText(
      'This is the region within which the Chief Investigator or Clinical Trials Unit (CTU) is based (or for Commercial Studies the lead region selected by the Sponsor).'
    )
  ).toBeInTheDocument()

  expect(research.getByText(/If you are unsure which region to select, please visit/)).toBeInTheDocument()
  expect(research.getByText(/Local Clinical Research Networks/)).toHaveAttribute(
    'href',
    'https://local.nihr.ac.uk/lcrn'
  )
  expect(research.getByText(/(for regions within England)/)).toBeInTheDocument()
  expect(research.getByText(/or email supportmystudy@nihr.ac.uk/)).toBeInTheDocument()

  expect(within(regionSelect).getByText('-')).toHaveAttribute('selected')
  expect(within(regionSelect).getByText('-')).toHaveValue('')
  expect(within(regionSelect).getByText('Mock region 1')).toHaveValue('mockregion1@nihr.ac.uk')
  expect(within(regionSelect).getByText('Mock region 2')).toHaveValue('mockregion2@nihr.ac.uk')
  expect(within(regionSelect).queryByText('Unknown')).not.toBeInTheDocument()

  // Study title (optional)
  expect(research.getByLabelText('Study title (optional)')).toBeInTheDocument()
  expect(research.getByLabelText('Study title (optional)')).not.toBeRequired()

  // Protocol reference (optional)
  expect(research.getByLabelText('Protocol reference (optional)')).toBeInTheDocument()
  expect(research.getByLabelText('Protocol reference (optional)')).not.toBeRequired()

  // CPMS ID (optional)
  expect(research.getByLabelText('CPMS ID (optional)')).toBeInTheDocument()
  expect(research.getByLabelText('CPMS ID (optional)')).not.toBeRequired()
  expect(
    research.getByText(
      'A unique study identifier given to all eligible studies recorded on the NIHR CRN Central Portfolio Management System (CPMS) database.'
    )
  ).toBeInTheDocument()

  // Form CTAs
  expect(screen.getByText('We will email you a copy of this form for your records')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
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
  await user.type(screen.getByLabelText('Telephone'), '+447552121212')
  await user.type(screen.getByLabelText('Job role'), 'Researcher')
  await user.type(screen.getByLabelText('Organisation name'), 'NIHR')
  await user.click(screen.getByLabelText('Commercial'))
  await user.selectOptions(screen.getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(screen.getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(screen.getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(screen.getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(screen.getByRole('button', { name: 'Submit' }))

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
  await user.type(screen.getByLabelText('Telephone'), '+447552121212')
  await user.type(screen.getByLabelText('Job role'), 'Researcher')
  await user.type(screen.getByLabelText('Organisation name'), 'NIHR')
  await user.click(screen.getByLabelText('Commercial'))
  await user.selectOptions(screen.getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(screen.getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(screen.getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(screen.getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(screen.getByRole('button', { name: 'Submit' }))

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

  await user.click(screen.getByRole('button', { name: 'Submit' }))

  // Summary errors
  const alert = screen.getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Select the type of enquiry' })).toHaveAttribute(
    'href',
    '#enquiryType'
  )
  expect(within(alert).getByRole('link', { name: 'Enter a summary of the support you need' })).toHaveAttribute(
    'href',
    '#supportDescription'
  )
  expect(within(alert).getByRole('link', { name: 'Enter a full name' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Enter a valid email address' })).toHaveAttribute(
    'href',
    '#emailAddress'
  )
  expect(within(alert).getByRole('link', { name: 'Enter a telephone' })).toHaveAttribute('href', '#phoneNumber')
  expect(within(alert).getByRole('link', { name: 'Enter a job role' })).toHaveAttribute('href', '#jobRole')
  expect(within(alert).getByRole('link', { name: 'Enter an organisation name' })).toHaveAttribute(
    'href',
    '#organisationName'
  )
  expect(within(alert).getByRole('link', { name: 'Select the type of organisation' })).toHaveAttribute(
    'href',
    '#organisationType'
  )
  expect(within(alert).getByRole('link', { name: 'Select a lead region' })).toHaveAttribute('href', '#lcrn')

  // Field errors
  expect(screen.getByLabelText('Is your enquiry about')).toHaveErrorMessage('Error: Select the type of enquiry')
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Enter a summary of the support you need'
  )
  expect(screen.getByLabelText('Full name')).toHaveErrorMessage('Error: Enter a full name')
  expect(screen.getByLabelText('Email address')).toHaveErrorMessage('Error: Enter a valid email address')
  expect(screen.getByLabelText('Telephone')).toHaveErrorMessage('Error: Enter a telephone')
  expect(screen.getByLabelText('Job role')).toHaveErrorMessage('Error: Enter a job role')
  expect(screen.getByLabelText('Organisation name')).toHaveErrorMessage('Error: Enter an organisation name')
  expect(screen.getByLabelText('Is your organisation')).toHaveErrorMessage('Error: Select the type of organisation')
  expect(screen.getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Select a lead region'
  )
})

test('Server side field validation errors', async () => {
  mockRouter.push(
    '?enquiryTypeError=Select+the+type+of+enquiry&supportDescriptionError=Enter+a+summary+of+the+support+you+need&fullNameError=Full+name+is+required&emailAddressError=Email+address+is+required&phoneNumberError=Telephone+is+not+a+recognised+format&jobRoleError=Job+role+is+required&organisationNameError=Organisation+name+is+required&organisationTypeError=Organisation+type+is+required&lcrnError=Which+region+will+take+a+lead+in+supporting+your+research+is+required'
  )

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  render(ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false }))

  // Summary errors
  const alert = screen.getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Select the type of enquiry' })).toHaveAttribute(
    'href',
    '#enquiryType'
  )
  expect(within(alert).getByRole('link', { name: 'Enter a summary of the support you need' })).toHaveAttribute(
    'href',
    '#supportDescription'
  )
  expect(within(alert).getByRole('link', { name: 'Full name is required' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Email address is required' })).toHaveAttribute(
    'href',
    '#emailAddress'
  )
  expect(within(alert).getByRole('link', { name: 'Telephone is not a recognised format' })).toHaveAttribute(
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
  expect(screen.getByLabelText('Is your enquiry about')).toHaveErrorMessage('Error: Select the type of enquiry')
  expect(screen.getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Enter a summary of the support you need'
  )
  expect(screen.getByLabelText('Full name')).toHaveErrorMessage('Error: Full name is required')
  expect(screen.getByLabelText('Email address')).toHaveErrorMessage('Error: Email address is required')
  expect(screen.getByLabelText('Telephone')).toHaveErrorMessage('Error: Telephone is not a recognised format')
  expect(screen.getByLabelText('Job role')).toHaveErrorMessage('Error: Job role is required')
  expect(screen.getByLabelText('Organisation name')).toHaveErrorMessage('Error: Organisation name is required')
  expect(screen.getByLabelText('Is your organisation')).toHaveErrorMessage('Error: Organisation type is required')
  expect(screen.getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Which region will take a lead in supporting your research is required'
  )
})
