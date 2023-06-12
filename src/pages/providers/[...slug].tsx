import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ReactElement } from 'react'

import { Container } from '@/components/Container/Container'
import { ServiceProviderLayout } from '@/components/Layout/ServiceProviderLayout'

export type ServiceProviderProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ServiceProvider({ exampleTitle }: ServiceProviderProps) {
  return (
    <Container>
      <h2 className="govuk-heading-l">{exampleTitle}</h2>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<{
  exampleTitle: string
}> = async () => {
  const exampleTitle = 'Detail page'
  return {
    props: {
      exampleTitle,
    },
  }
}

ServiceProvider.getLayout = function getLayout(page: ReactElement) {
  return <ServiceProviderLayout>{page}</ServiceProviderLayout>
}
