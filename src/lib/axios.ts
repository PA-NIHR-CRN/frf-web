// eslint-disable-next-line import/no-named-as-default
import Axios from 'axios'
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor'

import { logger } from '@/lib/logger'

const globalForAxios = global as unknown as { axios: AxiosCacheInstance }

export const axios = globalForAxios.axios ?? setupCache(Axios)

if (!globalForAxios.axios) {
  axios.interceptors.response.use((res) => {
    // Log non-cached API requests
    if (!res.cached) {
      logger.trace(
        {
          ttl: process.env.CONTENTFUL_CACHE_TTL,
          method: res.config.method,
          url: res.config.url,
          status: res.status,
          requestId: res.headers['x-contentful-request-id'],
        },
        'Contentful management API request'
      )
    }
    return res
  })
}

if (process.env.NODE_ENV !== 'production') globalForAxios.axios = axios
