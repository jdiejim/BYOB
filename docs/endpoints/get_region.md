# Region

    GET region

## Description
Returns a listing of all the names of the regions of the dataset

***

## Requires authentication
* A valid Consumer Key must be provided in the **Token** header

```
{ Token: <token goes here> }
```

***

## Parameters
- None

***

## Return format
Status code 200, along with a JSON array with the following keys and values:

- **id** — id of the industry.
- **region** — name of the industry

***

## Errors
None

***

## Example
**Request**

  GET  /ap1/v1/region

**Return**
``` json
[
    {
        "id": 1,
        "region": "US"
    },
    {
        "id": 2,
        "region": "Europe"
    },
    {
        "id": 3,
        "region": "Japan"
    },
    {
        "id": 4,
        "region": "Emerging Markets"
    },
    {
        "id": 5,
        "region": "China"
    },
    {
        "id": 6,
        "region": "India"
    },
    {
        "id": 7,
        "region": "Global"
    }
]
```

## Current Industry Listing

| id | Industry           |
|----|--------------------|
| 1  | US                 |
| 2  | Europe             |
| 3  | Japan              |
| 4  | Emerging Markets   |
| 5  | China              |
| 6  | India              |       
| 7  | Global             |


## Region Breakdown

The table below summarizes the most recent regional breakdown, with the number of firms in each one

**Emerging Markets** includes Asia, Latin America, Eastern Europe, Mid East and Africa, with a further breakdown for India and China.


| Region           |  Number of firms  |
| :--------------- | :---------------- |
| US               | 7330              |
| Europe           | 6655              |
| Japan            | 3679              |
| Emerging Markets | 20578             |
| Global           | 42678             |
