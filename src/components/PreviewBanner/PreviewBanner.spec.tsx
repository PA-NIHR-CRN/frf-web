import { render, screen } from '@testing-library/react'

import { PreviewBanner } from './PreviewBanner'

test('Preview banner', () => {
  // Enabled
  const { rerender } = render(<PreviewBanner isPreviewMode />)
  expect(
    screen.getByText('You are viewing the preview site, which shows draft content from Contentful.')
  ).toBeInTheDocument()

  // Disabled
  rerender(<PreviewBanner isPreviewMode={false} />)
  expect(
    screen.queryByText('You are viewing the preview site, which shows draft content from Contentful.')
  ).not.toBeInTheDocument()
})
