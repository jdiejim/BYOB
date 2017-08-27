# Region

    PUT region/:id

## Description
Updates a region matching the id provided, and returns the object updated as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On path

- **id** — Id of the region

#### On body

- **name** — Name of the region

***

## Return format
Status code 200, along with a JSON array with the object updated containing the keys and values:

- **id** — id of the region.
- **region** — name of the region
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

- **404 Not Found** — Region not Found

***

## Example
**Request**

    PUT /api/v1/region/:id

**Request Body**

``` json
{
	"name": "Europe"
}
```

**Return**
``` json
[
    {
        "id": 1,
        "region": "Europe",
        "created_at": "2017-08-26T17:31:39.753Z",
        "updated_at": "2017-08-26T17:31:39.753Z"
    }
]
```
