<template>
  <div class="w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <AgencyHead :agency-name="agency?.name || agencyNameFromQuery" />
      <CommonAgencyProfile
        :agency-name="agency?.name || agencyNameFromQuery"
        :rating="agency?.rating ?? 0"
        :rating-count="agency?.ratingCount ?? 0"
        :tagline="agencyTagline"
        :hero-image="heroImage"
        :logo-image="logoImage"
      />
      <AgencyDetails :about="aboutText" />
      <AgencyContact
        :website="agency?.website || ''"
        :phone="agencyPhone"
        :email="agencyEmail"
        :location="agency?.location || ''"
        :revenue="agency?.revenue || ''"
        :employees="employeesText"
        :industry="industryText"
        :category="agency?.category || ''"
        :profile-image="profileImage"
        :owner-name="ownerName"
        :owner-title="ownerTitle"
        :owner-bio="ownerBio"
      />
      <AgencyReview :website="agency?.website || ''" />
    </div>
    <Footer />
  </div>
 </template>

<script setup lang="ts">
import { computed, watch } from 'vue';
 import { useRoute } from 'vue-router';
 import CommonAgencyProfile from '~/components/Agency/agencyProfile.vue';
 import AgencyHead from '~/components/Agency/agencyHead.vue';
 import AgencyDetails from '~/components/Agency/agencyDetails.vue';
 import AgencyContact from '~/components/Agency/agencyContact.vue';
 import AgencyReview from '~/components/Agency/agencyReview.vue';
 import { categoryService } from '@/services/categoryService';
 import Footer from '~/components/layout/footer.vue';
import { useStubResource } from '~/services/stubClient';

 definePageMeta({
   layout: 'catagory',
 });

 const route = useRoute();

 const titleQuery = computed(() => (route.query.title ? decodeURIComponent(String(route.query.title)) : ''));
 const slugQuery = computed(() => (route.query.slug ? String(route.query.slug) : ''));
 const idQuery = computed(() => (route.query.id ? String(route.query.id) : ''));

// Load stub companies from public folder (available at runtime)
const { data: companiesData, error: companiesError } = await useStubResource('companies');
const { data: agenciesData, error: agenciesError } = await useStubResource('agencies');

type StubCompany = {
  id: number;
  name: string;
  website?: string;
  mobile?: string;
  category?: string;
  status?: string;
  verified?: boolean;
  location?: string;
  revenue?: string;
  rating?: number;
  ratingCount?: number;
};

type StubAgency = {
  title: string;
  description?: string;
  image?: string;
  rating?: number;
  ratingCount?: number;
  location?: string;
};

const companies = computed<StubCompany[]>(() =>
  Array.isArray(companiesData.value) ? (companiesData.value as StubCompany[]) : [],
);

const agencies = computed<StubAgency[]>(() =>
  Array.isArray(agenciesData.value) ? (agenciesData.value as StubAgency[]) : [],
);

watch(companiesError, (err) => {
  if (err) {
    console.error('Failed to load companies', err);
  }
});

watch(agenciesError, (err) => {
  if (err) {
    console.error('Failed to load agencies', err);
  }
});

