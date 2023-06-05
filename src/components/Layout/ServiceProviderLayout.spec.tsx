import { render, screen } from '@/config/test-utils'
import { RootLayout } from './RootLayout'
import { assertRootLayout } from './RootLayout.test'

test('Displays NIHR layout & page content specific to service provider', () => {
  render(
    <RootLayout>
      <h1>Service Provider Detail Page</h1>
    </RootLayout>
  )

  assertRootLayout()

  // Page content
  expect(screen.getByRole('heading', { name: 'Service Provider Detail Page' }))
})
