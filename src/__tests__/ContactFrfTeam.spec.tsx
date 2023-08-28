import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { RootLayout } from '@/components/Layout/RootLayout'
import { render, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/serviceProvider'
import ContactFrfTeam, { ContactFrfTeamProps, getServerSideProps } from '@/pages/contact-frf-team/index'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock axios
jest.mock('axios')
jest.mock('@/lib/logger')

beforeEach(() => {
  mockContentfulResponse(defaultMock)
  console.error = jest.fn()
  mockRouter.push('/contact-data-service-provider/mock-dsp')
  jest.clearAllMocks()
})

test('Initial form state', async () => {
  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamProps
  }

  const { getByLabelText, getByRole, getByText } = render(
    <RootLayout {...props}>
      <ContactFrfTeam {...props} />
    </RootLayout>
  )

  expect(getByRole('heading', { name: 'Contact us', level: 1 })).toBeInTheDocument()

  expect(
    getByRole('heading', { name: 'Contact Find, Recruit and Follow-up central team', level: 2 })
  ).toBeInTheDocument()

  expect(
    getByText(
      'The Find, Recruit and Follow-up central team manage the content of this website and can be contacted in relation to general enquiries about Find, Recruit and Follow-up advisory support.'
    )
  ).toBeInTheDocument()

  expect(
    getByText(
      'If you would like to get in touch with the team, please complete the form below and a member of the team will respond to your enquiry.'
    )
  ).toBeInTheDocument()

  expect(getByText('All fields are required unless marked as optional.')).toBeInTheDocument()

  // Name
  expect(getByLabelText('Full name')).toBeInTheDocument()
  expect(getByLabelText('Full name')).toBeRequired()

  // Email
  expect(getByLabelText('Email address')).toBeInTheDocument()
  expect(getByLabelText('Email address')).toBeRequired()

  // Phone
  expect(getByLabelText('Telephone (optional)')).toBeInTheDocument()
  expect(getByLabelText('Telephone (optional)')).not.toBeRequired()
  expect(getByText('For international numbers please include the country code')).toBeInTheDocument()

  // Job
  expect(getByLabelText('Job role')).toBeInTheDocument()
  expect(getByLabelText('Job role')).toBeRequired()

  // Org name
  expect(getByLabelText('Organisation name')).toBeInTheDocument()
  expect(getByLabelText('Organisation name')).toBeRequired()

  expect(getByLabelText('Please provide details of your enquiry')).toBeInTheDocument()
  expect(getByLabelText('Please provide details of your enquiry')).toBeRequired()
  expect(getByText('You have 1200 characters remaining')).toBeInTheDocument()

  // Form CTAs
  expect(getByText('We will email you a copy of this form for your records')).toBeInTheDocument()
  expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})

test('Successful submission redirects to confirmation page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/contact-data-service-provider/mock-dsp/confirmation/mock-ref-123' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamProps
  }

  const { getByLabelText, getByRole } = render(
    ContactFrfTeam.getLayout(<ContactFrfTeam {...props} />, { ...props, isPreviewMode: false })
  )

  expect(
    getByRole('heading', { name: 'Contact Find, Recruit and Follow-up central team', level: 2 })
  ).toBeInTheDocument()

  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.type(getByLabelText('Please provide details of your enquiry'), 'Looking for help on my research study')

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.pathname).toBe('/contact-data-service-provider/mock-dsp/confirmation/mock-ref-123')
})

test('Failed submission due to a misc server error shows an error at the top of the page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/contact-data-service-provider/mock-dsp?fatal=1' },
  })

  const context = { query: {} } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamProps
  }

  const { getByLabelText, getByRole } = render(
    ContactFrfTeam.getLayout(<ContactFrfTeam {...props} />, { ...props, isPreviewMode: false })
  )

  expect(
    getByRole('heading', { name: 'Contact Find, Recruit and Follow-up central team', level: 2 })
  ).toBeInTheDocument()

  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.type(getByLabelText('Please provide details of your enquiry'), 'Looking for help on my research study')

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.asPath).toBe('/contact-data-service-provider/mock-dsp?fatal=1')

  const alert = getByRole('alert')
  expect(
    within(alert).getByText('An unexpected error occured whilst processing the form, please try again later.')
  ).toBeInTheDocument()
})

test('Form submission with client side validation errors', async () => {
  const user = userEvent.setup()

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamProps
  }

  const { getByLabelText, getByRole } = render(
    ContactFrfTeam.getLayout(<ContactFrfTeam {...props} />, { ...props, isPreviewMode: false })
  )

  await userEvent.type(getByLabelText('Telephone (optional)'), 'Fake number')

  await user.click(getByRole('button', { name: 'Submit' }))

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })

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
  expect(
    within(alert).getByRole('link', {
      name: 'Enter your organisation name, Local Clinical Research Network or Devolved Nation',
    })
  ).toHaveAttribute('href', '#organisationName')
  expect(
    within(alert).getByRole('link', { name: 'Enter a description of your study(ies) and/ or service(s) of interest' })
  ).toHaveAttribute('href', '#details')

  // Field errors
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Enter your full name')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Enter a valid email address')
  expect(getByLabelText('Telephone (optional)')).toHaveErrorMessage(
    'Error: Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
  )
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Enter your job role')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage(
    'Error: Enter your organisation name, Local Clinical Research Network or Devolved Nation'
  )
  expect(getByLabelText('Please provide details of your enquiry')).toHaveErrorMessage(
    'Error: Enter a description of your study(ies) and/ or service(s) of interest'
  )
})

test('Server side field validation errors', async () => {
  mockRouter.push(
    '/contact-frf-team/?fullNameError=Enter+your+full+name&emailAddressError=Enter+an+email+address&jobRoleError=Enter+your+job+role&organisationNameError=Enter+your+organisation+name'
  )

  const context = { query: {} } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamProps
  }

  const { getByLabelText, getByRole } = render(
    ContactFrfTeam.getLayout(<ContactFrfTeam {...props} />, { ...props, isPreviewMode: false })
  )

  // Summary errors
  const alert = getByRole('alert', { name: 'There is a problem' })

  expect(within(alert).getByRole('link', { name: 'Enter your full name' })).toHaveAttribute('href', '#fullName')
  expect(within(alert).getByRole('link', { name: 'Enter an email address' })).toHaveAttribute('href', '#emailAddress')
  expect(within(alert).getByRole('link', { name: 'Enter your job role' })).toHaveAttribute('href', '#jobRole')
  expect(within(alert).getByRole('link', { name: 'Enter your organisation name' })).toHaveAttribute(
    'href',
    '#organisationName'
  )

  // Field errors
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Enter your full name')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Enter an email address')
  expect(getByLabelText('Telephone (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Enter your job role')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage('Error: Enter your organisation name')
})
