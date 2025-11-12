import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useCategoryStore } from '@/stores/category';
import { useCompanyStore } from '@/stores/company';
import type { Company } from '@/api/mockService';

type DirectoryListing = ReturnType<typeof buildNormalizedListings>[number];

type SearchEntry = {
  title: string;
  slug: string;
  normalizedTitle: string;
};

const normalizeWhitespace = (value: string) =>
  String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const slugifyTitle = (value: string) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const buildNormalizedListings = (records: Company[]) => {
  const categoryStore = useCategoryStore();

  return records.map((entry) => {
    const slug = entry.slug || slugifyTitle(entry.name);
    const normalizedCategory = categoryStore.normalizeCategoryName(entry.category || '');

    return {
      ...entry,
      slug,
      normalizedTitle: normalizeWhitespace(entry.name || entry.slug || ''),
      normalizedCategory,
    };
  });
};

export function useDirectoryListings() {
  const companyStore = useCompanyStore();
  const categoryStore = useCategoryStore();
  const { companies, loading, error } = storeToRefs(companyStore);

  const listings = computed(() => buildNormalizedListings(companies.value || []));

  const searchEntries = computed<SearchEntry[]>(() =>
    listings.value.map((entry) => ({
      title: entry.name,
      slug: entry.slug,
      normalizedTitle: entry.normalizedTitle,
    })),
  );

  const slugIndex = computed(() => {
    const index = new Map<string, DirectoryListing>();
    listings.value.forEach((entry) => index.set(entry.slug, entry));
    return index;
  });

  const idIndex = computed(() => {
    const index = new Map<string, DirectoryListing>();
    listings.value.forEach((entry) => {
      if (entry.id != null) {
        index.set(String(entry.id), entry);
      }
    });
    return index;
  });

  const titleIndex = computed(() => {
    const index = new Map<string, DirectoryListing>();
    listings.value.forEach((entry) => {
      index.set(entry.normalizedTitle, entry);
    });
    return index;
  });

  const matchSearch = (query: string, limit = 12) => {
    const normalizedQuery = normalizeWhitespace(query);
    if (!normalizedQuery) {
      return searchEntries.value.slice(0, limit);
    }

    const results: SearchEntry[] = [];
    for (const entry of searchEntries.value) {
      if (entry.normalizedTitle.includes(normalizedQuery)) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }
    return results;
  };

  const ensureLoaded = async (options: { pageSize?: number } = {}) => {
    await categoryStore.ensureCategories();
    await companyStore.fetchCompanies({
      search: '',
      category: '',
      page: 1,
      pageSize: options.pageSize ?? 100,
    });
  };

  const getBySlug = (slug: string) => slugIndex.value.get(slug) || null;
  const getById = (id: string | number) => idIndex.value.get(String(id)) || null;
  const getByTitle = (title: string) =>
    titleIndex.value.get(normalizeWhitespace(title)) || null;
  const getByCategory = (category: string) => {
    const normalized = categoryStore.normalizeCategoryName(category);
    return listings.value.filter((entry) => entry.normalizedCategory === normalized);
  };

  return {
    ensureLoaded,
    pending: loading,
    error,
    listings,
    searchEntries,
    ready: computed(() => !loading.value && listings.value.length > 0),
    matchSearch,
    getBySlug,
    getById,
    getByTitle,
    getByCategory,
  };
}