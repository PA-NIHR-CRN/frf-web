# NIHR Find, Recruit and Follow-up service prototype

## Install locally

1. `npm install` to install dependencies
2. Create a `.env.local` file from the `.env.example` and update its values
3. `nm run dev` to run the local Next.js server

## Environment variables

- CONTENTFUL_SPACE_ID from Settings -> General settings
- CONTENTFUL_ACCESS_TOKEN from Settings -> API keys
- CONTENTFUL_PREVIEW_MODE set to `1` to allow the app to fetch preview/draft content
- CONTENTFUL_PREVIEW_ACCESS_TOKEN from Settings -> API keys
- CONTENTFUL_MANAGEMENT_ACCESS_TOKEN from Settings -> API keys (content management tab)
