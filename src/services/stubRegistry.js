/**
 * Registry of stub resources and how they should behave.
 * Each resource maps to a JSON fixture inside `/public/stubs`.
 *
 * type:       "collection" | "singleton"
 * primaryKey: field name to treat as identifier for collection mutations.
 * mutable:    when false, write operations are disabled.
 */
export const STUB_REGISTRY = {
  admins: { file: "admins.json", type: "collection", primaryKey: "id", mutable: true },
  adminStats: { file: "adminStats.json", type: "singleton", mutable: false },
  agencies: { file: "agencies.json", type: "collection", mutable: false },
  agencyCompany: { file: "agencyCompany.json", type: "singleton", mutable: true },
  agencyDashboard: { file: "agencyDashboard.json", type: "singleton", mutable: true },
  agencyNotifications: { file: "agencyNotifications.json", type: "collection", primaryKey: "id", mutable: true },
  agencyProfile: { file: "agencyProfile.json", type: "singleton", mutable: true },
  agencyReviews: { file: "agencyReviews.json", type: "collection", primaryKey: "id", mutable: true },
  companies: { file: "companies.json", type: "collection", primaryKey: "id", mutable: true },
  directoryCategories: { file: "categories.json", type: "singleton", mutable: false },
  directoryListings: { file: "listings.json", type: "singleton", mutable: false },
  recentActivities: { file: "recentActivities.json", type: "collection", mutable: false },
  recentCompanies: { file: "recentCompanies.json", type: "collection", mutable: false },
  recentReviews: { file: "recentReviews.json", type: "collection", primaryKey: "id", mutable: true },
  subadminAssignedCompanies: {
    file: "subadminAssignedCompanies.json",
    type: "collection",
    primaryKey: "id",
    mutable: true,
  },
  subadminReviews: { file: "subadminReviews.json", type: "collection", primaryKey: "id", mutable: true },
  users: { file: "users.json", type: "collection", primaryKey: "id", mutable: true },
};

export const DEFAULT_STUB_DELAY = 220;
