import { render, screen } from '@/config/test-utils'

import { ProviderHeadingText } from './ProviderHeadingText'

test('Provider heading', () => {
  render(<ProviderHeadingText id="test-id">Mock org</ProviderHeadingText>)

  const heading = screen.getByRole('heading', { name: 'Data service provider: Mock org', level: 2 })
  expect(heading).toHaveAttribute('id', 'test-id')
})
