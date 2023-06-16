import { render, screen } from '@testing-library/react'

import { Panel } from './Panel'

test('Displays the hero panel', () => {
  render(<Panel>Find, Recruit and Follow-up</Panel>)

  expect(screen.getByRole('heading', { name: 'Find, Recruit and Follow-up', level: 1 }))
})
