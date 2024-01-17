
# Guide

## About

This repo houses the inherited code for the site that will be sunset once our newly redesigned and redeveloped version lands. We inherited the old WIC site from another agency, with very little instruction on the deploy process, etc. 

## DNS & Hosting & DB

Currently, DNS management is handled within [AWS's Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/home?region=us-west-2#Dashboard); the domain name signupwic.com, along with its wildcard subdomains, are pointed to our [Firebelly Forge server, "signupwic--archive"](https://forge.laravel.com/servers/738991/sites). SSL certs are also handled in Forge.

<img width="1446" alt="aws_dns" src="https://github.com/firebelly/wic-old/assets/1038765/a63d6025-29e2-455f-905d-7049f686a3e6">

[DNS Records](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=us-east-1#ListRecordSets/Z217C3DOANTT8S)

<img width="1677" alt="aws_ec2_instances" src="https://github.com/firebelly/wic-old/assets/1038765/db355958-7c03-483e-a355-b6b97ba7ff5b">

[EC2 Instances](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#Instances:instanceState=running)

<img width="1450" alt="aws_backend_instance" src="https://github.com/firebelly/wic-old/assets/1038765/8d8b0c35-35ae-4caa-8bc0-0cd23f659339">

[Backend Instance(Offices)](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#InstanceDetails:instanceId=i-0c1398cfb9127985a)

<img width="1467" alt="aws_rds_backend" src="https://github.com/firebelly/wic-old/assets/1038765/8d24ef0b-e0b5-41a5-8ba6-ea837dc51503">

[RDS Database Instance](https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#database:id=wic-database-instance;is-cluster=false)

<img width="1149" alt="aws_rds_instance" src="https://github.com/firebelly/wic-old/assets/1038765/584dd8eb-3fd1-4bcc-8ade-2f3eeedcc213">

[Database Instance Actions](https://us-west-2.console.aws.amazon.com/rds/home?region=us-west-2#database:id=wic-database-instance;is-cluster=false)

^^ This is how you create the EC2 connection

<img width="748" alt="wp_offices" src="https://github.com/firebelly/wic-old/assets/1038765/d07cb60b-015c-49f9-a2e7-2ce3c0ff119e">

[Wordpress Admin Site (Backend Offices](http://wic-offices-backend.us-west-2.elasticbeanstalk.com/wp-admin/)

## Office Mapping

Office mapping is written by the backend application -- referenced [here](https://github.com/firebelly/wic-old/blob/main/config.json) in the config file for the front-end application.

## Code Changes & Deploys

The archive site's frontend is a Node app using Express 4, and the server is configured as such (which is, of course, different than our standard Craft setup):

- An [active daemon](https://forge.laravel.com/servers/738991/daemons) that ensures the server keeps running & is automatically restarted in case of an error
- [Custom Nginx config file](https://forge.laravel.com/servers/738991/sites/2178945/application) assigned to the application, which sets the necessary location proxies for Node
- The deployment script restarts the Node daemon

All code changes can happen here in this repo (it was originally stored in BitBucket), and the `main` branch can be deployed by Forge.

# Inherited WIC (can mostly be ignored)

## Instructions

Deploy via AWS Elastic Beanstalk (NOTE: US West 2 Region!):

[Elastic Beanstalk Console](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/environment/dashboard?environmentId=e-2tjgpj6wjg)

Current site lives on this environment:
["WIC Office Swap Wordpress"](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/environment/dashboard?environmentId=e-bhfuirfcjm)

Delete deployed application versions:
[Beanstalk cleanup](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/application/versions?applicationName=Wic%20Offices%20Wordpress)

The READ.me below was written by the 3rd party team that managed WIC's old site. 

## Who?

The Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)

## What?

We built them a webpage with an "office near you" locator app.

## Where?

Public site: http://signupwic.com

Backend site: http://wic-offices-backend.us-west-2.elasticbeanstalk.com

Frontend Repo: https://bitbucket.org/cmrignite/signupwic.com-front-end/src/master/ (you are here)

Backend Repo: https://bitbucket.org/cmrignite/signupwic.com-back-end/src/master/

## When?

Around Q4 2016.

## Why?

WIC helps low-income mothers find food and healthcare. This page helps said mothers find their nearest WIC office.

## How?

The backend is a stripped-down Wordpress site using the REST api to host information on WIC Offices, and make that information available as a filterable fetchable json.

The frontend is a node app. It displays a webpage in English and in Spanish.

There's also a tool in app/app.js::getData() that fetches nearby WIC offices and displays this information on a Google Maps widget.

There's also some SMS integration.

They also use some event tracking using Floodlight, Mixpanel, and Google Analytics.

### Deployment

This site has been deployed to the clients AWS account using Elastic Beanstalk.

An SSL certificate for the signupwic.com domain and subdomains is generated within the Certificate Manager in AWS

(as of 4/27/2020)

The SSL certificate for signupwic.com is associated at the load balancer for this EBS group

A redirect from signupwic.com to www.signupwic.com utilizing S3 and Route 53 within AWS to forward all traffic to HTTPS and www.signupwic.com

Note: An existing SSL cert within Godaddy is no longer being used. And can be rekeyed to use for another site.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/).

```sh
$ git clone git@bitbucket.org:cmrignite/signupwic.com-front-end.git # or clone your own fork
$ cd signupwic.com-front-end
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).
