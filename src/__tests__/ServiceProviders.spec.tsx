import userEvent from '@testing-library/user-event'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'

import { render, screen, within } from '@/config/test-utils'
import { defaultMock, pageTwoMock } from '@/mocks/serviceProviders'
import ServiceProviders, { getServerSideProps, ServiceProvidersProps } from '@/pages/providers'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Default search criteria (no search or filters set)', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  // Title
  expect(screen.getByText('5 data service providers found')).toBeInTheDocument()

  // Sort
  expect(screen.getByLabelText('Sort by')).toBeInTheDocument()

  // Search results
  expect(screen.getAllByRole('article')).toHaveLength(4)

  // Pagination
  const pagination = screen.getByRole('navigation', { name: 'results' })
  expect(pagination).toBeInTheDocument()
  expect(within(pagination).queryByRole('link', { name: 'Previous' })).not.toBeInTheDocument()
  expect(within(pagination).getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '?page=1')
  expect(within(pagination).getByRole('link', { name: 'Page 2' })).toHaveAttribute('href', '?page=2')
  expect(within(pagination).getByRole('link', { name: 'Next' })).toHaveAttribute('href', '?page=2')
})

test('Data service provider details newly published', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  const result = screen.getByRole('article', { name: 'Genomic Profile Register – New' })

  // Heading
  expect(within(result).getByRole('link', { name: 'Genomic Profile Register – New' })).toBeInTheDocument()
  expect(
    within(result).getByRole('heading', { name: 'Provider organisation: Genomic Profile Register', level: 4 })
  ).toBeInTheDocument()

  // Description
  expect(within(result).getByTestId('frf-dsp-description')).toBeInTheDocument()

  // Services available and costs
  expect(within(result).getByRole('table', { name: 'Services available and costs:' })).toBeInTheDocument()

  // Coverage
  expect(within(result).getByRole('list', { name: 'Coverage' })).toBeInTheDocument()

  // Suited to
  const suitedToList = within(result).getByRole('list', { name: 'Suited to:' })
  expect(within(suitedToList).getAllByRole('listitem')).toHaveLength(4)

  // Not suited to
  const notSuitedToList = within(result).getByRole('list', { name: 'Not suited to:' })
  expect(within(notSuitedToList).getAllByRole('listitem')).toHaveLength(1)

  // Types of data available
  expect(within(result).getByRole('list', { name: 'Types of data available' })).toBeInTheDocument()
  expect(within(result).getByText('Hospital In Patient And Out Patient Episodes')).toBeInTheDocument()
  expect(within(result).getByText('Primary Care')).toBeInTheDocument()
  expect(within(result).getByText('Other')).toBeInTheDocument()

  // Published date & Last updated date
  expect(within(result).getByText('First published:')).toBeInTheDocument()
  expect(within(result).getByText('8 June 2023')).toBeInTheDocument()
  expect(within(result).getByText('Last updated:')).toBeInTheDocument()
  expect(within(result).getByText('13 June 2023')).toBeInTheDocument()

  // View more
  expect(within(result).getByRole('link', { name: 'View more details for Genomic Profile Register' }))
})

test('Data service provider details older than 3 months', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  const result = screen.getByRole('article', { name: 'Join Dementia Research' })

  // Heading
  expect(within(result).getByRole('link', { name: 'Join Dementia Research' })).toBeInTheDocument()
  expect(
    within(result).getByRole('heading', {
      name: 'Provider organisation: Department of Health and Social Care',
      level: 4,
    })
  ).toBeInTheDocument()

  // Description
  expect(within(result).getByTestId('frf-dsp-description')).toBeInTheDocument()

  // Services available and costs
  expect(within(result).getByRole('table', { name: 'Services available and costs:' })).toBeInTheDocument()

  // Coverage
  expect(within(result).getByRole('list', { name: 'Coverage' })).toBeInTheDocument()

  // Suited to
  const suitedToList = within(result).getByRole('list', { name: 'Suited to:' })
  expect(within(suitedToList).getAllByRole('listitem')).toHaveLength(4)

  // Not suited to (not present for this result)
  expect(within(result).queryByRole('list', { name: 'Not suited to:' })).not.toBeInTheDocument()

  // Types of data available
  expect(within(result).getByRole('list', { name: 'Types of data available' })).toBeInTheDocument()
  expect(within(result).getByText('Hospital In Patient And Out Patient Episodes')).toBeInTheDocument()
  expect(within(result).getByText('Primary Care')).toBeInTheDocument()
  expect(within(result).getByText('Other')).toBeInTheDocument()

  // Published date & Last updated date
  expect(within(result).getByText('First published:')).toBeInTheDocument()
  expect(within(result).getByText('10 June 2020')).toBeInTheDocument()
  expect(within(result).getByText('Last updated:')).toBeInTheDocument()
  expect(within(result).getByText('11 June 2023')).toBeInTheDocument()

  // View more
  expect(within(result).getByRole('link', { name: 'View more details for Join Dementia Research' }))
})

test('Page two results', async () => {
  mockRouter.push('?page=2')

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

test('Toggling filters on mobile', async () => {
  const scrollToSpy = jest.fn()
  jest.spyOn(window, 'scrollTo').mockImplementation(scrollToSpy)

  mockContentfulResponse(defaultMock)

  const { props } = await getServerSideProps({ query: {} } as GetServerSidePropsContext)

  render(<ServiceProviders {...props} />)

  const showFiltersButton = screen.getByRole('link', { name: 'Open filters' })
  expect(showFiltersButton).toHaveAttribute('href', '#filters')

  const filtersCard = screen.getByTestId('filters-card')
  expect(filtersCard).toHaveClass('hidden')

  // Show filters
  await userEvent.click(showFiltersButton)
  expect(filtersCard).not.toHaveClass('hidden')

  // Close filters
  const closeFiltersButton = screen.getByRole('link', { name: 'Return to search results' })
  expect(closeFiltersButton).toHaveAttribute('href', '#show-filters')
  expect(closeFiltersButton).toHaveFocus()

  await userEvent.click(closeFiltersButton)
  expect(filtersCard).toHaveClass('hidden')

  // Focus is returned to show filters button
  expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
  expect(showFiltersButton).toHaveFocus()
})
