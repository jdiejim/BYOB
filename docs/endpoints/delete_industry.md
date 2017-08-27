# Industry

    DELETE industry/:id

## Description
Deletes an industry matching the id provided, and returns the object deleted as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On path

- **id** — Id of the industry

***

## Return format
Status code 200, along with a JSON array with the object deleted containing the keys and values:

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

    DELETE /api/v1/industry/:id

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
