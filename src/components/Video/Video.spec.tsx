import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { getCookie } from 'cookies-next'

import { COOKIE_SETTINGS_CHANGE_EVENT, FRF_GDPR_COOKIE_ACCEPT_VALUE } from '@/constants/cookies'

import { Video, VideoProps } from './Video'

// Mock the getCookie function
jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
}))

const mockedGetCookie = jest.mocked(getCookie)

const testProps: VideoProps = {
  url: 'https://www.youtube.com/watch?v=ABCDEFG',
  title: 'Test Video',
}

test('Renders an iframe with the correct src and title', () => {
  render(<Video {...testProps} />)

  const videoElement = screen.getByAltText(testProps.title)
  expect(videoElement).toBeInTheDocument()
  expect(videoElement).toHaveAttribute('src', 'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg')
})

test('Includes necessary attributes in the iframe element', async () => {
  render(<Video {...testProps} />)
  const videoCoverImage = screen.getByTestId('youtube-cover-img')
  expect(videoCoverImage).toBeVisible()
  videoCoverImage.click()
  await waitFor(
    () => {
      expect(videoCoverImage).not.toBeVisible()
    },
    { timeout: 1000 }
  )
  const videoElement = screen.getByTestId('youtube-video')
  expect(videoElement).toBeVisible()
  expect(videoElement).toHaveAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope;')
  expect(videoElement).toHaveAttribute('allowfullscreen')
  expect(videoElement).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/ABCDEFG')
})

test('Updates domain if cookies have been previously accepted', () => {
  // Mock the getCookie function to return a truthy value to simulate the cookie being set
  mockedGetCookie.mockReturnValueOnce(FRF_GDPR_COOKIE_ACCEPT_VALUE)

  render(<Video {...testProps} />)

  expect(screen.getByAltText(testProps.title)).toHaveAttribute(
    'src',
    'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg'
  )
})

test('Updates domain after cookies are accepted', async () => {
  render(<Video {...testProps} />)

  expect(screen.getByAltText(testProps.title)).toHaveAttribute(
    'src',
    'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg'
  )

  fireEvent(document, new CustomEvent(COOKIE_SETTINGS_CHANGE_EVENT, { detail: 1 }))

  expect(screen.getByAltText(testProps.title)).toHaveAttribute(
    'src',
    'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg'
  )
})

test('Updates domain after cookies are rejected', () => {
  // Mock the getCookie function to return a truthy value to simulate the cookie being set
  mockedGetCookie.mockReturnValueOnce(FRF_GDPR_COOKIE_ACCEPT_VALUE)

  render(<Video {...testProps} />)

  expect(screen.getByAltText(testProps.title)).toHaveAttribute(
    'src',
    'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg'
  )

  fireEvent(document, new CustomEvent(COOKIE_SETTINGS_CHANGE_EVENT, { detail: 0 }))

  expect(screen.getByAltText(testProps.title)).toHaveAttribute(
    'src',
    'https://img.youtube.com/vi/ABCDEFG/hqdefault.jpg'
  )
})
