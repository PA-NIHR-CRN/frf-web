import { GetServerSidePropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import { defaultMock } from '@/mocks/serviceProvider'
import ContactDataServiceProviderConfirmation, {
  ContactDataServiceProviderConfirmationProps,
  getServerSideProps,
} from '@/pages/contact-data-service-provider/[slug]/confirmation/[referenceNumber]'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('@/lib/logger')

beforeEach(() => {
  mockContentfulResponse(defaultMock)
  jest.clearAllMocks()
})

test('Contact data service provider confirmation page', async () => {
  const context = {
    query: { referenceNumber: 'mock-123', name: defaultMock.items[0].fields.slug },
  } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderConfirmationProps
  }

  render(<ContactDataServiceProviderConfirmation {...props} />)

  expect(screen.getByRole('heading', { name: 'Thank you', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(/Your enquiry has been sent to Genomic Profile Register/)).toBeInTheDocument()
  expect(
    screen.getByText(
      /Your enquiry reference number is mock-123. A copy of your enquiry will be sent to your email address./
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'What did you think of this website?' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('(takes 30 seconds)')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Return to homepage' })).toHaveAttribute('href', '/')
})
