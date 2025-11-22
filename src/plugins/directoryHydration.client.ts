import { defineNuxtPlugin } from '#app';
import { categoryService } from '@/services/categoryService';

export default defineNuxtPlugin(() => {
  categoryService.ensureHydrated().catch((error) => {
    if (import.meta.dev) {
      console.error('[directory] Failed to hydrate categories from stubs', error);
    }
  });
});
