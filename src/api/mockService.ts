import axios, {
  type AxiosAdapter,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import categoriesJson from '@/data/categories.json';
import companiesJson from '@/data/companies.json';
import listingsJson from '@/data/listings.json';

const MOCK_DELAY = 220;
const DEFAULT_PAGE_SIZE = 10;

type CategoryRecord = (typeof categoriesJson)['categories'][number];

export type Category = CategoryRecord & {
  id: string;
};

type ListingRecord = (typeof listingsJson)['listings'][number];

export type Company = {
  id: number;
  name: string;
  website?: string;
  mobile?: string;
  category?: string;
  status?: string;
  verified?: boolean;
  rating?: number;
  ratingCount?: number;
  location?: string;
  revenue?: string;
  comments?: number;
  serviceType?: string;
  specialization?: string;
  emergencyService?: boolean;
  price?: number;
  slug?: string;
  favourited?: boolean;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type CompaniesResponse = {
  items: Company[];
  pagination: Pagination;
  filters: {
    search: string;
    category: string;
    status: string;
  };
};

const categoriesSeed: Category[] = categoriesJson.categories.map((category) => ({
  ...category,
  id: generateSlug(category.name),
}));

const listingIndex = new Map<number, ListingRecord>(
  listingsJson.listings.map((listing) => [Number(listing.id), listing]),
);

const companyIndex = new Map<number, (typeof companiesJson)[number]>(
  companiesJson.map((company) => [Number(company.id), company]),
);

const allCompanyIds = Array.from(
  new Set<number>([
    ...listingIndex.keys(),
    ...companyIndex.keys(),
  ]),
).sort((a, b) => a - b);

const companiesSeed: Company[] = allCompanyIds.map((id) => {
  const listing = listingIndex.get(id);
  const company = companyIndex.get(id);

  const name = company?.name || listing?.name || '';

  return {
    id,
    name,
    category: company?.category || listing?.category,
    website: company?.website || listing?.website,
    mobile: company?.mobile || '',
    status: company?.status,
    verified: company?.verified,
    rating: listing?.rating,
    ratingCount: listing?.ratingCount,
    location: listing?.location,
    revenue: listing?.revenue,
    comments: listing?.comments,
    serviceType: listing?.serviceType,
    specialization: listing?.specialization,
    emergencyService: listing?.emergencyService,
    price: listing?.price,
    slug: generateSlug(name),
  };
});

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const clone = <T>(value: T): T =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

function normalize(value: string) {
  return String(value || '')
    .toLowerCase()
    .trim();
}

function generateSlug(value: string) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolveQueryPagination(params: Record<string, any>): Pagination {
  const pageParam = Number(params?.page) || 1;
  const pageSizeParam = Number(params?.pageSize) || DEFAULT_PAGE_SIZE;

  const page = Math.max(1, pageParam);
  const pageSize = Math.max(1, pageSizeParam);

  return {
    page,
    pageSize,
    total: 0,
    totalPages: 0,
  };
}

const mockAdapter: AxiosAdapter = async (
  config: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const method = (config.method || 'get').toLowerCase();
  const url = config.url || '';

  if (method !== 'get') {
    return buildResponse(config, 405, {
      message: `Method ${method.toUpperCase()} not supported`,
    });
  }

  await delay(MOCK_DELAY);

  if (url === '/api/categories') {
    return buildResponse(config, 200, clone(categoriesSeed));
  }

  if (url?.startsWith('/api/companies')) {
    return handleCompaniesRequest(config);
  }

  return buildResponse(config, 404, {
    message: `Endpoint ${url} not found`,
  });
};

function handleCompaniesRequest(
  config: AxiosRequestConfig,
): AxiosResponse<CompaniesResponse | Company | { message: string }> {
  const url = config.url || '';
  const pathSegments = url.replace(/^\/+/, '').split('/');

  // Handle /api/companies/:id
  if (pathSegments.length === 3) {
    const idSegment = pathSegments[2];
    const id = Number(idSegment);
    const company = companiesSeed.find(
      (entry) => Number(entry.id) === id,
    );

    if (!company) {
      return buildResponse(config, 404, {
        message: `Company with id ${idSegment} not found`,
      });
    }

    return buildResponse(config, 200, clone(company));
  }

  // Handle /api/companies
  const params = config.params || {};
  const pagination = resolveQueryPagination(params);

  const searchTerm = normalize(params?.search || '');
  const categoryFilter = normalize(params?.category || '');
  const statusFilter = normalize(params?.status || '');

  let filtered = companiesSeed.slice();

  if (searchTerm) {
    filtered = filtered.filter((company) => {
      const name = normalize(company.name || '');
      const website = normalize(company.website || '');
      const mobile = normalize(company.mobile || '');
      return (
        name.includes(searchTerm) ||
        website.includes(searchTerm) ||
        mobile.includes(searchTerm)
      );
    });
  }

  if (categoryFilter) {
    filtered = filtered.filter(
      (company) => normalize(company.category || '') === categoryFilter,
    );
  }

  if (statusFilter) {
    filtered = filtered.filter(
      (company) => normalize(company.status || '') === statusFilter,
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pagination.pageSize));
  const page = Math.min(pagination.page, totalPages);

  const start = (page - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  const items = filtered.slice(start, end);

  return buildResponse(config, 200, {
    items: clone(items),
    pagination: {
      ...pagination,
      page,
      total,
      totalPages,
    },
    filters: {
      search: String(params?.search || ''),
      category: String(params?.category || ''),
      status: String(params?.status || ''),
    },
  });
}

function buildResponse<T>(
  config: AxiosRequestConfig,
  status: number,
  data: T,
): AxiosResponse<T> {
  return {
    config,
    status,
    statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
    headers: {},
    data,
    request: {},
  };
}

const mockApiClient = axios.create({
  baseURL: 'mock://localhost',
  adapter: mockAdapter,
});

export const mockService = {
  async getCategories(): Promise<Category[]> {
    const response = await mockApiClient.get<Category[]>('/api/categories');
    return response.data;
  },

  async getCompanies(params: {
    search?: string;
    category?: string;
    page?: number;
    pageSize?: number;
  } = {}): Promise<CompaniesResponse> {
    const response = await mockApiClient.get<CompaniesResponse>(
      '/api/companies',
      {
        params,
      },
    );
    return response.data;
  },

  async getCompanyById(id: number | string): Promise<Company> {
    const response = await mockApiClient.get<Company>(
      `/api/companies/${id}`,
    );
    return response.data;
  },
};

export default mockService;
