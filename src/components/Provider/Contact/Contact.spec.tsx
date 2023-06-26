import { render, screen } from '@/config/test-utils'

import { Contact } from './Contact'

test('Contact', () => {
  const heading = 'Contact Us'
  const footer = <div>Footer content</div>
  const contactName = 'Email'
  const contactUrl = 'mailto:example@example.com'

  render(
    <Contact
      heading={heading}
      footer={footer}
      contactName={contactName}
      contactUrl={contactUrl}
      className="custom-class"
    >
      Contact information
    </Contact>
  )

  // Assert that the heading is rendered correctly
  const headingElement = screen.getByText(heading)
  expect(headingElement).toBeInTheDocument()

  // Assert that the children content is rendered correctly
  const childrenElement = screen.getByText('Contact information')
  expect(childrenElement).toBeInTheDocument()

  // Assert that the contact link is rendered correctly
  const contactLink = screen.getByRole('link', { name: contactName })
  expect(contactLink).toBeInTheDocument()
  expect(contactLink).toHaveAttribute('href', contactUrl)

  // Assert that the footer content is rendered correctly
  const footerElement = screen.getByText('Footer content')
  expect(footerElement).toBeInTheDocument()
})
