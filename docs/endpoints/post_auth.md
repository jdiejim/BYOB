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

## Example
**Request**

  POST /api/v1/auth/request_token

**Return**
``` json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGJ5b2IuaW8iLCJhcHAiOiJqZXQtZnVlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MDM4NTA1NDQsImV4cCI6MTUwNDAyMzM0NH0.iho-BxOOQrSYXgKbdhtlNzHiaVafMe2t2pyXpk8TVrQ"
}
```
