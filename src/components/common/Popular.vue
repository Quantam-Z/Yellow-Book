<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

type StubCompany = {
  id: number | string;
  name: string;
  website?: string;
  mobile?: string;
  category?: string;
  status?: string;
  verified?: boolean;
};

function slugify(name: string): string {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Load agencies from stubs (not categories/listings)
const { data: companiesData } = useFetch<StubCompany[]>('/stubs/companies.json', {
  default: () => [] as StubCompany[],
});

const companies = computed<StubCompany[]>(() =>
  Array.isArray(companiesData.value) ? (companiesData.value as StubCompany[]) : []
);

// Fallback list when fetch is empty or fails
const fallbackCompanies: StubCompany[] = [
  { id: 'fallback-1', name: 'ABC Company', website: 'www.yourwebsite.com', verified: false },
  { id: 'fallback-2', name: 'XYZ Corporation', website: 'www.xyzcorp.com', verified: false },
  { id: 'fallback-3', name: 'Tech Solutions Ltd', website: 'www.techsolutions.com', verified: true },
];

// Map to Popular card model (hide category info) - limit to 3
const agencies = computed(() => {
  const source = companies.value && companies.value.length > 0
    ? companies.value.slice(0, 3)
    : fallbackCompanies;

  return source.map((c, idx) => ({
    id: c.id,
    title: c.name,
    description: c.website || (c.verified ? 'Verified' : 'Unverified'),
    image: ['/logo/p1.png', '/logo/p2.png', '/logo/p3.png'][idx % 3],
    rating: 0,
    location: '',
    slug: slugify(c.name),
  }));
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
      Agencies
    </div>

    <div class="w-full flex flex-wrap justify-center items-stretch gap-6">
      <div
        v-for="(agency, index) in agencies"
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
