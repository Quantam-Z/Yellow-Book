import categoriesData from '@/data/categories.json';
import listingsData from '@/data/listings.json';

export const categoryService = {
  getCategories() {
    return categoriesData.categories || [];
  },

  getListings() {
    return listingsData.listings || [];
  },

  getCategoryByName(name) {
    const categories = this.getCategories();
    const normalizedName = this.normalizeCategoryName(name);
    
    const foundCategory = categories.find(cat => 
      this.normalizeCategoryName(cat.name) === normalizedName
    );
    
    return foundCategory || this.getDefaultCategory();
  },

  getListingsByCategory(categoryName) {
    const listings = this.getListings();
    const normalizedCategoryName = this.normalizeCategoryName(categoryName);
    
    return listings.filter(listing => 
      this.normalizeCategoryName(listing.category) === normalizedCategoryName
    );
  },

  normalizeCategoryName(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/[&\s+]/g, '').trim();
  },

  getDefaultCategory() {
    return {
      name: 'General Services',
      icon: 'DefaultIcon',
      color: 'text-gray-500',
      filters: {
        serviceTypes: {
          label: 'Service Types',
          options: ['General Service']
        },
        specializations: {
          label: 'Specializations', 
          options: ['General Specialist']
        },
        emergencyService: true
      }
    };
  }
};