import { GetServerSidePropsContext } from 'next'

import { RootLayout } from '@/components/Layout/RootLayout'
import { render, screen } from '@/config/test-utils'
import { defaultMock } from '@/mocks/serviceProvider'
import ContactFrfTeamConfirmation, {
  ContactFrfTeamConfirmationProps,
  getServerSideProps,
} from '@/pages/contact-frf-team/confirmation/[referenceNumber]'
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
    query: { referenceNumber: 'mock-123' },
  } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactFrfTeamConfirmationProps
  }

  render(
    <RootLayout {...props}>
      <ContactFrfTeamConfirmation {...props} />
    </RootLayout>
  )

  expect(screen.getByRole('heading', { name: 'Thank you for contacting us', level: 1 })).toBeInTheDocument()
  expect(
    screen.getByText(/The FRF central team has received your enquiry and will be in touch in due course./)
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      /Your enquiry reference number is mock-123. A copy of your enquiry will be sent to your email address./
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'What did you think of this website?' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('(takes 30 seconds)')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Return to homepage' })).toHaveAttribute('href', '/')
})
