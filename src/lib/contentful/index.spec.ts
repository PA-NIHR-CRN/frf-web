import { setupMockServer } from '@/utils'

import { contentfulService } from '.'

const [server] = setupMockServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Caches management API requests', async () => {
  let requestCount = 0
  server.events.on('request:start', () => {
    requestCount++
  })
  await contentfulService.getProviderFilterOptionValues()
  expect(requestCount).toBe(3)
  await contentfulService.getProviderFilterOptionValues()
  expect(requestCount).toBe(3)
})
