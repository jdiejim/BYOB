# Region

    DELETE region/:id

## Description
Deletes a region matching the id provided, and returns the object deleted as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On path

- **id** — Id of the region

***

## Return format
Status code 200, along with a JSON array with the object deleted containing the keys and values:

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

    DELETE /api/v1/region/:id

**Return**
``` json
[
    {
        "id": 1,
        "region": "US",
        "created_at": "2017-08-26T17:31:39.753Z",
        "updated_at": "2017-08-26T17:31:39.753Z"
    }
]
```
