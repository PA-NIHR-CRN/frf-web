import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getCookie } from 'cookies-next'
import mockRouter from 'next-router-mock'
import React from 'react'

import { mockCookieBannerContent } from '@/components/CookieBanner/mockContent'

import { CookieBanner } from './CookieBanner'

// Mock the getCookie and setCookie functions
jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}))

test('Renders the cookie banner selection view', () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  expect(screen.getByRole('heading', { name: /cookies on find, recruit and follow-up/i })).toBeInTheDocument()
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /accept additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reject additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view cookies/i })).toBeInTheDocument()

  // Ensure that the confirmation message is not rendered initially
  expect(screen.queryByTestId('confirmation-message')).not.toBeInTheDocument()
})

test('Changes to the confirmation view when accepting cookies', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve accepted additional cookies./)).toBeInTheDocument()
})

test('Changes to the confirmation view when rejecting cookies', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  await userEvent.click(screen.getByRole('button', { name: /reject additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve rejected additional cookies./)).toBeInTheDocument()

  expect(screen.getByRole('link', { name: /cookie policy/ })).toHaveAttribute('href', '/cookie-policy')
  expect(screen.getByRole('link', { name: /change your cookie settings/ })).toHaveAttribute('href', '#cookie-banner')
})

test('Hides the cookie banner when "Hide cookie message" is clicked', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  // Click "Accept additional cookies" to show the confirmation view
  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  // Ensure that the confirmation message is visible
  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  ;(getCookie as jest.Mock).mockReturnValueOnce('FRF_GDPR_COOKIE_ACCEPT_VALUE=1;')

  // Click "Hide cookie message" to hide the entire cookie banner
  await userEvent.click(screen.getByRole('button', { name: /hide cookie message/i }))

  // Ensure that the entire cookie banner is no longer visible
  expect(screen.queryByLabelText('Cookies on Find, Recruit and Follow-Up')).not.toBeInTheDocument()
})

test('Hides the cookie banner and redirects to the cookie policy page when "cookie policy" link is clicked', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))
  ;(getCookie as jest.Mock).mockReturnValueOnce('FRF_GDPR_COOKIE_ACCEPT_VALUE=1;')

  await userEvent.click(screen.getByRole('link', { name: /cookie policy/i }))

  expect(screen.queryByLabelText('Cookies on Find, Recruit and Follow-Up')).not.toBeInTheDocument()

  expect(mockRouter.asPath).toBe('/cookie-policy')
})

test('Changes back to the selection view when "change your cookie settings" is clicked', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  // Click "Accept additional cookies" to show the confirmation view
  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  // Ensure that the confirmation message is visible
  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()

  // Click "change your cookie settings" to go back to the selection view
  await userEvent.click(screen.getByRole('link', { name: /change your cookie settings/i }))

  // Ensure that the selection view is rendered again
  expect(screen.getByRole('heading', { name: /cookies on find, recruit and follow-up/i })).toBeInTheDocument()
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /accept additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reject additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view cookies/i })).toBeInTheDocument()

  // Ensure that the confirmation message is not rendered
  expect(screen.queryByTestId('confirmation-message')).not.toBeInTheDocument()
})

test('Accepting or rejecting cookies via keyboard', async () => {
  const user = userEvent.setup()

  render(<CookieBanner content={mockCookieBannerContent} />)

  const acceptButton = screen.getByRole('button', { name: /accept additional cookies/i })

  acceptButton.focus()

  await user.keyboard('{Enter}')

  expect(screen.getByText(/You’ve accepted additional cookies./)).toBeInTheDocument()

  await user.tab()

  expect(screen.getByRole('link', { name: /cookie policy/ })).toHaveFocus()

  await user.tab()

  expect(screen.getByRole('link', { name: /change your cookie settings/ })).toHaveFocus()

  await user.keyboard('{Enter}')

  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()

  await user.tab()
  await user.tab()

  const rejectButton = screen.getByRole('button', { name: /reject additional cookies/i })

  expect(rejectButton).toHaveFocus()

  await user.keyboard('{Enter}')

  expect(screen.getByText(/You’ve rejected additional cookies./)).toBeInTheDocument()
})

test('Does not render the cookie banner if the GDPR cookie is already set', () => {
  // Mock the getCookie function to return a truthy value to simulate the cookie being set
  ;(getCookie as jest.Mock).mockReturnValueOnce('FRF_GDPR_COOKIE_ACCEPT_VALUE=1;')

  render(<CookieBanner content={mockCookieBannerContent} />)

  // The component should not render the cookie banner
  expect(screen.queryByLabelText('Cookies on Find, Recruit and Follow-Up')).not.toBeInTheDocument()
})

test('Displays cookie banner via magic link', async () => {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost/cookie-policy?change-settings=1',
    },
    writable: true,
  })

  const mockFocus = jest.fn()
  jest.spyOn(React, 'useRef').mockReturnValue({ current: { focus: mockFocus } })

  // Mock the getCookie function to return a truthy value to simulate the cookie being set
  ;(getCookie as jest.Mock).mockReturnValueOnce('FRF_GDPR_COOKIE_ACCEPT_VALUE=1;')

  render(<CookieBanner content={mockCookieBannerContent} />)

  expect(screen.queryByLabelText('Cookies on Find, Recruit and Follow-Up')).not.toBeInTheDocument()

  await act(() => mockRouter.push('/cookie-policy?change-settings=1', undefined, { shallow: true }))

  expect(screen.getByLabelText('Cookies on Find, Recruit and Follow-Up')).toBeInTheDocument()

  // Refocuses cookie banner after route change
  expect(mockFocus).toHaveBeenCalled()

  // Removes query parameter after clicking accept
  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))
  expect(mockRouter.query['change-settings']).toBeUndefined()
})
