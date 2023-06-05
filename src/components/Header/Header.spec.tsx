import { render, screen } from '@testing-library/react'
import { Header } from './Header'

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
})
