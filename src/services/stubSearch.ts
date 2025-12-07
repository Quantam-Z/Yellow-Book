import {
  executeStubRequest,
  useStubClient,
  isStubHttpTransportEnabled,
  StubApiError,
} from '~/services/stubClient';

const stubClient = useStubClient();
const isClientRuntime = typeof globalThis !== 'undefined' && typeof globalThis.window !== 'undefined';

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

type StubSearchOptions = {
  /**
   * When set to 'refresh', the stub data is reloaded from the public stubs
   * directory before filtering so the browser always fetches from disk/network.
   */
  cache?: 'default' | 'refresh';
  transport?: 'auto' | 'remote-only' | 'local-only';
};

const toIterable = (value: unknown) => (Array.isArray(value) ? value : [value]);

const buildSearchParams = (query: Record<string, any> = {}, options: StubSearchOptions = {}) => {
  const params = new URLSearchParams();
  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue === undefined || rawValue === null) continue;
    const values = toIterable(rawValue);
    for (const entry of values) {
      if (entry === undefined || entry === null || entry === '') continue;
      params.append(key, String(entry));
    }
  }
  if (options.cache && !params.has('cache')) {
    params.set('cache', options.cache);
  }
  return params;
};

const buildSearchUrl = (resource: string, query: Record<string, any> = {}, options: StubSearchOptions = {}) => {
  const params = buildSearchParams(query, options);
  const queryString = params.toString();
  const base = `/api/stub-search/${encodeURIComponent(resource)}`;
  return queryString ? `${base}?${queryString}` : base;
};

const getTransportPreference = (options: StubSearchOptions = {}) => {
  const value = options.transport;
  return typeof value === 'string' ? value : 'auto';
};

const shouldUseRemoteSearch = (options: StubSearchOptions = {}) => {
  if (!isClientRuntime) return false;
  const preference = getTransportPreference(options);
  if (preference === 'local-only') return false;
  if (!isStubHttpTransportEnabled() && preference !== 'remote-only') {
    return false;
  }
  return isStubHttpTransportEnabled();
};

const fetchSearchOverHttp = async <T = any>(
  resource: string,
  query: Record<string, any>,
  options: StubSearchOptions,
): Promise<StubSearchResult<T>> => {
  const url = buildSearchUrl(resource, query, options);

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    });
    const status = response.status;
    const statusText = response.statusText;

    const rawText = await response.text();
    const parsed = rawText ? JSON.parse(rawText) : null;

    if (!response.ok) {
      throw new StubApiError(status || 500, parsed?.error || statusText || 'Stub search failed', {
        ...(parsed?.details || {}),
        reason: parsed?.reason || 'http-error',
        status,
        statusText,
        url,
        resource,
      });
    }

    return (parsed?.data as StubSearchResult<T>) ?? { items: [], meta: {} };
  } catch (error) {
    if (error instanceof StubApiError) {
      throw error;
    }
    if (error instanceof SyntaxError) {
      throw new StubApiError(500, 'Stub search response was not valid JSON', {
        reason: 'invalid-json',
        resource,
        url,
      });
    }
    if (error?.name === 'TypeError') {
      throw new StubApiError(503, 'Stub search HTTP request failed', {
        reason: 'network-error',
        resource,
        url,
      });
    }
    throw new StubApiError(500, 'Stub search request failed', {
      reason: 'unknown-http-error',
      resource,
      url,
      cause: error,
    });
  }
};

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
  companies: {
    key: 'companies',
    stub: 'companies',
    fields: ['name', 'website', 'category', 'status', 'mobile', 'email'],
    filter: (company, query) => {
      if (query.statusLc && toLower(company.status) !== query.statusLc) return false;
      if (query.categoryLc && toLower(company.category) !== query.categoryLc) return false;
      return true;
    },
    meta: (records) => {
      const categories = Array.from(new Set(records.map((entry) => entry.category).filter(Boolean))).sort((a, b) =>
        toLower(a || '') < toLower(b || '') ? -1 : 1,
      );
      const statuses = Array.from(new Set(records.map((entry) => entry.status).filter(Boolean))).sort((a, b) =>
        toLower(a || '') < toLower(b || '') ? -1 : 1,
      );
      return {
        categories,
        statuses,
      };
    },
    sort: sortByStringField('name'),
    defaultLimit: 10,
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
    throw new Error('Search resource is required');
  }
  const key = resourceParam.toLowerCase();
  const config = resourceRegistry.get(key);
  if (!config) {
    throw new Error(`Unknown search resource "${resourceParam}"`);
  }
  return config;
};

export type StubSearchResult<T = any> = {
  items: T[];
  meta: Record<string, any>;
};

const performLocalStubSearch = async <T = any>(
  resource: string,
  query: Record<string, any> = {},
  options: StubSearchOptions = {},
): Promise<StubSearchResult<T>> => {
  const config = resolveConfig(resource);
  const normalizedQuery = normalizeQuery(query, config);

  let payload: any = null;
  if (options.cache === 'refresh') {
    payload = await stubClient.reset(config.stub);
  } else {
    const response = await executeStubRequest({ resource: config.stub, method: 'GET' });
    payload = response?.data ?? null;
  }

  const rawRecords = config.pick ? config.pick(payload) : toRecordArray(payload);
  const preparedRecords = config.normalize ? rawRecords.map((entry) => config.normalize!(entry)) : rawRecords.slice();

  const filteredRecords = preparedRecords.filter((record) => {
    if (config.filter && !config.filter(record, normalizedQuery)) return false;
    if (!matchesSearchTerm(record, config.fields, normalizedQuery.search)) return false;
    return true;
  });

  const sortedRecords = config.sort
    ? [...filteredRecords].sort((a, b) => config.sort!(a, b, normalizedQuery))
    : filteredRecords;

  const total = sortedRecords.length;
  const totalPages = Math.max(1, Math.ceil(total / normalizedQuery.limit));
  const safePage = Math.min(normalizedQuery.page, totalPages);
  const start = (safePage - 1) * normalizedQuery.limit;
  const data = sortedRecords.slice(start, start + normalizedQuery.limit);

  const meta: Record<string, any> = {
    page: safePage,
    limit: normalizedQuery.limit,
    pageSize: normalizedQuery.limit,
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
    items: data as T[],
    meta,
  };
};

export const searchStubResource = async <T = any>(
  resource: string,
  query: Record<string, any> = {},
  options: StubSearchOptions = {},
): Promise<StubSearchResult<T>> => {
  const preference = getTransportPreference(options);

  if (shouldUseRemoteSearch(options)) {
    try {
      return await fetchSearchOverHttp<T>(resource, query, options);
    } catch (error) {
      if (typeof import.meta !== 'undefined' && import.meta.dev) {
        console.warn('[stub-search] Falling back to local stub search', error);
      }
      if (preference === 'remote-only') {
        throw error;
      }
    }
  }

  return performLocalStubSearch<T>(resource, query, options);
};
