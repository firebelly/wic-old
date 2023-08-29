# WIC Frontend

## WIP Instructions

Deploy via AWS Elastic Beanstalk (NOTE: US West 2 Region!)

[Elastic Beanstalk Console](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/environment/dashboard?environmentId=e-2tjgpj6wjg)




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
