import { render, screen } from '@/config/test-utils'

import { ProviderOrganisation } from './ProviderOrganisation'

test('Provider organisation', () => {
  render(<ProviderOrganisation>Mock org</ProviderOrganisation>)
  expect(screen.getByText('Mock org')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Provider organisation: Mock org', level: 4 })).toBeInTheDocument()
})
