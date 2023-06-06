import clsx from 'clsx'
import { Container } from '../Container/Container'

type PanelProps = {
  children: React.ReactNode
}

export function Panel({ children }: PanelProps) {
  return (
    <div
      className="border-x-0 border-b-[9px] border-t-0 border-[var(--panel-border-color)] bg-[var(--panel-bg-color)]"
      data-testid="frf-panel"
    >
      <Container>
        <div
          className={clsx(
            'govuk-panel govuk-panel--confirmation',
            'mb-0 flex h-[var(--panel-height)] items-center border-0 bg-[var(--panel-bg-color)] px-0 text-left'
          )}
        >
          <h1
            className={clsx(
              'govuk-panel__title',
              'after:my-[0.5rem] after:block after:h-[0.375rem] after:w-[3rem] after:bg-coral-100 after:content-[""]'
            )}
          >
            {children}
          </h1>
        </div>
      </Container>
    </div>
  )
}
