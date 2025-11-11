import categoriesData from '@/data/categories.json';
import listingsData from '@/data/listings.json';

export const categoryService = {
  getCategories() {
    const categories = categoriesData?.categories ?? [];
    return categories.map((category) => this.formatCategory(category)).filter(Boolean);
  },

  getListings() {
    return listingsData?.listings || [];
  },

  getListingByName(name) {
    if (!name) return null;
    const normalizedTarget = this.normalizeIdentifier(name);
    return this.getListings().find((listing) => this.normalizeIdentifier(listing.name) === normalizedTarget) || null;
  },

  getListingById(id) {
    if (id == null) return null;
    return this.getListings().find((listing) => String(listing.id) === String(id)) || null;
  },

  getListingBySlug(slug) {
    if (!slug) return null;
    const normalizedTarget = String(slug).toLowerCase();
    return this.getListings().find((listing) => this.slugifyName(listing.name) === normalizedTarget) || null;
  },

  getCategoryByName(identifier) {
    if (!identifier) {
      return this.getDefaultCategory();
    }
    const normalized = this.normalizeIdentifier(identifier);
    const categories = this.getCategories();

    const foundCategory =
      categories.find((category) => this.getCategoryIdentifiers(category).some((value) => value === normalized)) ??
      null;

    return foundCategory || this.getDefaultCategory();
  },

  getCategoryBySlug(slug) {
    return this.getCategoryByName(slug);
  },

  getListingsByCategory(identifier) {
    if (!identifier) return this.getListings();
    const normalized = this.normalizeIdentifier(identifier);
    return this.getListings().filter((listing) => this.normalizeIdentifier(listing.category) === normalized);
  },

  slugifyName(name) {
    if (!name) return '';
    return String(name)
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  normalizeIdentifier(value) {
    if (!value) return '';
    return String(value).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  },

  normalizeName(name) {
    return this.normalizeIdentifier(name);
  },

  normalizeCategoryName(name) {
    return this.normalizeIdentifier(name);
  },

  getCategoryIdentifiers(category) {
    const raw = [
      category?.id,
      category?.slug,
      category?.name,
      category?.meta?.slugAlias,
      category?.meta?.shortcode,
    ];
    return raw.map((value) => this.normalizeIdentifier(value)).filter(Boolean);
  },

  formatCategory(category) {
    if (!category || typeof category !== 'object') {
      return null;
    }

    const fallbackName = category?.name || 'General Services';
    const slug = category?.slug || this.slugifyName(fallbackName);
    const id = category?.id || this.normalizeIdentifier(slug) || this.normalizeIdentifier(fallbackName);

    const filters = category?.filters || {};
    const priceRange = this.normalizePriceRange(filters?.priceRange);

    return {
      ...category,
      id: id || 'general-services',
      slug,
      filters: {
        ...filters,
        priceRange,
      },
      meta: {
        lastUpdated: category?.meta?.lastUpdated || new Date().toISOString().slice(0, 10),
        ctaLabel: category?.meta?.ctaLabel || 'Explore services',
        ctaHref: category?.meta?.ctaHref || `/catagory?name=${encodeURIComponent(fallbackName)}`,
        slugAlias: category?.meta?.slugAlias,
        shortcode: category?.meta?.shortcode,
      },
    };
  },

  normalizePriceRange(range) {
    if (!range || typeof range !== 'object') {
      return undefined;
    }

    const min = this.toNumber(range.min, 10);
    const max = this.toNumber(range.max, Math.max(min + 1, 500));
    const step = this.toNumber(range.step, 5);
    const defaultValue = this.toNumber(range.default, max);
    const boundedDefault = this.clamp(defaultValue, min, max);

    return {
      label: range.label || 'Price range',
      min,
      max,
      step: step > 0 ? step : 1,
      default: boundedDefault,
      currency: String(range.currency || 'USD').toUpperCase(),
    };
  },

  toNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  },

  clamp(value, min, max) {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
  },

  getDefaultCategory() {
    return this.formatCategory({
      id: 'general-services',
      name: 'General Services',
      slug: 'general-services',
      tagline: 'Trusted support across everyday needs',
      description: 'Browse curated professionals delivering reliable services for households and businesses alike.',
      icon: 'DefaultIcon',
      color: 'text-gray-500',
      heroImage: '/logo/logo.png',
      quickStats: {
        totalListings: 0,
        averageRating: 0,
        verifiedPercent: 0,
      },
      topServices: [{ label: 'General Service', value: 'General Service' }],
      insights: ['Stay tuned as we expand this category with fresh, verified providers.'],
      filters: {
        serviceTypes: {
          label: 'Service Types',
          options: ['General Service'],
        },
        specializations: {
          label: 'Specializations',
          options: ['General Specialist'],
        },
        priceRange: {
          label: 'Typical range',
          min: 10,
          max: 500,
          step: 10,
          default: 250,
          currency: 'USD',
        },
        emergencyService: true,
      },
      meta: {
        ctaLabel: 'Browse services',
        ctaHref: '/catagory',
      },
    });
  },
};