# frf-web

This is the main Repo for the FRF Web code.

The infrastructure lives over in https://github.com/PA-NIHR-CRN/frf-infrastructure
FRF itself runs via Fargate and requests to it go via an Cloudfront that proxies to the application load balancer.

An instance of the service is deployed to each of dev/test/uat/oat/prod.

---

## GitHub Actions

A handful of GitHub Actions workflows are defined. These are described below:

- frf-api-build.yml - Build but don't deploy the FRF service (NIHR.CRN.FRF.API). This is executed on push as part of the CI pipeline.
- frf-api-deploy.yml - Build and deploy the FRF service (NIHR.CRN.FRF.API). This pushes an updated image to ECR, and updates the ECS task definition to use the newly built image.

> ## Prerequisites:

1. Install docker (for tests)

## Install locally

1. `npm install` to install dependencies
2. Create a `.env.local` file from the `.env.example` and update its values
3. `npm run dev` to run the local Next.js server

## Environment variables

- CONTENTFUL_SPACE_ID from Settings -> General settings
- CONTENTFUL_ACCESS_TOKEN from Settings -> API keys
- CONTENTFUL_PREVIEW_MODE set to `1` to allow the app to fetch preview/draft content
- CONTENTFUL_PREVIEW_ACCESS_TOKEN from Settings -> API keys
- CONTENTFUL_MANAGEMENT_ACCESS_TOKEN from Settings -> API keys (content management tab)

## Type Generation

In the terminal run:

`npm run cf-content-types-generator -X -d -s <CONTENTFUL_SPACE_ID> -t <CONTENTFUL_MANAGEMENT_ACCESS_TOKEN> -o src/@types/generated`

Note: manually insert the actual `CONTENTFUL_SPACE_ID` and `CONTENTFUL_MANAGEMENT_ACCESS_TOKEN` since it doesn't support environment variables.

## Database

To generate database migrations + rebuild the local Prisma client run: `npm run migrate:dev`.

## Emails

Sending email notifications requires adding AWS credentials to `.env.local`. These are temporary credentials with a 1 hour expiry. From the AWS account page, click **Command line or programmatic access** and copy over the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN` values.
