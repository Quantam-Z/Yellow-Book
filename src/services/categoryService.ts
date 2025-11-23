import { shallowRef } from 'vue';
import categoriesData from '~~/public/stubs/categories.json';
import listingsData from '~~/public/stubs/listings.json';
import { useStubClient } from '@/services/stubClient';
import type {
  CategoryDefinition,
  DirectoryListing,
  ListingDefinition,
} from '@/types/directory';

type CategoriesPayload = {
  categories?: CategoryDefinition[];
};

type ListingsPayload = {
  listings?: ListingDefinition[];
};

type HydrationOptions = {
  force?: boolean;
};

const stubClient = useStubClient();

const categoriesState = shallowRef<CategoryDefinition[]>(
  ((categoriesData as CategoriesPayload).categories ?? []).map((entry) => ({ ...entry })),
);

const listingsState = shallowRef<ListingDefinition[]>(
  ((listingsData as ListingsPayload).listings ?? []).map((entry) => ({ ...entry })),
);

let hydrationPromise: Promise<void> | null = null;
let hydratedFromRemote = false;

const setCategories = (categories: CategoryDefinition[] = []) => {
  categoriesState.value = categories.map((entry) => ({ ...entry }));
};

const setListings = (listings: ListingDefinition[] = []) => {
  listingsState.value = listings.map((entry) => ({ ...entry }));
};

const fetchDirectoryPayload = async <TPayload extends CategoriesPayload | ListingsPayload>(
  resource: 'directoryCategories' | 'directoryListings',
): Promise<TPayload | null> => {
  const response = await stubClient
    .request({
      resource,
      method: 'GET',
    })
    .catch((error) => {
      if (import.meta.dev) {
        console.error(`[categoryService] Failed to request ${resource}`, error);
      }
      throw error;
    });

  return (response?.data as TPayload) ?? null;
};

const hydrateDirectoryData = async () => {
  const [categoriesPayload, listingsPayload] = await Promise.all([
    fetchDirectoryPayload<CategoriesPayload>('directoryCategories'),
    fetchDirectoryPayload<ListingsPayload>('directoryListings'),
  ]);

  if (Array.isArray(categoriesPayload?.categories)) {
    setCategories(categoriesPayload.categories);
  }

  if (Array.isArray(listingsPayload?.listings)) {
    setListings(listingsPayload.listings);
  }
};

const ensureDirectoryHydrated = async (options: HydrationOptions = {}) => {
  if (hydratedFromRemote && !options.force) {
    return;
  }

  if (hydrationPromise) {
    return hydrationPromise;
  }

  hydrationPromise = (async () => {
    try {
      await hydrateDirectoryData();
      hydratedFromRemote = true;
    } catch (error) {
      if (import.meta.dev) {
        console.error('[categoryService] Unable to hydrate directory data from stubs', error);
      }
      throw error;
    } finally {
      hydrationPromise = null;
    }
  })();

  return hydrationPromise;
};

const DEFAULT_CATEGORY: CategoryDefinition = {
  name: 'General Services',
  icon: 'DefaultIcon',
  color: 'text-gray-500',
  filters: {
    serviceTypes: {
      label: 'Service Types',
      options: ['General Service'],
    },
    specializations: {
      label: 'Specializations',
      options: ['General Specialist'],
    },
    emergencyService: true,
  },
};

const DEFAULT_IMAGE_MAP: Record<string, string> = {
  animalsandpets: '/logo/p1.png',
  beautywellbeings: '/logo/p2.png',
  foodbeverage: '/logo/p3.png',
  tourismhospitality: '/logo/image6.png',
  itsoftware: '/logo/image7.png',
};

const normalizeName = (name?: string) =>
  String(name ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();

const slugifyName = (name?: string) =>
  String(name ?? '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeCategoryName = (name?: string) =>
  String(name ?? '')
    .toLowerCase()
    .replace(/[&\s+]/g, '')
    .trim();

const getDefaultListingImage = (category?: string) => {
  const key = normalizeCategoryName(category);
  return DEFAULT_IMAGE_MAP[key] || '/logo/logo.png';
};

const buildListingDescription = (listing: ListingDefinition) => {
  const service = listing.serviceType || 'services';
  const location = listing.location || 'your area';
  return `Leading ${service.toLowerCase()} specialist serving ${location}.`;
};

const enrichListing = (listing: ListingDefinition): DirectoryListing => {
  const name = listing.name || '';
  return {
    ...listing,
    slug: slugifyName(name),
    title: name,
    description: listing.description || buildListingDescription(listing),
    image: listing.image || getDefaultListingImage(listing.category),
    normalizedTitle: normalizeName(name),
    normalizedCategory: normalizeCategoryName(listing.category),
  };
};

export const categoryService = {
  async ensureHydrated(options?: HydrationOptions) {
    return ensureDirectoryHydrated(options);
  },

  getCategories(): CategoryDefinition[] {
    return categoriesState.value;
  },

  getListings(): ListingDefinition[] {
    return listingsState.value;
  },

  getEnrichedListings(): DirectoryListing[] {
    return this.getListings().map(enrichListing);
  },

  getListingSearchOptions() {
    return this.getEnrichedListings().map((entry) => ({
      title: entry.title,
      slug: entry.slug,
    }));
  },

  getListingByName(name?: string) {
    if (!name) return null;
    const normalizedTarget = normalizeName(name);
    return this.getListings().find((listing) => normalizeName(listing.name) === normalizedTarget) || null;
  },

  getListingById(id?: string | number) {
    if (id == null) return null;
    return this.getListings().find((listing) => String(listing.id) === String(id)) || null;
  },

  getListingBySlug(slug?: string) {
    if (!slug) return null;
    const normalizedTarget = String(slug).toLowerCase();
    return this.getListings().find((listing) => slugifyName(listing.name) === normalizedTarget) || null;
  },

  getCategoryByName(name?: string): CategoryDefinition {
    const categories = this.getCategories();
    const normalizedName = normalizeCategoryName(name);

    const foundCategory =
      categories.find((cat) => normalizeCategoryName(cat.name) === normalizedName) ?? DEFAULT_CATEGORY;

    return foundCategory;
  },

  getListingsByCategory(categoryName?: string): ListingDefinition[] {
    const listings = this.getListings();
    const normalizedCategoryName = normalizeCategoryName(categoryName);

    return listings.filter(
      (listing) => normalizeCategoryName(listing.category) === normalizedCategoryName,
    );
  },

  slugifyName,
  normalizeName,
  normalizeCategoryName,
  getDefaultListingImage,
  buildListingDescription,
  getDefaultCategory(): CategoryDefinition {
    return DEFAULT_CATEGORY;
  },
};

export type CategoryService = typeof categoryService;
