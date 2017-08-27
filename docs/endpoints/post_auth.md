# Authentication

    POST auth/request_token

## Description
Allows a Consumer application to obtain an request Token to request user authorization. It uses JWT for generation and verification of the tokens.

***

## Requires authentication
False

***

## Parameters

- **email** — A valid email of the client.
- **app** — An app name provided by the client.

***

## Return format
Status code 201, along with a JSON object containing the token

- **token** — A Request Token

***

## Errors

- **422 Unprocessable Entity** — Missing parameters


## Verification

- **Admin emails** are given a token with authorization to modify the API.
- **Consumer emails** are given a token with authorization to get resources from the API, but not to modify it.

***
