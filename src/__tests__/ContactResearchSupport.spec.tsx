import { GetServerSidePropsContext } from 'next'

import { render, screen } from '@/config/test-utils'
import ContactResearchSupportConfirmation, {
  ContactResearchSupportConfirmationProps,
  getServerSideProps,
} from '@/pages/contact-research-support/confirmation'

test('Contact research support confirmation page', async () => {
  const context = { query: { referenceNumber: 'mock-123' } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as {
    props: ContactResearchSupportConfirmationProps
  }

  render(<ContactResearchSupportConfirmation {...props} />)

  expect(screen.getByRole('heading', { name: 'Thank you', level: 2 })).toBeInTheDocument()
  expect(
    screen.getByText(
      'Your enquiry has been sent to the relevant research support team and they will be in touch in due course.'
    )
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      'Your enquiry reference number is mock-123. A copy of your enquiry will be sent to your email address.'
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'What did you think of this website?' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('(takes 30 seconds)')).toBeInTheDocument()
})

test('Contact research support confirmation page with no reference number', async () => {
  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ContactResearchSupportConfirmationProps
  }

  render(<ContactResearchSupportConfirmation {...props} />)

  expect(screen.queryByText('Your enquiry reference number')).not.toBeInTheDocument()
  expect(screen.getByText('A copy of your enquiry will be sent to your email address.')).toBeInTheDocument()
})
