<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Star, MapPin } from 'lucide-vue-next';

// --- Types ---
type StubAgency = {
  title: string;
  description: string;
  image: string;
  rating: number;
  location: string;
};

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

// --- Reactive States ---
const agenciesData = ref<StubAgency[]>([]);
const loading = ref(true);
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

// --- Client-Side Fetch ---
onMounted(async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch('/stubs/agencies.json');
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    const data: StubAgency[] = await res.json();
    agenciesData.value = data;
  } catch (err: any) {
    console.error(err);
    error.value = err.message || 'Failed to load agencies';
  } finally {
    loading.value = false;
  }
});

// --- Computed: Map & Sort ---
const mappedAgencies = computed(() =>
  agenciesData.value.map(a => ({
    id: slugify(a.title),
    title: a.title,
    description: a.description,
    image: a.image,
    rating: Math.max(0, Math.min(5, Number(a.rating) || 0)),
    location: a.location,
    slug: slugify(a.title),
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
  <div class="w-full max-w-[1400px] mx-auto mt-20 px-5 flex flex-col items-center gap-16 text-center font-plus-jakarta-sans">
    <div class="text-4xl sm:text-5xl lg:text-6xl font-bold capitalize leading-[120%] bg-gradient-to-r from-[#212121] to-[#616161] bg-clip-text text-transparent">
      {{ props.heading }}
    </div>

    <div class="w-full flex flex-wrap justify-center items-stretch gap-8">
      <div
        v-for="(agency, index) in sortedLimitedAgencies"
        :key="agency.id"
        class="flex-1 basis-[320px] max-w-full sm:max-w-[420px] rounded-2xl overflow-hidden flex flex-col cursor-pointer bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl group"
        @click="goToAgency(agency.title, agency.slug, agency.id)"
      >
        <!-- Agency Image -->
        <div class="relative overflow-hidden">
          <img class="w-full h-[280px] sm:h-[320px] object-cover group-hover:scale-110 transition-transform duration-500" :src="agency.image" :alt="agency.title" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Agency Info -->
        <div class="p-6 flex flex-col gap-5 text-left bg-gradient-to-br from-white to-[#fafafa] group-hover:from-[#fff9e6] group-hover:to-[#feecb2] transition-all duration-300">
          <div class="text-2xl font-bold capitalize text-[#212121] group-hover:text-[#fcc207] transition-colors duration-300">{{ agency.title }}</div>
          <div class="text-base text-gray-600 leading-relaxed">{{ agency.description }}</div>

          <!-- Rating -->
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <Star v-for="i in getStars(agency.rating).length" :key="i" class="w-6 h-6 text-[#fcc207] fill-[#fcc207]" />
            </div>
            <span class="text-lg font-semibold text-[#212121]">{{ agency.rating }}/5</span>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-3 text-gray-600 text-base">
            <MapPin class="w-5 h-5 text-[#fcc207]" />
            <span class="capitalize font-semibold">{{ agency.location }}</span>
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
