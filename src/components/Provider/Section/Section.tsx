import clsx from 'clsx'
import { ReactNode } from 'react'

import { ServiceType } from '@/constants'

type SectionType = Lowercase<keyof typeof ServiceType>

type SectionProps = {
  children: ReactNode
  heading: string
  icon: ReactNode
  type?: SectionType
}

const styles: Record<SectionType, string> = {
  find: 'bg-[var(--colour-find-background)] after:bg-[var(--colour-find-foreground)]',
  recruit: 'bg-[var(--colour-recruit-background)] after:bg-[var(--colour-recruit-foreground)]',
  follow_up: 'bg-[var(--colour-follow-up-background)] after:bg-[var(--colour-follow-up-foreground)]',
}

export function Section({ children, heading, icon, type }: SectionProps) {
  return (
    <>
      <div
        className={clsx(
          "relative mb-6 mt-8 flex w-full items-center justify-between after:absolute after:bottom-0 after:right-0 after:top-0 after:z-0 after:w-[79px] after:content-['']",
          type ? styles[type] : 'bg-grey-30 after:bg-grey-100'
        )}
      >
        <h3 className="govuk-heading-m mb-0 px-4 py-5 text-navy-100">{heading}</h3>
        <div className="z-10 flex min-w-[79px] items-center justify-center text-[3rem] text-white">{icon}</div>
      </div>
      {children}
    </>
  )
}
