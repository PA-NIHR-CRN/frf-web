import { render, screen } from '@/config/test-utils'

import { mockContent } from './mockContent'
import { RichTextRenderer } from './RichTextRenderer'

test('Rich text renderer', () => {
  const className = 'custom-class'

  render(<RichTextRenderer className={className}>{mockContent}</RichTextRenderer>)

  // Assert that the paragraph node is rendered correctly
  const paragraphElement = screen.getByText('Hello, World!')
  expect(paragraphElement).toBeInTheDocument()

  // Assert that the bold node is rendered correctly
  const boldElement = screen.getByText('Bold text!')
  expect(boldElement).toHaveClass('font-bold')

  // Assert that the component has the correct class name
  expect(paragraphElement.parentElement).toHaveClass(className)

  // Assert that the unordered list node is rendered correctly
  const unorderedListElement = screen.getByRole('list')
  expect(unorderedListElement).toBeInTheDocument()

  // Assert that the list item nodes are rendered correctly
  const listItemElements = screen.getAllByRole('listitem')
  expect(listItemElements).toHaveLength(2)

  // Assert that the first list item contains the correct text
  const listItem1Element = screen.getByText('List item 1')
  expect(listItem1Element).toBeInTheDocument()

  // Assert that the second list item contains the correct text
  const listItem2Element = screen.getByText('List item 2')
  expect(listItem2Element).toBeInTheDocument()

  // Assert that the heading (level 1) node is rendered
  const h1Element = screen.getByRole('heading', { level: 1, name: 'Heading level 1' })
  expect(h1Element).toBeInTheDocument()
  expect(h1Element).toHaveClass('govuk-heading-xl')

  // Assert that the heading (level 2) node is rendered
  const h2Element = screen.getByRole('heading', { level: 2, name: 'Heading level 2' })
  expect(h2Element).toBeInTheDocument()
  expect(h2Element).toHaveClass('govuk-heading-l')

  // Assert that the heading (level 3) node is rendered
  const h3Element = screen.getByRole('heading', { level: 3, name: 'Heading level 3' })
  expect(h3Element).toBeInTheDocument()
  expect(h3Element).toHaveClass('govuk-heading-m')

  // Assert that the heading (level 4) node is rendered
  const h4Element = screen.getByRole('heading', { level: 4, name: 'Heading level 4' })
  expect(h4Element).toBeInTheDocument()
  expect(h4Element).toHaveClass('govuk-heading-s')

  // Assert that a custom button is rendered
  const buttonLink = screen.getByRole('link', { name: 'Button text' })
  expect(buttonLink).toHaveAttribute('href', '#')
  expect(buttonLink).not.toHaveAttribute('target')
  expect(buttonLink).toHaveClass('govuk-button')
  expect(buttonLink).not.toHaveClass('govuk-button--secondary')

  // Assert that a custom button is rendered with secondary style + opens in new tab
  const secondaryButtonLink = screen.getByRole('link', { name: 'Button text secondary (Opens in a new window)' })
  expect(secondaryButtonLink).toHaveAttribute('href', '#')
  expect(secondaryButtonLink).toHaveAttribute('target', '_blank')
  expect(secondaryButtonLink).toHaveClass('govuk-button')
  expect(secondaryButtonLink).toHaveClass('govuk-button--secondary')

  // Assert that a custom video is rendered
  const videoIframe = screen.getByTitle('Video title')
  expect(videoIframe).toHaveAttribute('src', 'https://www.youtube.com/embed/3WUh1huCUrM')

  // Assert that an embedded video is rendered
  const videoElement = screen.getByTitle('Embedded video description')
  const videoSource = videoElement.firstChild
  expect(videoSource).toHaveAttribute('src', '//video.mp4')
  expect(videoSource).toHaveAttribute('type', 'video/mp4')

  // Asser than an embedded image is rendered
  const imageElement = screen.getByAltText('Test image description')
  expect(imageElement).toHaveAttribute('src', '/_next/image?url=https%3A%2F%2Fimage.jpg&w=3840&q=75')
  expect(imageElement).toHaveAttribute('width', '1280')
  expect(imageElement).toHaveAttribute('height', '874')
})
