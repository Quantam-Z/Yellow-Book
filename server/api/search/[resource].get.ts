import { defineEventHandler, getQuery, createError } from 'h3';
import { executeStubRequest } from '~/services/stubClient';

type NormalizedQuery = {
  page: number;
  limit: number;
  search: string;
  rawSearch: string;
  status?: string;
  statusLc?: string;
  rating?: number | null;
  signupMethod?: string;
  signupMethodLc?: string;
  role?: string;
  roleLc?: string;
  timeRange?: string;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  category?: string;
  categoryLc?: string;
  categoryNormalized?: string;
};

type FilterFn<T> = (record: T, query: NormalizedQuery) => boolean;
type SortFn<T> = (a: T, b: T, query: NormalizedQuery) => number;
type MetaFn<T> = (all: T[], filtered: T[], query: NormalizedQuery) => Record<string, any>;
type NormalizeFn<TSource, TRecord> = (record: TSource) => TRecord;

interface SearchResourceConfig<RecordType = any, PayloadType = any> {
  key: string;
  stub: string;
  alias?: string[];
  fields: string[];
  pick?: (payload: PayloadType) => RecordType[];
  normalize?: NormalizeFn<any, RecordType>;
  filter?: FilterFn<RecordType>;
  sort?: SortFn<RecordType>;
  stats?: (records: RecordType[]) => Record<string, any>;
  meta?: MetaFn<RecordType>;
  defaultLimit?: number;
  maxLimit?: number;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const sortByStringField =
  (field: string): SortFn<Record<string, any>> =>
  (a, b) => {
    const valueA = toLower(getNestedValue(a, field));
    const valueB = toLower(getNestedValue(b, field));
    if (valueA === valueB) return 0;
    return valueA < valueB ? -1 : 1;
  };

const coerceString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value[0] != null ? String(value[0]) : '';
  }
  if (value === null || value === undefined) return '';
  return typeof value === 'string' ? value : String(value);
};

const parseNumber = (value: unknown, fallback: number | null): number | null => {
  const num = Number(Array.isArray(value) ? value[0] : value);
  return Number.isFinite(num) ? num : fallback;
};

const coerceDate = (value: unknown): Date | null => {
  const candidate = coerceString(value);
  if (!candidate) return null;
  const date = new Date(candidate);
  return Number.isNaN(date.getTime()) ? null : date;
};

const parseDateOnly = (value: unknown): Date | null => coerceDate(value);

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const differenceFromToday = (date: Date) => {
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  return Math.floor((today.getTime() - target.getTime()) / DAY_IN_MS);
};

const dateIsOnOrAfter = (value: unknown, min: Date) => {
  const date = parseDateOnly(value);
  if (!date) return false;
  return date.getTime() >= min.getTime();
};

const dateIsOnOrBefore = (value: unknown, max: Date) => {
  const date = parseDateOnly(value);
  if (!date) return false;
  return date.getTime() <= max.getTime();
};

const matchesTimeRange = (value: unknown, range?: string) => {
  if (!range) return true;
  const date = parseDateOnly(value);
  if (!date) return false;
  const normalized = range.toLowerCase();
  const diffDays = differenceFromToday(date);

  switch (normalized) {
    case '':
    case 'today':
      return diffDays === 0;
    case 'yesterday':
      return diffDays === 1;
    case 'last7days':
      return diffDays >= 0 && diffDays < 7;
    case 'last30days':
      return diffDays >= 0 && diffDays < 30;
    default:
      return true;
  }
};

const getNestedValue = (target: any, path: string | undefined) => {
  if (!path) return target;
  return path.split('.').reduce((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[key];
  }, target);
};

const toLower = (value: unknown) => String(value ?? '').toLowerCase();

const toSearchableText = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.map((entry) => toSearchableText(entry)).join(' ');
  }
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return '';
  return String(value);
};

