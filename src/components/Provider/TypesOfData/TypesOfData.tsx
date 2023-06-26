import { Document } from '@contentful/rich-text-types'

import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'

type TypesOfDataProps = {
  children: Document | undefined
  className?: string
}

export const TypesOfData = ({ children, className }: TypesOfDataProps) => {
  if (!children) return null

  return (
    <div className={className}>
      <h3 className="govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-3 md:mt-0">Type of data available</h3>
      <RichTextRenderer className="[&>ul>li_p]:mb-1 [&>ul_li_p]:text-sm [&>ul_ul]:pt-1 [&>ul_ul_li:not(:last-child)]:mb-0">
        {children}
      </RichTextRenderer>
    </div>
  )
}
