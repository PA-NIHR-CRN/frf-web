import { rest } from 'msw'
import { setupServer } from 'msw/node'

const API_URL = 'https://preview.contentful.com/spaces/TEST_SPACE_ID/environments/dev/entries'

const setupMockServer = () => {
  const server = setupServer()

  const mockContentfulResponse = (data: Record<string, unknown>, status = 200) =>
    server.use(
      rest.get(API_URL, async (_, res, ctx) => {
        return res(ctx.status(status), ctx.json(data))
      })
    )

  return [server, mockContentfulResponse] as const
}

export { setupMockServer }
