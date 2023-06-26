import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document } from '@contentful/rich-text-types'

type TextRendererProps = {
  children: Document
  className?: string
}

export const TextRenderer = ({ children, className }: TextRendererProps) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html: documentToHtmlString(children) }} />
}
