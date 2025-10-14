<script setup lang="ts">
import { Star, MapPin } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { categoryService } from '@/services/categoryService';

const router = useRouter();

// Source from listings.json
const listings = categoryService.getListings();

// Map to Popular card model (fallbacks for images)
const agencies = computed(() =>
  listings.slice(0, 6).map((l) => ({
    title: l.name,
    description: `${l.serviceType} • ${l.category}`,
    image: '/logo/p1.png',
    rating: Math.round(l.rating || 0),
    location: l.location,
    slug: categoryService.slugifyName(l.name),
  }))
);

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
        @click="goToAgency(agency.title, agency.slug)"
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
