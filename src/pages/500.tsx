import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { contentfulService } from '@/lib/contentful'
import { logger } from '@/lib/logger'
import { getStaticPropsRevalidateValue } from '@/utils'

// Page title to be used if there is an issue retrieving data from Contentful
export const FALLBACK_TITLE = 'Sorry, there is a problem with the service.'

export type ServiceUnavailablePageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ServiceUnavailablePage({ heading, content }: ServiceUnavailablePageProps) {
  return (
    <>
      <NextSeo title={heading} />
      <Container>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            {content ? (
              <RichTextRenderer>{content}</RichTextRenderer>
            ) : (
              <p className="govuk-body">
                Please try again later or contact the Find, Recruit and Follow-up Central Team at{' '}
                <a href="mailto:frfteam@nihr.ac.uk">frfteam@nihr.ac.uk</a>.
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const entry = await contentfulService.getServiceUnavailablePage()

    if (!entry) {
      return {
        revalidate: false,
        props: {
          heading: FALLBACK_TITLE,
        },
      }
    }

    const { title: heading, content } = entry.fields

    return {
      props: {
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        content,
        heading,
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    logger.error(error)
    return {
      revalidate: false,
      props: {
        heading: FALLBACK_TITLE,
      },
    }
  }
}
