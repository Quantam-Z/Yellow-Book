<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MapPin, Search, Heart } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

import Pagination from '@/components/common/pagination.vue';
import RatingStars from '@/components/common/RatingStars.vue';
import { useDirectoryListings } from '@/composables/useDirectoryListings';
import type { DirectoryListing } from '@/types/directory';
import { useStubClient, useStubResource } from '~/services/stubClient';
import { useAuthStore } from '~/stores/auth';

type ListingCard = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  location: string;
  cover: string;
  rating: number;
  reviews: number;
  category: string;
  serviceType?: string;
  revenue?: string;
  price?: number;
  website?: string;
  emergencyService?: boolean;
};

const PAGE_SIZE = 6;
const SKELETON_CARD_COUNT = 6;

const router = useRouter();
const route = useRoute();
const searchTerm = ref('');

const getRoutePage = () => {
  const pageParam = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page;
  const parsed = Number(pageParam);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
};

const currentPage = ref(getRoutePage());

const { listings: directoryListings, ensureLoaded, pending, ready } = useDirectoryListings();
const stubClient = useStubClient();
const nuxtApp = useNuxtApp();
const { data: favoritesData, refresh: refreshFavorites } = await useStubResource('favorites');
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

await ensureLoaded();

const isLoading = computed(() => pending.value && !ready.value);

const normalizedListings = computed<ListingCard[]>(() => {
  const entries = directoryListings.value || [];
  return entries.map((entry: DirectoryListing) => {
    const title = entry.title || entry.name || 'Unnamed agency';
    const description =
      entry.description ||
      `Leading ${(entry.serviceType || 'professional').toLowerCase()} services trusted across ${
        entry.location || 'your area'
      }.`;
    const id = entry.id != null ? String(entry.id) : entry.slug || title;

    return {
      id,
      slug: entry.slug,
      title,
      description,
      location: entry.location || 'Inquire for location',
      cover: entry.image || '/logo/logo.png',
      rating: Number(entry.rating ?? 0),
      reviews: Number(entry.ratingCount ?? 0),
      category: entry.category || 'General Services',
      serviceType: entry.serviceType,
      revenue: entry.revenue,
      price: entry.price,
      website: entry.website,
      emergencyService: entry.emergencyService ?? false,
    };
  });
});

const favoriteKeyFor = (listing: ListingCard) => String(listing.slug || listing.id);

const favoriteLookup = computed(() => {
  const map = new Map<string, any>();
  const raw = Array.isArray(favoritesData.value) ? favoritesData.value : [];
  for (const entry of raw) {
    const key = entry?.slug || entry?.listingId || entry?.id;
    if (key) {
      map.set(String(key), entry);
    }
  }
  return map;
});

const filteredListings = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  if (!query) return normalizedListings.value;

  return normalizedListings.value.filter((listing) =>
    `${listing.title} ${listing.description} ${listing.location} ${listing.category} ${listing.serviceType ?? ''}`
      .toLowerCase()
      .includes(query),
  );
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredListings.value.length / PAGE_SIZE)));

const clampPage = (page: number) => {
  const total = totalPages.value || 1;
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(1, Math.floor(page)), total);
};

const syncPageQuery = (page: number) => {
  if (!import.meta.client) return;
  const normalized = clampPage(page);
  const routePage = getRoutePage();
  if (routePage === normalized) return;

  const nextQuery = { ...route.query } as Record<string, any>;
  if (normalized <= 1) {
    delete nextQuery.page;
  } else {
    nextQuery.page = String(normalized);
  }

  router.replace({
    path: route.path,
    query: nextQuery,
    hash: route.hash,
  });
};

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return filteredListings.value.slice(start, start + PAGE_SIZE);
});

const resultsMeta = computed(() => {
  const total = filteredListings.value.length;
  if (!total) return { start: 0, end: 0, total };
  const start = (currentPage.value - 1) * PAGE_SIZE + 1;
  const end = Math.min(start + PAGE_SIZE - 1, total);
  return { start, end, total };
});

const shouldShowPagination = computed(() => filteredListings.value.length > PAGE_SIZE);

const skeletonCards = Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => index);

const resetToFirstPage = () => {
  currentPage.value = 1;
};

watch(
  () => searchTerm.value,
  () => resetToFirstPage(),
);

