import userEvent from '@testing-library/user-event'
import MockDate from 'mockdate'
import { GetServerSidePropsContext } from 'next'
import mockRouter from 'next-router-mock'
import { act } from 'react-dom/test-utils'

import { render, screen, within } from '@/config/test-utils'
import { ServiceType } from '@/constants'
import { defaultMock, noResultsMock, pageTwoMock } from '@/mocks/serviceProviders'
import ServiceProviders, { getServerSideProps, ServiceProvidersProps } from '@/pages/providers'
import { setupMockServer } from '@/utils'

const [server, mockContentfulResponse] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(() => {
  MockDate.set(new Date('2023-06-08'))
})

afterEach(() => {
  MockDate.reset()
})

type GetServerSidePropsReturnType = Required<Awaited<ReturnType<typeof getServerSideProps>>>

test('Default search criteria (no search or filters set)', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }

  render(<ServiceProviders {...props} />)

  expect(props.heading).toEqual('List of data service providers')

  // Title (duplicated by the filters panel mobile only title)
  expect(screen.getAllByText('5 data service providers found')).toHaveLength(2)

  // Sort
  expect(screen.getByRole('combobox', { name: 'Sort by' })).toBeInTheDocument()
  expect((screen.getByRole('option', { name: 'Alphabetical (ascending)' }) as HTMLOptionElement).selected).toBe(true)

  // Search results
  expect(screen.getAllByRole('article')).toHaveLength(4)

  // Selected filters not shown by default
  expect(screen.queryByRole('list', { name: 'Selected filters' })).not.toBeInTheDocument()

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

  expect(screen.getByRole('list', { name: 'Data service providers' })).toBeInTheDocument()

  const result = screen.getByRole('article', {
    name: 'Recently published Data service provider: Genomic Profile Register',
  })

  // Heading
  expect(
    within(result).getByRole('link', { name: 'Recently published Data service provider: Genomic Profile Register' })
  ).toBeInTheDocument()
  expect(within(result).getByRole('heading', { name: 'Genomic Profile Register', level: 4 })).toBeInTheDocument()

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
  expect(within(result).getByRole('heading', { name: 'Type of data available', level: 3 }))
  expect(within(result).getByText('Primary care')).toBeInTheDocument()
  expect(within(result).getByText('Secondary care')).toBeInTheDocument()
  expect(within(result).getByText('Participant reported')).toBeInTheDocument()

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

  const result = screen.getByRole('article', {
    name: 'Data service provider: Join Dementia Research',
  })

  // Heading
  expect(
    within(result).getByRole('link', { name: 'Data service provider: Join Dementia Research' })
  ).toBeInTheDocument()
  expect(
    within(result).getByRole('heading', {
      name: 'Department of Health and Social Care',
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
  expect(within(result).getByRole('heading', { name: 'Type of data available', level: 3 }))
  expect(within(result).getByText('Primary care')).toBeInTheDocument()
  expect(within(result).getByText('Secondary care')).toBeInTheDocument()
  expect(within(result).getByText('Participant reported')).toBeInTheDocument()

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

  const { props } = (await getServerSideProps({
    query: {},
  } as GetServerSidePropsContext)) as GetServerSidePropsReturnType

  render(<ServiceProviders {...props} />)

  const showFiltersButton = screen.getByRole('link', { name: 'Open filters' })
  expect(showFiltersButton).toHaveAttribute('href', '#filters')

  const filtersCard = screen.getByTestId('filters-card')
  expect(filtersCard).toHaveClass('hidden')

  // Show filters
  await userEvent.click(showFiltersButton)
  expect(filtersCard).not.toHaveClass('hidden')
  expect(showFiltersButton).toHaveClass('hidden')

  // Close filters
  const closeFiltersButtons = screen.getAllByRole('link', { name: 'Close filters' })
  closeFiltersButtons.forEach((element) => expect(element).toHaveAttribute('href', '#show-filters'))

  await userEvent.click(closeFiltersButtons[0])
  expect(filtersCard).toHaveClass('hidden')

  // Focus is returned to show filters button
  expect(scrollToSpy).toHaveBeenCalledWith(0, 0)
  expect(showFiltersButton).toHaveFocus()
})

test('Filter default states', async () => {
  mockContentfulResponse(defaultMock)

  const context = {
    query: {
      q: 'Test search',
      page: 1,
      serviceType: [ServiceType.FIND, ServiceType.FOLLOW_UP],
      geography: ['England', 'UK wide'],
      excludeRegional: true,
      costs: [
        'Find: Free of charge (All studies)',
        'Recruit: Free of charge (All studies)',
        'Follow-Up: Free of charge (All studies)',
      ],
    },
  } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as Required<Awaited<ReturnType<typeof getServerSideProps>>>

  render(<ServiceProviders {...props} />)

  // Keyword input has correct default value
  expect(screen.getByLabelText('Keyword')).toHaveValue('Test search')

  // Correct service types are checked
  expect(screen.getByLabelText('Find')).toBeChecked()
  expect(screen.getByLabelText('Recruit')).not.toBeChecked()

  // Correct geographies are checked
  expect(screen.getByLabelText('England')).toBeChecked()
  expect(screen.getByLabelText('Wales')).not.toBeChecked()
  expect(screen.getByLabelText('Exclude regional only services')).toBeChecked()

  // Correct costs are checked
  const findFieldset = screen.getByRole('group', { name: 'Find' })
  expect(within(findFieldset).getByLabelText('Free of charge (All studies)')).toBeChecked()
  expect(within(findFieldset).getByLabelText('Chargeable service')).not.toBeChecked()

  const recruitFieldset = screen.getByRole('group', { name: 'Recruit' })
  expect(within(recruitFieldset).getByLabelText('Free of charge (All studies)')).toBeChecked()
  expect(within(recruitFieldset).getByLabelText('Chargeable service')).not.toBeChecked()

  const followUpFieldset = screen.getByRole('group', { name: 'Follow-Up' })
  expect(within(followUpFieldset).getByLabelText('Free of charge (All studies)')).toBeChecked()
  expect(within(followUpFieldset).getByLabelText('Chargeable service')).not.toBeChecked()
})

test('Enabling a filter', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({
    query: {},
  } as GetServerSidePropsContext)) as GetServerSidePropsReturnType

  render(<ServiceProviders {...props} />)

  mockRouter.asPath = ''

  await userEvent.click(screen.getByLabelText('Find'))
  expect(mockRouter.asPath).toBe('/providers?q=&serviceType=Find&order=a-z')
})

