import { render, screen } from '@/config/test-utils'
import FeedbackConfirmation, { getStaticProps } from '@/pages/feedback/confirmation'

test('Feedback confirmation page', async () => {
  const { props } = await getStaticProps()

  render(<FeedbackConfirmation {...props} />)

  expect(screen.getByRole('heading', { name: 'Thank you', level: 2 })).toBeInTheDocument()
  expect(
    screen.getByText('If you have provided contact details we may contact you in the near future for further feedback.')
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Return to homepage' })).toHaveAttribute('href', '/')
})
