import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, MARKS } from '@contentful/rich-text-types'
import clsx from 'clsx'
import { Entry } from 'contentful'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

import { TypeButtonSkeleton, TypeVideoSkeleton } from '@/@types/generated'
import { List, ListItem } from '@/components/List/List'
import { Video } from '@/components/Video/Video'

const Bold = ({ children }: { children: ReactNode }) => <span className="font-bold">{children}</span>

const Text = ({ children }: { children: ReactNode }) => <p>{children}</p>

const headingVariants = ['xl', 'l', 'm', 's']

const Heading = ({ level, children }: { level: 2 | 3 | 4; children: ReactNode }) => {
  const Tag = `h${level}` as const
  return <Tag className={`govuk-heading-${headingVariants[level - 1]}`}>{children}</Tag>
}

const ButtonEntry = ({
  text,
  type,
  url,
  external,
}: Entry<TypeButtonSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>['fields']) => (
  <Link
    href={url}
    target={external ? '_blank' : undefined}
    className={clsx('govuk-button govuk-!-margin-top-3', {
      'govuk-button--secondary': type === 'Secondary',
    })}
    shallow={url.includes('?change-settings=1')}
  >
    {external ? `${text} (Opens in a new window)` : text}
  </Link>
)

const VideoEntry = ({ title, url }: Entry<TypeVideoSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>['fields']) => {
  return (
    <div className="govuk-!-margin-top-4">
      <Video url={url} title={title} />
    </div>
  )
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.UL_LIST]: (node, children) => <List>{children}</List>,
    [BLOCKS.OL_LIST]: (node, children) => <List as="ol">{children}</List>,
    [BLOCKS.LIST_ITEM]: (node, children) => <ListItem className="[&>p]:mb-0">{children}</ListItem>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_2]: (node, children) => <Heading level={2}>{children}</Heading>,
    [BLOCKS.HEADING_3]: (node, children) => <Heading level={3}>{children}</Heading>,
    [BLOCKS.HEADING_4]: (node, children) => <Heading level={4}>{children}</Heading>,
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entryType = node.data.target.sys.contentType.sys.id
      switch (entryType) {
        case 'button':
          return <ButtonEntry {...node.data.target.fields} />
        case 'video':
          return <VideoEntry {...node.data.target.fields} />
        default:
          return <p>Not yet implemented</p>
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, description } = node.data.target.fields
      const { contentType, url, details } = file
      if (contentType.includes('image')) {
        return (
          <Image
            src={`https:${url}`}
            alt={description}
            width={details.image.width}
            height={details.image.height}
            className="govuk-!-margin-top-6"
          />
        )
      } else if (contentType.includes('video')) {
        return (
          <video controls className="govuk-!-margin-top-6" title={description}>
            <source src={url} type={contentType} />
            <p>
              Your browser doesn&apos;t support HTML video. Here is a<a href={url}>link to the video</a> instead.
            </p>
          </video>
        )
      } else {
        return <p>Not yet implemented</p>
      }
    },
  },
}

type RichTextRendererProps = {
  children: Document
  className?: string
}

export const RichTextRenderer: FC<RichTextRendererProps> = ({ children, className }: RichTextRendererProps) => {
  return <div className={className}>{documentToReactComponents(children, options)}</div>
}
