import { render, screen } from '@/config/test-utils'

import { assertRootLayout } from './RootLayout.test'
import { ServiceProviderLayout } from './ServiceProviderLayout'

jest.mock('next/router', () => require('next-router-mock'))

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

test('Displays a preview banner & hides the back button when preview mode is enabled', () => {
  render(
    <ServiceProviderLayout isPreviewMode>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )
  expect(
    screen.getByText('You are viewing the preview site, which shows draft content from Contentful.')
  ).toBeInTheDocument()

  expect(screen.queryByRole('link', { name: 'Back to list of data service providers' })).not.toBeInTheDocument()
})
