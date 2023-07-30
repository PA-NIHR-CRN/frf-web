import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getCookie } from 'cookies-next'

import { mockCookieBannerContent } from '@/components/CookieBanner/mockContent'

import { CookieBanner } from './CookieBanner'

// Mock the getCookie and setCookie functions
jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}))

test('should render the cookie banner selection view', () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  expect(screen.getByRole('heading', { name: /cookies on find, recruit and follow-up/i })).toBeInTheDocument()
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /accept additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /reject additional cookies/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /view cookies/i })).toBeInTheDocument()

  // Ensure that the confirmation message is not rendered initially
  expect(screen.queryByTestId('confirmation-message')).not.toBeInTheDocument()
})

test('should change the view to the confirmation view when accepting cookies', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  await userEvent.click(screen.getByRole('button', { name: /accept additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve accepted additional cookies./)).toBeInTheDocument()
})

test('should change the view to the confirmation view when rejecting cookies', async () => {
  render(<CookieBanner content={mockCookieBannerContent} />)

  await userEvent.click(screen.getByRole('button', { name: /reject additional cookies/i }))

  expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
  expect(screen.getByText(/You’ve rejected additional cookies./)).toBeInTheDocument()
})

test('should hide the cookie banner when "Hide cookie message" is clicked', async () => {
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

test('should change the view back to the selection view when "change your cookie settings" is clicked', async () => {
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

test('should not render the cookie banner if the cookie is already set', () => {
  // Mock the getCookie function to return a truthy value to simulate the cookie being set
  ;(getCookie as jest.Mock).mockReturnValueOnce('FRF_GDPR_COOKIE_ACCEPT_VALUE=1;')

  render(<CookieBanner content={mockCookieBannerContent} />)

  // The component should not render the cookie banner
  expect(screen.queryByLabelText('Cookies on Find, Recruit and Follow-Up')).not.toBeInTheDocument()
})
