import { render, screen } from '@/config/test-utils'
import { RootLayout } from './RootLayout'
import { assertRootLayout } from './RootLayout.test'

test('Displays a back link & page content', () => {
  render(
    <RootLayout backLink={<a href="#">Back</a>}>
      <h1>Service Provider Detail Page</h1>
    </RootLayout>
  )

  assertRootLayout()

  // Back
  expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument()

  // Page content
  expect(screen.getByRole('heading', { name: 'Service Provider Detail Page' })).toBeInTheDocument()
})
