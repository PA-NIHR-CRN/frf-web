import { render, screen, within } from '@/config/test-utils'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays the header', () => {
  render(<Header />)

  // Skip link
  expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main-content')

  // Logo link
  expect(screen.getByRole('link', { name: 'National Institute for Health and Care Research logo' })).toHaveAttribute(
    'href',
    '/'
  )

  // Logo image
  const logo = screen.getByAltText('National Institute for Health and Care Research logo')
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveAttribute('height', '32')
  expect(logo).toHaveAttribute('width', '322')

  // Menu
  expect(screen.getByRole('button', { name: 'Show navigation menu' })).toBeInTheDocument()
})

test('Shows the navigation menu when clicking the menu icon', async () => {
  const user = userEvent.setup()

  render(<Header />)

  const trigger = screen.getByRole('button', { name: 'Show navigation menu' })
  const closedMenu = screen.queryByRole('navigation', { name: 'Navigation menu' })

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(closedMenu).not.toBeInTheDocument()

  await user.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')

  const openMenu = screen.getByRole('navigation', { name: 'Navigation menu' })
  expect(openMenu).toBeVisible()

  // 1st column
  expect(
    within(openMenu).getByText('Discover more with the New Find, Recruit and Follow-up website')
  ).toBeInTheDocument()

  // 2nd column
  expect(within(openMenu).getByRole('link', { name: 'Find data service providers' })).toHaveAttribute('href', '/')
  expect(within(openMenu).getByText('Discover a number of data service providers through FRF')).toBeInTheDocument()

  expect(within(openMenu).getByRole('link', { name: 'Get support for your research' })).toHaveAttribute('href', '/')
  expect(within(openMenu).getByText('Access support for your research study')).toBeInTheDocument()

  // 3rd column
  expect(within(openMenu).getByRole('link', { name: 'Data Service Providers' })).toHaveAttribute('href', '/')
  expect(
    within(openMenu).getByText(
      'All the information you need to know how to register your organisation as a DSP or update existing DSP information'
    )
  ).toBeInTheDocument()

  expect(within(openMenu).getByRole('link', { name: 'Research Support Staff' })).toHaveAttribute('href', '/')
  expect(within(openMenu).getByText('Support for CRNCC and DA staff')).toBeInTheDocument()

  // 4th column
  expect(within(openMenu).getByRole('link', { name: 'Provide feedback' })).toHaveAttribute('href', '/feedback')
  expect(within(openMenu).getByText('Your feedback on our service would be invaluable')).toBeInTheDocument()
})

test('Toggle the navigation menu by keyboard keys', async () => {
  const user = userEvent.setup()

  render(<Header />)

  const trigger = screen.getByRole('button', { name: 'Show navigation menu' })
  trigger.focus()

  expect(screen.queryByRole('navigation', { name: 'Navigation menu' })).not.toBeInTheDocument()

  // Open with enter key
  await user.keyboard('{Enter}')
  expect(screen.getByRole('navigation', { name: 'Navigation menu' })).toBeInTheDocument()

  // Close with enter key
  await user.keyboard('{Enter}')
  expect(screen.queryByRole('navigation', { name: 'Navigation menu' })).not.toBeInTheDocument()

  // Open with space key
  await user.keyboard(' ')
  expect(screen.getByRole('navigation', { name: 'Navigation menu' })).toBeInTheDocument()

  // Close with space key
  await user.keyboard(' ')
  expect(screen.queryByRole('navigation', { name: 'Navigation menu' })).not.toBeInTheDocument()
})

test('Hide the navigation menu when clicking away from the menu', async () => {
  const user = userEvent.setup()

  render(
    <>
      <Header />
      <p>Outside</p>
    </>
  )

  await user.click(screen.getByRole('button', { name: 'Show navigation menu' }))

  const menu = screen.getByRole('navigation', { name: 'Navigation menu' })
  expect(menu).toBeVisible()

  await user.click(screen.getByText('Outside'))
  expect(menu).not.toBeVisible()
})
