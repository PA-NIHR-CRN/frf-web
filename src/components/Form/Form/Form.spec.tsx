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

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

test('Handles form submission successfully', async () => {
  console.error = jest.fn()

  const executeRecaptcha = jest.fn().mockResolvedValue('recaptcha-token')

  const axiosPostMock = jest.mocked(axios.post).mockResolvedValue({
    request: { responseURL: 'https://example.com/confirmation' },
  })

  const routerPushMock = jest.fn()
  const routerReplaceMock = jest.fn()

  // Mock useRouter hook to return the mocked router functions
  ;(useRouter as jest.Mock).mockReturnValueOnce({
    push: routerPushMock,
    replace: routerReplaceMock,
  })

  // Mock useReCaptcha hook to return the mocked executeRecaptcha function
  ;(useReCaptcha as jest.Mock).mockReturnValueOnce({
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

test('Handles failures due to an api request error', async () => {
  console.error = jest.fn()

  const executeRecaptcha = jest.fn().mockResolvedValue('recaptcha-token')

  const axiosPostMock = jest.mocked(axios.post).mockResolvedValue({
    request: { responseURL: undefined },
  })

  const routerPushMock = jest.fn()
  const routerReplaceMock = jest.fn()

  // Mock useRouter hook to return the mocked router functions
  ;(useRouter as jest.Mock).mockReturnValueOnce({
    push: routerPushMock,
    replace: routerReplaceMock,
    pathname: 'mock-url',
  })

  // Mock useReCaptcha hook to return the mocked executeRecaptcha function
  ;(useReCaptcha as jest.Mock).mockReturnValueOnce({
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
  expect(axiosPostMock).toHaveBeenCalledWith('/submit', { fullName: 'John', reCaptchaToken: 'recaptcha-token' })

  // Verify that router functions were not called
  expect(routerReplaceMock).toHaveBeenCalledWith('mock-url?fatal=1')
  expect(routerPushMock).not.toHaveBeenCalled()
  expect(onError).toHaveBeenCalled()
})

test('handles failures with recaptcha', async () => {
  console.error = jest.fn()

  const executeRecaptcha = jest.fn().mockResolvedValueOnce(null)

  const axiosPostMock = jest.mocked(axios.post).mockResolvedValue({
    request: { responseURL: '123' },
  })
  const routerPushMock = jest.fn()
  const routerReplaceMock = jest.fn()

  // Mock useRouter hook to return the mocked router functions
  ;(useRouter as jest.Mock).mockReturnValue({
    push: routerPushMock,
    replace: routerReplaceMock,
    pathname: 'mock-url',
  })

  // Mock useReCaptcha hook to return the mocked executeRecaptcha function
  ;(useReCaptcha as jest.Mock).mockReturnValueOnce({
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
  expect(axiosPostMock).not.toHaveBeenCalled()

  // // Verify that router functions were not called
  expect(routerPushMock).not.toHaveBeenCalled()
  expect(routerReplaceMock).toHaveBeenCalledWith('mock-url?fatal=1')
  expect(onError).toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledWith('Google reCaptcha failed to execute')
})
