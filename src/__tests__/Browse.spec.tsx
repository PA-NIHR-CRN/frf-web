import { render, screen, within } from '@/config/test-utils'
import Browse from '@/pages/browse'

test('Displays the fallback navigation menu page', () => {
  render(Browse.getLayout(<Browse />))

  const list = screen.getByTestId('browse-links')
  expect(within(list).getAllByRole('listitem')).toHaveLength(5)

  expect(screen.getByRole('heading', { name: 'Discover more', level: 1 })).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'View data service providers' })).toHaveAttribute('href', '/providers')
  expect(
    screen.getByText('Discover more about the different data service providers within Find, Recruit and Follow-up')
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Contact research support' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )
  expect(
    screen.getByText(
      'Get in touch with research support professionals who can help you understand which services might be suitable for your study'
    )
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Organisations providing data services' })).toHaveAttribute(
    'href',
    '/data-service-providers'
  )
  expect(
    screen.getByText(
      'Information for organisations offering Find, Recruit and Follow-up data services to researchers and life sciences companies'
    )
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Research support colleagues' })).toHaveAttribute('href', '/research-support')
  expect(
    screen.getByText('Information for colleagues within the various research support organisations across the UK')
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Provide feedback on this service' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('Your feedback on our service would be invaluable')).toBeInTheDocument()
})
