# Industry

    PUT industry/:id

## Description
Updates a specified industry, and returns the object updated as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

- **name** — Name of the industry

***

## Return format
Status code 200, along with a JSON array with the object created containing the keys and values:

- **id** — id of the industry.
- **industry** — name of the industry
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

- **422 Unprocessable Entity** — Missing industry parameter
- **404 Not Found** — Industry not Found

***

## Example
**Request**

    PUT /api/v1/industry/:id

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
        "id": 1,
        "industry": "Sports",
        "created_at": "2017-08-26T17:31:39.753Z",
        "updated_at": "2017-08-26T17:31:39.753Z"
    }
]
```
