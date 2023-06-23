import { render, screen } from '@/config/test-utils'

import { Section, styles } from './Section'

test('Section', () => {
  const heading = 'Section Heading'

  Object.keys(styles).forEach((type, index) => {
    render(
      <Section heading={heading} icon={<div data-testid="icon">Icon</div>} type={type}>
        Section content
      </Section>
    )

    // Assert that the heading is rendered correctly
    const headingElement = screen.getAllByRole('heading', { name: heading, level: 3 })
    expect(headingElement[index]).toBeInTheDocument()

    // Assert that the icon is rendered correctly
    const iconElement = screen.getAllByTestId('icon')
    expect(iconElement[index]).toBeInTheDocument()

    // Assert that the section content is rendered correctly
    const contentElement = screen.getAllByText('Section content')
    expect(contentElement[index]).toBeInTheDocument()

    // Assert that the section has the correct background style based on the type prop
    const sectionElement = screen.getAllByTestId('dsp-section')

    expect(sectionElement[index]).toHaveClass(styles[type])
  })
})
