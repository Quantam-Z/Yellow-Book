# Mock API Specification

The frontend currently consumes a mocked HTTP layer implemented in `src/api/mockService.ts`. These routes are designed to be replaced by real backend endpoints in the future. All responses are JSON. Unless stated otherwise, requests complete in ~200 ms due to the simulated latency inside the mock service.

## GET `/api/categories`

Returns the full list of directory categories.

- **Query params:** none.
- **Response `200 OK`:**
  ```json
  [
    {
      "id": "animals-and-pets",
      "name": "Animals & Pets",
      "icon": "PawPrint",
      "color": "text-black",
      "filters": {
        "serviceTypes": { "label": "Pet Services", "options": ["Grooming", "Veterinary", "..."] },
        "specializations": { "label": "Animal Types", "options": ["Dogs", "Cats", "..."] },
        "emergencyService": true
      }
    }
  ]
  ```

## GET `/api/companies`

Lists companies with optional search and filtering.

- **Query params:**
  - `search` — Optional string. Matches against `name`, `website`, or `mobile` (case-insensitive substring).
  - `category` — Optional string. Case-insensitive exact match against category name.
  - `status` — Optional string. Case-insensitive exact match against status.
  - `page` — Optional positive integer, defaults to `1`.
  - `pageSize` — Optional positive integer, defaults to `10`.
- **Response `200 OK`:**
  ```json
  {
    "items": [
      {
        "id": 1,
        "name": "ABC Company",
        "category": "Technology",
        "website": "www.yourwebsite.com",
        "mobile": "556265485",
        "status": "Approved",
        "verified": false,
        "rating": 4.7,
        "ratingCount": 234,
        "location": "New York, NY",
        "revenue": "$500K - $1M",
        "serviceType": "Veterinary",
        "specialization": "Dogs",
        "emergencyService": true,
        "price": 120,
        "slug": "abc-company"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 12,
      "totalPages": 2
    },
    "filters": {
      "search": "",
      "category": "",
      "status": ""
    }
  }
  ```

## GET `/api/companies/:id`

Fetches a single company by identifier.

- **URL params:** `id` — numeric or string identifier.
- **Response `200 OK`:** company object identical to the entries from the list endpoint.
- **Error responses:**
  - `404 Not Found` when the company does not exist.

---

### Notes for backend implementation

1. **Filtering semantics** should remain case-insensitive for `search`, `category`, and `status`, matching the behaviour in the mock adapter.
2. **Pagination** must return both `total` and `totalPages` so the UI can keep page controls in sync.
3. **Optional attributes** (`favourited`, `verified`, `price`, etc.) are still consumed by the UI when present, but should be omitted if unknown.
