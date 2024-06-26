import type { ContentfulClientApi, EntrySkeletonType } from 'contentful'
import type { ClientAPI as ManagementClientApi, Tag } from 'contentful-management'

import { Filters, OrderType } from '@/@types/filters'
import {
  TypeCookieBannerSkeleton,
  TypeEmailContactFields,
  TypeEmailContactSkeleton,
  TypeEmailTemplateContactDataServiceProviderSkeleton,
  TypeEmailTemplateContactFrfCentralTeamSkeleton,
  TypeEmailTemplateContactResearchSupportSkeleton,
  TypeEmailTemplateFeedbackSkeleton,
  TypeHomepageSkeleton,
  TypePageSkeleton,
  TypeServiceProviderSkeleton,
  TypeServiceUnavailableSkeleton,
} from '@/@types/generated'
import { ServiceTypes } from '@/@types/services'
import { PER_PAGE, TagIds } from '@/constants'

export type FilterOptions = Awaited<ReturnType<ContentfulService['getProviderFilterOptionValues']>>

export type EmailTemplateTypes =
  | 'emailTemplateFeedback'
  | 'emailTemplateContactFrfCentralTeam'
  | 'emailTemplateContactResearchSupport'
  | 'emailTemplateContactDataServiceProvider'

export class ContentfulService {
  constructor(
    private config: {
      contentfulSpaceId: string
      contentfulEnvironment: string
    },
    private contentClient: ContentfulClientApi<undefined>,
    private managementClient: ManagementClientApi
  ) {}

  async getProvidersByFilter(filters: Filters) {
    return await this.contentClient.withoutUnresolvableLinks.getEntries<TypeServiceProviderSkeleton>({
      skip: (filters.page - 1) * PER_PAGE,
      limit: PER_PAGE,
      content_type: 'serviceProvider',

      ...(filters.serviceType?.length && {
        'metadata.tags.sys.id[in]': ContentfulService.formatServiceTypeFilters(filters.serviceType),
      }),

      // TODO: should this be "all" (AND/OR)
      ...(filters.geography?.length && {
        'fields.geography[in]': filters.geography.join(','),
      }),

      ...(filters.dataType?.length && {
        'metadata.tags.sys.id[in]': ContentfulService.formatDataTypeFilters(filters.dataType),
      }),

      ...(filters.costs?.length && {
        'fields.costs[in]': filters.costs.join(','),
      }),

      ...(filters.excludeRegional && {
        'fields.regionalCoverage[exists]': 'false',
      }),

      ...(filters.q && {
        'fields.searchKeywords[match]': filters.q,
      }),

      order: [ContentfulService.getOrderFilter(filters?.order)],
    })
  }

  async getProviderFilterOptionValues() {
    const { contentfulSpaceId, contentfulEnvironment } = this.config
    const space = await this.managementClient.getSpace(contentfulSpaceId)
    const environment = await space.getEnvironment(contentfulEnvironment)
    const { fields } = await environment.getContentType('serviceProvider')

    const geographyField = fields.find((f) => f.id === 'geography')
    const costsField = fields.find((f) => f.id === 'costs')

    return {
      geography: (geographyField?.items?.validations?.[0].in ?? []) as string[],
      costs: (costsField?.items?.validations?.[0].in ?? []) as string[],
    }
  }

  async getManageableEntryById(id: string) {
    const { contentfulSpaceId, contentfulEnvironment } = this.config
    const space = await this.managementClient.getSpace(contentfulSpaceId)
    const environment = await space.getEnvironment(contentfulEnvironment)
    return environment.getEntry(id)
  }

  async getEntryById<EntryType extends EntrySkeletonType>(id: string) {
    return await this.contentClient.withoutUnresolvableLinks.getEntry<EntryType>(id)
  }

  async getProviderBySlug(slug: string) {
    const entries = await this.contentClient.withoutUnresolvableLinks.getEntries<TypeServiceProviderSkeleton>({
      limit: 1,
      content_type: 'serviceProvider',
      'fields.slug': slug,
      include: 10, // How deep to include linked items
    })
    return entries.items.length ? entries.items[0] : null
  }

