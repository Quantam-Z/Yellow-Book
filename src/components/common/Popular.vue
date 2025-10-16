<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

type StubAgency = {
  title: string;
  description: string;
  image: string;
  rating: number;
  location: string;
};

type SortKey = 'rating' | 'title' | 'location';
type SortOrder = 'asc' | 'desc';

const props = withDefaults(defineProps<{
  limit?: number;
  sortBy?: SortKey;
  order?: SortOrder;
  heading?: string;
}>(), {
  limit: 6,
  sortBy: 'rating',
  order: 'desc',
  heading: 'Agencies',
});

function slugify(name: string): string {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load agencies from stubs (served from public directory)
const { data: agenciesData } = await useFetch<StubAgency[]>('stubs/agencies.json');

const mappedAgencies = computed(() =>
  Array.isArray(agenciesData.value)
    ? (agenciesData.value as StubAgency[]).map((a) => ({
        id: slugify(a.title),
        title: a.title,
        description: a.description,
        image: a.image,
        rating: Math.max(0, Math.min(5, Number(a.rating) || 0)),
        location: a.location,
        slug: slugify(a.title),
      }))
    : []
);

const sortedLimitedAgencies = computed(() => {
  const raw = mappedAgencies.value.slice();
  const key = props.sortBy as SortKey;
  const order = props.order === 'asc' ? 1 : -1;
  raw.sort((a, b) => {
    const va = (a as Record<string, unknown>)[key];
    const vb = (b as Record<string, unknown>)[key];
    if (typeof va === 'number' && typeof vb === 'number') {
      return (va - vb) * order;
    }
    const sa = String(va || '').toLowerCase();
    const sb = String(vb || '').toLowerCase();
    return sa.localeCompare(sb) * order;
  });
  return raw.slice(0, Math.max(1, Number(props.limit || 0)));
});

const getStars = (rating: number) => Array(Math.max(0, Math.min(5, rating))).fill(0);

// Prefer slug; fall back to title for compatibility
const goToAgency = (title: string, slug?: string, id?: number | string) => {
  const query: Record<string, string> = {};
  if (slug) query.slug = slug;
  else if (title) query.title = title;
  if (id != null) query.id = String(id);
  router.push({ path: '/agency', query });
};
</script>

<template>
  <div class="w-full max-w-[1200px] mx-auto mt-16 px-5 flex flex-col items-center gap-10 text-center font-plus-jakarta-sans">
    <div class="text-3xl sm:text-4xl lg:text-[36px] font-semibold capitalize leading-[130%]">
      {{ props.heading }}
    </div>

    <div class="w-full flex flex-wrap justify-center items-stretch gap-6">
      <div
        v-for="(agency, index) in sortedLimitedAgencies"
        :key="index"
        class="flex-1 basis-[300px] max-w-full sm:max-w-[384px] rounded-xl overflow-hidden flex flex-col cursor-pointer bg-white shadow-md transition-transform duration-200 hover:-translate-y-2"
        @click="goToAgency(agency.title, agency.slug, agency.id)"
      >
        <!-- Agency Image -->
        <img class="w-full h-[250px] sm:h-[280px] object-cover" :src="agency.image" :alt="agency.title" />

        <!-- Agency Info -->
        <div class="p-4 flex flex-col gap-4 text-left">
          <div class="text-xl font-semibold capitalize">{{ agency.title }}</div>
          <div class="text-sm text-gray-600">{{ agency.description }}</div>

          <!-- Rating -->
          <div class="flex items-center gap-1">
            <Star v-for="i in getStars(agency.rating).length" :key="i" class="w-5 h-5 text-yellow-400 fill-yellow-400" />
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
</style>
