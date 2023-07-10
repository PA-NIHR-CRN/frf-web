import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'

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

    const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      request: { responseURL: 'https://example.com/confirmation' },
    })

    const routerPushMock = jest.fn()
    const routerReplaceMock = jest.fn()

    // Mock useRouter hook to return the mocked router functions
    ;(useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
      replace: routerReplaceMock,
    })

    // Mock useReCaptcha hook to return the mocked executeRecaptcha function
    ;(useReCaptcha as jest.Mock).mockReturnValue({
      executeRecaptcha,
    })

    const mockEvt = {}
    const handleSubmit = (callback: (values: FieldValues) => void) => {
      callback({ fullName: 'John' })
      return () => mockEvt
    }

    render(
      <Form
        action="/submit"
        method="post"
        handleSubmit={handleSubmit as UseFormHandleSubmit<FieldValues>}
        onError={jest.fn()}
      >
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    )

    // Simulate form submission
    await userEvent.click(screen.getByText('Submit'))

    // Verify that executeRecaptcha was called with the correct site key
    expect(executeRecaptcha).toHaveBeenCalledWith('form_submit')

    // Verify that axios.post was called with the correct data
    expect(axiosPostMock).toHaveBeenCalledWith('/submit', {
      reCaptchaToken: 'recaptcha-token',
      fullName: 'John', // Add the expected form values here
    })

    // Verify that router functions were not called
    expect(routerPushMock).toHaveBeenCalledWith('/confirmation')
    expect(routerReplaceMock).not.toHaveBeenCalled()
  })

  it('should handle form submission failure', async () => {
    console.log = jest.fn()

    const executeRecaptcha = jest.fn().mockResolvedValue('recaptcha-token')

    const axiosPostMock = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Submission failed'))

    const routerPushMock = jest.fn()
    const routerReplaceMock = jest.fn()

    // Mock useRouter hook to return the mocked router functions
    ;(useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
      replace: routerReplaceMock,
      pathname: 'mock-url',
    })

    // Mock useReCaptcha hook to return the mocked executeRecaptcha function
    ;(useReCaptcha as jest.Mock).mockReturnValue({
      executeRecaptcha,
    })

    const mockEvt = {}
    const handleSubmit = (callback: (values: FieldValues) => void) => {
      callback({ fullName: 'John' })
      return () => mockEvt
    }

    const onError = jest.fn()

    render(
      <Form
        action="/submit"
        method="post"
        handleSubmit={handleSubmit as UseFormHandleSubmit<FieldValues>}
        onError={onError}
      >
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </Form>
    )

    // Simulate form submission
    await userEvent.click(screen.getByText('Submit'))

    // Verify that executeRecaptcha was called with the correct site key
    expect(executeRecaptcha).toHaveBeenCalledWith('form_submit')

    // Verify that axios.post was called with the correct data
    expect(axiosPostMock).toHaveBeenCalledWith('/submit', {
      reCaptchaToken: 'recaptcha-token',
      fullName: 'John', // Add the expected form values here
    })

    // Verify that router functions were not called
    expect(routerPushMock).not.toHaveBeenCalled()
    expect(routerReplaceMock).toHaveBeenCalledWith('mock-url?fatal=1')
    expect(onError).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('handleSubmit failed', new Error('Submission failed'))
  })
})
