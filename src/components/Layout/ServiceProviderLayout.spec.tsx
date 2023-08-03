import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { mockCookieBannerContent } from '@/components/CookieBanner/mockContent'
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

test('Back link goes back to the previous url state', async () => {
  mockRouter.back = jest.fn()

  const { getByRole } = render(
    <ServiceProviderLayout>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )

  await userEvent.click(getByRole('link', { name: 'Back to list of data service providers' }))

  expect(mockRouter.back).toHaveBeenCalledTimes(1)
})

test('Displays a preview banner & hides the back button when preview mode is enabled', () => {
  render(
    <ServiceProviderLayout isPreviewMode>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )
  expect(
    screen.getByText('You are viewing the preview site, which includes draft content (not for onwards sharing).')
  ).toBeInTheDocument()

  expect(screen.queryByRole('link', { name: 'Back to list of data service providers' })).not.toBeInTheDocument()
})

test('Displays the cookie banner', () => {
  render(
    <ServiceProviderLayout cookieBanner={mockCookieBannerContent}>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
})
