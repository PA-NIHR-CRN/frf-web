import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { act, render, screen, within } from '@/config/test-utils'

import { Header } from './Header'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays the header', () => {
  mockRouter.setCurrentUrl('/providers/dataanalytics')

  const { getByRole, getByText, getByAltText } = render(<Header heading="Empty Heading" isPreviewMode={false} />)

  // Skip link
  expect(getByText('Skip to main content')).toHaveAttribute('href', '#main-content')

  // Logo link
  const frfLogoLink = getByRole('link', {
    name: 'Go to the Find, Recruit and Follow-up homepage',
  })
  expect(frfLogoLink).toHaveAttribute('href', '/')

  // Logo image
  const frfLogo = getByAltText('Find, Recruit and Follow-up logo')
  expect(frfLogo).toBeInTheDocument()
  expect(frfLogo).toHaveAttribute('height', '24')
  expect(frfLogo).toHaveAttribute('width', '244')

  const nihrLogo = getByAltText('NIHR logo')
  expect(nihrLogo).toBeInTheDocument()
  expect(nihrLogo).toHaveAttribute('height', '24')
  expect(nihrLogo).toHaveAttribute('width', '244')

  expect(getByRole('button', { name: 'Show navigation menu' })).toBeInTheDocument()

  const link = getByRole('link', { name: 'Menu' })
  expect(link).toHaveAttribute('href', '/browse')
  expect(link).toHaveClass('js-disabled-show')

  // Back link
  expect(getByRole('link', { name: 'Back to list of data service providers' })).toHaveAttribute('href', '/providers')
})

test('Does not display back link when on the /providers path', () => {
  mockRouter.setCurrentUrl('/providers')

  const { queryByRole } = render(<Header heading="Empty Heading" isPreviewMode={false} />)

  expect(queryByRole('link', { name: 'Back to list of data service providers' })).not.toBeInTheDocument()
})

test('Does not display back link when in preview mode', () => {
  mockRouter.setCurrentUrl('/providers/dataanalytics')

  const { queryByRole } = render(<Header heading="Empty Heading" isPreviewMode={true} />)

  expect(queryByRole('link', { name: 'Back to list of data service providers' })).not.toBeInTheDocument()
})

test('Shows the navigation menu when clicking the menu icon', async () => {
  const user = userEvent.setup()

  render(<Header heading="Empty Heading" isPreviewMode={false} />)

  const trigger = screen.getByRole('button', { name: 'Show navigation menu' })
  const closedMenu = screen.queryByTestId('nav')

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(closedMenu).not.toBeInTheDocument()

  await user.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  const openMenu = screen.getByTestId('nav')
  expect(openMenu).toBeVisible()

  // 1st column
  expect(within(openMenu).getByText('Discover more with the Find, Recruit and Follow-up website')).toBeInTheDocument()

  // 2nd column
  expect(within(openMenu).getByRole('link', { name: 'View all data service providers' })).toHaveAttribute(
    'href',
    '/providers'
  )
  expect(
    within(openMenu).getByText(
      'Discover more about the different data service providers within Find, Recruit and Follow-up'
    )
  ).toBeInTheDocument()

  expect(within(openMenu).getByRole('link', { name: 'Contact research support' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )
  expect(
    within(openMenu).getByText(
      'Get in touch with research support professionals who can help you understand which services might be suitable for your study'
    )
  ).toBeInTheDocument()

  // 3rd column
  expect(within(openMenu).getByRole('link', { name: 'Organisations providing data services' })).toHaveAttribute(
    'href',
    '/data-service-providers'
  )
  expect(
    within(openMenu).getByText(
      'Information for organisations offering Find, Recruit and Follow-up data services to researchers and life sciences companies'
    )
  ).toBeInTheDocument()

  expect(within(openMenu).getByRole('link', { name: 'Research support colleagues' })).toHaveAttribute(
    'href',
    '/research-support'
  )
  expect(
    within(openMenu).getByText(
      'Information for colleagues within the various research support organisations across the UK'
    )
  ).toBeInTheDocument()

  // 4th column
  expect(within(openMenu).getByRole('link', { name: 'Provide feedback on this service' })).toHaveAttribute(
    'href',
    '/feedback'
  )
  expect(within(openMenu).getByText('Your feedback on our service would be invaluable')).toBeInTheDocument()
})

test('Toggle the navigation menu by keyboard keys', async () => {
  const user = userEvent.setup()

  render(<Header heading="Empty Heading" isPreviewMode={false} />)

  const trigger = screen.getByRole('button', { name: 'Show navigation menu' })
  trigger.focus()

  expect(screen.queryByTestId('nav')).not.toBeInTheDocument()

  // Open with enter key
  await user.keyboard('{Enter}')
  expect(screen.queryByTestId('nav')).toBeInTheDocument()

  // Close with enter key
  await user.keyboard('{Enter}')
  expect(screen.queryByTestId('nav')).not.toBeInTheDocument()

  // Open with space key
  await user.keyboard(' ')
  expect(screen.queryByTestId('nav')).toBeInTheDocument()

  // Close with space key
  await user.keyboard(' ')
  expect(screen.queryByTestId('nav')).not.toBeInTheDocument()
})

test('Hide the navigation menu when clicking away from the menu', async () => {
  const user = userEvent.setup()

  render(
    <>
      <Header heading="Empty Heading" isPreviewMode={false} />
      <p>Outside</p>
    </>
  )

  await user.click(screen.getByRole('button', { name: 'Show navigation menu' }))

  const menu = screen.queryByTestId('nav')
  expect(menu).toBeVisible()

  await user.click(screen.getByText('Outside'))
  expect(menu).not.toBeVisible()
})

test('Hide the navigation menu when changing page', async () => {
  const user = userEvent.setup()

  render(<Header heading="Empty Heading" isPreviewMode={false} />)

  await user.click(screen.getByRole('button', { name: 'Show navigation menu' }))

  const menu = screen.queryByTestId('nav')

  expect(menu).toBeVisible()

  // Simulate route change
  act(() => {
    mockRouter.push('/feedback')
  })

  expect(menu).not.toBeVisible()
})