const matchesSearchTerm = (record: any, fields: string[], needle: string) => {
  if (!needle) return true;
  return fields.some((path) => {
    const value = getNestedValue(record, path);
    if (value === undefined || value === null) return false;
    const haystack = toSearchableText(value).toLowerCase();
    return haystack.includes(needle);
  });
};

const toRecordArray = (payload: any): any[] => {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.data)) return payload.data;
  }
  return [];
};

const normalizeQuery = (query: Record<string, any>, config: SearchResourceConfig): NormalizedQuery => {
  const rawSearch = coerceString(query.search).trim();
  const limit = Math.min(
    config.maxLimit ?? MAX_LIMIT,
    Math.max(1, parseNumber(query.limit, config.defaultLimit ?? DEFAULT_LIMIT) ?? DEFAULT_LIMIT),
  );
  const page = Math.max(1, parseNumber(query.page, 1) ?? 1);

  const statusRaw = coerceString(query.status).trim();
  const signupMethodRaw = coerceString(query.signupMethod).trim();
  const roleRaw = coerceString(query.role).trim();
  const categoryRaw = coerceString(query.category).trim();
  const timeRangeRaw = coerceString(query.timeRange).trim().toLowerCase();

  const normalized: NormalizedQuery = {
    page,
    limit,
    search: rawSearch.toLowerCase(),
    rawSearch,
  };

  if (statusRaw) {
    normalized.status = statusRaw;
    normalized.statusLc = statusRaw.toLowerCase();
  }
  if (signupMethodRaw) {
    normalized.signupMethod = signupMethodRaw;
    normalized.signupMethodLc = signupMethodRaw.toLowerCase();
  }
  if (roleRaw) {
    normalized.role = roleRaw;
    normalized.roleLc = roleRaw.toLowerCase();
  }
  if (categoryRaw) {
    normalized.category = categoryRaw;
    normalized.categoryLc = categoryRaw.toLowerCase();
    normalized.categoryNormalized = normalizeCategoryName(categoryRaw);
  }
  if (timeRangeRaw) {
    normalized.timeRange = timeRangeRaw;
  }

  normalized.rating = query.rating != null ? parseNumber(query.rating, null) : null;
  normalized.dateFrom = coerceDate(query.dateFrom);
  normalized.dateTo = coerceDate(query.dateTo);

  return normalized;
};

const listingImageMap: Record<string, string> = {
  animalsandpets: '/logo/p1.png',
  beautywellbeings: '/logo/p2.png',
  foodbeverage: '/logo/p3.png',
  tourismhospitality: '/logo/image6.png',
  itsoftware: '/logo/image7.png',
};

const normalizeCategoryName = (value?: string) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[&\s+]/g, '')
    .trim();

const slugifyName = (value?: string) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const buildListingDescription = (listing: any) => {
  const service = listing.serviceType || 'services';
  const location = listing.location || 'your area';
  return `Leading ${service.toLowerCase()} specialist serving ${location}.`;
};

const defaultListingImage = (category?: string) => listingImageMap[normalizeCategoryName(category)] || '/logo/logo.png';

const normalizeListing = (entry: any) => {
  const title = entry.title || entry.name || 'Unnamed agency';
  return {
    ...entry,
    title,
    name: entry.name ?? title,
    slug: entry.slug ?? slugifyName(title),
    description: entry.description || buildListingDescription(entry),
    image: entry.image || defaultListingImage(entry.category),
    rating: Number(entry.rating ?? 0),
    ratingCount: Number(entry.ratingCount ?? entry.reviews ?? 0),
  };
};

const getReviewStatus = (value: unknown) => toLower(value || 'Pending') || 'pending';

