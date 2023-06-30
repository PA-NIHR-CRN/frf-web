import { render, screen, within } from '@/config/test-utils'

import { GeographicalCoverage } from './GeographicalCoverage'

test('Geographical coverage with regional coverage', () => {
  render(
    <GeographicalCoverage
      regionalCoverage="Wessex and South London"
      geography={['England', 'Wales', 'Scotland']}
      geographySupportingText=""
      population="Freetext"
    />
  )

  expect(screen.getByRole('list', { name: 'Coverage' })).toBeInTheDocument()
  expect(screen.getByText('Coverage:')).toBeInTheDocument()

  const list = screen.getAllByRole('listitem')

  expect(list).toHaveLength(2)
  expect(within(list[0]).getByText(/Geographical: Wessex and South London/)).toBeInTheDocument()
  expect(within(list[0]).getByTestId('frf-icon-map-pin')).toHaveAttribute('aria-hidden')
  expect(within(list[1]).getByText(/Population: Freetext/)).toBeInTheDocument()
})

test('Geographical coverage without regional coverage', () => {
  render(
    <GeographicalCoverage
      regionalCoverage={undefined}
      geography={['England', 'Wales', 'Scotland']}
      geographySupportingText=""
      population="10,000,000"
    />
  )

  expect(screen.getByRole('list', { name: 'Coverage' })).toBeInTheDocument()
  expect(screen.getByText('Coverage:')).toBeInTheDocument()

  const list = screen.getAllByRole('listitem')

  expect(list).toHaveLength(2)
  expect(within(list[0]).getByText(/Geographical: England, Wales, Scotland/)).toBeInTheDocument()
  expect(within(list[0]).getByTestId('frf-icon-map-pin')).toHaveAttribute('aria-hidden')
  expect(within(list[1]).getByText(/Population: 10,000,000/)).toBeInTheDocument()
})

test('Geographical coverage without population', () => {
  render(
    <GeographicalCoverage
      regionalCoverage={undefined}
      geography={['England', 'Wales', 'Scotland']}
      geographySupportingText=""
      population={undefined}
    />
  )

  expect(screen.getByRole('list', { name: 'Coverage' })).toBeInTheDocument()
  expect(screen.getByText('Coverage:')).toBeInTheDocument()

  const list = screen.getAllByRole('listitem')

  expect(list).toHaveLength(1)
  expect(within(list[0]).getByText(/Geographical: England, Wales, Scotland/)).toBeInTheDocument()
  expect(within(list[0]).getByTestId('frf-icon-map-pin')).toHaveAttribute('aria-hidden')
})

test('Geographical supporting text', () => {
  render(
    <GeographicalCoverage
      regionalCoverage={undefined}
      geography={['England', 'Wales', 'Scotland']}
      geographySupportingText="Mock supporting text"
      population={undefined}
    />
  )

  expect(screen.getByText(/Mock supporting text/)).toBeInTheDocument()
})

test('Geographical coverage with uk wide and other regions should only show uk wide', () => {
  render(
    <GeographicalCoverage
      regionalCoverage={undefined}
      geography={['England', 'UK wide', 'Wales', 'Scotland']}
      geographySupportingText=""
      population={undefined}
    />
  )

  const list = screen.getAllByRole('listitem')

  expect(list).toHaveLength(1)
  expect(within(list[0]).getByText('Geographical: UK wide')).toBeInTheDocument()
})
