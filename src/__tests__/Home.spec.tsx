import { render, screen } from '@/config/test-utils'
import { errorMock, successMock } from '@/mocks/homepage'
import Home, { getStaticProps } from '@/pages'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Displays the Home page', async () => {
  mockContentfulResponse(successMock)

  const { props } = await getStaticProps()

  render(<Home {...props} />)

  const mockData = successMock.items[0].fields

  // Title + Description
  // expect(screen.getByRole('heading', { name: mockData.title, level: 2 }))
  expect(screen.getByText(mockData.description))

  // Video
  const videoIframe = screen.getByTitle('Video: Find, Recruit and Follow-up Intro')
  expect(videoIframe).toHaveAttribute('src', mockData.videoUrl)

  // Service Info
  expect(screen.getByRole('heading', { name: 'Find', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(mockData.serviceDescriptionFind)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'View all Find services' })).toHaveAttribute(
    'href',
    '/providers?serviceType=Find'
  )

  expect(screen.getByRole('heading', { name: 'Recruit', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(mockData.serviceDescriptionRecruit)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'View all Recruit services' })).toHaveAttribute(
    'href',
    '/providers?serviceType=Recruit'
  )

  expect(screen.getByRole('heading', { name: 'Follow-up', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(mockData.serviceDescriptionFollowUp)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'View all Follow-up services' })).toHaveAttribute(
    'href',
    '/providers?serviceType=Follow-Up'
  )

  // View all services
  expect(screen.getByRole('link', { name: 'View all data service providers' })).toHaveAttribute('href', '/providers')

  // Signposts
  expect(screen.getByRole('heading', { name: 'Get support for your research', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(mockData.signPostDescription1)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Contact research support' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )

  expect(screen.getByRole('heading', { name: 'Organisations providing data services', level: 2 })).toBeInTheDocument()
  expect(screen.getByText(mockData.signPostDescription2)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Find out more' })).toHaveAttribute('href', '#')
})

test('Sets the static cache revalidation period', async () => {
  mockContentfulResponse(successMock)
  const { revalidate } = await getStaticProps()
  expect(revalidate).toBe(60)
})

test('Handles no data returned', async () => {
  mockContentfulResponse({})
  await expect(getStaticProps()).rejects.toThrow('Failed to fetch homepage content (Error: Null entry)')
})

test('Handles errors when fetching data', async () => {
  mockContentfulResponse(errorMock, 400)
  await expect(getStaticProps()).rejects.toThrow('Failed to fetch homepage content (InvalidQuery: {')
})
