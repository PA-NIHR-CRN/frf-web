import { render, screen } from '@/config/test-utils'
import Accessibility from '@/pages/accessibility'

test('Displays the Accessibility page', () => {
  render(<Accessibility />)

  expect(screen.getByRole('heading', { name: 'Accessibility', level: 2 }))
})
