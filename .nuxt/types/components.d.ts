
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

interface _GlobalComponents {
      'CommonAgencyContact': typeof import("../../src/components/common/Agency/AgencyContact.vue")['default']
    'CommonAgencyDetails': typeof import("../../src/components/common/Agency/AgencyDetails.vue")['default']
    'CommonAgencyHead': typeof import("../../src/components/common/Agency/AgencyHead.vue")['default']
    'CommonAgencyProfile': typeof import("../../src/components/common/Agency/AgencyProfile.vue")['default']
    'CommonAgencyReview': typeof import("../../src/components/common/Agency/AgencyReview.vue")['default']
    'CommonButton': typeof import("../../src/components/common/Button.vue")['default']
    'CommonCarusal': typeof import("../../src/components/common/Carusal.vue")['default']
    'CommonCatagory': typeof import("../../src/components/common/Catagory.vue")['default']
    'CommonCatagoryBanner': typeof import("../../src/components/common/Catagory/CatagoryBanner.vue")['default']
    'CommonCatagoryDetails': typeof import("../../src/components/common/Catagory/CatagoryDetails.vue")['default']
    'CommonCatagoryHead': typeof import("../../src/components/common/Catagory/CatagoryHead.vue")['default']
    'CommonCatagorySearch': typeof import("../../src/components/common/Catagory/CatagorySearch.vue")['default']
    'CommonFilter': typeof import("../../src/components/common/Filter.vue")['default']
    'CommonFrequent': typeof import("../../src/components/common/Frequent.vue")['default']
    'CommonLoginModal': typeof import("../../src/components/common/LoginModal.vue")['default']
    'CommonPopular': typeof import("../../src/components/common/Popular.vue")['default']
    'CommonStar': typeof import("../../src/components/common/Star.vue")['default']
    'LayoutFooter': typeof import("../../src/components/layout/Footer.vue")['default']
    'LayoutNavbar': typeof import("../../src/components/layout/Navbar.vue")['default']
    'ModalBuisnessReg': typeof import("../../src/components/modal/BuisnessReg.vue")['default']
    'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Icon': typeof import("../../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
    'IconCSS': typeof import("../../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
    'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyCommonAgencyContact': LazyComponent<typeof import("../../src/components/common/Agency/AgencyContact.vue")['default']>
    'LazyCommonAgencyDetails': LazyComponent<typeof import("../../src/components/common/Agency/AgencyDetails.vue")['default']>
    'LazyCommonAgencyHead': LazyComponent<typeof import("../../src/components/common/Agency/AgencyHead.vue")['default']>
    'LazyCommonAgencyProfile': LazyComponent<typeof import("../../src/components/common/Agency/AgencyProfile.vue")['default']>
    'LazyCommonAgencyReview': LazyComponent<typeof import("../../src/components/common/Agency/AgencyReview.vue")['default']>
    'LazyCommonButton': LazyComponent<typeof import("../../src/components/common/Button.vue")['default']>
    'LazyCommonCarusal': LazyComponent<typeof import("../../src/components/common/Carusal.vue")['default']>
    'LazyCommonCatagory': LazyComponent<typeof import("../../src/components/common/Catagory.vue")['default']>
    'LazyCommonCatagoryBanner': LazyComponent<typeof import("../../src/components/common/Catagory/CatagoryBanner.vue")['default']>
    'LazyCommonCatagoryDetails': LazyComponent<typeof import("../../src/components/common/Catagory/CatagoryDetails.vue")['default']>
    'LazyCommonCatagoryHead': LazyComponent<typeof import("../../src/components/common/Catagory/CatagoryHead.vue")['default']>
    'LazyCommonCatagorySearch': LazyComponent<typeof import("../../src/components/common/Catagory/CatagorySearch.vue")['default']>
    'LazyCommonFilter': LazyComponent<typeof import("../../src/components/common/Filter.vue")['default']>
    'LazyCommonFrequent': LazyComponent<typeof import("../../src/components/common/Frequent.vue")['default']>
    'LazyCommonLoginModal': LazyComponent<typeof import("../../src/components/common/LoginModal.vue")['default']>
    'LazyCommonPopular': LazyComponent<typeof import("../../src/components/common/Popular.vue")['default']>
    'LazyCommonStar': LazyComponent<typeof import("../../src/components/common/Star.vue")['default']>
    'LazyLayoutFooter': LazyComponent<typeof import("../../src/components/layout/Footer.vue")['default']>
    'LazyLayoutNavbar': LazyComponent<typeof import("../../src/components/layout/Navbar.vue")['default']>
    'LazyModalBuisnessReg': LazyComponent<typeof import("../../src/components/modal/BuisnessReg.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyIcon': LazyComponent<typeof import("../../node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
    'LazyIconCSS': LazyComponent<typeof import("../../node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
