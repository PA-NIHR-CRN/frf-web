import { render, screen } from '@/config/test-utils'
import { assertRootLayout } from './RootLayout.test'
import { ServiceProviderLayout } from './ServiceProviderLayout'

test('Displays a back link & page content', () => {
  render(
    <ServiceProviderLayout>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )

  assertRootLayout()

  // Back
  expect(screen.getByRole('link', { name: 'Back to list of data service providers' })).toHaveAttribute(
    'href',
    '/providers'
  )

  // Page content
  expect(screen.getByRole('heading', { name: 'Service Provider Detail Page' })).toBeInTheDocument()
})
