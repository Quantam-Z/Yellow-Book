<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { MapPin, Search } from 'lucide-vue-next';

import Pagination from '@/components/common/pagination.vue';
import RatingStars from '@/components/common/RatingStars.vue';

type Listing = {
  id: number;
  title: string;
  description: string;
  location: string;
  cover: string;
  rating: number;
  reviews: number;
  category: string;
};

const PAGE_SIZE = 6;

const listings = ref<Listing[]>([
  {
    id: 1,
    title: 'Revolutionizing Technology',
    description: 'Innovative technology solutions for modern businesses.',
    location: 'Ulaanbaatar, Mongolia',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 134,
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Skyline Architects',
    description: 'Human-centered architecture reshaping city skylines.',
    location: 'Singapore, Singapore',
    cover: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviews: 98,
    category: 'Architecture',
  },
  {
    id: 3,
    title: 'EcoRide Mobility',
    description: 'Connected mobility solutions built for smart cities.',
    location: 'Helsinki, Finland',
    cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviews: 121,
    category: 'Transportation',
  },
  {
    id: 4,
    title: 'Nordic Hospitality',
    description: 'Modern boutique stays with Nordic-inspired wellness.',
    location: 'Reykjavík, Iceland',
    cover: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviews: 76,
    category: 'Hospitality',
  },
  {
    id: 5,
    title: 'Blue Horizon Travel',
    description: 'Curated adventures for the modern explorer.',
    location: 'Cape Town, South Africa',
    cover: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviews: 210,
    category: 'Travel',
  },
  {
    id: 6,
    title: 'Greens & Grains',
    description: 'Plant-forward dining inspired by seasonal harvests.',
    location: 'Portland, USA',
    cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviews: 189,
    category: 'Food & Beverage',
  },
  {
    id: 7,
    title: 'Atlas Legal Studio',
    description: 'Independent legal studio for high-growth companies.',
    location: 'Berlin, Germany',
    cover: 'https://images.unsplash.com/photo-1488980244383-148acd9f3945?auto=format&fit=crop&w=1200&q=80',
    rating: 4.3,
    reviews: 65,
    category: 'Professional Services',
  },
  {
    id: 8,
    title: 'Pulse Health Labs',
    description: 'Diagnostics powered by AI-driven health insights.',
    location: 'Seoul, South Korea',
    cover: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviews: 158,
    category: 'Healthcare',
  },
  {
    id: 9,
    title: 'Waveform Studios',
    description: 'Immersive audio experiences for streaming platforms.',
    location: 'Toronto, Canada',
    cover: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1200&q=80',
    rating: 4.2,
    reviews: 142,
    category: 'Media',
  },
]);

const searchTerm = ref('');
const currentPage = ref(1);

const filteredListings = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  if (!query) return listings.value;
  return listings.value.filter((listing) =>
    `${listing.title} ${listing.description} ${listing.location} ${listing.category}`
      .toLowerCase()
      .includes(query)
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

watch(
  () => searchTerm.value,
  () => {
    currentPage.value = 1;
  }
);

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal);
  }
});

const onSearchSubmit = () => {
  currentPage.value = 1;
};
</script>

<template>
  <section
    class="w-full relative flex flex-col items-center gap-10 text-gray-900 font-plus-jakarta-sans px-4 py-16 sm:py-20 lg:py-24"
  >
    <div class="w-full max-w-3xl text-center flex flex-col items-center gap-4">
      <p class="text-xs tracking-[0.3em] uppercase text-[#9e9e9e]">Discover top-rated partners</p>
      <h2 class="text-[32px] sm:text-[40px] lg:text-[48px] leading-tight font-semibold capitalize text-gray-900">
        Popular list
      </h2>
      <p class="text-base sm:text-lg text-gray-500 max-w-2xl">
        Explore high-performing companies across industries. Filter by category, city, or service to find the right fit
        for your next project.
      </p>
    </div>

    <form
      class="w-full max-w-4xl flex flex-col gap-4 sm:flex-row sm:items-center"
      @submit.prevent="onSearchSubmit"
    >
      <label
        class="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#e5b106] focus-within:ring-2 focus-within:ring-[#fbd551] transition duration-200"
      >
        <Search class="w-5 h-5 text-gray-400" aria-hidden="true" />
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search company, service, or city"
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

    <div class="w-full max-w-5xl text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <span v-if="resultsMeta.total > 0">
        Showing {{ resultsMeta.start }}–{{ resultsMeta.end }} of {{ resultsMeta.total }} curated listings
      </span>
      <span v-else>No listings match your search yet. Try a different keyword.</span>
      <span class="text-xs uppercase tracking-[0.3em] text-gray-400">Updated daily</span>
    </div>

    <div class="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      <article
        v-for="listing in paginatedListings"
        :key="listing.id"
        class="rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-xl shadow-black/5 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition duration-300"
      >
        <div class="relative w-full h-64 sm:h-72">
          <img
            class="absolute inset-0 w-full h-full object-cover"
            :src="listing.cover"
            :alt="listing.title"
            loading="lazy"
          />
          <span
            class="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-800"
          >
            {{ listing.category }}
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

    <Pagination
      v-if="shouldShowPagination"
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

@media (max-width: 640px) {
  section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
