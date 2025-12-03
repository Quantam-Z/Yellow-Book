import { computed, ref } from 'vue';
import { useRoute } from 'nuxt/app';
import {
  mapAgencyRecord,
  normalizeTitle,
  slugifyTitle,
  type AgencyCompanyStub,
  type CompanyProfileStub,
  type StubCompany,
} from '@/services/directoryMapper';
import type { AgencyRecord, DirectoryListing } from '@/types/directory';
import { useStubResource } from '~/composables/useStubResource';

const toStringQuery = (value: unknown) => (typeof value === 'string' ? value : '');

export async function useAgencyData() {
  const route = useRoute();

  const titleQuery = computed(() => decodeURIComponent(toStringQuery(route.query.title || '')));
  const slugQuery = computed(() => toStringQuery(route.query.slug || ''));
  const idQuery = computed(() => toStringQuery(route.query.id || ''));

  const directoryListing = ref<DirectoryListing | null>(null);
  const directoryListingError = ref<Error | null>(null);

  const lookupPayload: Record<string, string> = {};
  if (slugQuery.value) lookupPayload.slug = slugQuery.value;
  if (idQuery.value) lookupPayload.id = idQuery.value;
  if (titleQuery.value) lookupPayload.title = titleQuery.value;

  if (Object.keys(lookupPayload).length > 0) {
    try {
      const response = await $fetch<{ data: DirectoryListing | null }>('/api/directory/lookup', {
        query: lookupPayload,
      });
      directoryListing.value = response?.data ?? null;
    } catch (error) {
      directoryListingError.value = error instanceof Error ? error : new Error(String(error));
    }
  }

  const companiesResource = useStubResource('companies');
  const companyDetailResource = useStubResource('agencyCompany');
  const profileResource = useStubResource('companyProfile');

  const [
    { data: companiesData, pending: companiesPending, error: companiesError },
    { data: companyDetailData, pending: companyDetailPending, error: companyDetailError },
    { data: profileData, pending: profilePending, error: profileError },
  ] = await Promise.all([companiesResource, companyDetailResource, profileResource]);

  const companies = computed<StubCompany[]>(() =>
    Array.isArray(companiesData.value) ? (companiesData.value as StubCompany[]) : [],
  );

  const companyDetail = computed<AgencyCompanyStub | null>(() =>
    companyDetailData.value ? (companyDetailData.value as AgencyCompanyStub) : null,
  );

  const profile = computed<CompanyProfileStub | null>(() =>
    profileData.value ? (profileData.value as CompanyProfileStub) : null,
  );

  const normalizedTitleQuery = computed(() => normalizeTitle(titleQuery.value));
  const normalizedSlugQuery = computed(() => slugifyTitle(slugQuery.value));

  const directoryAgency = computed(() => directoryListing.value);

  const stubCompany = computed<StubCompany | null>(() => {
    if (!companies.value.length) return null;

    if (idQuery.value) {
      const byId = companies.value.find((entry) => String(entry.id) === String(idQuery.value));
      if (byId) return byId;
    }

    if (slugQuery.value) {
      const targetSlug = normalizedSlugQuery.value;
      const bySlug = companies.value.find((entry) => slugifyTitle(entry.name) === targetSlug);
      if (bySlug) return bySlug;
    }

    if (normalizedTitleQuery.value) {
      const target = normalizedTitleQuery.value;
      const byTitle = companies.value.find((entry) => normalizeTitle(entry.name) === target);
      if (byTitle) return byTitle;
    }

    return null;
  });

  const agency = computed<AgencyRecord | null>(() =>
    mapAgencyRecord({
      listing: directoryAgency.value,
      company: stubCompany.value,
      companyDetail: companyDetail.value,
      profile: profile.value,
    }),
  );

  const loading = computed(
    () => companiesPending.value || companyDetailPending.value || profilePending.value,
  );

  const error = computed(
    () =>
      directoryListingError.value ||
      companiesError.value ||
      companyDetailError.value ||
      profileError.value ||
      null,
  );

  return {
    agency,
    loading,
    error,
    sources: {
      route,
      directoryAgency,
      stubCompany,
      companyDetail,
      profile,
    },
  };
}
