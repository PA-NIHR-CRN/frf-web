declare namespace NodeJS {
  interface ProcessEnv {
    CONTENTFUL_SPACE_ID: string
    CONTENTFUL_ACCESS_TOKEN: string
    CONTENTFUL_PREVIEW_MODE: string
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string
    CONTENTFUL_MANAGEMENT_ACCESS_TOKEN: string
    CONTENTFUL_ENVIRONMENT: 'dev' | 'test' | 'uat' | 'master'
    NEXT_REVALIDATE_TIME: string
    NEXT_PUBLIC_APP_ENV: 'dev' | 'test' | 'uat' | 'oat' | 'prod'
  }
}
