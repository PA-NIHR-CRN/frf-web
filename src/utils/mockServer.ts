import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { environmentMock, serviceProviderMock, spaceMock, tagsMock } from '@/mocks/space'

const API_URL = 'https://preview.contentful.com/spaces/TEST_SPACE_ID/environments/dev'
const MANAGEMENT_API_URL = 'https://api.contentful.com/spaces/TEST_SPACE_ID'

const setupMockServer = () => {
  const server = setupServer(
    rest.get(MANAGEMENT_API_URL, async (_, res, ctx) => {
      return res(ctx.json(spaceMock))
    }),
    rest.get(`${MANAGEMENT_API_URL}/environments/dev`, async (_, res, ctx) => {
      return res(ctx.json(environmentMock))
    }),
    rest.get(`${MANAGEMENT_API_URL}/environments/dev/tags`, async (_, res, ctx) => {
      return res(ctx.json(tagsMock))
    }),
    rest.get(`${MANAGEMENT_API_URL}/environments/dev/content_types/serviceProvider`, async (_, res, ctx) => {
      return res(ctx.json(serviceProviderMock))
    })
  )

  const mockContentfulResponse = (
    data: Record<string, unknown>,
    status = 200,
    path = '/entries',
    isManagement = false
  ) =>
    server.use(
      rest.all(`${isManagement ? MANAGEMENT_API_URL : API_URL}${path}`, async (_, res, ctx) => {
        return res(ctx.status(status), ctx.json(data))
      })
    )

  return [server, mockContentfulResponse] as const
}

export { setupMockServer }
