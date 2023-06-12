import { render, screen } from '@testing-library/react'

import { PhaseBanner } from './PhaseBanner'

test('Displays phase of the project and a description', () => {
  render(<PhaseBanner phase="Alpha">Welcome to NIHR</PhaseBanner>)

  expect(screen.getByText('Alpha')).toBeInTheDocument()
  expect(screen.getByText('Welcome to NIHR')).toBeInTheDocument()
})
