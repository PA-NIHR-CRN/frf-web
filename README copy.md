# frf-web

This is the main Repo for the FRF Web code.

The infrastructure lives over in https://github.com/PA-NIHR-CRN/frf-infrastructure
FRF itself runs via Fargate and requests to it go via an Cloudfront that proxies to the application load balancer.

An instance of the service is deployed to each of dev/test/uat/oat/prod.

---


## GitHub Actions

A handful of GitHub Actions workflows are defined. These are described below:

* frf-api-build.yml - Build but don't deploy the FRF service (NIHR.CRN.FRF.API). This is executed on push as part of the CI pipeline.
* frf-api-deploy.yml - Build and deploy the FRF service (NIHR.CRN.FRF.API). This pushes an updated image to ECR, and updates the ECS task definition to use the newly built image.


> ## Prerequisites:

1. Install docker (for tests)