test('Disabling a filter', async () => {
  mockContentfulResponse(defaultMock)

  const context = { query: { serviceType: 'Find' } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as Required<Awaited<ReturnType<typeof getServerSideProps>>>

  render(<ServiceProviders {...props} />)

  mockRouter.asPath = '/providers?q=&serviceType=Find&order=a-z'

  await userEvent.click(screen.getByLabelText('Find'))

  expect(mockRouter.asPath).toBe('/providers?q=&order=a-z')
})

test('Enabling a filter via keyboard', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({
    query: {},
  } as GetServerSidePropsContext)) as GetServerSidePropsReturnType

  render(<ServiceProviders {...props} />)

  mockRouter.asPath = ''

  const findInput = screen.getByLabelText('Find')
  findInput.focus()
  await userEvent.keyboard(' ')

  expect(mockRouter.asPath).toBe('/providers?q=&serviceType=Find&order=a-z')
})

test('Changing sort order', async () => {
  mockContentfulResponse(defaultMock)

  const context = { query: { serviceType: 'Find' } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as Required<Awaited<ReturnType<typeof getServerSideProps>>>

  render(<ServiceProviders {...props} />)

  mockRouter.asPath = '/providers?q=&serviceType=Find&order=a-z'

  await userEvent.selectOptions(screen.getByLabelText('Sort by'), 'Alphabetical (descending)')

  expect(mockRouter.asPath).toBe('/providers?q=&serviceType=Find&order=z-a')
})

test('Loading status', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({
    query: {},
  } as GetServerSidePropsContext)) as GetServerSidePropsReturnType

  render(<ServiceProviders {...props} />)

  // Shows loading state when route changes due to filter change
  act(() => mockRouter.events.emit('routeChangeStart', '/providers?serviceType=Find&order=a-z'))
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // Hides loading state after route change complete
  act(() => mockRouter.events.emit('routeChangeComplete'))
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

  // Does not show loading state when route changes to another page
  act(() => mockRouter.events.emit('routeChangeStart', '/providers/test'))
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})

test('No results', async () => {
  mockContentfulResponse(noResultsMock)

  const { props } = (await getServerSideProps({
    query: {},
  } as GetServerSidePropsContext)) as GetServerSidePropsReturnType

  render(<ServiceProviders {...props} />)

  expect(screen.getByRole('heading', { name: 'There are no matching results.' })).toBeInTheDocument()
})

test('Selected filters panel', async () => {
  mockContentfulResponse(defaultMock)

  mockRouter.query = {
    serviceType: [ServiceType.FIND, ServiceType.RECRUIT],
  }

  const context = { query: { serviceType: ['Find', 'Recruit'] } } as unknown as GetServerSidePropsContext

  const { props } = (await getServerSideProps(context)) as Required<Awaited<ReturnType<typeof getServerSideProps>>>

  render(<ServiceProviders {...props} />)

  expect(screen.getByRole('list', { name: 'Selected filters' })).toBeInTheDocument()

  expect(screen.getByRole('link', { name: 'Clear filter: Find' })).toHaveAttribute(
    'href',
    '/providers?serviceType=Recruit'
  )
})

test('Contact research support', async () => {
  mockContentfulResponse(defaultMock)

  const { props } = (await getServerSideProps({ query: {} } as GetServerSidePropsContext)) as {
    props: ServiceProvidersProps
  }
  render(<ServiceProviders {...props} />)

  expect(screen.getByRole('heading', { name: 'Get support for your research', level: 3 })).toBeInTheDocument()
  expect(
    screen.getByText(
      'Need help finding appropriate data services, or any other part of the UK journey to getting your study started? The UK offers multiple services and teams of professionals who can support you.'
    )
  ).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Contact research support' })).toHaveAttribute(
    'href',
    '/contact-research-support'
  )
})
