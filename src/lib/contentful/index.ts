import { strict as assert } from 'assert'
import { createClient as createContentClient } from 'contentful'
import { createClient as createManagementClient } from 'contentful-management'

import { ContentfulService } from './contentfulService'

const {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW_MODE,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env

assert(CONTENTFUL_ACCESS_TOKEN)
assert(CONTENTFUL_MANAGEMENT_ACCESS_TOKEN)
assert(CONTENTFUL_SPACE_ID)

const contentfulEnvironment = CONTENTFUL_ENVIRONMENT || 'master'

const contentClient = createContentClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
  environment: contentfulEnvironment,
  ...(CONTENTFUL_PREVIEW_MODE === '1' && {
    host: 'preview.contentful.com',
    accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  }),
})

const managementClient = createManagementClient({
  accessToken: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE_ID,
})

export const contentfulService = new ContentfulService(
  { contentfulSpaceId: CONTENTFUL_SPACE_ID, contentfulEnvironment: contentfulEnvironment },
  contentClient,
  managementClient
)
