import { executeStubRequest } from '~/services/stubClient';
import { categoryService } from '@/services/categoryService';
import type { DirectoryListing, ListingDefinition } from '@/types/directory';

type EnrichedListing = DirectoryListing & {
  normalizedServiceType: string;
  normalizedSpecialization: string;
  searchHaystack: string;
  ratingBucket: number;
  priceValue: number | null;
};

type ListingsPayload = {
  listings?: ListingDefinition[];
};

const CACHE_TTL_MS = 60 * 1000;

let listingsCache: EnrichedListing[] | null = null;
let cacheTimestamp = 0;

const normalizeString = (value?: string | null) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const toNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const enrichListing = (listing: ListingDefinition): EnrichedListing => {
  const title = listing.name || '';
  const normalizedTitle = categoryService.normalizeName(title);
  const normalizedCategory = categoryService.normalizeCategoryName(listing.category);
  const slug = categoryService.slugifyName(title);
  const description = listing.description || categoryService.buildListingDescription(listing);
  const image = listing.image || categoryService.getDefaultListingImage(listing.category);

  const normalizedServiceType = normalizeString(listing.serviceType);
  const normalizedSpecialization = normalizeString(listing.specialization);
  const searchHaystack = normalizeString(
    `${title} ${listing.location ?? ''} ${listing.serviceType ?? ''} ${listing.specialization ?? ''} ${
      listing.website ?? ''
    }`,
  );

  const ratingBucket = Math.floor(Number(listing.rating ?? 0));
  const priceValue = toNumber(listing.price);

  return {
    ...listing,
    title,
    slug,
    description,
    image,
    normalizedTitle,
    normalizedCategory,
    normalizedServiceType,
    normalizedSpecialization,
    searchHaystack,
    ratingBucket,
    priceValue,
  };
};

const loadDirectoryListings = async () => {
  const response = await executeStubRequest({ resource: 'directoryListings', method: 'GET' });
  const payload = response.data as ListingsPayload;
  const rawListings = Array.isArray(payload?.listings) ? payload.listings : [];
  return rawListings.map(enrichListing);
};

export const getDirectoryListings = async (options: { force?: boolean } = {}) => {
  const now = Date.now();
  if (!options.force && listingsCache && now - cacheTimestamp < CACHE_TTL_MS) {
    return listingsCache;
  }
  listingsCache = await loadDirectoryListings();
  cacheTimestamp = now;
  return listingsCache;
};

const coerceStringArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeString(typeof entry === 'string' ? entry : String(entry ?? '')))
      .filter(Boolean);
  }
  return normalizeString(typeof value === 'string' ? value : String(value ?? ''))
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const coerceNumberArray = (value: unknown): number[] => {
  if (!value) return [];
  const target = Array.isArray(value) ? value : [value];
  const normalized: number[] = [];
  for (const entry of target) {
    const parsed = Number(entry);
    if (Number.isFinite(parsed)) {
      normalized.push(Math.floor(parsed));
    }
  }
  return Array.from(new Set(normalized));
};

const toBoolean = (value: unknown): boolean | null => {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'boolean') return value;
  const normalized = normalizeString(String(value));
  if (['true', '1', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'no'].includes(normalized)) return false;
  return null;
};

export type DirectorySearchParams = {
  category?: string;
  q?: string;
  services?: string[] | string;
  specializations?: string[] | string;
  ratings?: number[] | number | string;
  emergency?: boolean | string | null;
  maxPrice?: number | string | null;
  page?: number | string;
  pageSize?: number | string;
  sort?: string;
  order?: string;
};

export type DirectorySearchResult = {
  items: DirectoryListing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  priceRange: { min: number; max: number };
};

