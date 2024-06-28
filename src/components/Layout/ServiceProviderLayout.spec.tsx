import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { mockCookieBannerContent } from '@/components/CookieBanner/mockContent'
import { render, screen } from '@/config/test-utils'

import { assertRootLayout } from './RootLayout.test'
import { ServiceProviderLayout } from './ServiceProviderLayout'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays a back link & page content when not in preview mode and path is beyond /providers', () => {
  mockRouter.setCurrentUrl('/providers/dataanalytics')

  render(
    <ServiceProviderLayout heading="Service Provider Detail Page">
      <div>Page Content</div>
    </ServiceProviderLayout>
  )

  assertRootLayout('Service Provider Detail Page')

  expect(screen.getByRole('link', { name: 'Back to list of data service providers' })).toHaveAttribute(
    'href',
    '/providers'
  )

  expect(screen.getByText('Page Content')).toBeInTheDocument()
})

test('Does not display a back link when on the /providers path', () => {
  mockRouter.setCurrentUrl('/providers')

  render(
    <ServiceProviderLayout heading="Service Provider Detail Page">
      <div>Page Content</div>
    </ServiceProviderLayout>
  )

  assertRootLayout('Service Provider Detail Page')

  expect(screen.queryByRole('link', { name: 'Back to list of data service providers' })).not.toBeInTheDocument()

  expect(screen.getByText('Page Content')).toBeInTheDocument()
})

test('Back link goes back to the previous url state', async () => {
  mockRouter.setCurrentUrl('/providers/dataanalytics')
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
  mockRouter.setCurrentUrl('/providers/dataanalytics')

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
  mockRouter.setCurrentUrl('/providers/dataanalytics')

  render(
    <ServiceProviderLayout cookieBanner={mockCookieBannerContent}>
      <h1>Service Provider Detail Page</h1>
    </ServiceProviderLayout>
  )

  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
})
