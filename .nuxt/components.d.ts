
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)


export const AdminLayoutHeader: typeof import("../src/components/adminLayout/header.vue")['default']
export const AdminLayoutSidebar: typeof import("../src/components/adminLayout/sidebar.vue")['default']
export const CommonAdminWelcome: typeof import("../src/components/common/Admin/Welcome.vue")['default']
export const CommonAgencyContact: typeof import("../src/components/common/Agency/AgencyContact.vue")['default']
export const CommonAgencyDetails: typeof import("../src/components/common/Agency/AgencyDetails.vue")['default']
export const CommonAgencyHead: typeof import("../src/components/common/Agency/AgencyHead.vue")['default']
export const CommonAgencyProfile: typeof import("../src/components/common/Agency/AgencyProfile.vue")['default']
export const CommonAgencyReview: typeof import("../src/components/common/Agency/AgencyReview.vue")['default']
export const CommonButton: typeof import("../src/components/common/Button.vue")['default']
export const CommonCarusal: typeof import("../src/components/common/Carusal.vue")['default']
export const CommonCatagory: typeof import("../src/components/common/Catagory.vue")['default']
export const CommonCatagoryBanner: typeof import("../src/components/common/Catagory/CatagoryBanner.vue")['default']
export const CommonCatagoryDetails: typeof import("../src/components/common/Catagory/CatagoryDetails.vue")['default']
export const CommonCatagoryHead: typeof import("../src/components/common/Catagory/CatagoryHead.vue")['default']
export const CommonCatagorySearch: typeof import("../src/components/common/Catagory/CatagorySearch.vue")['default']
export const CommonFilter: typeof import("../src/components/common/Filter.vue")['default']
export const CommonFrequent: typeof import("../src/components/common/Frequent.vue")['default']
export const CommonLoginModal: typeof import("../src/components/common/LoginModal.vue")['default']
export const CommonPopular: typeof import("../src/components/common/Popular.vue")['default']
export const CommonStar: typeof import("../src/components/common/Star.vue")['default']
export const LayoutFooter: typeof import("../src/components/layout/Footer.vue")['default']
export const LayoutNavbar: typeof import("../src/components/layout/Navbar.vue")['default']
export const ModalBuisnessReg: typeof import("../src/components/modal/BuisnessReg.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Icon: typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAdminLayoutHeader: LazyComponent<typeof import("../src/components/adminLayout/header.vue")['default']>
export const LazyAdminLayoutSidebar: LazyComponent<typeof import("../src/components/adminLayout/sidebar.vue")['default']>
export const LazyCommonAdminWelcome: LazyComponent<typeof import("../src/components/common/Admin/Welcome.vue")['default']>
export const LazyCommonAgencyContact: LazyComponent<typeof import("../src/components/common/Agency/AgencyContact.vue")['default']>
export const LazyCommonAgencyDetails: LazyComponent<typeof import("../src/components/common/Agency/AgencyDetails.vue")['default']>
export const LazyCommonAgencyHead: LazyComponent<typeof import("../src/components/common/Agency/AgencyHead.vue")['default']>
export const LazyCommonAgencyProfile: LazyComponent<typeof import("../src/components/common/Agency/AgencyProfile.vue")['default']>
export const LazyCommonAgencyReview: LazyComponent<typeof import("../src/components/common/Agency/AgencyReview.vue")['default']>
export const LazyCommonButton: LazyComponent<typeof import("../src/components/common/Button.vue")['default']>
export const LazyCommonCarusal: LazyComponent<typeof import("../src/components/common/Carusal.vue")['default']>
export const LazyCommonCatagory: LazyComponent<typeof import("../src/components/common/Catagory.vue")['default']>
export const LazyCommonCatagoryBanner: LazyComponent<typeof import("../src/components/common/Catagory/CatagoryBanner.vue")['default']>
export const LazyCommonCatagoryDetails: LazyComponent<typeof import("../src/components/common/Catagory/CatagoryDetails.vue")['default']>
export const LazyCommonCatagoryHead: LazyComponent<typeof import("../src/components/common/Catagory/CatagoryHead.vue")['default']>
export const LazyCommonCatagorySearch: LazyComponent<typeof import("../src/components/common/Catagory/CatagorySearch.vue")['default']>
export const LazyCommonFilter: LazyComponent<typeof import("../src/components/common/Filter.vue")['default']>
export const LazyCommonFrequent: LazyComponent<typeof import("../src/components/common/Frequent.vue")['default']>
export const LazyCommonLoginModal: LazyComponent<typeof import("../src/components/common/LoginModal.vue")['default']>
export const LazyCommonPopular: LazyComponent<typeof import("../src/components/common/Popular.vue")['default']>
export const LazyCommonStar: LazyComponent<typeof import("../src/components/common/Star.vue")['default']>
export const LazyLayoutFooter: LazyComponent<typeof import("../src/components/layout/Footer.vue")['default']>
export const LazyLayoutNavbar: LazyComponent<typeof import("../src/components/layout/Navbar.vue")['default']>
export const LazyModalBuisnessReg: LazyComponent<typeof import("../src/components/modal/BuisnessReg.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
