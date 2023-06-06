import { render, screen } from '@/config/test-utils'
import Home from '@/pages'

test('Displays the Home page', () => {
  render(<Home />)

  expect(screen.getByRole('heading', { name: 'Find, Recruit and Follow-up Support', level: 1 }))
})
