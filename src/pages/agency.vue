<template>
  <div class="w-full">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <AgencyHead :agency-name="agencyDisplayName" />
      <CommonAgencyProfile
          :agency-name="agencyDisplayName"
          :rating="ratingValue"
          :rating-count="ratingCountValue"
        :tagline="agencyTagline"
        :hero-image="heroImage"
        :logo-image="logoImage"
      />
      <AgencyDetails :about="aboutText" />
      <AgencyContact
          :website="contactWebsite"
          :phone="contactPhone"
          :email="contactEmail"
          :location="contactLocation"
          :revenue="contactRevenue"
          :employees="contactEmployees"
          :industry="contactIndustry"
          :category="categoryValue"
        :profile-image="profileImage"
        :owner-name="ownerName"
        :owner-title="ownerTitle"
        :owner-bio="ownerBio"
      />
      <AgencyReview :website="contactWebsite" :highlight-review-id="highlightReviewId" />
    </div>
    <Footer />
  </div>
 </template>

<script setup lang="ts">
import { computed } from 'vue';
import CommonAgencyProfile from '~/components/Agency/agencyProfile.vue';
import AgencyHead from '~/components/Agency/agencyHead.vue';
import AgencyDetails from '~/components/Agency/agencyDetails.vue';
import AgencyContact from '~/components/Agency/agencyContact.vue';
import AgencyReview from '~/components/Agency/agencyReview.vue';
import Footer from '~/components/layout/footer.vue';
import { useAgencyData } from '@/composables/useAgencyData';

definePageMeta({
  layout: 'catagory',
});

const { agency, loading, sources } = await useAgencyData();

const agencyNameFromQuery = computed(() => {
  const query = sources.route.query;
  const title = typeof query.title === 'string' ? decodeURIComponent(query.title) : '';
  const slug = typeof query.slug === 'string' ? query.slug : '';
  return title || slug;
});

const highlightReviewId = computed(() => {
  const raw = sources.route.query?.reviewId;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
});

const agencyTagline = computed(() => {
  if (!agency.value) {
    return '';
  }
  if (agency.value.meta?.tagline) {
    return agency.value.meta.tagline;
  }
  const service = agency.value.serviceType || 'services';
  const location = agency.value.contact.location || 'your area';
  return `Top-rated ${service.toLowerCase()} in ${location}`;
});

const heroImage = computed(() => agency.value?.assets?.heroImage || '/logo/image6.png');
const logoImage = computed(() => agency.value?.assets?.logoImage || '/logo/image7.png');
const profileImage = computed(() => agency.value?.assets?.profileImage || '/profile.png');

const aboutText = computed(() => {
  if (!agency.value) return 'Discover our agency — delivering quality services with excellence.';
  return (
    agency.value.about ||
    agency.value.description ||
    `Discover ${agency.value.name} — delivering ${agency.value.serviceType?.toLowerCase() || 'quality services'} with excellence in ${agency.value.contact.location || 'your area'}.`
  );
});

const contactWebsite = computed(() => agency.value?.contact.website || '');
const contactPhone = computed(() => agency.value?.contact.phone || '+976 1234 5678');
const contactEmail = computed(() => agency.value?.contact.email || 'contact@example.com');
const contactLocation = computed(() => agency.value?.contact.location || '');
const contactRevenue = computed(() => agency.value?.contact.revenue || '');
const contactEmployees = computed(() => agency.value?.contact.employees || '10-20');
const contactIndustry = computed(
  () => agency.value?.contact.industry || agency.value?.category || 'General Services',
);

const ownerName = computed(() => agency.value?.owner.name || 'Agency Team');
const ownerTitle = computed(() => agency.value?.owner.title || 'CEO & Founder');
const ownerBio = computed(
  () =>
    agency.value?.owner.bio ||
    "I'm a dedicated agency owner passionate about delivering trusted services, building client relationships, and helping everyday users solve real-world problems with care and integrity",
);

const ratingValue = computed(() => agency.value?.rating ?? 0);
const ratingCountValue = computed(() => agency.value?.ratingCount ?? 0);
const categoryValue = computed(() => agency.value?.category || 'General Services');

const agencyDisplayName = computed(() => agency.value?.name || agencyNameFromQuery.value);
</script>