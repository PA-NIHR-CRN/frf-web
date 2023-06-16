import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document } from '@contentful/rich-text-types'

type ShortDescriptionProps = {
  children: Document
}

export const ShortDescription = ({ children }: ShortDescriptionProps) => {
  return <div data-testid="frf-dsp-description" dangerouslySetInnerHTML={{ __html: documentToHtmlString(children) }} />
}
