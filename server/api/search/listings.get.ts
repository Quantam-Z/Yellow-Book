import { createError, defineEventHandler, getQuery } from 'h3';
import { categoryService } from '@/services/categoryService';
import type { DirectoryListing } from '@/types/directory';

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

const toLower = (value?: string | null) => (value ? value.toLowerCase() : '');
const normalizeSpaces = (value?: string | null) => toLower(value).replace(/\s+/g, ' ').trim();

const parseBoolean = (value?: string | string[]) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined) return undefined;
  if (raw === '1' || raw?.toLowerCase() === 'true') return true;
  if (raw === '0' || raw?.toLowerCase() === 'false') return false;
  return undefined;
};

const parseNumber = (value: string | string[] | undefined, fallback: number) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseSort = (value?: string | string[]) => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return { key: 'rating', order: 'desc' as const };
  }
  const [key = 'rating', direction = 'desc'] = raw.split(':');
  const normalizedKey = ['rating', 'title', 'location', 'comments'].includes(key) ? key : 'rating';
  const normalizedOrder = direction?.toLowerCase() === 'asc' ? 'asc' : 'desc';
  return { key: normalizedKey, order: normalizedOrder as 'asc' | 'desc' };
};

const sortListings = (entries: DirectoryListing[], sortKey: string, order: 'asc' | 'desc') => {
  const modifier = order === 'asc' ? 1 : -1;
  const sorted = entries.slice();

  sorted.sort((a, b) => {
    const lhs = (a as Record<string, unknown>)[sortKey];
    const rhs = (b as Record<string, unknown>)[sortKey];

    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return (lhs - rhs) * modifier;
    }

    const la = normalizeSpaces(String(lhs ?? ''));
    const lb = normalizeSpaces(String(rhs ?? ''));
    return la.localeCompare(lb) * modifier;
  });

  return sorted;
};

export default defineEventHandler(async (event) => {
  try {
    await categoryService.ensureHydrated();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load directory data',
      data: { error: error instanceof Error ? error.message : String(error) },
    });
  }

  const query = getQuery(event);
  const search = normalizeSpaces(query.search as string | undefined);
  const categoryQuery = normalizeSpaces(query.category as string | undefined);
  const serviceType = normalizeSpaces(query.serviceType as string | undefined);
  const emergencyService = parseBoolean(query.emergencyService);
  const page = parseNumber(query.page as string | undefined, 1);
  const limit = Math.min(parseNumber(query.limit as string | undefined, DEFAULT_LIMIT), MAX_LIMIT);
  const { key: sortKey, order: sortOrder } = parseSort(query.sort as string | undefined);

  const listings = categoryService.getEnrichedListings();
  const normalizedCategory = categoryQuery ? categoryService.normalizeCategoryName(categoryQuery) : '';

  const filtered = listings.filter((entry) => {
    if (normalizedCategory && entry.normalizedCategory !== normalizedCategory) {
      return false;
    }

    if (serviceType && normalizeSpaces(entry.serviceType) !== serviceType) {
      return false;
    }

    if (typeof emergencyService === 'boolean' && entry.emergencyService !== emergencyService) {
      return false;
    }

    if (search) {
      const haystacks = [entry.title, entry.description, entry.location, entry.category, entry.serviceType];
      const matchesSearch = haystacks.some((value) => normalizeSpaces(value).includes(search));
      if (!matchesSearch) {
        return false;
      }
    }

    return true;
  });

  const sorted = sortListings(filtered, sortKey, sortOrder);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const normalizedPage = Math.min(Math.max(page, 1), totalPages);
  const start = (normalizedPage - 1) * limit;
  const items = sorted.slice(start, start + limit);

  return {
    data: items,
    meta: {
      total,
      totalPages,
      page: normalizedPage,
      limit,
    },
  };
});
