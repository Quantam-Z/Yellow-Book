<template>
  <div class="w-full min-h-screen bg-white p-4 sm:p-6">
    <div
      class="rounded-xl border border-gray-200 shadow-sm bg-gradient-to-r from-indigo-500/15 via-pink-500/15 to-amber-400/15 px-4 sm:px-6 py-3 sm:py-4 mb-6 flex items-center justify-between"
    >
      <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
        My Favorite Company
      </h1>
     
    </div>

    <div class="space-y-3">
      <h2 class="text-sm font-semibold text-gray-700">All Favorite List</h2>

      <div
        v-if="!items.length"
        class="w-full rounded-xl border border-dashed border-gray-300 bg-white py-12 px-6 text-center text-gray-500 text-sm sm:text-base"
      >
        You haven't saved any companies yet. Browse the directory and tap the heart icon to add favorites.
      </div>

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
import { storeToRefs } from 'pinia'

import { useStubClient } from '~/services/stubClient'
import { useStubResource } from '~/composables/useStubResource'
import type { Ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const nuxtApp = useNuxtApp()
const stubClient = useStubClient()
const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

const {
  data: favoritesData,
  error: favoritesError,
  refresh,
} = await useStubResource('favorites')

const items = computed(() => {
  const raw = (favoritesData.value || []) as Array<any>
  const targetId = authUser.value?.id
  return raw
    .filter((entry) => {
      if (!targetId) return true
      if (entry?.userId == null) return true
      return String(entry.userId) === String(targetId)
    })
    .map((entry, index) => ({
      id: entry.id ?? index,
      name: entry.name || 'Unnamed company',
      category: entry.category || 'General services',
      assigned: entry.assigned || entry.savedAt || '—',
      rating: entry.rating ?? 4,
    }))
})

const removeFavorite = async (id: number, name: string) => {
  try {
    await stubClient.remove('favorites', id, { delay: 140 })
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

watch(favoritesError as Ref<any>, (err) => {
  if (err) {
    console.error('Failed to load favourites', err)
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