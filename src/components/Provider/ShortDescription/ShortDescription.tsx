import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document } from '@contentful/rich-text-types'

type ShortDescriptionProps = {
  children: Document
  className?: string
}

export const ShortDescription = ({ children, className }: ShortDescriptionProps) => {
  return (
    <div
      data-testid="frf-dsp-description"
      dangerouslySetInnerHTML={{ __html: documentToHtmlString(children) }}
      className={className}
    />
  )
}
