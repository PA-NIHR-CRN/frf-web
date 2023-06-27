import clsx from 'clsx'
import { HTMLProps, ReactNode } from 'react'

import { ServiceType } from '@/constants'

type SectionType = Lowercase<keyof typeof ServiceType>

type SectionProps = HTMLProps<HTMLElement> & {
  children: ReactNode
  heading: string
  icon: ReactNode
  type?: SectionType
}

export const styles: Record<SectionType, string> = {
  find: 'bg-[var(--colour-find-background)] after:bg-[var(--colour-find-foreground)]',
  recruit: 'bg-[var(--colour-recruit-background)] after:bg-[var(--colour-recruit-foreground)]',
  follow_up: 'bg-[var(--colour-follow-up-background)] after:bg-[var(--colour-follow-up-foreground)]',
}

export function Section({ children, heading, icon, type, ...props }: SectionProps) {
  return (
    <section {...props}>
      <div
        data-testid="frf-dsp-section-panel"
        className={clsx(
          "govuk-!-margin-top-8 govuk-!-margin-bottom-6 relative flex w-full items-center justify-between after:absolute after:bottom-0 after:right-0 after:top-0 after:z-0 after:min-w-[50px] after:content-[''] after:lg:min-w-[80px]",
          type ? styles[type] : 'bg-grey-30 after:bg-grey-100'
        )}
      >
        <h3 className="govuk-heading-m govuk-!-padding-left-4 govuk-!-padding-right-4 govuk-!-padding-top-5 govuk-!-padding-bottom-5 mb-0 px-4 text-navy-100">
          {heading}
        </h3>
        <div className="z-10 flex min-w-[50px] items-center justify-center text-[2rem] text-white lg:min-w-[80px] lg:text-[3rem]">
          {icon}
        </div>
      </div>
      {children}
    </section>
  )
}