const SEARCH_RESOURCES: Record<string, SearchResourceConfig> = {
  listings: {
    key: 'listings',
    stub: 'directoryListings',
    alias: ['directorylistings', 'directory-listings'],
    fields: ['title', 'name', 'category', 'serviceType', 'specialization', 'location', 'description', 'website'],
    pick: (payload: { listings?: any[] }) => (Array.isArray(payload?.listings) ? payload.listings : []),
    normalize: normalizeListing,
    filter: (listing, query) => {
      if (query.categoryNormalized) {
        const listingCategory = normalizeCategoryName(listing.category);
        return listingCategory === query.categoryNormalized;
      }
      if (query.categoryLc) {
        return toLower(listing.category) === query.categoryLc;
      }
      return true;
    },
    sort: (a, b) => {
      const diff = (Number(b.rating) || 0) - (Number(a.rating) || 0);
      if (diff !== 0) return diff;
      return sortByStringField('title')(a, b);
    },
    defaultLimit: 20,
    maxLimit: 60,
  },
  users: {
    key: 'users',
    stub: 'users',
    alias: ['user'],
    fields: ['name', 'email', 'signupMethod', 'status'],
    filter: (user, query) => {
      if (query.statusLc && toLower(user.status) !== query.statusLc) return false;
      if (query.signupMethodLc && toLower(user.signupMethod) !== query.signupMethodLc) return false;
      if (query.dateFrom && !dateIsOnOrAfter(user.signupDate, query.dateFrom)) return false;
      if (query.dateTo && !dateIsOnOrBefore(user.signupDate, query.dateTo)) return false;
      return true;
    },
    stats: (records) => {
      const socialVendors = new Set(['facebook', 'twitter', 'linkedin']);
      let google = 0;
      let social = 0;
      let email = 0;
      for (const entry of records) {
        const method = toLower(entry.signupMethod);
        if (method === 'google') google += 1;
        if (method === 'email') email += 1;
        if (socialVendors.has(method)) social += 1;
      }
      return {
        totalUsers: records.length,
        googleSignups: google,
        socialSignups: social,
        emailSignups: email,
      };
    },
    meta: (records) => ({
      signupMethods: Array.from(new Set(records.map((entry) => entry.signupMethod).filter(Boolean))),
    }),
    sort: sortByStringField('name'),
  },
  admins: {
    key: 'admins',
    stub: 'admins',
    alias: ['admin'],
    fields: ['name', 'email', 'role', 'status'],
    filter: (admin, query) => {
      if (query.statusLc && toLower(admin.status) !== query.statusLc) return false;
      if (query.roleLc && toLower(admin.role) !== query.roleLc) return false;
      if (query.dateFrom && !dateIsOnOrAfter(admin.createdOn, query.dateFrom)) return false;
      if (query.dateTo && !dateIsOnOrBefore(admin.createdOn, query.dateTo)) return false;
      return true;
    },
    stats: (records) => {
      let active = 0;
      let inactive = 0;
      let superAdmins = 0;
      for (const entry of records) {
        const status = toLower(entry.status);
        if (status === 'active') active += 1;
        if (status === 'inactive') inactive += 1;
        if (toLower(entry.role) === 'super admin') superAdmins += 1;
      }
      return {
        totalAdmins: records.length,
        active,
        inactive,
        superAdmins,
      };
    },
    sort: sortByStringField('name'),
  },
  reviews: {
    key: 'reviews',
    stub: 'agencyReviews',
    alias: ['agencyreviews'],
    fields: ['reviewerName', 'content', 'companyResponse.name', 'companyResponse.text'],
    normalize: (entry: any) => ({ ...entry, status: entry.status ?? 'Pending' }),
    filter: (review, query) => {
      if (query.statusLc && getReviewStatus(review.status) !== query.statusLc) return false;
      if (query.rating != null && Number(review.rating) !== query.rating) return false;
      if (query.dateFrom && !dateIsOnOrAfter(review.date, query.dateFrom)) return false;
      if (query.dateTo && !dateIsOnOrBefore(review.date, query.dateTo)) return false;
      if (query.timeRange && !matchesTimeRange(review.date, query.timeRange)) return false;
      return true;
    },
    stats: (records) => {
      let pending = 0;
      let approved = 0;
      let rejected = 0;
      let onHold = 0;
      let banned = 0;

      for (const entry of records) {
        const status = getReviewStatus(entry.status);
        switch (status) {
          case 'approved':
            approved += 1;
            break;
          case 'rejected':
            rejected += 1;
            break;
          case 'on hold':
          case 'onhold':
            onHold += 1;
            break;
          case 'banned':
            banned += 1;
            break;
          default:
            pending += 1;
        }
      }

      const lowRatingFallback = records.filter((r) => Number(r.rating) <= 2).length;

      return {
        totalReviews: records.length,
        pending,
        approved,
        rejected,
        onHold,
        bannedUsers: banned || lowRatingFallback,
      };
    },
    sort: (a, b) => {
      const dateA = parseDateOnly(a.date)?.getTime() ?? 0;
      const dateB = parseDateOnly(b.date)?.getTime() ?? 0;
      return dateB - dateA;
    },
  },
  subadminAssignedCompanies: {
    key: 'subadminAssignedCompanies',
    stub: 'subadminAssignedCompanies',
    alias: ['assignedcompanies', 'subadmincompanies', 'subadmin-assigned-companies'],
    fields: ['name', 'category', 'status', 'mobile', 'email', 'address', 'primaryContact', 'website'],
    filter: (company, query) => {
      if (query.statusLc && toLower(company.status) !== query.statusLc) return false;
      return true;
    },
    sort: sortByStringField('name'),
  },
};

