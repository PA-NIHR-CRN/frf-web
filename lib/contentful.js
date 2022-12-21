const contentfulContent = require('contentful');
const contentfulManagement = require('contentful-management');
const resolveResponse = require('contentful-resolve-response');

const contentClient = contentfulContent.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,

  ...(process.env.CONTENTFUL_PREVIEW_MODE === '1' && {
    host: 'preview.contentful.com',
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  }),
});

const managementClient = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
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
        'fields.serviceType[all]': filters.serviceType.join(','),
      }),

      // TODO: should this be "all" (AND/OR)
      ...(filters.geography?.length && {
        'fields.geography[in]': filters.geography.join(','),
      }),

      ...(filters.dataType?.length && {
        'fields.dataType[in]': filters.dataType.join(','),
      }),

      ...(filters.providerOrganisation?.length && {
        'fields.providerOrganisation.fields.name[in]':
          filters.providerOrganisation.join(','),
        'fields.providerOrganisation.sys.contentType.sys.id':
          'providerOrganisation',
      }),

      ...(filters.findCost?.length && {
        'fields.findCost[in]': filters.findCost.join(','),
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
    const environment = await space.getEnvironment('master');
    const providerContentType = await environment.getContentType(
      'serviceProvider'
    );

    const providerOrganisations = await contentClient.getEntries({
      limit: 100,
      content_type: 'providerOrganisation',
      order: 'fields.name',
    });

    return {
      serviceType: providerContentType.fields.find(
        (f) => f.id === 'serviceType'
      ).items.validations[0].in,
      dataType: providerContentType.fields.find((f) => f.id === 'dataType')
        .items.validations[0].in,
      geography: providerContentType.fields.find((f) => f.id === 'geography')
        .items.validations[0].in,
      providerOrganisation: providerOrganisations.items,
      findCost: providerContentType.fields.find((f) => f.id === 'findCost')
        .validations[0].in,
    };
  }

  async getProviderBySlug(slug) {
    const entries = await contentClient.getEntries({
      limit: 1,
      content_type: 'serviceProvider',
      'fields.slug': slug,
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
}

module.exports = ContentfulService;
