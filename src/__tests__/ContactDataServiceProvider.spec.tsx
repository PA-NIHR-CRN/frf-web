import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { render, within } from '@/config/test-utils'
import { defaultMock } from '@/mocks/serviceProvider'
import ContactDataServiceProvider, {
  ContactDataServiceProviderProps,
  getServerSideProps,
} from '@/pages/contact-data-service-provider/[slug]'
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
  const context = { query: { slug: defaultMock.items[0].fields.slug } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderProps
  }

  const { getByLabelText, getByRole, getByText } = render(<ContactDataServiceProvider {...props} />)

  expect(getByRole('heading', { name: 'Get in touch with Genomic Profile Register', level: 2 })).toBeInTheDocument()

  expect(
    getByText(
      'Upon submitting this form, your contact details will be shared with Genomic Profile Register so they can contact you to discuss further.'
    )
  ).toBeInTheDocument()

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

  // Please outline which services you are interested in and, if applicable, a brief description of your research
  expect(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    )
  ).toBeInTheDocument()
  expect(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    )
  ).toBeRequired()
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

  const context = { query: { slug: defaultMock.items[0].fields.slug } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderProps
  }

  const { getByLabelText, getByRole } = render(
    ContactDataServiceProvider.getLayout(<ContactDataServiceProvider {...props} />, { ...props, isPreviewMode: false })
  )

  expect(getByRole('heading', { name: 'Get in touch with Genomic Profile Register', level: 2 })).toBeInTheDocument()

  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.type(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    ),
    'Looking for help on my research study'
  )

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.pathname).toBe('/contact-data-service-provider/mock-dsp/confirmation/mock-ref-123')
})

test('Failed submission due to a misc server error shows an error at the top of the page', async () => {
  const user = userEvent.setup()

  const apiHandlerMock = jest.mocked(axios.post)
  apiHandlerMock.mockResolvedValueOnce({
    request: { responseURL: 'http://localhost:3000/contact-data-service-provider/mock-dsp?fatal=1' },
  })

  const context = { query: { slug: defaultMock.items[0].fields.slug } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderProps
  }

  const { getByLabelText, getByRole } = render(
    ContactDataServiceProvider.getLayout(<ContactDataServiceProvider {...props} />, { ...props, isPreviewMode: false })
  )

  expect(getByRole('heading', { name: 'Get in touch with Genomic Profile Register', level: 2 })).toBeInTheDocument()

  await user.type(getByLabelText('Full name'), 'John Terry')
  await user.type(getByLabelText('Email address'), 'testemail@nihr.ac.ul')
  await user.type(getByLabelText('Telephone (optional)'), '+447552121212')
  await user.type(getByLabelText('Job role'), 'Researcher')
  await user.type(getByLabelText('Organisation name'), 'NIHR')
  await user.type(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    ),
    'Looking for help on my research study'
  )

  await user.click(getByRole('button', { name: 'Submit' }))

  expect(mockRouter.asPath).toBe('/contact-data-service-provider/mock-dsp?fatal=1')

  const alert = getByRole('alert')
  expect(
    within(alert).getByText('An unexpected error occured whilst processing the form, please try again later.')
  ).toBeInTheDocument()
})

test('Form submission with client side validation errors', async () => {
  const user = userEvent.setup()

  const context = { query: { slug: defaultMock.items[0].fields.slug } } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderProps
  }

  const { getByLabelText, getByRole } = render(
    ContactDataServiceProvider.getLayout(<ContactDataServiceProvider {...props} />, { ...props, isPreviewMode: false })
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
  expect(within(alert).getByRole('link', { name: 'Enter your organisation name' })).toHaveAttribute(
    'href',
    '#organisationName'
  )
  expect(
    within(alert).getByRole('link', { name: 'Enter a description of your study and/ or service of interest' })
  ).toHaveAttribute('href', '#studyDescription')

  // Field errors
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Enter your full name')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Enter a valid email address')
  expect(getByLabelText('Telephone (optional)')).toHaveErrorMessage(
    'Error: Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192'
  )
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Enter your job role')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage('Error: Enter your organisation name')
  expect(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    )
  ).toHaveErrorMessage('Error: Enter a description of your study and/ or service of interest')
})

test('Server side field validation errors', async () => {
  mockRouter.push(
    '/contact-data-service-provider/mock-dps-name?fullNameError=Enter+your+full+name&emailAddressError=Enter+an+email+address&jobRoleError=Enter+your+job+role&organisationNameError=Enter+your+organisation+name&studyDescriptionError=Enter+a+description+of+your+study+and%2F+or+service+of+interest'
  )

  const context = { query: { slug: defaultMock.items[0].fields.slug } } as unknown as GetServerSidePropsContext
  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderProps
  }

  const { getByLabelText, getByRole } = render(
    ContactDataServiceProvider.getLayout(<ContactDataServiceProvider {...props} />, { ...props, isPreviewMode: false })
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
  expect(
    within(alert).getByRole('link', { name: 'Enter a description of your study and/ or service of interest' })
  ).toHaveAttribute('href', '#studyDescription')

  // Field errors
  expect(getByLabelText('Full name')).toHaveErrorMessage('Error: Enter your full name')
  expect(getByLabelText('Email address')).toHaveErrorMessage('Error: Enter an email address')
  expect(getByLabelText('Telephone (optional)')).not.toHaveErrorMessage()
  expect(getByLabelText('Job role')).toHaveErrorMessage('Error: Enter your job role')
  expect(getByLabelText('Organisation name')).toHaveErrorMessage('Error: Enter your organisation name')
  expect(
    getByLabelText(
      'Please outline which services you are interested in and, if applicable, a brief description of your research'
    )
  ).toHaveErrorMessage('Error: Enter a description of your study and/ or service of interest')
})
