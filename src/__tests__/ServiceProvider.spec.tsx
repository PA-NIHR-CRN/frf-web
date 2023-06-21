// import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

// import { render, screen } from '@/config/test-utils'
// import ServiceProvider, { getStaticProps, ServiceProviderProps } from '@/pages/providers/[...slug]'

jest.mock('next/router', () => require('next-router-mock'))

test.skip('Displays the Service Provider page', async () => {
  const context = {
    params: {},
  }

  // const { props } = (await getStaticProps(context as GetStaticPropsContext)) as {
  //   props: ServiceProviderProps
  // }

  // render(ServiceProvider.getLayout(<ServiceProvider {...props} />))

  // expect(screen.getByRole('heading', { name: 'Detail page', level: 2 }))
})
