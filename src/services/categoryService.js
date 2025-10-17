import categoriesData from '@/data/categories.json';
import listingsData from '@/data/listings.json';

export const categoryService = {
  getcategories() {
    return categoriesData.categories || [];
  },

  getListings() {
    return listingsData.listings || [];
  },

  getListingByName(name) {
    if (!name) return null;
    const normalizedTarget = this.normalizeName(name);
    return this.getListings().find((listing) => this.normalizeName(listing.name) === normalizedTarget) || null;
  },

  getListingById(id) {
    if (id == null) return null;
    return this.getListings().find((listing) => String(listing.id) === String(id)) || null;
  },

  getListingBySlug(slug) {
    if (!slug) return null;
    const normalizedTarget = String(slug).toLowerCase();
    return this.getListings().find((listing) => this.slugifyName(listing.name) === normalizedTarget) || null;
  },

  getcategoryByName(name) {
    const categories = this.getcategories();
    const normalizedName = this.normalizecategoryName(name);
    
    const foundcategory = categories.find(cat => 
      this.normalizecategoryName(cat.name) === normalizedName
    );
    
    return foundcategory || this.getDefaultcategory();
  },

  getListingsBycategory(categoryName) {
    const listings = this.getListings();
    const normalizedcategoryName = this.normalizecategoryName(categoryName);
    
    return listings.filter(listing => 
      this.normalizecategoryName(listing.category) === normalizedcategoryName
    );
  },

  slugifyName(name) {
    if (!name) return '';
    return String(name)
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  normalizeName(name) {
    if (!name) return '';
    return String(name).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  },

  normalizecategoryName(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/[&\s+]/g, '').trim();
  },

  getDefaultcategory() {
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