  async getGenericPageBySlug(slug: string) {
    const entries = await this.contentClient.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
      limit: 1,
      content_type: 'page',
      'fields.slug': slug,
      include: 10, // How deep to include linked items
    })
    return entries.items.length ? entries.items[0] : null
  }

  async getLinkedProviders(id: string) {
    return await this.contentClient.withoutUnresolvableLinks.getEntries<TypeServiceProviderSkeleton>({
      content_type: 'serviceProvider',
      links_to_entry: id,
      include: 10, // How deep to include linked items
    })
  }

  async getHomePage() {
    const entries = await this.contentClient.getEntries<TypeHomepageSkeleton>({
      limit: 1,
      content_type: 'homepage',
    })
    return entries.items.length ? entries.items[0] : null
  }

  async getServiceUnavailablePage() {
    const entries = await this.contentClient.getEntries<TypeServiceUnavailableSkeleton>({
      limit: 1,
      content_type: 'serviceUnavailable',
    })
    return entries.items.length ? entries.items[0] : null
  }

  async getCookieBanner() {
    const entries = await this.contentClient.getEntries<TypeCookieBannerSkeleton>({
      limit: 1,
      content_type: 'cookieBanner',
    })
    return entries.items.length ? entries.items[0] : null
  }

  async getEmailContacts() {
    const entries = await this.contentClient.getEntries<TypeEmailContactSkeleton>({
      content_type: 'emailContact',
      include: 10,
      order: ['fields.name'],
    })
    return entries.items.length ? entries.items : []
  }

  async getEmailContactsByType(type: TypeEmailContactFields['type']['values']) {
    const entries = await this.contentClient.getEntries<TypeEmailContactSkeleton>({
      'fields.type[match]': type,
      content_type: 'emailContact',
      include: 10,
      order: ['fields.name'],
    })
    return entries.items.length ? entries.items : []
  }

  async getEmailTemplateByType<T extends EmailTemplateTypes>(type: T) {
    type EmailTemplate = T extends 'emailTemplateFeedback'
      ? TypeEmailTemplateFeedbackSkeleton
      : T extends 'emailTemplateContactFrfCentralTeam'
      ? TypeEmailTemplateContactFrfCentralTeamSkeleton
      : T extends 'emailTemplateContactResearchSupport'
      ? TypeEmailTemplateContactResearchSupportSkeleton
      : T extends 'emailTemplateContactDataServiceProvider'
      ? TypeEmailTemplateContactDataServiceProviderSkeleton
      : void

    const entries = await this.contentClient.withoutUnresolvableLinks.getEntries<EmailTemplate>({
      content_type: type,
      limit: 1,
    })
    return entries.items.length ? entries.items[0] : null
  }

  static getOrderFilter(orderType?: OrderType) {
    switch (orderType) {
      case 'updated':
        return '-sys.updatedAt'
      case 'published':
        return '-sys.createdAt'
      case 'a-z':
        return 'fields.name'
      case 'z-a':
        return '-fields.name'
      case 'highest-population':
        return '-fields.population'
      case 'lowest-population':
        return 'fields.population'
      default:
        return 'fields.name'
    }
  }

  private static formatServiceTypeFilters(serviceTypes: ServiceTypes[]) {
    return serviceTypes.map((type) => TagIds.SERVICE_TYPE + type.replace('-', '')).join(',')
  }

  private static formatDataTypeFilters(dataTypes: string[]) {
    return dataTypes
      .map(
        (type) =>
          TagIds.DATA_TYPE + type.replace(/(?:^\w|[A-Z]|\b\w)/g, (term) => term.toUpperCase()).replace(/\s+/g, '')
      )
      .join(',')
  }

  private static filterTagsByName(tagList: Tag[], tagName: string) {
    const tags: string[] = []
    tagList.forEach((tag) => {
      if (tag.name.startsWith(tagName)) {
        tags.push(tag.name.replace(tagName, '').trim())
      }
    })
    return tags
  }
}
