# Directory Data Mapping Guide

This document explains how dummy data is orchestrated for the **Category** and **Agency** flows so backend engineers can replace the in-memory fixtures with real APIs without touching UI components.

---

## Key Types

TypeScript interfaces describing the shared data shapes live in `src/types/directory.ts`. They define:

- `CategoryDefinition` & `CategoryDirectory` – category metadata + related listings.
- `ListingDefinition` & `DirectoryListing` – normalized business listings.
- `AgencyRecord` – enriched agency profile with contact, owner, meta, and asset data.

These types are the contract the UI expects. When you replace the stubs, return the same shape.

---

## Category Flow

### Data sources
- `public/stubs/categories.json`
- `public/stubs/listings.json`

### Service layer
- `src/services/categoryService.ts`
  - Loads/normalizes both JSON files.
  - Produces enriched listings (`slug`, normalized titles/categories, default images, descriptions).
- `src/services/directoryMapper.ts`
  - `resolveCategoryDirectory(name)` returns `{ category, listings }`.
  - `buildCategoryDirectories()` pre-builds all category → listings groupings.

### UI consumption
- `src/components/common/catagory.vue` pulls categories from `categoryService`.
- `src/components/Catagory/catagoryDetails.vue`
  - Uses `resolveCategoryDirectory` for category metadata (filters, names, etc.).
  - Uses `useDirectoryListings()` (derived from `categoryService.getEnrichedListings()`) to power filtering, pagination, and price ranges.
  - `useListingsFilter()` keeps UI state (services, specialisations, ratings, emergency, price, search query).

### Backend integration checklist
1. Replace the JSON data sources with real API responses that match `CategoryDefinition` & `ListingDefinition`.
2. Ensure listings populate `category`, `serviceType`, `specialization`, `price`, `emergencyService`, `rating`, and `ratingCount`.
3. Keep slugs stable (`slugifyName`) so detail pages resolve via `?slug=`, `?id=`, or `?title=`.
4. If pricing or filters change, update the JSON/response; UI automatically reflects it through `resolveCategoryDirectory`.

---

## Agency Flow

### Data sources
- `public/stubs/companies.json`
- `public/stubs/agencyCompany.json`
- `public/stubs/companyProfile.json`
- `public/stubs/listings.json` (same listings used for categories)

### Service layer
- `src/services/directoryMapper.ts`
  - `mapAgencyRecord({ listing, company, companyDetail, profile })` merges all stub sources into one `AgencyRecord`.
  - Normalises names, slugs, contact information, and default assets.
- `src/composables/useAgencyData.ts`
  - Loads directory listings (`useDirectoryListings()`), company list, company detail, and profile stubs.
  - Resolves a consistent `AgencyRecord` by matching `id`, `slug`, or `title` query params.
  - Exposes `agency`, `loading`, and the raw sources for debugging.

### UI consumption
- `src/pages/agency.vue`
  - Fetches the aggregated data via `useAgencyData()`.
  - Passes structured props to presentational components (`AgencyHead`, `CommonAgencyProfile`, `AgencyDetails`, `AgencyContact`, `AgencyReview`).
  - Contact info, owner bio, hero/logo/profile assets, and tagline are all mapped via `AgencyRecord`.

### Backend integration checklist
1. Build an API that returns agency records shaped like `AgencyRecord`. Merge contact, owner, and meta information in the backend.
2. Support lookups by `id`, `slug`, or human-readable `title` (the page accepts all three).
3. Provide review collections via the stubs or an API fulfilling `agencyReviews` to keep the modal + rating filters working.
4. Maintain website, phone, email, location, revenue, employees, industry fields; UI renders whatever strings you supply.

---

## Migration Strategy

1. **Swap Data Sources** – Update `categoryService` and `useAgencyData` to call your backend endpoints instead of reading JSON/stubs. Ensure they still return the typed objects.
2. **Preserve Normalisation** – Reuse `categoryService.slugifyName`/`normalizeName` for slug/id matching to avoid route regressions.
3. **Extend Types If Needed** – Add fields to `AgencyRecord` or `ListingDefinition` in `src/types/directory.ts` and update mappers. Components consume the type, not raw responses.
4. **Testing** – Use the existing stubs during development. Point to real APIs in staging/production by swapping the data loader implementations (e.g., feature flag or environment switch).

---

For questions or changes to the data contract, update this document alongside the TypeScript definitions so frontend and backend stay aligned.
