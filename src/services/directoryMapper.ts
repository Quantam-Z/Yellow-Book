import { categoryService } from '@/services/categoryService';
import type {
  AgencyMeta,
  AgencyOwnerInfo,
  AgencyRecord,
  CategoryDefinition,
  CategoryDirectory,
  DirectoryListing,
  ListingDefinition,
} from '@/types/directory';

export type StubCompany = {
  id: number | string;
  name: string;
  website?: string;
  mobile?: string;
  category?: string;
  status?: string;
  verified?: boolean;
};

export type AgencyCompanyStub = {
  name?: string;
  website?: string;
  employees?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  category?: string;
  email?: string;
  phone?: string;
  revenue?: string;
  industry?: string;
  location?: string;
  tagline?: string;
  description?: string;
  services?: string;
};

export type CompanyProfileStub = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  about?: string;
  avatar?: string;
};

export const normalizeTitle = (value?: string) => categoryService.normalizeName(value);
export const normalizeCategory = (value?: string) => categoryService.normalizeCategoryName(value);
export const slugifyTitle = (value?: string) => categoryService.slugifyName(value);

export const groupListingsByCategory = (listings: DirectoryListing[]) => {
  const entries = new Map<string, DirectoryListing[]>();
  for (const listing of listings) {
    const key = normalizeCategory(listing.category);
    if (!entries.has(key)) {
      entries.set(key, []);
    }
    entries.get(key)!.push(listing);
  }
  return entries;
};

export const buildCategoryDirectories = (): CategoryDirectory[] => {
  const categories = categoryService.getCategories();
  const listings = categoryService.getEnrichedListings();
  const grouped = groupListingsByCategory(listings);

  return categories.map((category) => {
    const key = normalizeCategory(category.name);
    return {
      category,
      listings: grouped.get(key) ?? [],
    };
  });
};

export const resolveCategoryDirectory = (name?: string): CategoryDirectory => {
  const category = categoryService.getCategoryByName(name);
  const normalized = normalizeCategory(category.name);
  const listings = categoryService
    .getEnrichedListings()
    .filter((entry) => normalizeCategory(entry.category) === normalized);

  return {
    category,
    listings,
  };
};

const createOwnerInfo = (
  companyDetail?: AgencyCompanyStub | null,
  profile?: CompanyProfileStub | null,
  overrides?: AgencyOwnerInfo,
): AgencyOwnerInfo => {
  const fullName =
    overrides?.name ??
    profile?.fullName ??
    [companyDetail?.firstName, companyDetail?.lastName].filter(Boolean).join(' ').trim();

  return {
    name: fullName || undefined,
    title: overrides?.title ?? companyDetail?.jobTitle,
    bio: overrides?.bio ?? profile?.about ?? companyDetail?.description,
    avatar: overrides?.avatar ?? profile?.avatar,
  };
};

const createMeta = (
  listing?: DirectoryListing | ListingDefinition | null,
  companyDetail?: AgencyCompanyStub | null,
  overrides?: AgencyMeta,
): AgencyMeta => {
  const tagline =
    overrides?.tagline ??
    companyDetail?.tagline ??
    (listing?.serviceType ? `Top-rated ${listing.serviceType.toLowerCase()} services` : undefined);

  const categories =
    overrides?.categories ??
    (listing?.category ? [listing.category] : companyDetail?.category ? [companyDetail.category] : undefined);

  return {
    tagline,
    categories,
  };
};

interface AgencyRecordSources {
  listing?: DirectoryListing | null;
  company?: StubCompany | null;
  companyDetail?: AgencyCompanyStub | null;
  profile?: CompanyProfileStub | null;
  overrides?: Partial<AgencyRecord>;
}

const phoneFrom = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
};

const websiteFrom = (...values: Array<string | undefined>) => {
  for (const value of values) {
    const candidate = value?.trim();
    if (candidate) return candidate;
  }
  return undefined;
};

export const mapAgencyRecord = ({
  listing,
  company,
  companyDetail,
  profile,
  overrides,
}: AgencyRecordSources): AgencyRecord | null => {
  const name =
    overrides?.name ??
    listing?.name ??
    companyDetail?.name ??
    profile?.fullName ??
    company?.name;

  if (!name) {
    return null;
  }

  const slug =
    overrides?.slug ??
    listing?.slug ??
    (company?.name ? slugifyTitle(company.name) : undefined);

  const rating =
    overrides?.rating ?? (listing?.rating != null ? Number(listing.rating) : undefined);
  const ratingCount =
    overrides?.ratingCount ?? (listing?.ratingCount != null ? Number(listing.ratingCount) : undefined);

  const contact = {
    website: websiteFrom(overrides?.contact?.website, listing?.website, companyDetail?.website, company?.website),
    phone:
      overrides?.contact?.phone ??
      phoneFrom(companyDetail?.phone) ??
      phoneFrom(profile?.phoneNumber) ??
      phoneFrom(company?.mobile),
    email: overrides?.contact?.email ?? companyDetail?.email ?? profile?.email,
    location:
      overrides?.contact?.location ?? listing?.location ?? companyDetail?.location ?? profile?.location,
    revenue: overrides?.contact?.revenue ?? companyDetail?.revenue ?? listing?.revenue,
    employees: overrides?.contact?.employees ?? companyDetail?.employees,
    industry:
      overrides?.contact?.industry ??
      companyDetail?.industry ??
      company?.category ??
      listing?.category,
  };

  const owner = createOwnerInfo(companyDetail, profile, overrides?.owner);
  const meta = createMeta(listing, companyDetail, overrides?.meta);

  const assets = {
    heroImage:
      overrides?.assets?.heroImage ??
      listing?.image ??
      categoryService.getDefaultListingImage(listing?.category ?? companyDetail?.category),
    logoImage: overrides?.assets?.logoImage ?? '/logo/image7.png',
    profileImage: overrides?.assets?.profileImage ?? profile?.avatar ?? '/profile.png',
  };

  return {
    id: overrides?.id ?? listing?.id ?? company?.id,
    slug,
    name,
    category: overrides?.category ?? listing?.category ?? companyDetail?.category ?? company?.category,
    rating,
    ratingCount,
    serviceType: overrides?.serviceType ?? listing?.serviceType,
    description: overrides?.description ?? companyDetail?.description ?? listing?.description,
    about: overrides?.about ?? profile?.about,
    contact,
    owner,
    meta,
    assets,
  };
};
