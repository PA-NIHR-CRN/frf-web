# Deployment of NIHR FRF

![Pipeline](https://github.com/PA-NIHR-CRN/frf-web/actions/workflows/build-test-deploy.yml/badge.svg)

This is a [Next.js](https://nextjs.org/) project that utilises Server Side Rendering (SSR) along with Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for automatic static cache revalidation.

## GitHub Actions Workflow

We have a GitHub Actions workflow located in `.github/workflows/build-test-deploy` that builds, tests, runs code quality checks, and deploys a built Docker image to AWS Elastic Container Service (ECS) running on port `3000`.

## Docker

Build
`docker build . -t nihr-frf`

Run
`docker run . -t nihr-frf`

## Environments

### Development

The development environment is automatically deployed whenever feature branches are merged into `main` via a [Pull Request](https://github.com/PA-NIHR-CRN/frf-web/pulls).

[Visit Dev →](http://tbc)

### User Acceptance Testing (UAT)

Currently not available.

[Visit UAT →](#)

### Production

Currently not available.

[Visit Production →](#)
