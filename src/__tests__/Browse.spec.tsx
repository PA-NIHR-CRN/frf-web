import { render, screen } from '@/config/test-utils'
import Browse from '@/pages/browse'

test('Displays the fallback navigation menu page', () => {
  render(<Browse />)

  expect(screen.getAllByRole('listitem')).toHaveLength(6)

  expect(screen.getByText('Discover more with the New Find, Recruit and Follow-up website')).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Find data service providers' })).toHaveAttribute('href', '/')
  expect(screen.getByText('Discover a number of data service providers through FRF')).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Get support for your research' })).toHaveAttribute('href', '/')
  expect(screen.getByText('Access support for your research study')).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Data Service Providers' })).toHaveAttribute('href', '/')
  expect(
    screen.getByText(
      'All the information you need to know how to register your organisation as a DSP or update existing DSP information'
    )
  ).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Research Support Staff' })).toHaveAttribute('href', '/')
  expect(screen.getByText('Support for CRNCC and DA staff')).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Provide feedback' })).toHaveAttribute('href', '/feedback')
  expect(screen.getByText('Your feedback on our service would be invaluable')).toBeInTheDocument()
})
