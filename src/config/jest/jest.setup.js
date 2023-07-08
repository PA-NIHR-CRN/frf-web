import '@testing-library/jest-dom'

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('next-recaptcha-v3', () => ({
  ReCaptchaProvider: ({ children }) => children,
  useReCaptcha: () => ({
    executeRecaptcha: jest.fn(() => 'recaptcha-token'),
  }),
}))
