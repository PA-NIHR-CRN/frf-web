import { render, screen } from '@/config/test-utils'
import { GetServerSidePropsContext } from 'next'
import ServiceProvider, { getServerSideProps, ServiceProviderProps } from '@/pages/providers/[...slug]'

jest.mock('next/router', () => require('next-router-mock'))

test('Displays the Service Provider page', async () => {
  const context = {
    params: {},
  }

  const { props } = (await getServerSideProps(context as GetServerSidePropsContext)) as {
    props: ServiceProviderProps
  }

  render(ServiceProvider.getLayout(<ServiceProvider {...props} />))

  expect(screen.getByRole('heading', { name: 'Detail page', level: 2 }))
})
