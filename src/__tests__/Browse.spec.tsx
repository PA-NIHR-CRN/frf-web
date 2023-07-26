import { render, screen } from '@/config/test-utils'
import Browse from '@/pages/browse'

test('Displays the fallback navigation menu page', () => {
  render(<Browse />)

  expect(screen.getAllByRole('listitem')).toHaveLength(6)

  expect(screen.getByText('Discover more with the Find, Recruit and Follow-up website')).toBeInTheDocument()

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

  expect(screen.getByRole('link', { name: 'Data service providers' })).toHaveAttribute(
    'href',
    '/become-data-service-provider'
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

  expect(screen.getByRole('link', { name: 'Provide feedback' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('Your feedback on our service would be invaluable')).toBeInTheDocument()
})
