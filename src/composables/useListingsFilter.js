import { computed, ref } from 'vue';

export function useListingsFilter(listings) {
  const filters = ref({
    services: new Set(),
    specializations: new Set(),
    emergencyService: null,
    maxPrice: Infinity,
    ratings: new Set()
  });

  const filteredListings = computed(() => {
    const { services, specializations, emergencyService, maxPrice, ratings } = filters.value;
    const listingsData = listings.value;
    
    if (services.size === 0 && 
        specializations.size === 0 && 
        emergencyService === null && 
        maxPrice === Infinity && 
        ratings.size === 0) {
      return listingsData;
    }

    return listingsData.filter(listing => {
      if (services.size > 0 && !services.has(listing.serviceType)) return false;
      if (specializations.size > 0 && !specializations.has(listing.specialization)) return false;
      if (emergencyService !== null && listing.emergencyService !== emergencyService) return false;
      if (maxPrice < Infinity && listing.price > maxPrice) return false;
      if (ratings.size > 0 && !ratings.has(Math.floor(listing.rating))) return false;
      return true;
    });
  });

  const toggleFilter = (filterType, value) => {
    if (filterType === 'emergencyService') {
      filters.value[filterType] = filters.value[filterType] === value ? null : value;
    } else if (filterType === 'maxPrice') {
      filters.value[filterType] = value;
    } else {
      const filterSet = filters.value[filterType];
      if (filterSet.has(value)) {
        filterSet.delete(value);
      } else {
        filterSet.add(value);
      }
    }
  };

  const removeFilter = (filterType, value) => {
    if (filterType === 'emergencyService') {
      filters.value[filterType] = null;
    } else if (filterType === 'maxPrice') {
      filters.value[filterType] = Infinity;
    } else {
      filters.value[filterType].delete(value);
    }
  };

  const clearFilters = () => {
    filters.value.services.clear();
    filters.value.specializations.clear();
    filters.value.ratings.clear();
    filters.value.emergencyService = null;
    filters.value.maxPrice = Infinity;
  };

  return {
    filters,
    filteredListings,
    toggleFilter,
    removeFilter,
    clearFilters
  };
}