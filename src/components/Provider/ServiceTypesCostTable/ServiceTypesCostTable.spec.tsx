import { ComponentProps } from 'react'

import { render, screen, within } from '@/config/test-utils'

import { ServiceTypesCostTable } from './ServiceTypesCostTable'

const getComponent = (props: ComponentProps<typeof ServiceTypesCostTable>) => <ServiceTypesCostTable {...props} />

test('No costs', () => {
  const { rerender } = render(
    getComponent({
      costs: undefined,
      find: {
        description: '',
        anchor: false,
      },
      recruit: {
        description: '',
        anchor: false,
      },
      followUp: {
        description: '',
        anchor: false,
      },
    })
  )

  expect(screen.queryByRole('table')).not.toBeInTheDocument()

  rerender(
    getComponent({
      costs: [],
      find: {
        description: '',
        anchor: false,
      },
      recruit: {
        description: '',
        anchor: false,
      },
      followUp: {
        description: '',
        anchor: false,
      },
    })
  )

  expect(screen.queryByRole('table')).not.toBeInTheDocument()
})

test('Costs table without a custom description', () => {
  render(
    getComponent({
      costs: ['Find: Free of charge (All studies)', 'Recruit: Chargeable service', 'Follow-Up: Chargeable service'],
      find: {
        description: '',
        anchor: false,
      },
      recruit: {
        description: '',
        anchor: false,
      },
      followUp: {
        description: '',
        anchor: false,
      },
    })
  )

  expect(screen.getByRole('table', { name: 'Services available and costs:' })).toBeInTheDocument()

  // Table column headers
  const headers = screen.getAllByRole('rowheader')
  expect(within(headers[0]).getByText('Find'))
  expect(within(headers[1]).getByText('Recruit'))
  expect(within(headers[2]).getByText('Follow-Up'))

  // Table rows
  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(3)

  expect(within(rows[0]).getByText('Free of charge (All studies)'))
  expect(within(rows[1]).getByText('Chargeable service'))
  expect(within(rows[2]).getByText('Chargeable service'))
})

test('Costs table with a custom description', () => {
  render(
    getComponent({
      costs: ['Find: Free of charge (All studies)', 'Recruit: Chargeable service', 'Follow-Up: Chargeable service'],
      find: {
        description: 'Mock find description',
        anchor: false,
      },
      recruit: {
        description: 'Mock recruit description',
        anchor: false,
      },
      followUp: {
        description: 'Mock follow-up description',
        anchor: false,
      },
    })
  )

  expect(screen.getByRole('table', { name: 'Services available and costs:' })).toBeInTheDocument()

  // Table column headers
  const headers = screen.getAllByRole('rowheader')
  expect(within(headers[0]).getByText('Find'))
  expect(within(headers[1]).getByText('Recruit'))
  expect(within(headers[2]).getByText('Follow-Up'))

  // Table rows
  const rows = screen.getAllByRole('row')
  expect(rows).toHaveLength(3)

  expect(within(rows[0]).getByText('Free of charge (All studies) - Mock find description'))
  expect(within(rows[1]).getByText('Chargeable service - Mock recruit description'))
  expect(within(rows[2]).getByText('Chargeable service - Mock follow-up description'))
})
