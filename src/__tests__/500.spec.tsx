import { RootLayout } from '@/components/Layout/RootLayout'
import { render } from '@/config/test-utils'
import { logger } from '@/lib/logger'
import { errorMock } from '@/mocks/homepage'
import { successMock } from '@/mocks/serviceUnavailable'
import ServiceUnavailablePage, { FALLBACK_TITLE, getStaticProps } from '@/pages/500'
import { setupMockServer } from '@/utils'

jest.mock('@/lib/logger')

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

test('Displays the 500 page', async () => {
  mockContentfulResponse(successMock)

  const mockData = successMock.items[0].fields

  const { props } = await getStaticProps()

  const { getByRole, getByText } = render(
    <RootLayout {...props}>
      <ServiceUnavailablePage {...props} />
    </RootLayout>
  )

  expect(getByRole('heading', { name: mockData.title, level: 1 }))

  expect(getByText(/Test service unavailable content/)).toHaveClass('font-bold')

  expect(getByRole('link', { name: 'Test service unavailable link' })).toHaveAttribute('href', '#')
})

test('Displays the 500 page with default/fallback content', async () => {
  mockContentfulResponse(errorMock)

  const { props } = await getStaticProps()

  const { getByRole, getByText } = render(
    <RootLayout {...props}>
      <ServiceUnavailablePage {...props} />
    </RootLayout>
  )

  expect(getByRole('heading', { name: FALLBACK_TITLE, level: 1 }))

  expect(
    getByText(/Please try again later or contact the Find, Recruit and Follow-up Central Team at/)
  ).toBeInTheDocument()

  expect(getByRole('link', { name: 'frfteam@nihr.ac.uk' })).toHaveAttribute('href', 'mailto:frfteam@nihr.ac.uk')
})

test('Sets the static cache revalidation period', async () => {
  mockContentfulResponse(successMock)
  const { revalidate } = await getStaticProps()
  expect(revalidate).toBe(60)
})

test('Handles no data returned', async () => {
  mockContentfulResponse({ items: [] })
  expect(await getStaticProps()).toEqual({
    revalidate: false,
    props: {
      heading: FALLBACK_TITLE,
    },
  })
})

test('Handles errors when fetching data', async () => {
  mockContentfulResponse(errorMock, 400)
  expect(await getStaticProps()).toEqual({
    revalidate: false,
    props: {
      heading: FALLBACK_TITLE,
    },
  })
  expect(jest.mocked(logger.error)).toHaveBeenCalled()
})
