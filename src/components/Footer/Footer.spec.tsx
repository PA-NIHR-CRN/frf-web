import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

test('Displays the links & copyright bar', () => {
  render(<Footer />)

  expect(screen.getByText('Privacy policy')).toHaveAttribute('href', '/privacy')
  expect(screen.getByText('Accessibility')).toHaveAttribute('href', '/accessibility')
  expect(screen.getByText('© NIHR 2022'))
})

test.each([
  ['National Institute for Health and Care Research', '#', { w: 240, h: 24 }],
  ['HSC Public Health Agency', '#', { w: 253, h: 97 }],
  ['NHS Scotland', '#', { w: 153, h: 130 }],
  ['Health Care Research Wales', '#', { w: 168, h: 106 }],
])('Displays the %s logo and link', (name, href, sizes) => {
  render(<Footer />)

  // Link
  const link = screen.getByRole('link', { name: `${name} logo (opens in a new window)` })
  expect(link).toHaveAttribute('href', href)

  // Logo
  const logo = screen.getByAltText(`${name} logo (opens in a new window)`)
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveAttribute('height', String(sizes.h))
  expect(logo).toHaveAttribute('width', String(sizes.w))
})
