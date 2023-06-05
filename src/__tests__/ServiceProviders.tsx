import { render, screen } from '@/config/test-utils'
import ServiceProviders from '@/pages/providers'

test('Displays the Service Providers page', () => {
  render(<ServiceProviders />)

  expect(screen.getByText('One-third column'))
  expect(screen.getByText('Two-thirds column'))
})
