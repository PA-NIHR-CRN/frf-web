import { TypeServiceProvider } from '@/@types/generated'
import { ContentfulService } from '@/lib/contentfulService'
import type { ContentfulClientApi } from 'contentful'
import type { Environment, ClientAPI as ManagementClientApi, Space } from 'contentful-management'
import { Mock } from 'ts-mockery'

const mockServiceProvider = Mock.of<TypeServiceProvider<undefined, ''>>({
  fields: {
    name: 'NHS DigiTrials V3.2 (Proposed wording)',
    slug: 'nhs-digitrials-v3-2-proposed-wording',
  },
})

const mockEnvironment = Mock.of<Environment>({
  getContentType: jest.fn().mockImplementation(() => ({
    fields: [
      {
        id: 'costs',
        name: 'Costs',
        items: {
          validations: [
            {
              in: ['Test Cost'],
            },
          ],
        },
      },
      {
        id: 'geography',
        name: 'Geography',
        items: {
          validations: [
            {
              in: ['Test Geography'],
            },
          ],
        },
      },
    ],
  })),
  getTags: jest.fn().mockImplementation(() => ({
    items: [
      {
        name: 'Clinically reported',
      },
      {
        name: 'Data type: Audit',
      },
      {
        name: 'Data type: Biological samples',
      },
      {
        name: 'Service type: Find',
      },
    ],
  })),
})

const mockSpace = Mock.of<Space>({
  getEnvironment: jest.fn().mockImplementation(() => mockEnvironment),
})

function createMockContentClient() {
  return {
    getEntries: jest.fn().mockImplementation(() => ({
      sys: { type: 'Array' },
      total: 1,
      skip: 0,
      limit: 10,
      items: [mockServiceProvider],
    })),
  }
}

function createMockManagementClient() {
  return {
    getSpace: jest.fn().mockImplementation(() => mockSpace),
  }
}

function setupContentfulService() {
  const mockContentClient = createMockContentClient()
  const mockManagementClient = createMockManagementClient()
  const contentfulService = new ContentfulService(
    '',
    Mock.of<ContentfulClientApi<undefined>>(mockContentClient),
    Mock.of<ManagementClientApi>(mockManagementClient)
  )
  return [contentfulService, mockContentClient, mockManagementClient] as const
}

describe('ContentfulService', () => {
  describe('getProvidersByFilter', () => {
    it('returns a filtered list of service providers', async () => {
      const [contentfulService, mockContentClient] = setupContentfulService()

      const entries = await contentfulService.getProvidersByFilter({
        page: 1,
        q: 'test',
        serviceType: ['Find', 'Recruit'],
        dataType: ['Audit', 'Clinically reported'],
        costs: ['Find: Free of charge', 'Recruit: Free of charge'],
        geography: ['England', 'Scotland'],
        order: 'z-a',
        excludeRegional: false,
      })

      expect(mockContentClient.getEntries).toHaveBeenCalledWith({
        skip: 0,
        limit: 10,
        content_type: 'serviceProvider',
        'fields.costs[in]': 'Find: Free of charge,Recruit: Free of charge',
        'fields.geography[in]': 'England,Scotland',
        'metadata.tags.sys.id[in]': 'dataTypeAudit,dataTypeClinicallyReported',
        order: ['-fields.name'],
        query: 'test',
      })

      const entry = entries.items[0]
      expect(entry.fields.name).toEqual(mockServiceProvider.fields.name)
      expect(entry.fields.slug).toEqual(mockServiceProvider.fields.slug)
    })
  })

  describe('getProviderBySlug', () => {
    it('returns a specific service provider based on its slug', async () => {
      const [contentfulService, mockContentClient] = setupContentfulService()

      const entry = await contentfulService.getProviderBySlug('nhs-digitrials-v3-2-proposed-wording')

      expect(mockContentClient.getEntries).toHaveBeenCalledWith({
        limit: 1,
        content_type: 'serviceProvider',
        'fields.slug': 'nhs-digitrials-v3-2-proposed-wording',
        include: 10,
      })

      expect(entry).toBeDefined()
      expect(entry?.fields.name).toEqual(mockServiceProvider.fields.name)
      expect(entry?.fields.slug).toEqual(mockServiceProvider.fields.slug)
    })
  })

  describe('getProviderFilterOptionValues', () => {
    it('returns a list of filter option values', async () => {
      const [contentfulService] = setupContentfulService()

      const entries = await contentfulService.getProviderFilterOptionValues()

      expect(entries).toStrictEqual({
        dataType: ['Audit', 'Biological samples'],
        geography: ['Test Geography'],
        costs: ['Test Cost'],
      })
    })
  })
})
