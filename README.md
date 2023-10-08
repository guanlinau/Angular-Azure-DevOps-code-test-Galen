# Angular DevOps Code Test-CI/CD pipeline documentation

## Introduction

This project is for using Azure pipeline to continuous integration and continuous delivery the Angular web app running as a container into Azure Kubernetes Service. The Angular web docker images are pushed into Azure Container Registry. Code source are stored in GitHub.

## IP addresses

1-UAT IP: http://20.227.63.214/

2-Prod IP: http://20.227.62.2/

## Steps

## 1-Analysis the project

!!! Our project uses node version v14.

1-Programming language & framework:javascript/typescript, angular.

2-Build tool: npm

3-CI/CD tool: Azure DevOps pipeline

4-Cloud service : Azure kubernetes service, Azure container registry

4-Others: Docker, GitHub, kuberctl

## 2-Provision the infrastructure of resource group, AKS and ACR manually

1-Create two namespace manually, one for UAT environment, and other fro Pro environment

2-Enable load balancer

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.13%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.09.45%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.10.27%20pm.png)

![image](./IMG_README/Screenshot%202023-10-08%20at%206.11.17%20pm.png)

## 3-Dockerize the angular app

1-Adopt alpine base image

2-Implement via multi-stage build

3-Optimize the image layer

4-Use non-root user to run the docker container

![image](./IMG_README/Screenshot%202023-10-08%20at%205.55.41%20pm.png)

## 4-Write the kubernetes configuration-Deployment, Service

1- Define the service traffic type as Load balancer to be public assess.

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

![image](./IMG_README/Screenshot%202023-10-08%20at%208.18.57%20pm.png)

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

### 6.7.1 Exploration and explanation

1- In this stage, i used the kubectl to extract the uat environment load balancer Ip, and then use sed to replace the e2e localhost:4200 with that load balancer Ip in protractor.conf.js file. So e2e can conduct testing in the uat environment-a deployed environment.

2- Actually, this stage was failed finally. After done some research and debug, I found the chrome version in the azure pipeline ubuntu server is version 117, while our project's ChromeDriver version is specific to 114.

3- I tried to update our project's ChromeDriver using webdriver-manager, but it was version 114.

4- There are might be three ways to figure this issue out, but I can not guarantee it is right, as I actually have done that before.

4.1-The first way is to upgrade our project's e2e configuration, so it can be compatible with chrome version 117.

4.2-The second one is to downgrade the version of microsoft-host ubuntu server using our pipeline. I looked up the documentation, only v24 and v20 available are available as a microsoft-host ubuntu server, and both the chrome version is version 117.

4.3-The third one is to use self-managed ubuntu server with the chrome version is 114. But i did not try it due to the time limit.

Hope we can discuss it further.
