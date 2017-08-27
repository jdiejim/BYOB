# API: Industry Valuation Data

[![CircleCI](https://circleci.com/gh/jdiejim/BYOB.svg?style=svg)](https://circleci.com/gh/jdiejim/BYOB)

This API provides annual updates of [Aswath Damodaran's](http://pages.stern.nyu.edu/~adamodar/) industry valuation data for US and global companies (both corporate finance and valuation metrics).

The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
and uses [JWT](https://jwt.io/) for user authentication purposes.
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

***

## Versions

#### V1: Includes the following data:
 * Total beta by industry sector and region
 * Industry names
 * Region names

***

## About

- **[Data Details](https://github.com/jdiejim/BYOB/blob/master/docs/about/about_data.md)**
- **[API Terms of Use](https://github.com/500px/api-documentation/blob/master/basics/terms_of_use.md)**

***

## Endpoints

#### Industry

- **[<code>GET</code> industry](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_industry.md)**
- **[<code>POST</code> industry](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/post_industry.md)**
- **[<code>PUT</code> industry/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/put_industry.md)**
- **[<code>DELETE</code> industry/:id](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/delete_industry.md)**

#### Region

- **[<code>GET</code> region](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_region.md)**

#### Betas

- **[<code>GET</code> region](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_region.md)**

***

## Authentication

- **[<code>POST</code> oauth/request_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_requesttoken.md)**
- **[<code>POST</code> oauth/authorize](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_authorize.md)**
- **[<code>POST</code> oauth/access_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_accesstoken.md)**

***

## FAQ
### What do I need to know before I start using the API?
Got rust on your skills? No worries. Here are the docs you might need to get started:

- HTTPS protocol
- [REST software pattern][]
- Authentication with [OAuth][] (or the official [Beginner’s Guide][])
- Data serialization with [JSON][] (or see a [quick tutorial][])

### How do I connect to the 500px.com API?
The API is only available to authenticated clients. Clients should authenticate users using [OAuth][]. Once authenticated, you need to request a resource from one of the endpoints using HTTPS. Generally, reading any data is done through a request with GET method. If you want our server to create, update or delete a given resource, POST or PUT methods are required.

### What return formats do you support?
500px API currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
Applications must identify themselves to access any resource.
If your application only needs read-only access and does not authenticate the user, **consumer_key** containing a valid Consumer Key parameter should be specified in the query string. Otherwise, [OAuth](https://github.com/500px/api-documentation/tree/master/authentication) or upload key authentication takes care of identifying the application as well as the user accessing the API.

### Is there a request rate limit?
There is a rate limit of 1,000,000 API requests per month per account. We will contact you and, if required, disable your application if we find that your application is exceeding this limit or interfering with our system's stability. This revised rate limit came into effect May 1, 2014.

[REST software pattern]: http://en.wikipedia.org/wiki/Representational_State_Transfer
[OAuth]: http://oauth.net/core/1.0a/
[Beginner’s Guide]: http://hueniverse.com/oauth/
[JSON]: http://json.org
[quick tutorial]: http://www.webmonkey.com/2010/02/get_started_with_json/
[Register your application]: http://500px.com/settings/applications
[API Terms of Use]: https://github.com/500px/api-documentation/blob/master/basics/terms_of_use.md
[See if the concepts used by the API are familiar to you]: https://github.com/500px/api-documentation#what-do-i-need-to-know-before-i-start-using-the-api
