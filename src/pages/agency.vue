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
import { useDirectoryListings } from '@/composables/useDirectoryListings';

 definePageMeta({
   layout: 'catagory',
 });

 const route = useRoute();

 const titleQuery = computed(() => (route.query.title ? decodeURIComponent(String(route.query.title)) : ''));
 const slugQuery = computed(() => (route.query.slug ? String(route.query.slug) : ''));
 const idQuery = computed(() => (route.query.id ? String(route.query.id) : ''));

// Unified directory listings (homepage + detail)
const {
  ensureLoaded: ensureDirectoryLoaded,
  getBySlug: getDirectoryBySlug,
  getById: getDirectoryById,
  getByTitle: getDirectoryByTitle,
} = useDirectoryListings();

await ensureDirectoryLoaded();

// Load stub companies from public folder (available at runtime)
const { data: companiesData, error: companiesError } = await useStubResource('companies');

type StubCompany = {
  id: number;
  name: string;
  website?: string;
  mobile?: string;
  category?: string;
  status?: string;
  verified?: boolean;
};

const companies = computed<StubCompany[]>(() => Array.isArray(companiesData.value) ? (companiesData.value as StubCompany[]) : []);

watch(companiesError, (err) => {
  if (err) {
    console.error('Failed to load companies', err);
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

const directoryAgency = computed<Agency | null>(() => {
  let match: any = null;
  if (slugQuery.value) {
    match = getDirectoryBySlug(slugQuery.value);
  } else if (idQuery.value) {
    match = getDirectoryById(idQuery.value);
  } else if (titleQuery.value) {
    match = getDirectoryByTitle(titleQuery.value);
  }

  if (!match) return null;

  return {
    id: match.id,
    name: match.name || match.title,
    category: match.category,
    website: match.website,
    location: match.location,
    revenue: match.revenue,
    rating: typeof match.rating === 'number' ? match.rating : Number(match.rating) || 0,
    ratingCount: typeof match.ratingCount === 'number' ? match.ratingCount : Number(match.ratingCount) || 0,
    serviceType: match.serviceType || match.specialization,
  };
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
};

const agency = computed<Agency | null>(() => {
  if (directoryAgency.value) {
    return directoryAgency.value;
  }

  const stub = stubCompany.value;
  const listing = listingFromService.value as Partial<Agency> | null;

  if (stub) {
    return {
      id: stub.id,
      name: stub.name,
      category: stub.category || listing?.category || 'General Services',
      website: stub.website || listing?.website || '',
      location: listing?.location || '',
      revenue: listing?.revenue || '',
      rating: typeof listing?.rating === 'number' ? listing!.rating : 0,
      ratingCount: typeof listing?.ratingCount === 'number' ? listing!.ratingCount : 0,
      serviceType: listing?.serviceType || undefined,
    };
  }

  if (listing && listing.name) {
    return listing as Agency;
  }

  return null;
});

 const agencyNameFromQuery = computed(() => titleQuery.value || slugQuery.value || '');

const agencyTagline = computed(() => (agency.value ? `Top-rated ${agency.value.serviceType || 'services'} in ${agency.value.location || 'your area'}` : ''));
 const heroImage = computed(() => '/logo/image6.png');
 const logoImage = computed(() => '/logo/image7.png');
 const aboutText = computed(
   () =>
     (agency.value && `Discover ${agency.value.name} — delivering ${agency.value.serviceType?.toLowerCase() || 'quality services'} with excellence in ${agency.value.location}.`) ||
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