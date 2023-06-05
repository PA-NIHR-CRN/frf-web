import { render, screen } from '@/config/test-utils'
import Feedback from '@/pages/feedback'

test('Displays the Feedback page', () => {
  render(<Feedback />)

  expect(screen.getByRole('heading', { name: 'Let us know what you think', level: 2 }))
})
