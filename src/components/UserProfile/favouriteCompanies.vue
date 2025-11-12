<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-6">
    <div
      class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between"
    >
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
        My Favorite Company
      </h1>
      <button
        type="button"
        class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded shadow border-0 outline-none focus:outline-none focus:ring-0"
      >
        List Your Company
      </button>
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Favorite List</h2>

      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full relative rounded-lg border-whitesmoke border-solid border-[1px] box-border text-left text-num-16 text-gray font-plus-jakarta-sans
               hover:bg-gray-50 transition-colors"
        
        :class="[
          // MOBILE VIEW (Default): Vertical flex column, items-start
          'flex flex-col items-start pt-4 px-4 pb-4 gap-4',
          // DESKTOP VIEW (sm:): Reverting to original layout classes
          'sm:flex-col sm:items-end sm:justify-end sm:pt-6 sm:px-4 sm:pb-4 sm:gap-4' 
        ]"
        tabindex="0"
      >
        
        <div class="block sm:hidden absolute top-4 right-4 z-10">
             <div @click.stop.prevent="removeFavorite(item.id, item.name)" class="p-1 rounded-full hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Remove favorite">
            <Heart class="w-6 h-6 text-red-500 cursor-pointer" />
          </div>
        </div>


        <div class="self-stretch flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-5">
          
          <div class="flex items-start gap-4 flex-grow">
            <div class="h-10 w-10 relative rounded bg-gainsboro-200 flex items-center justify-center shrink-0">
              <Building2 class="h-5 w-5 text-gray-500" />
            </div>

            <div class="flex flex-col items-start gap-1 flex-grow min-w-0">
              <b class="relative leading-[130%] capitalize text-base sm:text-lg truncate">
                {{ item.name }}
              </b>
              
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-dimgray text-sm sm:text-base min-w-0">
                
                <div class="relative leading-[130%] capitalize whitespace-nowrap">
                  {{ item.category }}
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                  <div class="hidden sm:block h-1.5 w-1.5 relative rounded-[50%] bg-gainsboro-100 shrink-0" />
                  <div class="relative leading-[130%] capitalize whitespace-nowrap">
                    Assigned: {{ item.assigned }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            class="flex items-center gap-2 text-dimgray text-sm sm:text-base shrink-0 self-start sm:self-auto"
            :class="{ 'mt-2': !isMobile }"
            >
            <div class="relative leading-[130%] capitalize whitespace-nowrap hidden sm:block">Rating:</div>
            <Star class="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            <div class="relative leading-[130%] capitalize whitespace-nowrap">
              {{ item.rating }} Star
            </div>
          </div>
        </div>

          <div class="hidden sm:flex items-center">
              <div @click.stop.prevent="removeFavorite(item.id, item.name)" class="p-2 rounded-lg hover:bg-gainsboro transition-colors cursor-pointer" aria-label="Remove favorite">
              <Heart class="w-6 h-6 text-red-500 cursor-pointer" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Star, Heart } from 'lucide-vue-next'
import { computed, watch } from 'vue'

// Load favourite companies from public stubs
import { useStubClient, useStubResource } from '~/services/stubClient'
import type { Ref } from 'vue'

const nuxtApp = useNuxtApp()
const stubClient = useStubClient()

const { data: companiesData, error: companiesError, refresh } = await useStubResource('companies')

// Map to the view model used by the design
const items = computed(() => {
  const raw = (companiesData.value || []) as Array<any>
  return raw
    .filter((c) => c?.favourited !== false)
    .slice(0, 8)
    .map((c, index) => ({
    id: c.id || index,
    name: c.name,
    category: c.category || 'Technology',
    assigned: '2024-10-22',
    rating: 4 + ((c.id || 1) % 2),
  }))
})

// Placeholder action handler
const removeFavorite = async (id: number, name: string) => {
  try {
    await stubClient.update('companies', id, { favourited: false }, { delay: 140 })
    await refresh()
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.success(`${name} removed from favorites`)
      } catch {}
    }
  } catch (error) {
    console.error('Failed to remove favourite', error)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert(`Failed to remove ${name}`)
      } catch {}
    }
  }
}

watch(companiesError as Ref<any>, (err) => {
  if (err) {
    console.error('Failed to load companies', err)
    if (import.meta.client) {
      try {
        nuxtApp.$awn?.alert('Failed to load favourites')
      } catch {}
    }
  }
})
</script>

<style scoped>
/* Custom styles based on original classes */
.font-plus-jakarta-sans {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.border-whitesmoke {
  border-color: #f5f5f5;
}

.bg-gainsboro-200 {
  background-color: #e5e7eb; /* A light grey for the logo placeholder */
}

.bg-gainsboro-100 {
  background-color: #DCDCDC;
}

.text-dimgray {
  color: #696969;
}


.hover\:bg-gainsboro:hover,
.hover\:bg-gainsboro:focus {
  background-color: #DCDCDC; /* Gainsboro */
  outline: none;
}
</style>