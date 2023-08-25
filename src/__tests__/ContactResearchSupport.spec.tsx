import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { RootLayout } from '@/components/Layout/RootLayout'
import { render, within } from '@/config/test-utils'
import { emailContactsMock } from '@/mocks/contactResearchSupport'
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
  mockContentfulResponse(emailContactsMock)
  jest.clearAllMocks()
})

test('Initial form state', async () => {
  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  const { getByLabelText, getByRole, getByText } = render(
    <RootLayout {...props}>
      <ContactResearchSupport {...props} />
    </RootLayout>
  )

  expect(getByRole('heading', { name: 'Get support for your research', level: 1 })).toBeInTheDocument()

  expect(
    getByText(
      'The UK offers multiple services and teams of professionals who can support you with identifying appropriate data services or wider support with planning and delivering your study in the UK.'
    )
  ).toBeInTheDocument()

  expect(
    getByText(
      'If you would like to access this support please complete the form below and a professional from the relevant research support infrastructure will get in touch to respond to your request'
    )
  ).toBeInTheDocument()

  expect(getByText('All fields are required unless marked as optional.')).toBeInTheDocument()

  expect(getByRole('group', { name: 'About your enquiry' })).toBeInTheDocument()

  // Is your enquiry about
  expect(getByRole('group', { name: 'Is your enquiry about' })).toBeInTheDocument()
  expect(getByLabelText('Identifying appropriate data services')).toBeInTheDocument()
  expect(getByLabelText('General enquiry about research support')).toBeInTheDocument()

  // Please provide a summary of the support you need
  expect(getByLabelText('Please provide a summary of the support you need')).toBeInTheDocument()
  expect(getByLabelText('Please provide a summary of the support you need')).toBeRequired()
  expect(getByText('You have 1200 characters remaining')).toBeInTheDocument()

  // Fieldset - About you
  const about = within(getByRole('group', { name: 'About you' }))

  // Name
  expect(about.getByLabelText('Full name')).toBeInTheDocument()
  expect(about.getByLabelText('Full name')).toBeRequired()

  // Email
  expect(about.getByLabelText('Email address')).toBeInTheDocument()
  expect(about.getByLabelText('Email address')).toBeRequired()

  // Phone
  expect(about.getByLabelText('Telephone (optional)')).toBeInTheDocument()
  expect(about.getByLabelText('Telephone (optional)')).not.toBeRequired()
  expect(about.getByText('For international numbers please include the country code')).toBeInTheDocument()

  // Job
  expect(about.getByLabelText('Job role')).toBeInTheDocument()
  expect(about.getByLabelText('Job role')).toBeRequired()

  // Org name
  expect(about.getByLabelText('Organisation name')).toBeInTheDocument()
  expect(about.getByLabelText('Organisation name')).toBeRequired()

  // Org type
  expect(about.getByRole('group', { name: 'Is your organisation' })).toBeInTheDocument()
  expect(about.getByLabelText('Commercial')).toBeInTheDocument()
  expect(about.getByLabelText('Non-commercial')).toBeInTheDocument()

  // Fieldset - About your research
  const research = within(getByRole('group', { name: 'About your research' }))

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
  expect(getByText('We will email you a copy of this form for your records')).toBeInTheDocument()
  expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
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

  const { getByLabelText, getByRole } = render(
    ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false })
  )

  expect(getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  await user.click(getByLabelText('General enquiry about research support'))
  await user.type(
    getByLabelText('Please provide a summary of the support you need'),
    'Looking for help on my research study'
  )
  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.click(getByLabelText('Commercial'))
  await user.selectOptions(getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(getByRole('button', { name: 'Submit' }))

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

  const { getByLabelText, getByRole } = render(
    ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false })
  )

  expect(getByRole('heading', { name: 'Contact research support', level: 2 })).toBeInTheDocument()

  await user.click(getByLabelText('General enquiry about research support'))
  await user.type(
    getByLabelText('Please provide a summary of the support you need'),
    'Looking for help on my research study'
  )
  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.click(getByLabelText('Commercial'))
  await user.selectOptions(getByLabelText('Which region will take a lead in supporting your research?'), [
    'Mock region 2',
  ])
  await user.type(getByLabelText('Study title (optional)'), 'My Test Study')
  await user.type(getByLabelText('Protocol reference (optional)'), 'test-protocol-ref')
  await user.type(getByLabelText('CPMS ID (optional)'), 'test-cpms-id')

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.asPath).toBe('/contact-research-support?fatal=1')

  const alert = getByRole('alert')
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

  const { getByLabelText, getByRole } = render(
    ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false })
  )

  await userEvent.type(getByLabelText('Telephone (optional)'), 'Fake number')

  await user.click(getByRole('button', { name: 'Submit' }))

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })
  expect(within(alert).getByRole('link', { name: 'Select the type of enquiry' })).toHaveAttribute(
    'href',
    '#enquiryType'
  )
  expect(within(alert).getByRole('link', { name: 'Enter a summary of the support you need' })).toHaveAttribute(
    'href',
    '#supportDescription'
  )
  expect(within(alert).getByRole('link', { name: 'Enter your full name' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Enter a valid email address' })).toHaveAttribute(
    'href',
    '#emailAddress'
  )
  expect(
    within(alert).getByRole('link', {
      name: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192',
    })
  ).toHaveAttribute('href', '#phoneNumber')
  expect(within(alert).getByRole('link', { name: 'Enter your job role' })).toHaveAttribute('href', '#jobRole')
  expect(within(alert).getByRole('link', { name: 'Enter your organisation name' })).toHaveAttribute(
    'href',
    '#organisationName'
  )
  expect(within(alert).getByRole('link', { name: 'Select the type of organisation' })).toHaveAttribute(
    'href',
    '#organisationType'
  )
  expect(within(alert).getByRole('link', { name: 'Select a lead region' })).toHaveAttribute('href', '#lcrn')

  // Field errors
  expect(getByRole('group', { name: 'Is your enquiry about' })).toHaveErrorMessage('Error: Select the type of enquiry')
  expect(getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Enter a summary of the support you need'
  )
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Enter your full name')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Enter a valid email address')
  expect(getByLabelText('Telephone (optional)')).toHaveErrorMessage(
    'Error: Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
  )
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Enter your job role')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage('Error: Enter your organisation name')
  expect(getByRole('group', { name: 'Is your organisation' })).toHaveErrorMessage(
    'Error: Select the type of organisation'
  )
  expect(getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Select a lead region'
  )
})

