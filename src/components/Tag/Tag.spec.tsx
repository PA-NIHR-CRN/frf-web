import { render, screen } from '@/config/test-utils'

import { Tag } from './Tag'

test('Tag', () => {
  render(<Tag aria-hidden>Test content</Tag>)
  const tag = screen.getByText('Test content')
  expect(tag).toHaveAttribute('aria-hidden')
})
