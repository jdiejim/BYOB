# Industry

    GET industry

## Description
Returns a listing of all the names of the industries of the dataset

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
- **industry** — name of the industry

***

## Errors
None

***

## Example
**Request**

  GET  /ap1/v1/industry

**Return** __shortened for example purpose__
``` json
[
    {
        "id": 1,
        "industry": "Advertising"
    },
    {
        "id": 2,
        "industry": "Aerospace/Defense"
    },
    {
        "id": 3,
        "industry": "Air Transport"
    },
    {
        "id": 4,
        "industry": "Apparel"
    },
    {
        "id": 5,
        "industry": "Auto & Truck"
    },
    {
        "id": 6,
        "industry": "Auto Parts"
    },
    {
        "id": 7,
        "industry": "Bank (Money Center)"
    }
]
```

## Current Industry Listing

| id | Industry                               |
|----|----------------------------------------|
| 1  | Advertising                            |
| 2  | Aerospace/Defense                      |
| 3  | Air Transport                          |
| 4  | Apparel                                |
| 5  | Auto & Truck                           |
| 6  | Auto Parts                             |
| 7  | Bank (Money Center)                    |
| 8  | Banks (Regional)                       |
| 9  | Beverage (Alcoholic)                   |
| 10 | Beverage (Soft)                        |
| 11 | Broadcasting                           |
| 12 | Brokerage & Investment Banking         |
| 13 | Building Materials                     |
| 14 | Business & Consumer Services           |
| 15 | Cable TV                               |
| 16 | Chemical (Basic)                       |
| 17 | Chemical (Diversified)                 |
| 18 | Chemical (Specialty)                   |
| 19 | Coal & Related Energy                  |
| 20 | Computer Services                      |
| 21 | Computers/Peripherals                  |
| 22 | Construction Supplies                  |
| 23 | Diversified                            |
| 24 | Drugs (Biotechnology)                  |
| 25 | Drugs (Pharmaceutical)                 |
| 26 | Education                              |
| 27 | Electrical Equipment                   |
| 28 | Electronics (Consumer & Office)        |
| 29 | Electronics (General)                  |
| 30 | Engineering/Construction               |
| 31 | Entertainment                          |
| 32 | Environmental & Waste Services         |
| 33 | Farming/Agriculture                    |
| 34 | Financial Svcs. (Non-bank & Insurance) |
| 35 | Food Processing                        |
| 36 | Food Wholesalers                       |
| 37 | Furn/Home Furnishings                  |
| 38 | Green & Renewable Energy               |
| 39 | Healthcare Products                    |
| 40 | Healthcare Support Services            |
| 41 | Heathcare Information and Technology   |
| 42 | Homebuilding                           |
| 43 | Hospitals/Healthcare Facilities        |
| 44 | Hotel/Gaming                           |
| 45 | Household Products                     |
| 46 | Information Services                   |
| 47 | Insurance (General)                    |
| 48 | Insurance (Life)                       |
| 49 | Insurance (Prop/Cas.)                  |
| 50 | Investments & Asset Management         |
| 51 | Machinery                              |
| 52 | Metals & Mining                        |
| 53 | Office Equipment & Services            |
| 54 | Oil/Gas (Integrated)                   |
| 55 | Oil/Gas (Production and Exploration)   |
| 56 | Oil/Gas Distribution                   |
| 57 | Oilfield Svcs/Equip.                   |
| 58 | Packaging & Container                  |
| 59 | Paper/Forest Products                  |
| 60 | Power                                  |
| 61 | Precious Metals                        |
| 62 | Publishing & Newspapers                |
| 63 | R.E.I.T.                               |
| 64 | Real Estate (Development)              |
| 65 | Real Estate (General/Diversified)      |
| 66 | Real Estate (Operations & Services)    |
| 67 | Recreation                             |
| 68 | Reinsurance                            |
| 69 | Restaurant/Dining                      |
| 70 | Retail (Automotive)                    |
| 71 | Retail (Building Supply)               |
| 72 | Retail (Distributors)                  |
| 73 | Retail (General)                       |
| 74 | Retail (Grocery and Food)              |
| 75 | Retail (Online)                        |
| 76 | Retail (Special Lines)                 |
| 77 | Rubber& Tires                          |
| 78 | Semiconductor                          |
| 79 | Semiconductor Equip                    |
| 80 | Shipbuilding & Marine                  |
| 81 | Shoe                                   |
| 82 | Software (Entertainment)               |
| 83 | Software (Internet)                    |
| 84 | Software (System & Application)        |
| 85 | Steel                                  |
| 86 | Telecom (Wireless)                     |
| 87 | Telecom. Equipment                     |
| 88 | Telecom. Services                      |
| 89 | Tobacco                                |
| 90 | Transportation                         |
| 91 | Transportation (Railroads)             |
| 92 | Trucking                               |
| 93 | Utility (General)                      |
| 94 | Utility (Water)                        |
| 95 | Total Market                           |
| 96 | Total Market (without financials)      |
