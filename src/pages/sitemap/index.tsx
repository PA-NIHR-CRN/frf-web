import { InferGetServerSidePropsType, NextApiRequest } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import { RootLayout } from '@/components/Layout/RootLayout'
import { List, ListItem } from '@/components/List/List'
import { logger } from '@/lib/logger'
import { getCookieBanner } from '@/utils/getCookieBanner'

export type SiteMapProps = InferGetServerSidePropsType<typeof getServerSideProps>

const navigationItems = [
  { label: 'View all data service providers', href: '/providers' },
  { label: 'View all Find services', href: '/providers?serviceType=Find' },
  { label: 'View all Recruit services', href: '/providers?serviceType=Recruit' },
  { label: 'View all Follow-Up services', href: '/providers?serviceType=Follow-Up' },
  { label: 'Contact research support', href: '/contact-research-support' },
  { label: 'Organisations providing data services', href: '/data-service-providers' },
  { label: 'Research support colleagues', href: '/research-support' },
  { label: 'Provide feedback on this service', href: '/feedback' },
  { label: 'Terms and conditions', href: '/terms-and-conditions' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Cookie policy', href: '/cookie-policy' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function SiteMap({ query }: SiteMapProps) {
  return (
    <>
      <NextSeo
        title={`Sitemap - Find, Recruit and Follow-up Services`}
        description="Site map for Find, Recruit and Follow-up."
      />
      <Container>
        <h2 className="govuk-heading-m">
          <Link href="/">Home</Link>
        </h2>
        <List>
          {navigationItems.map((item, index) => (
            <ListItem key={index}>
              <Link href={item.href}>{item.label}</Link>
            </ListItem>
          ))}
        </List>
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
