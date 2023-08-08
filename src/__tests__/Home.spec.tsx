import { rest } from 'msw'

import { RootLayout } from '@/components/Layout/RootLayout'
import { render, screen } from '@/config/test-utils'
import { defaultMock as cookieBannerMock } from '@/mocks/cookieBanner'
import { errorMock, successMock } from '@/mocks/homepage'
import Home, { getStaticProps } from '@/pages'
import { API_URL, setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Displays the Home page', async () => {
  server.use(
    rest.all(`${API_URL}/entries`, async (req, res, ctx) => {
      const contentType = req.url.searchParams.get('content_type')
      return res(ctx.status(200), ctx.json(contentType === 'homepage' ? successMock : cookieBannerMock))
    })
  )

  const { props } = await getStaticProps()

  render(
    <RootLayout {...props}>
      <Home {...props} />
    </RootLayout>
  )

  const mockData = successMock.items[0].fields

  // Title + Description
  // expect(screen.getByRole('heading', { name: mockData.title, level: 2 }))
  expect(screen.getByText(/This website will enable researchers and life sciences companies/)).toBeInTheDocument()

  // Video
  const videoIframe = screen.getByTitle('Video: Find, Recruit and Follow-up Intro')
  expect(videoIframe).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/msizPweg3kE')

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
  expect(screen.getByRole('link', { name: 'Find out more' })).toHaveAttribute('href', '/data-service-providers')

  // Cookie banner
  expect(screen.getByText('We use some essential cookies to make this service work.')).toBeInTheDocument()
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
