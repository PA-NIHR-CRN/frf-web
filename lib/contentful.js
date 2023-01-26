import { TagNames, TagIds } from '../consts/tags.const';

const contentfulContent = require('contentful');
const contentfulManagement = require('contentful-management');
const resolveResponse = require('contentful-resolve-response');
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const contentClient = contentfulContent.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: contentfulEnvironment,

  ...(process.env.CONTENTFUL_PREVIEW_MODE === '1' && {
    host: 'preview.contentful.com',
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  }),
});

const managementClient = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environment: contentfulEnvironment,
});

const PER_PAGE = 10;

class ContentfulService {
  constructor() {}

  async getProvidersByFilter(filters) {
    const entries = await contentClient.getEntries({
      skip: (filters.page - 1) * PER_PAGE,
      limit: PER_PAGE,
      content_type: 'serviceProvider',

      ...(filters.serviceType?.length && {
        'metadata.tags.sys.id[in]': ContentfulService.formatServiceTypeFilters(
          filters.serviceType
        ),
      }),

      // TODO: should this be "all" (AND/OR)
      ...(filters.geography?.length && {
        'fields.geography[in]': filters.geography.join(','),
      }),

      ...(filters.dataType?.length && {
        'metadata.tags.sys.id[in]': ContentfulService.formatDataTypeFilters(
          filters.dataType
        ),
      }),

      ...(filters.costs?.length && {
        'fields.costs[in]': filters.costs.join(','),
      }),

      ...(filters.excludeRegional && {
        'fields.regionalCoverage[exists]': 'false',
      }),

      ...(filters.q && {
        query: filters.q,
      }),
      order: ContentfulService.getOrderFilter(filters?.order),
    });

    return {
      pagination: {
        total: entries.total,
        page: filters.page,
      },
      items: resolveResponse(entries),
    };
  }

  async getProviderFilterOptionValues() {
    const space = await managementClient.getSpace(
      process.env.CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment(contentfulEnvironment);
    const providerContentType = await environment.getContentType(
      'serviceProvider'
    );
    const tags = await environment.getTags({
      order: 'name',
    });

    return {
      dataType: ContentfulService.filterTagsByName(
        tags.items,
        TagNames.DATA_TYPE
      ),
      geography: providerContentType.fields.find((f) => f.id === 'geography')
        .items.validations[0].in,
      costs: providerContentType.fields.find((f) => f.id === 'costs').items
        .validations[0].in,
    };
  }

  async getProviderBySlug(slug) {
    const entries = await contentClient.getEntries({
      limit: 1,
      content_type: 'serviceProvider',
      'fields.slug': slug,
      include: 10, // How deep to include linked items
    });
    const resolvedEntries = resolveResponse(entries);
    return resolvedEntries.length ? resolvedEntries[0] : null;
  }

  static getOrderFilter(orderType) {
    let order;
    switch (orderType) {
      case 'updated':
        order = '-sys.updatedAt';
        break;
      case 'a-z':
        order = 'fields.name';
        break;
      case 'z-a':
        order = '-fields.name';
        break;
      case 'highest-population':
        order = '-fields.population';
        break;
      case 'lowest-population':
        order = 'fields.population';
        break;
      default:
        order = '-sys.createdAt';
        break;
    }
    return order;
  }

  static formatServiceTypeFilters(serviceTypes) {
    return serviceTypes
      .map((type) => TagIds.SERVICE_TYPE + type.replace('-', ''))
      .join(',');
  }

  static formatDataTypeFilters(dataTypes) {
    return dataTypes
      .map(
        (type) =>
          TagIds.DATA_TYPE +
          type
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (term) => term.toUpperCase())
            .replace(/\s+/g, '')
      )
      .join(',');
  }

  static filterTagsByName(tagList, tagName) {
    const tags = [];
    tagList.forEach((tag) => {
      if (tag.name.startsWith(tagName)) {
        tags.push(tag.name.replace(tagName, '').trim());
      }
    });
    return tags;
  }
}

module.exports = ContentfulService;