watch(
  () => normalizedListings.value.length,
  () => resetToFirstPage(),
);

watch(totalPages, () => {
  const normalized = clampPage(currentPage.value);
  if (normalized !== currentPage.value) {
    currentPage.value = normalized;
  }
});

watch(
  () => route.query.page,
  () => {
    const routePage = clampPage(getRoutePage());
    if (routePage !== currentPage.value) {
      currentPage.value = routePage;
    }
  },
);

if (import.meta.client) {
  watch(
    () => currentPage.value,
    (page, previous) => {
      if (page === previous) return;
      syncPageQuery(page);
    },
  );
}

const onSearchSubmit = () => {
  resetToFirstPage();
};

const buildAgencyLink = (listing: ListingCard) => {
  const query: Record<string, string> = {};
  if (listing.slug) {
    query.slug = listing.slug;
  }
  if (listing.id) {
    query.id = listing.id;
  }
  if (!listing.slug && listing.title) {
    query.title = listing.title;
  }
  return { path: '/agency', query };
};

const handleNavigate = (listing: ListingCard) => {
  router.push(buildAgencyLink(listing));
};

const formatPrice = (value?: number) => {
  if (value == null) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value}`;
  }
};

const isListingFavorited = (listing: ListingCard) => favoriteLookup.value.has(favoriteKeyFor(listing));

const notify = (type: 'success' | 'alert', message: string) => {
  if (!import.meta.client) return;
  try {
    nuxtApp.$awn?.[type](message);
  } catch {}
};

const ensureLoggedIn = () => {
  if (isAuthenticated.value) return true;
  notify('alert', 'Please log in to save favourites.');
  return false;
};

const toggleFavorite = async (listing: ListingCard) => {
  if (!ensureLoggedIn()) return;
  const key = favoriteKeyFor(listing);
  const existing = favoriteLookup.value.get(key);
  try {
    if (existing) {
      await stubClient.remove('favorites', existing.id, { delay: 140 });
      await refreshFavorites();
      notify('success', 'Removed from favourites');
    } else {
      await stubClient.create(
        'favorites',
        {
          name: listing.title,
          slug: listing.slug,
          listingId: listing.id,
          category: listing.category,
          rating: listing.rating,
          savedAt: new Date().toISOString(),
          userId: authStore.user?.id ?? null,
        },
        { delay: 150 },
      );
      await refreshFavorites();
      notify('success', 'Saved to favourites');
    }
  } catch (error) {
    console.error('Failed to update favourites', error);
    notify('alert', 'Unable to update favourites right now.');
  }
};
</script>

<template>
  <section class="w-full bg-white px-4 py-10 font-plus-jakarta-sans text-gray-900 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <div
        class="relative overflow-hidden rounded-[32px] bg-white shadow-[0_35px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5"
        aria-hidden="true"
      >
        <img
          src="/logo/Cat.jpeg"
          alt="Trusted help banner"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <header class="text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-[#f59e0b]">Curated picks</p>
        <h1 class="mt-2 text-3xl font-bold text-[#212121] sm:text-[40px]">Popular List</h1>
        <p class="mx-auto mt-3 max-w-3xl text-base text-[#616161] sm:text-lg">
          Browse standout agencies and studios trusted by teams across Mongolia. Compare ratings, see what they
          specialise in, and reach out when you’re ready.
        </p>
      </header>

      <form
        class="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-3xl border border-[#ececec] bg-white px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:rounded-full sm:py-2"
        @submit.prevent="onSearchSubmit"
      >
        <label class="sr-only" for="popular-search">Search popular listings</label>
        <Search class="h-5 w-5 text-gray-400" aria-hidden="true" />
        <input
          id="popular-search"
          v-model="searchTerm"
          type="search"
          placeholder="Search by company, service, or city"
          class="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none sm:text-base"
          aria-label="Search popular listings"
        />
        <button
          type="submit"
          class="inline-flex h-12 w-full min-w-[120px] items-center justify-center rounded-full bg-[#212121] px-6 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fcd34d] sm:w-auto"
        >
          Search
        </button>
      </form>

      <div
        class="flex flex-col items-center gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between"
        aria-live="polite"
      >
        <span v-if="resultsMeta.total > 0">
          Showing {{ resultsMeta.start }}–{{ resultsMeta.end }} of {{ resultsMeta.total }} companies
        </span>
        <span v-else-if="isLoading">Loading curated listings…</span>
        <span v-else>No listings match your search yet. Try changing the keyword.</span>
        <span class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-400">
          <span class="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" aria-hidden="true" />
          Updated daily
        </span>
      </div>

      <div v-if="isLoading" class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="index in skeletonCards"
          :key="index"
          class="flex animate-pulse flex-col overflow-hidden rounded-3xl border border-[#f0f0f0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
        >
          <div class="h-56 w-full bg-gray-200" />
          <div class="flex flex-col gap-4 p-6">
            <div class="h-6 w-3/4 rounded-full bg-gray-200" />
            <div class="h-4 w-full rounded-full bg-gray-100" />
            <div class="h-4 w-1/2 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      <template v-else>
        <div v-if="paginatedListings.length" class="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="listing in paginatedListings"
            :key="listing.id"
            class="group flex flex-col overflow-hidden rounded-3xl border border-[#f0f0f0] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_70px_rgba(15,23,42,0.12)] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#fcd34d]"
            role="button"
            tabindex="0"
            :aria-label="`View details for ${listing.title}`"
            @click="handleNavigate(listing)"
            @keyup.enter.prevent="handleNavigate(listing)"
            @keyup.space.prevent="handleNavigate(listing)"
          >
            <div class="relative h-56 w-full overflow-hidden">
              <img
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                :src="listing.cover"
                :alt="listing.title"
                loading="lazy"
              />
              <span
                class="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#212121]"
              >
                {{ listing.category }}
              </span>
              <span
                v-if="listing.emergencyService"
                class="absolute right-5 top-5 rounded-full bg-[#fff3cd] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#a16207]"
              >
                24/7
              </span>
              <button
                type="button"
                class="absolute bottom-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md transition hover:scale-105"
                :class="isListingFavorited(listing) ? 'text-red-500' : 'text-gray-500'"
                :aria-pressed="isListingFavorited(listing)"
                aria-label="Toggle favourite"
                @click.stop="toggleFavorite(listing)"
              >
                <Heart
                  class="h-4 w-4"
                  :class="isListingFavorited(listing) ? 'fill-red-500 text-red-500' : 'text-gray-500'"
                />
              </button>
            </div>

            <div class="flex flex-1 flex-col gap-4 p-6 text-left">
              <div class="space-y-2">
                <h3 class="text-xl font-semibold text-[#212121]">
                  {{ listing.title }}
                </h3>
                <p class="text-sm leading-relaxed text-gray-600">
                  {{ listing.description }}
                </p>
              </div>

              <div class="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <span v-if="listing.serviceType" class="rounded-full bg-[#fff9e6] px-3 py-1 text-[#ad6800]">
                  {{ listing.serviceType }}
                </span>
                <span v-if="listing.revenue" class="rounded-full bg-[#f3f4f6] px-3 py-1 text-gray-600">
                  {{ listing.revenue }}
                </span>
                <span v-if="listing.price" class="rounded-full bg-[#f3f4f6] px-3 py-1 text-gray-600">
                  {{ formatPrice(listing.price) }} avg
                </span>
              </div>

              <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
                <RatingStars
                  :rating="listing.rating"
                  :count="listing.reviews"
                  :show-count="true"
                  :show-value="true"
                  size="sm"
                  color="#fbbf24"
                  empty-color="#f1f5f9"
                  aria-label="Company rating"
                />
                <div class="inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                  <MapPin class="h-4 w-4 text-[#f97316]" aria-hidden="true" />
                  <span class="capitalize">{{ listing.location }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div
          v-else
          class="flex w-full max-w-3xl flex-col items-center gap-4 rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center"
        >
          <h3 class="text-xl font-semibold text-gray-900">We couldn’t find anything</h3>
          <p class="text-sm text-gray-500">
            Try adjusting your search keywords or explore another service category to discover more agencies.
          </p>
        </div>
      </template>

      <Pagination
        v-if="shouldShowPagination && !isLoading && filteredListings.length"
        v-model="currentPage"
        :total-pages="totalPages"
        :max-visible="5"
        class="mt-2 w-full justify-center"
      />
    </div>
  </section>
</template>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

article:focus-visible {
  outline: none;
}
</style>
