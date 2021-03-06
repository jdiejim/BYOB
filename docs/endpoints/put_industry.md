# Industry

    PUT industry/:id

## Description
Updates an industry matching the id provided, and returns the object updated as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On path

- **id** — Id of the industry

#### On body

- **name** — Name of the industry

***

## Return format
Status code 200, along with a JSON array with the object updated containing the keys and values:

- **id** — id of the industry.
- **industry** — name of the industry
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

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
