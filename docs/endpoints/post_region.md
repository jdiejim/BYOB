# Region

    POST region

## Description
Creates a new region, and returns the object created as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On body

- **name** — Name of the region

***

## Return format
Status code 201, along with a JSON array with the object update containing the keys and values:

- **id** — id of the region.
- **region** — name of the region
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

- **422 Unprocessable Entity** — Missing region parameter

***

## Example
**Request**

    POST /api/v1/region

**Request Body**

``` json
{
	"name": "South America"
}
```

**Return**
``` json
[
    {
        "id": 98,
        "region": "South America",
        "created_at": "2017-08-27T01:39:30.173Z",
        "updated_at": "2017-08-27T01:39:30.173Z"
    }
]
```
