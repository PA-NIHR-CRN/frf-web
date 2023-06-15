import { render, screen } from '@/config/test-utils'

import { ProviderHeading } from './ProviderHeading'

test('Provider heading', () => {
  render(
    <ProviderHeading slug="mock-page" isNew={false}>
      Mock org
    </ProviderHeading>
  )

  const heading = screen.getByRole('heading', { name: 'Mock org', level: 3 })
  expect(heading).toHaveAttribute('id', 'article-mock-page-title')
  expect(screen.queryByText('New')).not.toBeInTheDocument()
})

test('Provider heading with new tag', () => {
  render(
    <ProviderHeading slug="mock-page" isNew>
      Mock org
    </ProviderHeading>
  )

  const heading = screen.getByRole('heading', { name: 'Mock org – New', level: 3 })
  expect(heading).toHaveAttribute('id', 'article-mock-page-title')
  expect(screen.getByText('New')).toBeInTheDocument()
})
