const contentful = require('contentful');
const resolveResponse = require('contentful-resolve-response');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,

  ...(process.env.CONTENTFUL_PREVIEW_MODE === '1' && {
    host: 'preview.contentful.com',
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  }),
});

const PER_PAGE = 10;

class ContentfulService {
  constructor() {}

  async getProvidersByFilter(filters, page = 1) {
    const entries = await client.getEntries({
      skip: (page - 1) * PER_PAGE,
      limit: PER_PAGE,
      content_type: 'serviceProvider',

      ...(filters.population && {
        'fields.population[gte]': filters.population.split('-')[0],
        'fields.population[lte]': filters.population.split('-')[1],
      }),

      ...(filters.serviceType && {
        'fields.serviceType[all]': filters.serviceType.join(','),
      }),

      ...(filters.geography && {
        'fields.geography[in]': filters.geography.join(','),
      }),

      ...(filters.dataType && {
        'fields.dataTypes[all]': filters.dataType.join(','),
      }),

      ...(filters.providerOrganisation && {
        'fields.providerOrganisation.fields.slug[in]':
          filters.providerOrganisation.join(','),
        'fields.providerOrganisation.sys.contentType.sys.id':
          'providerOrganisation',
      }),

      ...(filters.q && {
        query: filters.q,
      }),
    });
    return {
      pagination: {
        total: entries.total,
        page: page,
      },
      items: resolveResponse(entries),
    };
  }

  async getAllProviderOrganisations() {
    const entries = await client.getEntries({
      limit: 100,
      content_type: 'providerOrganisation',
      order: 'fields.name',
    });
    return entries;
  }

  async getProviderBySlug(slug) {
    const entries = await client.getEntries({
      limit: 1,
      content_type: 'serviceProvider',
      'fields.slug': slug,
    });
    const resolvedEntries = resolveResponse(entries);
    return resolvedEntries.length ? resolvedEntries[0] : null;
  }
}

module.exports = ContentfulService;
