import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, MARKS } from '@contentful/rich-text-types'
import React, { FC, ReactNode } from 'react'

import { List, ListItem } from '@/components/List/List'

const Bold = ({ children }: { children: ReactNode }) => <p className="bold">{children}</p>

const Text = ({ children }: { children: ReactNode }) => <p>{children}</p>

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.UL_LIST]: (node, children) => <List>{children}</List>,
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

type RichTextRendererProps = {
  document: Document
  className?: string
}

export const RichTextRenderer: FC<RichTextRendererProps> = ({ document, className }: RichTextRendererProps) => {
  return <div className={className}>{documentToReactComponents(document, options)}</div>
}
