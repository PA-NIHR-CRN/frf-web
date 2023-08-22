import { render } from '@testing-library/react'

import { WarningBanner } from './WarningBanner'

test('Warning Banner', () => {
  // Preview mode
  const { rerender, container } = render(<WarningBanner isPreviewMode isTestEnvironment={false} />)
  expect(container.firstChild).toHaveTextContent(
    'You are viewing the preview site, which includes draft content (not for onwards sharing).'
  )
  expect(container.firstChild).toHaveClass('govuk-tag', 'govuk-tag--yellow')

  // Test environment
  rerender(<WarningBanner isTestEnvironment isPreviewMode={false} />)
  expect(container.firstChild).toHaveTextContent('You are viewing the test site.')
  expect(container.firstChild).toHaveClass('govuk-tag', 'govuk-tag--orange')

  // Disabled
  rerender(<WarningBanner isPreviewMode={false} isTestEnvironment={false} />)
  expect(container).toBeEmptyDOMElement()
})
