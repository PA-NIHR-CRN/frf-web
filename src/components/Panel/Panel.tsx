import clsx from 'clsx'

import { Container } from '../Container/Container'

type PanelProps = {
  children: React.ReactNode
}

export function Panel({ children }: PanelProps) {
  return (
    <div
      className="mb-7 border-x-0 border-b-[9px] border-t-0 border-[var(--panel-border-color)] bg-[var(--panel-bg-color)]"
      data-testid="frf-panel"
    >
      <Container>
        <div
          className={clsx(
            'govuk-panel govuk-panel--confirmation',
            'mb-0 flex items-center border-0 bg-[var(--panel-bg-color)] px-0 py-4 text-left'
          )}
        >
          <h1 className={clsx('govuk-heading-l heading-underscore mb-0 pt-1 text-white')} data-testid="page-title">
            {children}
          </h1>
        </div>
      </Container>
    </div>
  )
}