const clampNumber = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const sortListings = (listings: EnrichedListing[], sortKey: string, order: 'asc' | 'desc') => {
  const sorted = [...listings];
  const multiplier = order === 'desc' ? -1 : 1;

  sorted.sort((a, b) => {
    switch (sortKey) {
      case 'price': {
        const aPrice = a.priceValue ?? Number.POSITIVE_INFINITY;
        const bPrice = b.priceValue ?? Number.POSITIVE_INFINITY;
        return (aPrice - bPrice) * multiplier;
      }
      case 'title': {
        return a.title.localeCompare(b.title) * multiplier;
      }
      case 'rating':
      default: {
        const aRating = Number(a.rating ?? 0);
        const bRating = Number(b.rating ?? 0);
        if (aRating === bRating) {
          return a.title.localeCompare(b.title) * multiplier;
        }
        return (aRating - bRating) * multiplier;
      }
    }
  });

  return sorted;
};

const matchesFilter = (listing: EnrichedListing, params: RequiredSearchFilters) => {
  if (params.category && listing.normalizedCategory !== params.category) {
    return false;
  }
  if (params.q && !listing.searchHaystack.includes(params.q)) {
    return false;
  }
  if (params.services.length && !params.services.includes(listing.normalizedServiceType)) {
    return false;
  }
  if (params.specializations.length && !params.specializations.includes(listing.normalizedSpecialization)) {
    return false;
  }
  if (params.ratings.length && !params.ratings.includes(listing.ratingBucket)) {
    return false;
  }
  if (params.emergency !== null) {
    const available = Boolean(listing.emergencyService);
    if (available !== params.emergency) {
      return false;
    }
  }
  if (params.maxPrice !== null) {
    if (listing.priceValue === null) {
      return false;
    }
    if (listing.priceValue > params.maxPrice) {
      return false;
    }
  }
  return true;
};

type RequiredSearchFilters = {
  category: string;
  q: string;
  services: string[];
  specializations: string[];
  ratings: number[];
  emergency: boolean | null;
  maxPrice: number | null;
  sort: 'rating' | 'title' | 'price';
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
};

const normalizeSearchParams = (params: DirectorySearchParams): RequiredSearchFilters => {
  const normalizedCategory = params.category ? categoryService.normalizeCategoryName(params.category) : '';
  const q = params.q ? normalizeString(params.q) : '';
  const services = coerceStringArray(params.services);
  const specializations = coerceStringArray(params.specializations);
  const ratings = coerceNumberArray(params.ratings);
  const emergency = toBoolean(params.emergency ?? null);
  const numericMaxPrice = params.maxPrice === null ? null : toNumber(params.maxPrice ?? undefined);
  const sortKey = ['price', 'title', 'rating'].includes(String(params.sort)) ? (params.sort as string) : 'rating';
  const order = String(params.order).toLowerCase() === 'asc' ? 'asc' : 'desc';
  const page = clampNumber(Number(params.page ?? 1) || 1, 1, 1000);
  const pageSize = clampNumber(Number(params.pageSize ?? 12) || 12, 1, 50);

  return {
    category: normalizedCategory,
    q,
    services,
    specializations,
    ratings,
    emergency,
    maxPrice: numericMaxPrice,
    sort: sortKey as 'rating' | 'title' | 'price',
    order: order as 'asc' | 'desc',
    page,
    pageSize,
  };
};

const computePriceRange = (listings: EnrichedListing[]) => {
  const values = listings
    .map((listing) => listing.priceValue)
    .filter((value): value is number => value !== null && Number.isFinite(value));

  if (!values.length) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export const searchDirectoryListings = async (
  params: DirectorySearchParams = {},
): Promise<DirectorySearchResult> => {
  const filters = normalizeSearchParams(params);
  const listings = await getDirectoryListings();

  const categoryListings = filters.category
    ? listings.filter((listing) => listing.normalizedCategory === filters.category)
    : listings;

  const priceRange = computePriceRange(categoryListings);

  const filtered = categoryListings.filter((listing) => matchesFilter(listing, filters));
  const sorted = sortListings(filtered, filters.sort, filters.order);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const safePage = Math.min(filters.page, totalPages);
  const start = (safePage - 1) * filters.pageSize;
  const items = sorted.slice(start, start + filters.pageSize);

  return {
    items,
    total,
    totalPages,
    page: safePage,
    pageSize: filters.pageSize,
    hasNext: safePage < totalPages,
    hasPrevious: safePage > 1,
    priceRange,
  };
};
