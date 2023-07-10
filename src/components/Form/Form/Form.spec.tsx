import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useReCaptcha } from 'next-recaptcha-v3'

import { Form } from './Form'

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Mock next-recaptcha-v3
jest.mock('next-recaptcha-v3', () => ({
  useReCaptcha: jest.fn(),
}))

// Mock axios
jest.mock('axios')

describe('Form', () => {
  beforeEach(() => {
    // Reset mocks and their implementations before each test
    jest.clearAllMocks()
  })

  it('should handle form submission successfully', async () => {
    console.error = jest.fn()

    const executeRecaptcha = jest.fn().mockResolvedValue('recaptcha-token')

    // Mock useReCaptcha hook to return the mocked executeRecaptcha function
    ;(useReCaptcha as jest.Mock).mockReturnValue({
      executeRecaptcha,
    })

    const handleSubmit = jest.fn()

    render(
      <Form action="/submit" method="post" handleSubmit={handleSubmit} onError={jest.fn()}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    )

    // Simulate form submission
    await userEvent.click(screen.getByText('Submit'))

    expect(handleSubmit).toHaveBeenCalled()
  })
})
