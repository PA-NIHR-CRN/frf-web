import { render, screen } from '@testing-library/react'

import { Footer } from './Footer'

test('Displays the links & copyright bar', () => {
  const { getByAltText, getByText } = render(<Footer />)

  expect(getByAltText('National Institute for Health and Care Research logo')).toBeVisible()
  expect(getByText('Terms and conditions')).toHaveAttribute('href', '/terms-and-conditions')
  expect(getByText('Privacy policy')).toHaveAttribute('href', '/privacy')
  expect(getByText('Accessibility')).toHaveAttribute('href', '/accessibility')
  expect(getByText('© NIHR 2022'))
})

test.each([
  ['National Institute for Health and Care Research', 'https://www.nihr.ac.uk', { w: 240, h: 24 }],
  // ['HSC Public Health Agency', '#', { w: 253, h: 97 }],
  // ['NHS Scotland', '#', { w: 153, h: 130 }],
  // ['Health Care Research Wales', '#', { w: 168, h: 106 }],
])('Displays the %s logo and link', (name, href, sizes) => {
  render(<Footer />)

  // Link
  const link = screen.getByRole('link', { name: `${name} logo` })
  expect(link).toHaveAttribute('href', href)

  // Logo
  const logo = screen.getByAltText(`${name} logo`)
  expect(logo).toBeInTheDocument()
  expect(logo).toHaveAttribute('height', String(sizes.h))
  expect(logo).toHaveAttribute('width', String(sizes.w))
})

test('Displays the Shaw Trust logo and link', () => {
  const { getByAltText, getByRole } = render(<Footer />)

  // Link
  const link = getByRole('link', { name: 'Shaw Trust accessibility website (Opens in a new window)' })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute(
    'href',
    'https://www.accessibility-services.co.uk/certificates/national-institute-for-health-and-care-research/'
  )
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  expect(link).toHaveAttribute('aria-label', 'Shaw Trust accessibility website (Opens in a new window)')

  // Logo
  const logo = getByAltText('Shaw Trust Logo')
  expect(logo).toBeVisible()
  expect(logo).toHaveAttribute('height', '57')
  expect(logo).toHaveAttribute('width', '189')
})