function normalizeName(name: string): string {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function slugify(name: string): string {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function humanizeSlug(slug?: string | null): string {
  if (!slug) return '';
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const stubAgencyRecord = computed<StubAgency | null>(() => {
  if (!agencies.value?.length) return null;

  const matchBy = (predicate: (agency: StubAgency) => boolean) => agencies.value.find(predicate) ?? null;

  if (slugQuery.value) {
    const match = matchBy((agency) => slugify(agency.title) === slugQuery.value);
    if (match) return match;
  }

  if (idQuery.value) {
    const normalizedId = normalizeName(idQuery.value);
    const match = matchBy(
      (agency) =>
        slugify(agency.title) === idQuery.value ||
        normalizeName(agency.title) === normalizedId,
    );
    if (match) return match;
  }

  if (titleQuery.value) {
    const target = normalizeName(titleQuery.value);
    const match = matchBy((agency) => normalizeName(agency.title) === target);
    if (match) return match;
  }

  return null;
});

const stubCompany = computed<StubCompany | null>(() => {
  if (!companies.value?.length) return null;

  if (idQuery.value) {
    const foundById = companies.value.find((c) => String(c.id) === String(idQuery.value));
    if (foundById) return foundById;
  }

  if (slugQuery.value) {
    const foundBySlug = companies.value.find((c) => slugify(c.name) === slugQuery.value);
    if (foundBySlug) return foundBySlug;
  }

  if (titleQuery.value) {
    const target = normalizeName(titleQuery.value);
    const foundByTitle = companies.value.find((c) => normalizeName(c.name) === target);
    if (foundByTitle) return foundByTitle;
  }

  return null;
});

// Fallback to listings.json via existing service if needed
const listingFromService = computed(() => {
  if (slugQuery.value) return categoryService.getListingBySlug(slugQuery.value);
  if (idQuery.value) return categoryService.getListingById(idQuery.value);
  if (titleQuery.value) return categoryService.getListingByName(titleQuery.value);
  return null;
});

type Agency = {
  id?: number | string;
  name: string;
  category?: string;
  website?: string;
  location?: string;
  revenue?: string;
  rating?: number;
  ratingCount?: number;
  serviceType?: string;
  description?: string;
  image?: string;
};

const agency = computed<Agency | null>(() => {
  const stub = stubCompany.value;
  const listing = listingFromService.value as Partial<Agency> | null;
  const stubAgency = stubAgencyRecord.value;

  const resolvedName =
    stub?.name ||
    listing?.name ||
    stubAgency?.title ||
    titleQuery.value ||
    humanizeSlug(slugQuery.value) ||
    '';

  if (!resolvedName) {
    return null;
  }

  const resolvedLocation = stub?.location || listing?.location || stubAgency?.location || '';
  const resolvedRating =
    typeof listing?.rating === 'number'
      ? listing.rating
      : typeof stubAgency?.rating === 'number'
      ? stubAgency.rating
      : 0;
  const resolvedRatingCount =
    typeof listing?.ratingCount === 'number'
      ? listing.ratingCount
      : typeof stubAgency?.ratingCount === 'number'
      ? stubAgency.ratingCount
      : 0;

  return {
    id: stub?.id ?? listing?.id ?? slugQuery.value ?? idQuery.value ?? resolvedName,
    name: resolvedName,
    category: stub?.category || listing?.category || 'General Services',
    website: stub?.website || listing?.website || '',
    location: resolvedLocation,
    revenue: stub?.revenue || listing?.revenue || '',
    rating: resolvedRating,
    ratingCount: resolvedRatingCount,
    serviceType: listing?.serviceType || undefined,
    description: stubAgency?.description,
    image: stubAgency?.image,
  };
});

const agencyNameFromQuery = computed(() =>
  agency.value?.name ||
  stubAgencyRecord.value?.title ||
  titleQuery.value ||
  humanizeSlug(slugQuery.value) ||
  '',
);

const agencyTagline = computed(() => {
  if (stubAgencyRecord.value?.description) {
    return stubAgencyRecord.value.description;
  }
  if (agency.value) {
    return `Top-rated ${agency.value.serviceType || 'services'} in ${
      agency.value.location || 'your area'
    }`;
  }
  return '';
});
const heroImage = computed(() => agency.value?.image || '/logo/image6.png');
const logoImage = computed(() => stubAgencyRecord.value?.image || '/logo/image7.png');
const aboutText = computed(
   () =>
      (agency.value &&
        `Discover ${agency.value.name} — ${
          stubAgencyRecord.value?.description ||
          `delivering ${agency.value.serviceType?.toLowerCase() || 'quality services'} with excellence in ${
            agency.value.location || 'your area'
          }.`
        }`) ||
      stubAgencyRecord.value?.description ||
      'Discover our agency — delivering quality services with excellence.'
 );
const agencyPhone = computed(() => {
  return (stubCompany.value?.mobile && `+${stubCompany.value.mobile}`) || '+976 1234 5678';
});
const agencyEmail = computed(() => 'contact@example.com');
 const employeesText = computed(() => '10-20');
 const industryText = computed(() => agency.value?.category || 'General Services');
 const profileImage = computed(() => '/profile.png');
 const ownerName = computed(() => 'Cameron Williamson');
 const ownerTitle = computed(() => 'CEO & Founder');
 const ownerBio = computed(
   () =>
     "I'm a dedicated agency owner passionate about delivering trusted services, building client relationships, and helping everyday users solve real-world problems with care and integrity"
 );
 </script>