<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { MapPin, Search } from 'lucide-vue-next';

import Pagination from '@/components/common/pagination.vue';
import RatingStars from '@/components/common/RatingStars.vue';
import { useDirectoryListings } from '@/composables/useDirectoryListings';
import type { DirectoryListing } from '@/types/directory';

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
const searchTerm = ref('');
const currentPage = ref(1);

const { listings: directoryListings, ensureLoaded, pending, ready } = useDirectoryListings();

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

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal);
  }
});

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
</script>

<template>
    <section
      class="w-full relative flex flex-col items-center gap-10 text-gray-900 font-plus-jakarta-sans px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 bg-[#fffdf5]"
    >
    <form
      class="w-full max-w-5xl grid gap-3 sm:grid-cols-[1fr_auto]"
      @submit.prevent="onSearchSubmit"
    >
      <label
        class="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#e5b106] focus-within:ring-2 focus-within:ring-[#fbd551] transition duration-200"
      >
        <Search class="w-5 h-5 text-gray-400" aria-hidden="true" />
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search by name, service, or city"
          class="flex-1 bg-transparent text-sm sm:text-base text-gray-700 placeholder:text-gray-400 focus:outline-none"
          aria-label="Search popular listings"
        />
      </label>
      <button
        type="submit"
        class="inline-flex items-center justify-center rounded-2xl bg-[#212121] px-6 py-3 text-white text-sm sm:text-base font-medium shadow-lg shadow-[#212121]/20 hover:bg-[#000] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#212121] transition duration-200"
      >
        Search
      </button>
    </form>

    <div
      class="w-full max-w-5xl text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      aria-live="polite"
    >
      <span v-if="resultsMeta.total > 0">
        Showing {{ resultsMeta.start }}–{{ resultsMeta.end }} of {{ resultsMeta.total }} curated listings
      </span>
      <span v-else-if="isLoading">Loading curated listings…</span>
      <span v-else>No listings match your search yet. Try a different keyword.</span>
      <span class="text-xs uppercase tracking-[0.3em] text-gray-400">Updated daily</span>
    </div>

    <div
      v-if="isLoading"
      class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      <div
        v-for="index in skeletonCards"
        :key="index"
        class="rounded-[32px] bg-white border border-gray-100 shadow-xl shadow-black/5 flex flex-col animate-pulse overflow-hidden"
      >
        <div class="w-full h-64 sm:h-72 bg-gray-200" />
        <div class="flex flex-col gap-4 p-6">
          <div class="h-6 w-3/4 bg-gray-200 rounded-full" />
          <div class="h-14 w-full bg-gray-100 rounded-2xl" />
          <div class="h-5 w-1/2 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>

    <template v-else>
      <div
        v-if="paginatedListings.length"
        class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
      >
        <article
          v-for="listing in paginatedListings"
          :key="listing.id"
          class="group rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-xl shadow-black/5 flex flex-col transition duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#fbd551]"
          role="button"
          tabindex="0"
          :aria-label="`View details for ${listing.title}`"
          @click="handleNavigate(listing)"
          @keyup.enter.prevent="handleNavigate(listing)"
          @keyup.space.prevent="handleNavigate(listing)"
        >
          <div class="relative w-full h-64 sm:h-72 overflow-hidden">
            <img
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              :src="listing.cover"
              :alt="listing.title"
              loading="lazy"
            />
            <span
              class="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-800"
            >
              {{ listing.category }}
            </span>
            <span
              v-if="listing.emergencyService"
              class="absolute top-4 right-4 rounded-full bg-[#fff3d3] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#a16207]"
            >
              24/7
            </span>
          </div>

          <div class="flex flex-col gap-5 p-6 text-left">
            <div class="flex flex-col gap-3">
              <h3 class="text-xl font-semibold leading-snug capitalize text-[#212121]">
                {{ listing.title }}
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ listing.description }}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
              <span
                v-if="listing.serviceType"
                class="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 border border-gray-200"
              >
                {{ listing.serviceType }}
              </span>
              <span
                v-if="listing.revenue"
                class="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 border border-gray-200"
              >
                {{ listing.revenue }}
              </span>
              <span
                v-if="listing.price"
                class="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 border border-gray-200"
              >
                {{ formatPrice(listing.price) }} avg
              </span>
            </div>

            <div class="flex items-center justify-between flex-wrap gap-4">
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
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <MapPin class="w-4 h-4 text-[#f97316]" aria-hidden="true" />
                <span class="font-medium capitalize">{{ listing.location }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="w-full max-w-3xl text-center bg-white border border-dashed border-gray-200 rounded-3xl p-10 flex flex-col gap-4"
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
      :max-visible="4"
      class="w-full flex justify-center pt-4"
    />
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
