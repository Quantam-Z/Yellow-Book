export interface CategoryFilterGroup {
  label: string;
  options: string[];
}

export interface CategoryFilters {
  serviceTypes?: CategoryFilterGroup;
  specializations?: CategoryFilterGroup;
  emergencyService?: boolean;
}

export interface CategoryDefinition {
  name: string;
  icon?: string;
  color?: string;
  filters?: CategoryFilters;
}

export interface ListingDefinition {
  id: number | string;
  category: string;
  name: string;
  rating: number;
  ratingCount: number;
  website: string;
  location: string;
  revenue: string;
  comments: number;
  serviceType?: string;
  specialization?: string;
  emergencyService?: boolean;
  price?: number;
  image?: string;
  description?: string;
}

export interface DirectoryListing extends ListingDefinition {
  slug: string;
  title: string;
  normalizedTitle: string;
  normalizedCategory: string;
}

export interface CategoryDirectory {
  category: CategoryDefinition;
  listings: DirectoryListing[];
}

export interface AgencyContactInfo {
  website?: string;
  phone?: string;
  email?: string;
  location?: string;
  revenue?: string;
  employees?: string;
  industry?: string;
}

export interface AgencyOwnerInfo {
  name?: string;
  title?: string;
  bio?: string;
  avatar?: string;
}

export interface AgencyMeta {
  tagline?: string;
  categories?: string[];
}

export interface AgencyRecord {
  id?: number | string;
  slug?: string;
  name: string;
  category?: string;
  rating?: number;
  ratingCount?: number;
  serviceType?: string;
  description?: string;
  about?: string;
  contact: AgencyContactInfo;
  owner: AgencyOwnerInfo;
  meta: AgencyMeta;
  assets?: {
    heroImage?: string;
    logoImage?: string;
    profileImage?: string;
  };
}
