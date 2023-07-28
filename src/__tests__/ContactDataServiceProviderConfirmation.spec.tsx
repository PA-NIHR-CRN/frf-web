import { GetServerSidePropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import ContactDataServiceProviderConfirmation, {
  ContactDataServiceProviderConfirmationProps,
  getServerSideProps,
} from '@/pages/contact-data-service-provider/[name]/confirmation/[referenceNumber]'

test('Contact data service provider confirmation page', async () => {
  const context = {
    query: { referenceNumber: 'mock-123', name: 'mock-dsp-name' },
  } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactDataServiceProviderConfirmationProps
  }

  render(<ContactDataServiceProviderConfirmation {...props} />)

  expect(screen.getByRole('heading', { name: 'Thank you', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(/Your enquiry has been sent to mock-dsp-name/)).toBeInTheDocument()
  expect(
    screen.getByText(
      /Your enquiry reference number is mock-123. A copy of your enquiry will be sent to your email address./
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'What did you think of this website?' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('(takes 30 seconds)')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Return to homepage' })).toHaveAttribute('href', '/')
})
