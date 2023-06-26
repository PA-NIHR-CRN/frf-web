import Link from 'next/link'

import { Tag } from '@/components/Tag/Tag'

type ProviderHeadingLinkProps = {
  children: string
  slug: string
  isNew: boolean
}

export const ProviderHeadingLink = ({ children, slug, isNew }: ProviderHeadingLinkProps) => {
  return (
    <h3 className="govuk-heading-m mb-2" id={`article-${slug}-title`}>
      <Link href={`/providers/${slug}`} className="text-black">
        <span className="govuk-visually-hidden">{isNew && 'Recently published'} Data service provider:&nbsp;</span>
        {children}
      </Link>
      {isNew && <Tag aria-hidden>New</Tag>}
    </h3>
  )
}
