import { RootLayout } from '@/components/Layout/RootLayout'
import { render, screen } from '@/config/test-utils'
import { successMock } from '@/mocks/generic'
import { errorMock } from '@/mocks/homepage'
import GenericPage, { getStaticProps } from '@/pages/[...slug]'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: unknown }) => {
      return children
    },
  }
})

const fields = successMock.items[0].fields
const slug = [fields.slug]

test('Displays a generic contentful page', async () => {
  mockContentfulResponse(successMock)

  const mockData = successMock.items[0].fields

  const { props } = await getStaticProps({ params: { slug } })

  render(
    <RootLayout {...props}>
      <GenericPage {...props} />
    </RootLayout>
  )

  // Page title
  expect(document.title).toBe(mockData.metaTitle)

  // Meta data
  expect(document.querySelector('meta[name=description]')?.attributes.getNamedItem('content')?.value).toBe(
    mockData.metaDescription
  )
  expect(document.querySelector("meta[property='og:description']")?.attributes.getNamedItem('content')?.value).toBe(
    mockData.metaDescription
  )
  expect(document.querySelector("meta[property='og:title']")?.attributes.getNamedItem('content')?.value).toBe(
    mockData.metaTitle
  )

  // Page Heading
  expect(screen.getByRole('heading', { name: 'Research Support Staff', level: 1 }))

  // Title
  expect(screen.getByRole('heading', { name: 'Research support teams', level: 2 }))

  // Content is rendered
  expect(
    screen.getByText(
      /The Find, Recruit and Follow up \(FRF\) ‘wrap around’ advisory service will be embedded within the UK’s Research Support infrastructure/
    )
  ).toBeInTheDocument()

  // Button is rendered
  expect(screen.getByRole('link', { name: 'Visit NIHR Learn (Opens in a new window)' })).toHaveAttribute('href', '#')

  // Image is rendered
  expect(screen.getByRole('img', { name: 'NIHR logo alt text' })).toHaveAttribute(
    'src',
    expect.stringContaining('nihr.svg')
  )

  // Video is rendered
  const videoIframe = screen.getByAltText('Research Support Staff Video')
  const playButton = screen.getByRole('button', { name: 'Play Research Support Staff Video' })

  expect(playButton).toBeVisible()
  expect(videoIframe).toHaveAttribute('src', 'https://img.youtube.com/vi/3WUh1huCUrM/hqdefault.jpg')

  // Sidebar title is rendered
  expect(screen.getByRole('heading', { name: 'Contact FRF central team', level: 3 }))

  // Sidebar description is rendered
  expect(
    screen.getByText(
      /Further support is available from the Find, Recruit and Follow-up team as necessary for complex enquiries./
    )
  ).toBeInTheDocument()

  // Sidebar button link is rendered
  expect(screen.getByRole('link', { name: 'Contact FRF central team' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )

  // Ensure layout adapts
  expect(screen.getByTestId('sidebar-column')).toBeInTheDocument()
  expect(screen.getByTestId('main-column')).toHaveClass('govuk-grid-column-two-thirds-from-desktop')
})

test('Renders page without a sidebar', async () => {
  const noSidebarMock = JSON.parse(JSON.stringify(successMock))
  noSidebarMock.items[0].fields.sidebar = undefined
  mockContentfulResponse(noSidebarMock)

  const { props } = await getStaticProps({ params: { slug } })

  render(<GenericPage {...props} />)

  expect(screen.queryByText('Contact FRF central team')).not.toBeInTheDocument()

  // Ensure layout adapts
  expect(screen.queryByTestId('sidebar-column')).not.toBeInTheDocument()
  expect(screen.getByTestId('main-column')).not.toHaveClass('govuk-grid-column-two-thirds-from-desktop')
})

test('Sets the static cache revalidation period', async () => {
  mockContentfulResponse(successMock)
  const { revalidate } = await getStaticProps({ params: { slug } })
  expect(revalidate).toBe(60)
})

test('Handles no data returned', async () => {
  mockContentfulResponse({ items: [] })
  await expect(getStaticProps({ params: { slug } })).rejects.toThrow(
    'Failed to fetch generic page content (Error: Null entry for slug research-support)'
  )
})

test('Handles errors when fetching data', async () => {
  mockContentfulResponse(errorMock, 400)
  await expect(getStaticProps({ params: { slug } })).rejects.toThrow(
    'Failed to fetch generic page content (InvalidQuery: {'
  )
})