const resourceRegistry = new Map<string, SearchResourceConfig>();
for (const config of Object.values(SEARCH_RESOURCES)) {
  resourceRegistry.set(config.key.toLowerCase(), config);
  if (config.alias) {
    for (const alias of config.alias) {
      resourceRegistry.set(alias.toLowerCase(), config);
    }
  }
}

const resolveConfig = (resourceParam?: string) => {
  if (!resourceParam) {
    throw createError({ statusCode: 400, statusMessage: 'Search resource is required' });
  }
  const key = resourceParam.toLowerCase();
  const config = resourceRegistry.get(key);
  if (!config) {
    throw createError({ statusCode: 404, statusMessage: `Unknown search resource "${resourceParam}"` });
  }
  return config;
};

export default defineEventHandler(async (event) => {
  const { resource } = event.context.params || {};
  const config = resolveConfig(resource);
  const query = getQuery(event);
  const normalizedQuery = normalizeQuery(query, config);

  const response = await executeStubRequest({ resource: config.stub, method: 'GET' });
  const rawRecords = config.pick ? config.pick(response.data) : toRecordArray(response.data);
  const preparedRecords = config.normalize ? rawRecords.map((entry) => config.normalize!(entry)) : rawRecords.slice();

  const filteredRecords = preparedRecords.filter((record) => {
    if (config.filter && !config.filter(record, normalizedQuery)) return false;
    if (!matchesSearchTerm(record, config.fields, normalizedQuery.search)) return false;
    return true;
  });

  const sortedRecords = config.sort ? [...filteredRecords].sort((a, b) => config.sort!(a, b, normalizedQuery)) : filteredRecords;

  const total = sortedRecords.length;
  const totalPages = Math.max(1, Math.ceil(total / normalizedQuery.limit));
  const safePage = Math.min(normalizedQuery.page, totalPages);
  const start = (safePage - 1) * normalizedQuery.limit;
  const data = sortedRecords.slice(start, start + normalizedQuery.limit);

  const meta: Record<string, any> = {
    page: safePage,
    limit: normalizedQuery.limit,
    total,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrevious: safePage > 1,
  };

  if (config.stats) {
    meta.stats = config.stats(preparedRecords);
  }

  if (config.meta) {
    Object.assign(meta, config.meta(preparedRecords, sortedRecords, normalizedQuery));
  }

  return {
    data,
    meta,
  };
});

