import { render, screen } from '@/config/test-utils'
import { Button } from './Button'

test('Button', () => {
  render(<Button>Welcome</Button>)
  expect(screen.getByRole('button', { name: 'Welcome' })).toBeInTheDocument()
})
