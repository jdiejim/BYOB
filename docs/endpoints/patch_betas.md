# Betas

    PATCH betas/:id

## Description
Updates a beta matching the id provided, and returns the object updated as confirmation

***

## Requires authentication
* A valid Admin Key must be provided in the **Token** header

***

## Parameters
Required information:

#### On path

- **id** — Id of the beta

#### On body

- **industry** — name of the industry
- **region** — name of the region
- **num_firms** — number of firms used to calculate beta
- **average_unlevered_beta** — average unlevered beta of the industry
- **average_levered_beta** — average levered beta of the industry
- **average_corr_market** — average correlation of the market
- **total_unlevered_beta** — total unlevered beta of the industry
- **total_levered_beta** — total levered beta of the industry

***

## Return format
Status code 200, along with a JSON array with the object updated containing the keys and values:

- **id** — id of the industry.
- **industry_id** — if of the industry
- **industry** — name of the industry
- **region_id** — id of the region
- **region** — name of the region
- **num_firms** — number of firms used to calculate beta
- **average_unlevered_beta** — average unlevered beta of the industry
- **average_levered_beta** — average levered beta of the industry
- **average_corr_market** — average correlation of the market
- **total_unlevered_beta** — total unlevered beta of the industry
- **total_levered_beta** — total levered beta of the industry
- **created_at** — date entry was created
- **updated_at** — date entry was last updated

***

## Errors

- **404 Not Found** — Beta not Found
- **400 Bad Request** — Bad request, check params syntax

***

## Example
**Request**

    PATCH /api/v1/betas/:id

**Request Body**

``` json
{
  "industry": "Apparel",
  "region": "US",
  "num_firms": 58,
  "average_unlevered_beta": 0.705231,
}
```

**Return**
``` json
[
  {
        "id": 22,
        "industry_id": 4,
        "industry": "Apparel",
        "region": "US",
        "num_firms": 58,
        "average_unlevered_beta": 0.705231,
        "average_levered_beta": 0.88054,
        "average_corr_market": 0.239039,
        "total_unlevered_beta": 2.95027,
        "total_levered_beta": 3.68367,
        "region_id": 1,
        "created_at": "2017-08-26T17:31:39.850Z",
        "updated_at": "2017-08-26T17:31:39.850Z"
    }
]
```
