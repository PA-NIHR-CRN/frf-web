import type { ContentfulClientApi, Entry } from 'contentful'
import type { ClientAPI as ManagementClientApi, Environment, Space } from 'contentful-management'
import { Mock } from 'ts-mockery'

import { TypeHomepage, TypeServiceProvider } from '@/@types/generated'
import { ContentfulService } from '@/lib/contentfulService'

const mockServiceProvider = Mock.of<TypeServiceProvider<undefined, ''>>({
  fields: {
    name: 'NHS DigiTrials V3.2 (Proposed wording)',
    slug: 'nhs-digitrials-v3-2-proposed-wording',
  },
})

const mockHomepage = Mock.of<TypeHomepage<undefined, ''>>({
  fields: {},
})

const contentTypeMocks: Record<string, Entry> = {
  homepage: mockHomepage,
  serviceProvider: mockServiceProvider,
}

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
  getEntry: jest.fn().mockImplementation((id: string) => ({
    id,
  })),
})

const mockSpace = Mock.of<Space>({
  getEnvironment: jest.fn().mockImplementation(() => mockEnvironment),
})

function createMockContentClient() {
  const getEntries = jest.fn().mockImplementation(({ content_type }) => ({
    sys: { type: 'Array' },
    total: 1,
    skip: 0,
    limit: 10,
    items: [contentTypeMocks[content_type]],
  }))

  return {
    withoutUnresolvableLinks: {
      getEntries,
    },
    getEntries,
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
    { contentfulSpaceId: '', contentfulEnvironment: '' },
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
        excludeRegional: true,
      })

      expect(mockContentClient.getEntries).toHaveBeenCalledWith({
        skip: 0,
        limit: 4,
        content_type: 'serviceProvider',
        'fields.searchKeywords[match]': 'test',
        'fields.costs[in]': 'Find: Free of charge,Recruit: Free of charge',
        'fields.geography[in]': 'England,Scotland',
        'fields.regionalCoverage[exists]': 'false',
        'metadata.tags.sys.id[in]': 'dataTypeAudit,dataTypeClinicallyReported',
        order: ['-fields.name'],
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

  describe('getHomepage', () => {
    it('returns content for the homepage', async () => {
      const [contentfulService, mockContentClient] = setupContentfulService()

      const entry = await contentfulService.getHomePage()

      expect(mockContentClient.getEntries).toHaveBeenCalledWith({
        limit: 1,
        content_type: 'homepage',
      })

      expect(entry).toBeDefined()
    })
  })

  describe('getProviderFilterOptionValues', () => {
    it('returns a list of filter option values', async () => {
      const [contentfulService] = setupContentfulService()

      const entries = await contentfulService.getProviderFilterOptionValues()

      expect(entries).toStrictEqual({
        geography: ['Test Geography'],
        costs: ['Test Cost'],
      })
    })
  })

  describe('getProviderEntryById', () => {
    it('returns a provider entry by ID', async () => {
      const [contentfulService] = setupContentfulService()

      const entry = await contentfulService.getProviderEntryById('test')

      expect(entry).toStrictEqual({ id: 'test' })
    })
  })

  describe('getOrderFilter', () => {
    it('returns the correct order query', () => {
      expect(ContentfulService.getOrderFilter()).toEqual('fields.name')
      expect(ContentfulService.getOrderFilter('updated')).toEqual('-sys.updatedAt')
      expect(ContentfulService.getOrderFilter('a-z')).toEqual('fields.name')
      expect(ContentfulService.getOrderFilter('z-a')).toEqual('-fields.name')
      expect(ContentfulService.getOrderFilter('highest-population')).toEqual('-fields.population')
      expect(ContentfulService.getOrderFilter('lowest-population')).toEqual('fields.population')
    })
  })
})
