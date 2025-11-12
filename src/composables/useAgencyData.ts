import { computed } from 'vue';
import { useRoute } from '#imports';
import { useDirectoryListings } from '@/composables/useDirectoryListings';
import {
  mapAgencyRecord,
  normalizeTitle,
  slugifyTitle,
  type AgencyCompanyStub,
  type AgencyProfileStub,
  type StubCompany,
} from '@/services/directoryMapper';
import type { AgencyRecord } from '@/types/directory';
import { useStubResource } from '~/services/stubClient';

const toStringQuery = (value: unknown) => (typeof value === 'string' ? value : '');

export async function useAgencyData() {
  const route = useRoute();

  const titleQuery = computed(() => decodeURIComponent(toStringQuery(route.query.title || '')));
  const slugQuery = computed(() => toStringQuery(route.query.slug || ''));
  const idQuery = computed(() => toStringQuery(route.query.id || ''));

  const { ensureLoaded, getBySlug, getById, getByTitle } = useDirectoryListings();

  const companiesResource = useStubResource('companies');
  const companyDetailResource = useStubResource('agencyCompany');
  const profileResource = useStubResource('agencyProfile');

  const ensurePromise = ensureLoaded();

  const [
    { data: companiesData, pending: companiesPending, error: companiesError },
    { data: companyDetailData, pending: companyDetailPending, error: companyDetailError },
    { data: profileData, pending: profilePending, error: profileError },
  ] = await Promise.all([companiesResource, companyDetailResource, profileResource]);

  await ensurePromise;

  const companies = computed<StubCompany[]>(() =>
    Array.isArray(companiesData.value) ? (companiesData.value as StubCompany[]) : [],
  );

  const companyDetail = computed<AgencyCompanyStub | null>(() =>
    companyDetailData.value ? (companyDetailData.value as AgencyCompanyStub) : null,
  );

  const profile = computed<AgencyProfileStub | null>(() =>
    profileData.value ? (profileData.value as AgencyProfileStub) : null,
  );

  const normalizedTitleQuery = computed(() => normalizeTitle(titleQuery.value));
  const normalizedSlugQuery = computed(() => slugifyTitle(slugQuery.value));

  const directoryAgency = computed(() => {
    if (slugQuery.value) {
      const match = getBySlug(slugQuery.value);
      if (match) return match;
    }
    if (idQuery.value) {
      const match = getById(idQuery.value);
      if (match) return match;
    }
    if (titleQuery.value) {
      const match = getByTitle(titleQuery.value);
      if (match) return match;
    }
    return null;
  });

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
    () => companiesError.value || companyDetailError.value || profileError.value || null,
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