test('Server side field validation errors', async () => {
  mockRouter.push(
    '?enquiryTypeError=Select+the+type+of+enquiry&supportDescriptionError=Enter+a+summary+of+the+support+you+need&fullNameError=Full+name+is+required&emailAddressError=Email+address+is+required&jobRoleError=Job+role+is+required&organisationNameError=Organisation+name+is+required&organisationTypeError=Organisation+type+is+required&lcrnError=Which+region+will+take+a+lead+in+supporting+your+research+is+required'
  )

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportProps
  }

  const { getByLabelText, getByRole } = render(
    ContactResearchSupport.getLayout(<ContactResearchSupport {...props} />, { ...props, isPreviewMode: false })
  )

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })
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
  expect(getByRole('group', { name: 'Is your enquiry about' })).toHaveErrorMessage('Error: Select the type of enquiry')
  expect(getByLabelText('Please provide a summary of the support you need')).toHaveErrorMessage(
    'Error: Enter a summary of the support you need'
  )
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Full name is required')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Email address is required')
  expect(getByLabelText('Telephone (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Job role is required')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage('Error: Organisation name is required')
  expect(getByRole('group', { name: 'Is your organisation' })).toHaveErrorMessage(
    'Error: Organisation type is required'
  )
  expect(getByLabelText('Which region will take a lead in supporting your research?')).toHaveErrorMessage(
    'Error: Which region will take a lead in supporting your research is required'
  )
})
