import { render, screen } from '@/config/test-utils'

import { Checkbox } from './Checkbox'

test('Checkbox', async () => {
  render(
    <Checkbox name="test" value="test" className="custom-class">
      Test Checkbox
    </Checkbox>
  )
  const checkbox = screen.getByLabelText('Test Checkbox')
  expect(checkbox).toHaveAttribute('type', 'checkbox')
  expect(checkbox).toHaveAttribute('value', 'test')
  expect(checkbox).toHaveAttribute('value', 'test')
  expect(checkbox.closest('div')).toHaveClass('custom-class')
})
