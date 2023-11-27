import { InferGetServerSidePropsType, NextApiRequest } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import { RootLayout } from '@/components/Layout/RootLayout'
import { logger } from '@/lib/logger'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type SiteMapProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function SiteMap({ query }: SiteMapProps) {
  return (
    <>
      <NextSeo
        title={`Sitemap - Explore Find, Recruit and Follow-up Services`}
        description="Explore the site map for Find, Recruit and Follow-up. Navigate through different sections and services offered on our website."
      />
      <Container>
        <div className="govuk-grid-row">
          <ol>
            <li>
              <Link href="/">Return to homepage</Link>
            </li>
            <li>
              <Link href="/feedback">Provide feedback on this service</Link>
            </li>
            <li>
              <Link href="/data-service-providers">Organisations providing data services</Link>
            </li>
            <li>
              <Link href="/providers">View data service providers</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Find">View all Find services</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Recruit">View all Recruit services</Link>
            </li>
            <li>
              <Link href="/providers?serviceType=Follow-Up">View all Follow-Up services</Link>
            </li>
            <li>
              <Link href="/contact-research-support">Contact research support</Link>
            </li>
            <li>
              <Link href="/research-support">Research support colleagues</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms and conditions</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie policy</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            {/* Remove external links */}
          </ol>
        </div>
      </Container>
    </>
  )
}

SiteMap.getLayout = function getLayout(page: ReactElement, { isPreviewMode, cookieBanner, heading }: SiteMapProps) {
  return (
    <RootLayout isPreviewMode={isPreviewMode} cookieBanner={cookieBanner} heading={heading}>
      {page}
    </RootLayout>
  )
}

export const getServerSideProps = async ({ query, req }: { query: any; req: NextApiRequest }) => {
  try {
    return {
      props: {
        page: 'SiteMap',
        heading: 'Sitemap',
        query,
        isPreviewMode: parseInt(process.env.CONTENTFUL_PREVIEW_MODE) === 1,
        cookieBanner: await getCookieBanner(req),
      },
    }
  } catch (error) {
    logger.error(error)
    return {
      redirect: {
        destination: '/500',
      },
    }
  }
}
