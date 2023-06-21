import { render, screen } from '@/config/test-utils'

import { ProviderHeadingLink } from './ProviderHeadingLink'

test('Provider heading', () => {
  render(
    <ProviderHeadingLink slug="mock-page" isNew={false}>
      Mock org
    </ProviderHeadingLink>
  )

  const heading = screen.getByRole('heading', { name: 'Data service provider: Mock org', level: 3 })
  expect(heading).toHaveAttribute('id', 'article-mock-page-title')
  expect(screen.queryByText('New')).not.toBeInTheDocument()
  expect(screen.getByText(/Data service provider:/)).toHaveClass('govuk-visually-hidden')
})

test('Provider heading with new tag', () => {
  render(
    <ProviderHeadingLink slug="mock-page" isNew>
      Mock org
    </ProviderHeadingLink>
  )

  const heading = screen.getByRole('heading', { name: 'Recently published Data service provider: Mock org', level: 3 })
  expect(heading).toHaveAttribute('id', 'article-mock-page-title')
  expect(screen.getByText('New')).toBeInTheDocument()
  expect(screen.queryByText(/Recently published/)).toHaveClass('govuk-visually-hidden')
})
