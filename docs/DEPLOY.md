# Deployment of NIHR FRF

![Pipeline](https://github.com/PA-NIHR-CRN/frf-web/actions/workflows/build-test-deploy.yml/badge.svg)

This is a [Next.js](https://nextjs.org/) project that utilises Server Side Rendering (SSR) along with Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for automatic cache revalidation.

## GitHub Actions Workflow

We have a GitHub Actions workflow located in `.github/workflows/frf-fe-build.yml` that builds, tests, runs code quality checks

## Docker

Build
`docker build . -t nihr-frf`

Run
`docker run -p 3000:3000 nihr-frf`

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
