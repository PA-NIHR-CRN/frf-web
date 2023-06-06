import { render, screen } from '@/config/test-utils'
import Privacy from '@/pages/privacy'

test('Displays the Privacy page', () => {
  render(<Privacy />)

  expect(screen.getByRole('heading', { name: 'Privacy', level: 2 }))
})
