import clsx from 'clsx'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Container } from '@/components/Container/Container'
import { RichTextRenderer } from '@/components/Renderers/RichTextRenderer/RichTextRenderer'
import { contentfulService } from '@/lib/contentful'
import { getStaticPropsRevalidateValue } from '@/utils'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type GenericPageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function GenericPage({ fields }: GenericPageProps) {
  return (
    <>
      <NextSeo title={fields.metaTitle} description={fields.metaDescription} />
      <Container>
        <article aria-labelledby={`article-${fields.slug}-title`}>
          <div className="govuk-grid-row">
            <div
              className={clsx({ ['govuk-grid-column-two-thirds-from-desktop']: fields.sidebar })}
              data-testid="main-column"
            >
              <div className={clsx({ ['max-w-[var(--generic-page-container-max-width)]']: fields.sidebar })}>
                <RichTextRenderer>{fields.content}</RichTextRenderer>
              </div>
            </div>
            {fields.sidebar && (
              <div
                className="govuk-grid-column-one-third-from-desktop govuk-!-padding-4 md:sticky md:top-4 md:mt-6 md:border-t-4 md:border-t-purple-100"
                data-testid="sidebar-column"
              >
                <h3 className="govuk-heading-m heading-underscore mb-0 text-navy-100">{fields.sidebar.fields.title}</h3>
                <div className="flex flex-grow flex-col items-start justify-between pt-4">
                  {fields.sidebar.fields.description && (
                    <RichTextRenderer>{fields.sidebar.fields.description}</RichTextRenderer>
                  )}
                  {fields.sidebar.fields.url && (
                    <div>
                      <Link
                        className="govuk-button govuk-button--secondary mb-0 mt-2 text-left"
                        href={fields.sidebar.fields.url}
                      >
                        {fields.sidebar.fields.buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export type GetStaticProps = GetStaticPropsContext & { params: { slug: string[] } }

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const [slug] = params.slug

  try {
    const entry = await contentfulService.getGenericPageBySlug(slug)

    if (!entry) throw new Error(`Null entry for slug ${slug}`)

    return {
      props: {
        fields: entry.fields,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(),
        heading: entry.fields.title,
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    throw new Error(`Failed to fetch generic page content (${error})`)
  }
}
