# Angular DevOps Code Test-CI/CD pipeline documentation

## Introduction

This project is for using Azure pipeline to continuous integration and continuous delivery the Angular web app running as a container into Azure Kubernetes Service. The Angular web docker images are pushed into Azure Container Registry. Code source are stored in GitHub.

## IP address

1-UAT ip: http://20.227.63.214/

2-Prod ip: http://20.227.62.2/

## Steps

### 1-Analysis the project

@-programming language:javascript/typescript

@-build tool: npm

@-ci/cd tool: Azure DevOps pipeline

@-Cloud service : Azure kubernetes service, Azure container registry

@-Others: Docker, GitHub, kuberctl

### 2-Provision the infrastructure of resource group, AKS and ACR manually

1-Create two namespace manually, one for UAT environment, and other fro Pro environment

2-Enable load balancer

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.13%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.45%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.10.27%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.11.17%20pm.png)

### 3-Dockerize the angular app

@-Adopt alpine base image

@-Implement via multi-stage build

@-Optimize the image layer

@-Use non-root user to run the docker container

![image](./IMG_README/Screenshot%202023-10-08%20at%205.55.41%20pm.png)

### 4-Write the kubernetes configuration-Deployment, Service

@- Define the service traffic type as Load balancer to be public assess.

![image](./IMG_README/Screenshot%202023-10-08%20at%205.57.14%20pm.png)

### 5-Design CI/CD pipeline via Azure DevOps Pipeline

1- I have created two versions ci/cd pipeline for this project, both version followed multi-pipeline scan principle to detect feature branches issues early before merge into master branch to improve the code quality in production.

2- The first one is Version 1, where I put all stages in one yaml file. You can find all stages, jobs and steps in one place. Please took at here👇👇👇.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.17.12%20pm.png)

### 5.1- Stage 1

3- The second one is version 2, where I separate the whole pipeline into several parts as a template. This version is beneficial for templates reusable and reducing the code for similar logic like deploy to production and uat. It also improve readability. Please look at the "azure-pipeline-templates" folder 👇👇👇.

![image](./IMG_README/Screenshot%202023-10-08%20at%206.25.33%20pm.png)
