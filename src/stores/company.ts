import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import {
  mockService,
  type CompaniesResponse,
  type Company,
  type Pagination,
} from '@/api/mockService';

type CompanyFilters = {
  search: string;
  category: string;
  status: string;
};

type FetchOverrides = Partial<CompanyFilters> & {
  page?: number;
  pageSize?: number;
};

const createDefaultFilters = (): CompanyFilters => ({
  search: '',
  category: '',
  status: '',
});

const createDefaultPagination = (): Pagination => ({
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
});

const toErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in (error as Record<string, unknown>)
  ) {
    const maybeMessage = (error as Record<string, unknown>).message;
    if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
      return maybeMessage;
    }
  }
  return fallback;
};

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>([]);
  const selectedCompany = ref<Company | null>(null);
  const filters = reactive<CompanyFilters>(createDefaultFilters());
  const pagination = reactive<Pagination>(createDefaultPagination());
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasResults = computed(() => companies.value.length > 0);
  const availableCategories = computed(() => {
    const unique = new Set<string>();
    companies.value.forEach((company) => {
      if (company.category) {
        unique.add(company.category);
      }
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  });

  const availableStatuses = computed(() => {
    const unique = new Set<string>();
    companies.value.forEach((company) => {
      if (company.status) unique.add(company.status);
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  });

  const setSelectedCompany = (company: Company | null) => {
    selectedCompany.value = company;
  };

  const assignFiltersFromResponse = (response: CompaniesResponse) => {
    filters.search = response.filters.search;
    filters.category = response.filters.category;
    filters.status = response.filters.status;
  };

  const assignPaginationFromResponse = (response: CompaniesResponse) => {
    pagination.page = response.pagination.page;
    pagination.pageSize = response.pagination.pageSize;
    pagination.total = response.pagination.total;
    pagination.totalPages = response.pagination.totalPages;
  };

  const fetchCompanies = async (overrides: FetchOverrides = {}) => {
    loading.value = true;
    error.value = null;

    const search = overrides.search ?? filters.search;
    const category = overrides.category ?? filters.category;
    const page = overrides.page ?? pagination.page ?? 1;
    const pageSize = overrides.pageSize ?? pagination.pageSize ?? 10;

    try {
      const response = await mockService.getCompanies({
        search,
        category,
        status: overrides.status ?? filters.status,
        page,
        pageSize,
      });

      companies.value = response.items;
      assignFiltersFromResponse(response);
      assignPaginationFromResponse(response);
    } catch (err: unknown) {
      error.value = toErrorMessage(err, 'Failed to load companies');
      companies.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchCompanyById = async (id: number | string) => {
    loading.value = true;
    error.value = null;
    try {
      const company = await mockService.getCompanyById(id);
      setSelectedCompany(company);
      return company;
    } catch (err: unknown) {
      error.value = toErrorMessage(err, 'Failed to load company');
      setSelectedCompany(null);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const applyFilters = async (partial: Partial<CompanyFilters>) => {
    filters.search = partial.search ?? filters.search;
    filters.category = partial.category ?? filters.category;
    filters.status = partial.status ?? filters.status;
    pagination.page = 1;
    await fetchCompanies({
      search: filters.search,
      category: filters.category,
      status: filters.status,
      page: pagination.page,
    });
  };

  const resetFilters = async () => {
    Object.assign(filters, createDefaultFilters());
    pagination.page = 1;
    await fetchCompanies({
      search: filters.search,
      category: filters.category,
      status: filters.status,
      page: pagination.page,
    });
  };

  const goToPage = async (page: number) => {
    const nextPage = Math.max(1, Math.min(page, pagination.totalPages || 1));
    pagination.page = nextPage;
    await fetchCompanies({
      page: nextPage,
      search: filters.search,
      category: filters.category,
      status: filters.status,
    });
  };

  const setPageSize = async (pageSize: number) => {
    pagination.pageSize = Math.max(1, pageSize);
    pagination.page = 1;
    await fetchCompanies({
      page: 1,
      pageSize: pagination.pageSize,
      search: filters.search,
      category: filters.category,
      status: filters.status,
    });
  };

  const ensureCompanies = async () => {
    if (companies.value.length > 0 || loading.value) return;
    await fetchCompanies();
  };

  const updateCompany = async (id: number | string, patch: Partial<Company>) => {
    const normalizedId = String(id);
    companies.value = companies.value.map((company) =>
      String(company.id) === normalizedId ? { ...company, ...patch } : company,
    );
    if (selectedCompany.value && String(selectedCompany.value.id) === normalizedId) {
      selectedCompany.value = { ...selectedCompany.value, ...patch };
    }
  };

  return {
    companies,
    selectedCompany,
    filters,
    pagination,
    loading,
    error,
    hasResults,
    availableCategories,
    availableStatuses,
    fetchCompanies,
    fetchCompanyById,
    applyFilters,
    resetFilters,
    goToPage,
    setPageSize,
    ensureCompanies,
    setSelectedCompany,
    updateCompany,
  };
});
