import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import { mockService, type Category } from '@/api/mockService';

type NormalizedCategory = Category & {
  slug: string;
  normalizedName: string;
};

type CategoryState = {
  loading: boolean;
  error: string | null;
};

const normalize = (value: string) =>
  String(value || '')
    .toLowerCase()
    .replace(/[&\s+]/g, '')
    .trim();

const slugify = (value: string) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const buildDefaultCategory = (): Category => ({
  id: 'general-services',
  name: 'General Services',
  icon: 'DefaultIcon',
  color: 'text-gray-500',
  filters: {
    serviceTypes: {
      label: 'Service Types',
      options: ['General Service'],
    },
    specializations: {
      label: 'Specializations',
      options: ['General Specialist'],
    },
    emergencyService: true,
  },
});

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<NormalizedCategory[]>([]);
  const state = reactive<CategoryState>({
    loading: false,
    error: null,
  });

  const bySlug = computed(() => {
    const map = new Map<string, NormalizedCategory>();
    categories.value.forEach((category) => {
      map.set(category.slug, category);
    });
    return map;
  });

  const byNormalizedName = computed(() => {
    const map = new Map<string, NormalizedCategory>();
    categories.value.forEach((category) => {
      map.set(category.normalizedName, category);
    });
    return map;
  });

  const categoryList = computed<Category[]>(() =>
    categories.value.map(({ slug, normalizedName, ...category }) => ({
      ...category,
    })),
  );

  const normalizeCategoryName = (value: string) => normalize(value);
  const slugifyCategoryName = (value: string) => slugify(value);

  const fetchCategories = async () => {
    state.loading = true;
    state.error = null;

    try {
      const records = await mockService.getCategories();
      categories.value = records.map((category) => ({
        ...category,
        slug: slugify(category.name),
        normalizedName: normalize(category.name),
      }));
    } catch (error: unknown) {
      state.error =
        error instanceof Error ? error.message : 'Failed to load categories';
      categories.value = [];
    } finally {
      state.loading = false;
    }
  };

  const ensureCategories = async () => {
    if (categories.value.length > 0 || state.loading) return;
    await fetchCategories();
  };

  const findBySlug = (slug: string) => bySlug.value.get(slug) ?? null;
  const findByName = (name: string) =>
    byNormalizedName.value.get(normalize(name)) ?? null;

  return {
    categories: categoryList,
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    fetchCategories,
    ensureCategories,
    findBySlug,
    findByName,
    normalizeCategoryName,
    slugifyCategoryName,
    getDefaultCategory: buildDefaultCategory,
  };
});
