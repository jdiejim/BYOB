# API: Industry Valuation Data

[![CircleCI](https://circleci.com/gh/jdiejim/BYOB.svg?style=svg)](https://circleci.com/gh/jdiejim/BYOB)

This API provides annual updates of industry valuation data created by [Aswath Damodaran](http://pages.stern.nyu.edu/~adamodar/) for US and global companies (both corporate finance and valuation metrics)

The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
and uses [JWT](https://jwt.io/) for user authentication purposes.
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

***

## Versions

###### V1: Includes the following data:
 * Total beta by industry sector and region
 * Industry names
 * Region names

***

## Datasets

##### Total Beta By industry Sector

This dataset provides the [betas](http://www.investopedia.com/terms/b/beta.asp) by industry and region adjusted to reflect a firm's total exposure to risk rather than just the market risk component. It is a function of the market beta and the portion of the total risk that is market risk.

***

# Todos:

* documentation
* form to get token
* token instructions

***

## Basics

- **[Formats and Terms](https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md)**
- **[API Terms of Use](https://github.com/500px/api-documentation/blob/master/basics/terms_of_use.md)**

## Endpoints

#### Industry

- **[<code>GET</code> industry](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_industry.md)**

#### Region

- **[<code>GET</code> region](https://github.com/jdiejim/BYOB/blob/master/docs/endpoints/get_region.md)**

## Authentication

- **[<code>POST</code> oauth/request_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_requesttoken.md)**
- **[<code>POST</code> oauth/authorize](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_authorize.md)**
- **[<code>POST</code> oauth/access_token](https://github.com/500px/api-documentation/blob/master/authentication/POST_oauth_accesstoken.md)**

## Glossary

> **Beta** is a measure of the volatility, or systematic risk, of a security or a portfolio in comparison to the market as a whole. Beta is used in the capital asset pricing model (CAPM), which calculates the expected return of an asset based on its beta and expected market returns. Beta is also known as the beta coefficient.
http://www.investopedia.com/terms/b/beta.asp

> **Unlevered Beta** compares the risk of an unlevered company to the risk of the market. The unlevered beta is the beta of a company without any debt. Unlevering a beta removes the financial effects from leverage. This number provides a measure of how much systematic risk a firm's equity has when compared to the market.
http://www.investopedia.com/terms/u/unleveredbeta.asp

## Bio of Aswath Damodaran

[Aswath Damodaran](http://pages.stern.nyu.edu/~adamodar/) is a Professor of Finance at the Stern School of Business at New York University (Kerschner Family Chair in Finance Education), where he teaches corporate finance and equity valuation. He is best known and famous as author of several widely used academic and practitioner texts on Valuation, Corporate Finance and Investment Management.

Damodaran is widely quoted on the subject of valuation, with "a great reputation as a teacher and authority". He has written several books on equity valuation, as well on corporate finance and investments.

He is also widely published in leading journals of finance, including The Journal of Financial and Quantitative Analysis, The Journal of Finance, The Journal of Financial Economics and the Review of Financial Studies. He is also known as being a resource on valuation and analysis to investment banks on Wall Street.

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
