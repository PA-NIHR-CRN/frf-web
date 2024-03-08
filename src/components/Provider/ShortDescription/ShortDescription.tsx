import { Document } from '@contentful/rich-text-types'

import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'

type ShortDescriptionProps = {
  children: Document
  className?: string
}

export const ShortDescription = ({ children, className }: ShortDescriptionProps) => {
  return (
    <div data-testid="frf-dsp-description" className={className}>
      <RichTextRenderer>{children}</RichTextRenderer>
    </div>
  )
}
