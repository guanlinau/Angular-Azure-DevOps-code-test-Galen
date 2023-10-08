# Angular DevOps Code Test-CI/CD pipeline documentation

## Introduction

This project is for using Azure pipeline to continuous integration and continuous delivery the Angular web app running as a container into Azure Kubernetes Service. The Angular web docker images are pushed into Azure Container Registry. Code source are stored in GitHub.

## IP address

1-UAT ip: http://20.227.63.214/

2-Prod ip: http://20.227.62.2/

## Steps

## 1-Analysis the project

@-programming language:javascript/typescript

@-build tool: npm

@-ci/cd tool: Azure DevOps pipeline

@-Cloud service : Azure kubernetes service, Azure container registry

@-Others: Docker, GitHub, kuberctl

## 2-Provision the infrastructure of resource group, AKS and ACR manually

1-Create two namespace manually, one for UAT environment, and other fro Pro environment

2-Enable load balancer

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.13%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.45%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.10.27%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.11.17%20pm.png)

## 3-Dockerize the angular app

@-Adopt alpine base image

@-Implement via multi-stage build

@-Optimize the image layer

@-Use non-root user to run the docker container

![image](./IMG_README/Screenshot%202023-10-08%20at%205.55.41%20pm.png)

## 4-Write the kubernetes configuration-Deployment, Service

@- Define the service traffic type as Load balancer to be public assess.

![image](./IMG_README/Screenshot%202023-10-08%20at%205.57.14%20pm.png)

## 5-Design CI/CD pipeline via Azure DevOps Pipeline

1- I have created two versions ci/cd pipeline for this project, both version followed multi-pipeline scan principle to detect feature branches issues early before merge into master branch to improve the code quality in production.

2- The first one is Version 1, where I put all stages in one yaml file. You can find all stages, jobs and steps in one place. Please took at here👇👇👇.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.17.12%20pm.png)

3- The second one is version 2, where I separate the whole pipeline into several parts as a template. This version is beneficial for templates reusable and reducing the code for similar logic like deploy to production and uat. It also improve readability. Please look at the "azure-pipeline-templates" folder 👇👇👇.

!!! NOTE: When you want to run the version 2 pipeline, please move the azure-pipelines.yml into the root directory, otherwise the Azure pipeline can not detect it.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.25.33%20pm.png)

## 6 CI/CD pipeline outcome

![image](./IMG_README/Screenshot%202023-10-08%20at%206.36.36%20pm.png)

## 6.1- Stage 1: TestAndCodeAnalysis

This stage is for code compile, Unit testing, Access unit testing coverage, conduct linting, will be perform on every branch.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.39.49%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.42.52%20pm.png)

Unit test coverage report:👇
![image](./IMG_README/Screenshot%202023-10-08%20at%207.02.18%20pm.png)

## 6.2- Stage 2: Scan code vulnerabilities- Static Application Security Test via SonarCloud

This stage will be perform on master branch via merge or pull request

![image](./IMG_README/Screenshot%202023-10-08%20at%206.46.20%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.48.51%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.50.04%20pm.png)

## 6.3- Stage 3: Build and push Docker image, versioning images/artifacts

This stage will be perform on master branch only.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.51.44%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.52.34%20pm.png)

## 6.4- Stage 4: Scan code vulnerabilities- Dynamic Application Security Test via Owasp ZAP

This stage is to scan code vulnerabilities in a runtime environment.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.57.33%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.57.51%20pm.png)

## 6.5- Stage 5: Deploy to Uat environment

This stage is to automatically deploy app into Uat environment-running as a isolated namespace in Kubernetes here. This environment is for user acceptance testing and conducting e2e testing.

Master branch only.

![image](./IMG_README/Screenshot%202023-10-08%20at%207.04.13%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%207.04.29%20pm.png)

## 6.6- Stage 6: Deploy to Prod environment

This stage is for manually deploy app into production environment, it need to be approved.

![image](./IMG_README/Screenshot%202023-10-08%20at%207.08.32%20pm.png)

## 6.7- Stage 7: E2E in a deployed environment

This stage is to conduct E2E in a deployed environment, here is the Uat environment.

![image](./IMG_README/Screenshot%202023-10-08%20at%207.12.29%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%207.14.49%20pm.png)
