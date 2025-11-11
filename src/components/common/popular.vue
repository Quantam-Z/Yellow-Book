<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { MapPin } from 'lucide-vue-next';
import StarRatingBox from '@/components/common/starRatingBox.vue';
import { useDirectoryListings } from '@/composables/useDirectoryListings';

type SortKey = 'rating' | 'title' | 'location';
type SortOrder = 'asc' | 'desc';

// --- Props ---
const props = withDefaults(
  defineProps<{
    limit?: number;
    sortBy?: SortKey;
    order?: SortOrder;
    heading?: string;
  }>(),
  {
    limit: 6,
    sortBy: 'rating',
    order: 'desc',
    heading: 'Popular listings',
  }
);

// --- Router ---
const router = useRouter();

// --- Directory Listings ---
const {
  ensureLoaded,
  pending: directoryPending,
  error: directoryError,
  listings: directoryListings,
} = useDirectoryListings();

await ensureLoaded();

const loading = computed(() => directoryPending.value);
const error = ref<string | null>(null);

// --- Utility Functions ---
function slugify(name: string): string {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const getStars = (rating: number) => Array(Math.max(0, Math.min(5, rating))).fill(0);

const goToAgency = (title: string, slug?: string, id?: number | string) => {
  const query: Record<string, string> = {};
  if (slug) query.slug = slug;
  else if (title) query.title = title;
  if (id != null) query.id = String(id);
  router.push({ path: '/agency', query });
};

watch(directoryError, (err) => {
  if (err) {
    console.error(err);
    error.value = err.message || 'Failed to load agencies';
  } else {
    error.value = null;
  }
});

// --- Computed: Map & Sort ---
const mappedAgencies = computed(() =>
  (directoryListings.value || []).map((listing: any) => ({
    id: listing.slug || String(listing.id ?? slugify(listing.title)),
    title: listing.title,
    description: listing.description,
    image: listing.image,
    rating: Math.max(0, Math.min(5, Number(listing.rating) || 0)),
    location: listing.location,
    slug: listing.slug,
  }))
);

const sortedLimitedAgencies = computed(() => {
  const raw = mappedAgencies.value.slice();
  const key = props.sortBy as SortKey;
  const order = props.order === 'asc' ? 1 : -1;

  raw.sort((a, b) => {
    const va = (a as Record<string, unknown>)[key];
    const vb = (b as Record<string, unknown>)[key];
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * order;
    const sa = String(va || '').toLowerCase();
    const sb = String(vb || '').toLowerCase();
    return sa.localeCompare(sb) * order;
  });

  return raw.slice(0, Math.max(1, Number(props.limit || 0)));
});
</script>


<template>
  <div class="w-full max-w-[1200px] mx-auto mt-16 px-5 flex flex-col items-center gap-10 text-center font-plus-jakarta-sans">
    <div class="text-3xl sm:text-4xl lg:text-[30px] font-semibold capitalize leading-[130%]">
      {{ props.heading }}
    </div>

    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(agency, index) in sortedLimitedAgencies"
        :key="agency.id"
        class="rounded-2xl overflow-hidden flex flex-col cursor-pointer bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl group"
        @click="goToAgency(agency.title, agency.slug, agency.id)"
      >
        <!-- Agency Image -->
        <img class="w-full h-[250px] sm:h-[280px] object-cover" :src="agency.image" :alt="agency.title" />

        <!-- Agency Info -->
        <div class="p-4 flex flex-col gap-4 text-left">
          <div class="text-xl font-semibold capitalize">{{ agency.title }}</div>
          <div class="text-sm text-gray-600">{{ agency.description }}</div>

          <!-- Rating -->
          <div class="flex items-center gap-2">
            <StarRatingBox
              :model-value="Number(agency.rating)"
              :readonly="true"
              class="star-rating-custom"
            />
          </div>

          <!-- Location -->
          <div class="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin class="w-4 h-4 text-blue-500" />
            <span class="capitalize font-medium">{{ agency.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Simple scaling to make StarRatingBox smaller but visible */
.star-rating-custom {
  transform: scale(0.8);
  transform-origin: left center;
}

/* Alternative: Use smaller size with proper visibility */
.star-rating-custom {
  font-size: 14px;
  line-height: 1;
}

/* Ensure the stars are visible */
.star-rating-custom :deep(*) {
  display: inline-block;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Make sure the container is properly sized */
.star-rating-custom :deep(.star-rating) {
  display: flex !important;
  gap: 2px !important;
  align-items: center !important;
}

/* Individual star styling */
.star-rating-custom :deep(.star) {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  display: inline-block !important;
  visibility: visible !important;
}
</style>