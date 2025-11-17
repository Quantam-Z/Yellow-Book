import { defineEventHandler, getQuery } from 'h3';
import { executeStubRequest } from '~/services/stubClient';

const coerceNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBoolean = (value: unknown) => {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).toLowerCase();
  if (['true', '1', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'no'].includes(normalized)) return false;
  return null;
};

const normalize = (value?: string) => (value ? value.toLowerCase().trim() : '');

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const page = Math.max(1, coerceNumber(query.page, 1));
  const pageSize = Math.min(50, Math.max(1, coerceNumber(query.pageSize, 10)));
  const search = normalize(Array.isArray(query.search) ? query.search[0] : (query.search as string | undefined));
  const status = normalize(Array.isArray(query.status) ? query.status[0] : (query.status as string | undefined));
  const category = normalize(Array.isArray(query.category) ? query.category[0] : (query.category as string | undefined));
  const verifiedFilter = toBoolean(Array.isArray(query.verified) ? query.verified[0] : query.verified);
  const sortKeyRaw = normalize(
    Array.isArray(query.sort) ? query.sort[0] : (query.sort as string | undefined) ?? 'name',
  );
  const directionRaw = normalize(
    Array.isArray(query.direction) ? query.direction[0] : (query.direction as string | undefined) ?? 'asc',
  );

  const sortKey = ['category', 'status', 'verified'].includes(sortKeyRaw) ? sortKeyRaw : 'name';
  const sortDirection = directionRaw === 'desc' ? 'desc' : 'asc';

  const response = await executeStubRequest({ resource: 'companies', method: 'GET' });
  const records: Array<Record<string, any>> = Array.isArray(response.data) ? response.data : [];
  const categoriesFacet = Array.from(new Set(records.map((entry) => entry.category).filter(Boolean))).sort(
    (a, b) => normalize(a) < normalize(b) ? -1 : 1,
  );
  const statusFacet = Array.from(new Set(records.map((entry) => entry.status).filter(Boolean))).sort(
    (a, b) => normalize(a) < normalize(b) ? -1 : 1,
  );

  const filtered = records.filter((company) => {
    if (search) {
      const haystack = `${company.name ?? ''} ${company.website ?? ''} ${company.category ?? ''}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (status && normalize(company.status) !== status) return false;
    if (category && normalize(company.category) !== category) return false;
    if (verifiedFilter !== null && Boolean(company.verified) !== verifiedFilter) return false;
    return true;
  });

  const sorted = filtered.sort((a, b) => {
    const valueA = normalize(a[sortKey]) || '';
    const valueB = normalize(b[sortKey]) || '';
    if (valueA === valueB) return 0;
    const comparison = valueA < valueB ? -1 : 1;
    return sortDirection === 'desc' ? -comparison : comparison;
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const data = sorted.slice(start, end);

  return {
    data,
    meta: {
      page: safePage,
      pageSize,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrevious: safePage > 1,
      categories: categoriesFacet,
      statuses: statusFacet,
    },
  };
});
