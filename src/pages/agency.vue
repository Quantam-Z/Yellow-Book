<template>
  <div>
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
    <AgencyReview />
    <Popular :limit="6" sort-by="rating" order="desc" />
    <Footer />
  </div>
 </template>

 <script setup lang="ts">
import { computed } from 'vue';
 import { useRoute } from 'vue-router';
 import CommonAgencyProfile from '@/components/Agency/AgencyProfile.vue';
 import AgencyHead from '@/components/Agency/AgencyHead.vue';
 import AgencyDetails from '@/components/Agency/AgencyDetails.vue';
 import AgencyContact from '@/components/Agency/AgencyContact.vue';
 import AgencyReview from '@/components/Agency/AgencyReview.vue';
import Popular from '@/components/common/Popular.vue';
 import Footer from '@/components/layout/Footer.vue';

 definePageMeta({
   layout: 'catagory',
 });

 const route = useRoute();

 const titleQuery = computed(() => (route.query.title ? decodeURIComponent(String(route.query.title)) : ''));
 const slugQuery = computed(() => (route.query.slug ? String(route.query.slug) : ''));
 const idQuery = computed(() => (route.query.id ? String(route.query.id) : ''));

// Load stub companies from public folder (available at runtime)
const { data: companiesData } = await useFetch('/stubs/companies.json');

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

// No fallback to categories/listings – show/create agency only

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

function unslugify(slug: string): string {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const agency = computed<Agency | null>(() => {
  const stub = stubCompany.value;
  if (stub) {
    return {
      id: stub.id,
      name: stub.name,
      category: '',
      website: stub.website || '',
      location: '',
      revenue: '',
      rating: 0,
      ratingCount: 0,
      serviceType: undefined,
    };
  }

  // Create a minimal agency when not found
  const createdName = titleQuery.value || (slugQuery.value ? unslugify(slugQuery.value) : '');
  if (createdName) {
    return {
      id: idQuery.value || slugQuery.value || createdName,
      name: createdName,
      category: '',
      website: '',
      location: '',
      revenue: '',
      rating: 0,
      ratingCount: 0,
      serviceType: undefined,
    };
  }

  return null;
});

 const agencyNameFromQuery = computed(() => titleQuery.value || slugQuery.value || '');

 // Derived/display placeholders; replace with real fields as data grows
const agencyTagline = computed(() => (agency.value ? `Discover ${agency.value.name} — trusted services tailored to you.` : ''));
 const heroImage = computed(() => '/logo/image6.png');
 const logoImage = computed(() => '/logo/image7.png');
 const aboutText = computed(
   () =>
     (agency.value && `Discover ${agency.value.name} — delivering ${agency.value.serviceType?.toLowerCase() || 'quality services'} with excellence in ${agency.value.location}.`) ||
     'Discover our agency — delivering quality services with excellence.'
 );
const agencyPhone = computed(() => {
  // Prefer stub data's mobile when available
  return (stubCompany.value?.mobile && `+${stubCompany.value.mobile}`) || '+976 1234 5678';
});
const agencyEmail = computed(() => 'contact@example.com');
 const employeesText = computed(() => '10-20');
 const industryText = computed(() => 'General Services');
 const profileImage = computed(() => '/profile.png');
 const ownerName = computed(() => 'Cameron Williamson');
 const ownerTitle = computed(() => 'CEO & Founder');
 const ownerBio = computed(
   () =>
     "I'm a dedicated agency owner passionate about delivering trusted services, building client relationships, and helping everyday users solve real-world problems with care and integrity"
 );
 </script>