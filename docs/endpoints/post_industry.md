# Industry

    POST industry

## Description
Creates a new industry on behalf of the admin, and returns the object created as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

- **name** — Name of the industry

***

## Return format
Status code 201, along with a JSON array with the object created containing the keys and values:

- **id** — id of the industry.
- **industry** — name of the industry
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

- **422 Unprocessable Entity** — Missing industry parameter

***

## Example
**Request**

    POST /api/v1/industry

**Request Body**

``` json
{
	"name": "Sports"
}
```

**Return**
``` json
[
    {
        "id": 97,
        "industry": "Sports",
        "created_at": "2017-08-27T01:39:30.173Z",
        "updated_at": "2017-08-27T01:39:30.173Z"
    }
]
```
