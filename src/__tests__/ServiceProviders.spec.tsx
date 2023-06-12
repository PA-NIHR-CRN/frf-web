import { GetServerSidePropsContext } from 'next'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock, pageTwoMock } from '@/mocks/serviceProviders'
import ServiceProviders, { getServerSideProps, ServiceProvidersProps } from '@/pages/providers'
import { setupMockServer } from '@/utils'

jest.mock('next/router', () => require('next-router-mock'))

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Displays results with default search criteria', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  // Title
  expect(screen.getByText('5 data service providers found')).toBeInTheDocument()

  // Sort
  expect(screen.getByLabelText('Sort by')).toBeInTheDocument()

  // Pagination
  const pagination = screen.getByRole('navigation', { name: 'results' })
  expect(pagination).toBeInTheDocument()
  expect(within(pagination).queryByRole('link', { name: 'Previous' })).not.toBeInTheDocument()
  expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '?page=1')
  expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '?page=2')
  expect(within(pagination).getByRole('link', { name: 'Next' })).toHaveAttribute('href', '?page=2')
})

test('Displays results from page two', async () => {
  mockContentfulResponse(pageTwoMock)

  const { props } = (await getServerSideProps({
    query: {
      page: 2,
    },
  } as unknown as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  // Pagination
  const pagination = screen.getByRole('navigation', { name: 'results' })
  expect(pagination).toBeInTheDocument()
  expect(within(pagination).getByRole('link', { name: 'Previous' })).toHaveAttribute('href', '?page=1')
  expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '?page=1')
  expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '?page=2')
  expect(within(pagination).queryByRole('link', { name: 'Next' })).not.toBeInTheDocument()
})
