<script setup lang="ts">
import { defineAsyncComponent, computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'company',
});

function generateNameCandidates(slug: string): string[] {
  const kebab = slug.toLowerCase();
  const words = kebab.split(/[-_]/g).filter(Boolean);
  const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const camel = pascal.charAt(0).toLowerCase() + pascal.slice(1);
  const collapsed = words.join('');
  return Array.from(new Set([slug, kebab, pascal, camel, collapsed]));
}

const route = useRoute();
const modules = import.meta.glob('@/components/Company/*.vue');

// Handle known slug aliases/misspellings
const aliasMap: Record<string, string[]> = {
  'my-company': ['mycompany', 'mycompanie'],
  'my-profile': ['myprofile'],
};

const SelectedComponent = computed(() => {
  const raw = String(route.params.page || '');
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const aliases = aliasMap[lower] ?? [];
  const candidates = Array.from(
    new Set([
      ...generateNameCandidates(raw),
      ...aliases.flatMap(a => generateNameCandidates(a)),
    ])
  );

  for (const [modulePath, loader] of Object.entries(modules)) {
    const baseName = modulePath.split('/').pop()!.replace(/\.vue$/, '');
    if (candidates.some(c => c.toLowerCase() === baseName.toLowerCase())) {
      return defineAsyncComponent(loader as any);
    }
  }
  return null;
});

const isHydrated = ref(false);
onMounted(() => {
  isHydrated.value = true;
});

const showNotFound = computed(() => isHydrated.value && !SelectedComponent.value);
</script>

<template>
  <div class="w-full space-y-6">
    <component v-if="SelectedComponent" :is="SelectedComponent" />
    <div v-else-if="showNotFound" class="p-6">
      <h1 class="text-2xl font-semibold">Page not found</h1>
        <p class="text-gray-600">No matching company workspace component for this route.</p>
    </div>
  </div>
</template>
