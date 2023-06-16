import Link from 'next/link'

import { Tag } from '@/components/Tag/Tag'

type ProviderHeadingProps = {
  children: string
  slug: string
  isNew: boolean
}

export const ProviderHeading = ({ children, slug, isNew }: ProviderHeadingProps) => {
  return (
    <h3 className="govuk-heading-m mb-2" id={`article-${slug}-title`}>
      <Link href={`/providers/${slug}`} className="text-black">
        {children}
        {isNew && <span className="govuk-visually-hidden">&ndash; New</span>}
      </Link>
      {isNew && <Tag aria-hidden>New</Tag>}
    </h3>
  )
}
