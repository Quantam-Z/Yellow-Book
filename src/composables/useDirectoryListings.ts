import { computed, reactive } from 'vue';
import { categoryService } from '@/services/categoryService';

type DirectoryListing = ReturnType<typeof categoryService.getEnrichedListings>[number];

type NormalizedListing = DirectoryListing & {
  normalizedTitle: string;
  normalizedCategory: string;
};

type SearchEntry = {
  title: string;
  slug: string;
  normalizedTitle: string;
};

type DirectoryState = {
  pending: boolean;
  error: Error | null;
  listings: NormalizedListing[];
  searchEntries: SearchEntry[];
  slugIndex: Map<string, NormalizedListing>;
  idIndex: Map<string, NormalizedListing>;
  titleIndex: Map<string, NormalizedListing>;
};

const directoryState = reactive<DirectoryState>({
  pending: false,
  error: null,
  listings: [],
  searchEntries: [],
  slugIndex: new Map(),
  idIndex: new Map(),
  titleIndex: new Map(),
});

let ensurePromise: Promise<NormalizingResult> | null = null;

type NormalizingResult = {
  listings: NormalizedListing[];
  searchEntries: SearchEntry[];
  slugIndex: Map<string, NormalizedListing>;
  idIndex: Map<string, NormalizedListing>;
  titleIndex: Map<string, NormalizedListing>;
};

const normalizeString = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const normalizeCategory = (value: string) => categoryService.normalizeCategoryName(value);

async function loadDirectoryListings(): Promise<NormalizingResult> {
  await categoryService.ensureHydrated();
  const rawListings = categoryService.getEnrichedListings();

  const listings: NormalizedListing[] = rawListings.map((entry) => ({
    ...entry,
    normalizedTitle: normalizeString(entry.title),
    normalizedCategory: normalizeCategory(entry.category || ''),
  }));

  const searchEntries: SearchEntry[] = listings.map((entry) => ({
    title: entry.title,
    slug: entry.slug,
    normalizedTitle: entry.normalizedTitle,
  }));

  const slugIndex = new Map<string, NormalizedListing>();
  const idIndex = new Map<string, NormalizedListing>();
  const titleIndex = new Map<string, NormalizedListing>();

  for (const listing of listings) {
    if (listing.slug) {
      slugIndex.set(listing.slug, listing);
    }
    if (listing.id != null) {
      idIndex.set(String(listing.id), listing);
    }
    if (listing.normalizedTitle) {
      titleIndex.set(listing.normalizedTitle, listing);
    }
  }

  return { listings, searchEntries, slugIndex, idIndex, titleIndex };
}

async function ensureDirectoryLoaded() {
  if (directoryState.listings.length > 0 || ensurePromise) {
    if (ensurePromise) {
      await ensurePromise;
    }
    return;
  }

  directoryState.pending = true;
  directoryState.error = null;

  ensurePromise = loadDirectoryListings()
    .then((result) => {
      directoryState.listings = result.listings;
      directoryState.searchEntries = result.searchEntries;
      directoryState.slugIndex = result.slugIndex;
      directoryState.idIndex = result.idIndex;
      directoryState.titleIndex = result.titleIndex;
    })
    .catch((error) => {
      directoryState.error = error instanceof Error ? error : new Error(String(error));
      throw directoryState.error;
    })
    .finally(() => {
      directoryState.pending = false;
      ensurePromise = null;
    });

  await ensurePromise;
}

export function useDirectoryListings() {
  const pending = computed(() => directoryState.pending);
  const error = computed(() => directoryState.error);
  const listings = computed(() => directoryState.listings);
  const searchEntries = computed(() => directoryState.searchEntries);

  const ready = computed(() => !directoryState.pending && directoryState.listings.length > 0);

  const matchSearch = (query: string, limit = 12) => {
    const normalizedQuery = normalizeString(query);
    if (!normalizedQuery) {
      return directoryState.searchEntries.slice(0, limit);
    }

    const results: SearchEntry[] = [];
    for (const entry of directoryState.searchEntries) {
      if (entry.normalizedTitle.includes(normalizedQuery)) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }

    return results;
  };

  const getBySlug = (slug: string) => directoryState.slugIndex.get(slug) || null;
  const getById = (id: string | number) => directoryState.idIndex.get(String(id)) || null;
  const getByTitle = (title: string) => directoryState.titleIndex.get(normalizeString(title)) || null;
  const getByCategory = (category: string) => {
    const normalized = normalizeCategory(category);
    return directoryState.listings.filter((listing) => listing.normalizedCategory === normalized);
  };

  return {
    ensureLoaded: ensureDirectoryLoaded,
    pending,
    error,
    listings,
    searchEntries,
    ready,
    matchSearch,
    getBySlug,
    getById,
    getByTitle,
    getByCategory,
  };
}

