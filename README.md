# API: Industry Valuation Data

[![CircleCI](https://circleci.com/gh/jdiejim/BYOB.svg?style=svg)](https://circleci.com/gh/jdiejim/BYOB)

This API provides annual updates of [Aswath Damodaran's](http://pages.stern.nyu.edu/~adamodar/) industry valuation data for US and global companies (both corporate finance and valuation metrics).

The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
and uses [JWT](https://jwt.io/) for user authentication purposes.
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").


      Data last updated: January 2017

***

## Versions

#### V1: Includes the following data:
 * Total beta by industry sector and region
 * Industry names
 * Region names

***

## About

- **[Data Details](https://github.com/jdiejim/BYOB/blob/master/docs/about/about_data.md)**

***

## Endpoints

#### Industry

- **[<code>GET</code> industry](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_industry.md)**
- **[<code>POST</code> industry](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/post_industry.md)**
- **[<code>PUT</code> industry/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/put_industry.md)**
- **[<code>DELETE</code> industry/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**

#### Region

- **[<code>GET</code> region](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_region.md)**
- **[<code>POST</code> region](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/post_region.md)**
- **[<code>PUT</code> region/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/put_region.md)**
- **[<code>DELETE</code> region/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_region.md)**

#### Betas

- **[<code>GET</code> betas](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_industry.md)**
- **[<code>POST</code> betas](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/post_industry.md)**
- **[<code>GET</code> betas/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/post_industry.md)**
- **[<code>PUT</code> betas/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/put_industry.md)**
- **[<code>DELETE</code> betas/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**
- **[<code>GET</code> betas/industry/:industry_id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**
- **[<code>GET</code> betas/region/:region_id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**
- **[<code>GET</code> betas/industry/:industry_id/region/:region_id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**

***

## Authentication

- **[<code>POST</code> auth/request_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_requesttoken.md)**

***

## FAQ

### What do I need to know before I start using the API?

Here are the docs you might need to get started:

- [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
- [JWT](https://jwt.io/)
- [JSON](http://json.org)
- [Betas](http://www.investopedia.com/terms/b/beta.asp)

### How do I connect to the API?

The API is only available to clients with a consumer token. Clients can get a consumer token by registering their app and email in the home page.

Once authenticate, clients can request resources from one of the endpoints using HTTP methods, and by providing their consumer token as a header.

### What return formats do you support?

The API currently returns data in [JSON](http://json.org/ "JSON") format.
