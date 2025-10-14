<template>
  <div>
    <AgencyHead :agency-name="agency?.name || agencyNameFromQuery" />
    <CommonAgencyProfile
      :agency-name="agency?.name || agencyNameFromQuery"
      :rating="agency?.rating || 0"
      :rating-count="agency?.ratingCount || 0"
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
 import { categoryService } from '@/services/categoryService';
 import Footer from '@/components/layout/Footer.vue';

 definePageMeta({
   layout: 'catagory',
 });

 const route = useRoute();

 const titleQuery = computed(() => (route.query.title ? decodeURIComponent(String(route.query.title)) : ''));
 const slugQuery = computed(() => (route.query.slug ? String(route.query.slug) : ''));
 const idQuery = computed(() => (route.query.id ? String(route.query.id) : ''));

 const agency = computed(() => {
   if (slugQuery.value) return categoryService.getListingBySlug(slugQuery.value);
   if (idQuery.value) return categoryService.getListingById(idQuery.value);
   if (titleQuery.value) return categoryService.getListingByName(titleQuery.value);
   return null;
 });

 const agencyNameFromQuery = computed(() => titleQuery.value || slugQuery.value || '');

 // Derived/display placeholders; replace with real fields as data grows
 const agencyTagline = computed(() => (agency.value ? `Top-rated ${agency.value.serviceType} in ${agency.value.location}` : ''));
 const heroImage = computed(() => '/logo/image6.png');
 const logoImage = computed(() => '/logo/image7.png');
 const aboutText = computed(
   () =>
     (agency.value && `Discover ${agency.value.name} — delivering ${agency.value.serviceType?.toLowerCase() || 'quality services'} with excellence in ${agency.value.location}.`) ||
     'Discover our agency — delivering quality services with excellence.'
 );
 const agencyPhone = computed(() => '+976 1234 5678');
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