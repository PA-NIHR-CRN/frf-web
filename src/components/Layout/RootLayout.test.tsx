import { mockCookieBannerContent } from '@/components/CookieBanner/mockContent'
import { render, screen, within } from '@/config/test-utils'

import { RootLayout } from './RootLayout'

jest.mock('next/router', () => require('next-router-mock'))

export const assertRootLayout = () => {
  // Header
  const header = screen.getByRole('banner')
  expect(within(header).getByAltText('National Institute for Health and Care Research logo')).toBeInTheDocument()

  // Phase Banner
  const banner = screen.getByTestId('frf-phase-banner')
  expect(banner).toHaveTextContent('This is a new service – your feedback will help us to improve it.')

  // Hero Panel
  const panel = screen.getByTestId('frf-panel')
  expect(within(panel).getByRole('link', { name: 'Go to the Find, Recruit and Follow-up homepage' })).toHaveAttribute(
    'href',
    '/'
  )
}

test('Displays NIHR layout & page content', () => {
  render(
    <RootLayout>
      <h1>Welcome</h1>
    </RootLayout>
  )

  assertRootLayout()

  // Page content
  expect(screen.getByRole('heading', { name: 'Welcome' }))
})

test('Adds a class to the body to detect js is enabled', () => {
  render(
    <RootLayout>
      <h1>Welcome</h1>
    </RootLayout>
  )
  expect(document.body.classList.contains('js-enabled')).toBeTruthy()
})

test('Displays a preview warning banner when preview mode is enabled', () => {
  render(
    <RootLayout isPreviewMode>
      <h1>Service Provider Detail Page</h1>
    </RootLayout>
  )
  expect(
    screen.getByText('You are viewing the preview site, which includes draft content (not for onwards sharing).')
  ).toBeInTheDocument()
})

test('Displays a test site warning banner in the UAT environment', () => {
  const oldAppEnv = process.env.NEXT_PUBLIC_APP_ENV
  process.env.NEXT_PUBLIC_APP_ENV = 'uat'
  render(
    <RootLayout>
      <h1>Service Provider Detail Page</h1>
    </RootLayout>
  )
  expect(screen.getByText('You are viewing the test site.')).toBeInTheDocument()
  process.env.NEXT_PUBLIC_APP_ENV = oldAppEnv
})

test('Displays the cookie banner', () => {
  render(
    <RootLayout cookieBanner={mockCookieBannerContent}>
      <h1>Service Provider Detail Page</h1>
    </RootLayout>
  )
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
})
