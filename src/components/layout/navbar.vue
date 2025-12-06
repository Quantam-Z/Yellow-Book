<template>
  <div class="w-full relative flex-shrink-0 text-left text-base text-[#616161] bg-[#fff9e6] rounded-sm font-['Plus_Jakarta_Sans'] pb-7 boat-bottom-radius">
    <div class="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-[120px] py-4 sm:py-6 flex flex-col">
        <div class="flex items-center justify-between mb-6 sm:mb-12 md:mb-16">
        <nuxt-link
          to="/"
          class="w-[140px] rounded-[4px] flex flex-col items-start p-2 box-border"
        >
          <img
            class="block w-[140px] h-auto object-contain"
            width="140"
            height="34"
            src="/logo/logo.png"
            alt="Logo"
          />
        </nuxt-link>

          <div class="hidden lg:flex items-center gap-8">
            <nuxt-link
              to="/catagory"
              class="flex flex-col items-center gap-[4px] cursor-pointer no-underline transition-colors"
            >
              <div
                class="relative leading-[160%] text-base"
                :class="navTextClass('/catagory')"
              >
                Category
              </div>
              <div
                v-if="isRouteActive('/catagory')"
                class="w-[30px] bg-[#212121] h-[2px]"
              ></div>
            </nuxt-link>

              <nuxt-link
              :to="popularListingLink"
                class="flex flex-col items-center gap-[4px] cursor-pointer no-underline transition-colors"
                @click="handlePopularListingClick"
            >
              <div
                class="relative leading-[160%] text-base"
                :class="navTextClass(popularListingLink)"
              >
                Popular Listing
              </div>
              <div
                v-if="isRouteActive(popularListingLink)"
                class="w-[30px] bg-[#212121] h-[2px]"
              ></div>
            </nuxt-link>

            <nuxt-link
              to="/faq"
              class="flex flex-col items-center gap-[4px] cursor-pointer no-underline transition-colors"
            >
              <div
                class="relative leading-[160%] text-base"
                :class="navTextClass('/faq')"
              >
                FAQ
              </div>
              <div
                v-if="isRouteActive('/faq')"
                class="w-[30px] bg-[#212121] h-[2px]"
              ></div>
            </nuxt-link>
          </div>

          <div class="hidden lg:flex items-center gap-6 text-[#212121]">
            <template v-if="!isAuthenticated">
              <div class="flex items-center justify-center cursor-pointer" @click="openLoginModal">
                <div class="relative leading-[160%] font-normal text-base">Login</div>
              </div>
            </template>
            <PanelProfileMenu
              v-else
              role-label="Account"
              dashboard-to="/user/my-profile"
            />
            <button
              type="button"
              class="relative rounded border-gray border-solid border-[1px] box-border h-12 flex items-center justify-center py-[18px] px-9 text-center text-base text-[#212121] font-plus-jakarta-sans bg-transparent"
              @click="handleListYourAgencyClick"
            >
              <div class="relative leading-[130%] capitalize font-semibold">List Your Agency</div>
            </button>

        </div>

        <button
          @click="toggleMobileMenu"
          class="lg:hidden p-2 rounded-full border-2 border-[#fcc207] bg-white shadow-md z-50 relative transform hover:scale-110 transition-transform"
          aria-label="Toggle menu"
        >
          <component :is="isMobileMenuOpen ? 'X' : 'Menu'" class="w-6 h-6 text-[#212121]" />
        </button>
      </div>

      <transition name="overlay">
        <div
          v-if="isMobileMenuOpen"
          @click="toggleMobileMenu"
          class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      </transition>

      <transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="lg:hidden fixed top-0 right-0 h-screen w-[80vw] max-w-[400px] bg-white shadow-2xl z-50 overflow-y-auto"
        >
          <div class="p-6 h-full flex flex-col">
            <div class="flex justify-end mb-8">
              <button @click="toggleMobileMenu" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

              <nav class="flex-1 flex flex-col space-y-2 text-lg">
                <nuxt-link
                  to="/catagory"
                  class="py-4 px-4 rounded-lg transition-colors border-b border-gray-100 no-underline"
                  :class="mobileNavClasses('/catagory')"
                  @click.native="closeMobileMenu"
                >
                  Category
                </nuxt-link>

                  <nuxt-link
                  :to="popularListingLink"
                  class="py-4 px-4 rounded-lg transition-colors border-b border-gray-100 no-underline"
                  :class="mobileNavClasses(popularListingLink)"
                    @click="handlePopularListingClick($event, true)"
                >
                  Popular Listing
                </nuxt-link>

                <nuxt-link
                  to="/faq"
                  class="py-4 px-4 rounded-lg transition-colors border-b border-gray-100 no-underline"
                  :class="mobileNavClasses('/faq')"
                  @click.native="closeMobileMenu"
                >
                  FAQ
                </nuxt-link>
              </nav>

            <div class="space-y-3 mt-auto pt-6 border-t border-gray-200">
                  <template v-if="!isAuthenticated">
                    <button
                      @click="openLoginModal"
                      class="w-full text-left text-[#212121] font-medium text-lg py-2 px-1 hover:text-[#f59e0b] transition-colors"
                    >
                      Login
                    </button>
                  </template>
                <template v-else>
                  <button
                    @click="goToUserDashboard"
                      class="w-full text-left text-[#212121] font-medium text-lg py-2 px-1 hover:text-[#f59e0b] transition-colors"
                  >
                    My Dashboard
                  </button>
                  <button
                    @click="handleUserLogout"
                      class="w-full text-left text-red-500 font-medium text-lg py-2 px-1 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </template>
                  <button
                    type="button"
                    class="w-full py-3 px-6 bg-[#fcc207] text-[#212121] font-semibold text-lg rounded-lg border-b-2 border-[#e5b106] hover:bg-[#e5b106] transition-all text-center block"
                    @click="handleListYourAgencyClick($event, true)"
                  >
                    List Your Agency
                  </button>
            </div>
          </div>
        </div>
      </transition>

      <div class="flex-1 flex justify-center items-start">
        <div class="max-w-[676px] w-full mx-auto flex flex-col items-center gap-6 sm:gap-8 text-center text-[#212121]">
          <div class="w-full flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-[26px]">
            <h1 class="w-full text-2xl sm:text-3xl md:text-[46px] leading-[140%] sm:leading-[135%] capitalize font-medium px-4">
              Trusted Help, Right When<br />You Need It
            </h1>
            <p class="w-full max-w-[536px] text-sm sm:text-base md:text-[16px] leading-[130%] capitalize text-[#616161] px-4">
              Reliable support from real people, solving everyday problems with care, speed, and integrity.
            </p>
          </div>

          <div ref="searchContainer" class="w-full relative px-4">
            <div
              class="backdrop-blur-[16px] rounded-[12px] sm:rounded-[16px] bg-[#feecb2] flex flex-row items-center p-2 sm:p-3 md:p-3 gap-2 sm:gap-3 md:gap-[20px] text-[14px] sm:text-[16px] md:text-[16px]"
            >
            <div class="flex-1 rounded-[8px] bg-[#fff9e6] flex flex-col items-start justify-center px-[10px] py-[6px] min-h-[44px] sm:min-h-[48px]">
  <label class="w-full flex items-center">
    <input
      ref="searchInput"
      v-model="searchQuery"
      type="text"
      class="w-full bg-transparent outline-none border-none focus:ring-0 leading-[160%] capitalize truncate text-sm sm:text-base md:text-base placeholder:text-[#9e9e9e]"
      :placeholder="selectedSearch"
      aria-label="Search agencies"
      @focus="openDropdown"
      @input="handleInput"
      @keydown.enter.prevent="performSearch"
    />
  </label>
</div>


              <div
                class="relative rounded-lg bg-gold border-goldenrod border-solid border-b-[2px] box-border flex items-center p-2.5 gap-2 text-center text-lg text-gray font-plus-jakarta-sans cursor-pointer"
                @click="handleSearchClick"
              >
                <div class="relative leading-[160%] capitalize font-medium">Search</div>
                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

              <transition name="dropdown">
                <div
                  v-if="showDropdown"
                  class="absolute top-full mt-2 left-4 right-4 rounded-[8px] border border-[#fee38d] overflow-hidden bg-white shadow-xl z-20 max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto"
                >
                  <div
                    v-if="isLoadingSearchData"
                    class="w-full py-4 px-4 text-center text-xs sm:text-sm text-[#9e9e9e] bg-white"
                  >
                    Loading search options...
                  </div>
                  <template v-else>
                      <div
                        v-for="(entry, index) in filteredSearchEntries"
                        :key="entry.slug || entry.title || index"
                        @click="selectSearch(entry)"
                        :class="[
                          'w-full h-[40px] sm:h-[44px] flex items-center px-3 sm:px-4 cursor-pointer transition-all text-xs sm:text-sm md:text-[14px] active:scale-[0.98]',
                          'bg-white hover:bg-[#f0f0f0]',
                          index !== filteredSearchEntries.length - 1 ? 'border-b border-[#e0e0e0]' : ''
                        ]"
                      >
                        <div class="leading-[170%] capitalize">{{ entry.title }}</div>
                      </div>
                    <div
                      v-if="!filteredSearchEntries.length"
                      class="w-full py-4 px-4 text-center text-xs sm:text-sm text-[#9e9e9e] bg-white"
                    >
                      No matches found
                    </div>
                  </template>
                </div>
              </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, X } from 'lucide-vue-next'
import { useRequestFetch, useNuxtApp } from '#app'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import { useLoginModal } from '~/composables/useLoginModal'
import PanelProfileMenu from '~/components/common/panelProfileMenu.vue'

export default {
  name: 'ResponsiveLandingPage',
  components: { Menu, X, PanelProfileMenu },
    emits: ['search'],
    setup() {
      const requestFetch = useRequestFetch()
      const nuxtApp = useNuxtApp()
      const authStore = useAuthStore()
      const { openLoginModal: triggerOpenLoginModal } = useLoginModal()
      if (process.client) {
        authStore.hydrateFromStorage()
      }
      const { isAuthenticated, user } = storeToRefs(authStore)

      return {
        requestFetch,
        nuxtApp,
        authStore,
        isAuthenticated,
        authUser: user,
        triggerOpenLoginModal,
      }
    },
    data() {
      const defaultSearchPlaceholder = 'Search agencies'
      return {
        showDropdown: false,
        selectedSearch: defaultSearchPlaceholder,
        searchQuery: '',
        cachedSearchQuery: '',
        isMobileMenuOpen: false,
        defaultSearchPlaceholder,
        dropdownResultLimit: 12,
        popularSectionId: 'home-popular-listings',
        searchResults: [],
        searchMeta: {
          total: 0,
          page: 1,
          totalPages: 1,
        },
        searchLoading: false,
        searchError: null,
        searchDebounceId: null,
      }
    },
    computed: {
      isLoadingSearchData() {
        return this.searchLoading
      },
      filteredSearchEntries() {
        return this.searchResults
      },
        popularListingLink() {
            return { path: '/', hash: `#${this.popularSectionId}` }
          },
          listYourAgencyLink() {
            return this.isAuthenticated ? '/popular-list' : '/auth/register'
            },
            activePath() {
              return this.$route?.path || ''
            },
    },
  methods: {
    notifyLoginRequired() {
      const notifier = this.nuxtApp?.$awn
      if (!notifier) {
        return
      }
      const message = 'Please login to list your agency'
      if (typeof notifier.info === 'function') {
        notifier.info(message)
      } else if (typeof notifier.alert === 'function') {
        notifier.alert(message)
      }
    },
    async fetchSearchEntries(searchText = '') {
      const query = searchText?.trim() || ''
      this.searchLoading = true
      try {
        const response = await this.requestFetch('/api/search/listings', {
          params: {
            search: query || undefined,
            limit: this.dropdownResultLimit,
          },
        })
        this.searchResults = Array.isArray(response?.data) ? response.data : []
        this.searchMeta = response?.meta ?? {}
        this.searchError = null
      } catch (error) {
        this.searchError = error
        console.error('Failed to load listings for search:', error)
      } finally {
        this.searchLoading = false
      }
    },
    queueSearchRequest() {
      if (this.searchDebounceId) {
        clearTimeout(this.searchDebounceId)
      }
      this.searchDebounceId = setTimeout(() => {
        this.fetchSearchEntries(this.searchQuery)
      }, 200)
    },
    async handleUserLogout() {
      await this.authStore.logout()
      this.closeMobileMenu()
    },
    goToUserDashboard() {
      this.closeMobileMenu()
      if (this.$router) {
        this.$router.push('/user/my-profile')
      }
    },
    async openDropdown() {
      if (!this.showDropdown) {
        this.cachedSearchQuery = this.searchQuery
        if (this.searchQuery.trim() === this.selectedSearch.trim()) {
          this.searchQuery = ''
        }
        await this.fetchSearchEntries(this.searchQuery)
        this.showDropdown = true
      }
    },
    handleInput() {
      if (!this.showDropdown) {
        this.showDropdown = true
      }
      this.queueSearchRequest()
    },
    handleSearchClick() {
      const trimmedQuery = this.searchQuery.trim()
      if (!trimmedQuery) {
        if (!this.showDropdown) {
          this.openDropdown()
        }
        return
      }
      this.performSearch()
    },
    async performSearch() {
      const value = (this.searchQuery || this.selectedSearch).trim()
      if (!value) return

      this.selectedSearch = value
      this.searchQuery = value
      this.cachedSearchQuery = value
      this.showDropdown = false

      await this.fetchSearchEntries(value)

      const matchedRecord = this.findMatchingRecord(value)
      if (this.$emit) {
        this.$emit('search', value)
      }
      if (matchedRecord) {
        this.navigateToPopularListing(matchedRecord)
      }
    },
    selectSearch(entry) {
      if (!entry) return
      this.selectedSearch = entry.title
      this.searchQuery = entry.title
      this.cachedSearchQuery = entry.title
      this.showDropdown = false
    },
    openLoginModal() {
      this.isMobileMenuOpen = false
      try {
        if (typeof this.triggerOpenLoginModal === 'function') {
          this.triggerOpenLoginModal('navbar')
          return
        }
      } catch (error) {
        if (import.meta.dev) {
          console.error('[Navbar] Failed to open login modal', error)
        }
      }
      if (this.$router) {
        this.$router.push('/auth/login')
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
      handleClickOutside(e) {
      const searchContainer = this.$refs.searchContainer
      if (searchContainer && !searchContainer.contains(e.target)) {
        if (this.showDropdown) {
          this.showDropdown = false
          if (!this.searchQuery.trim()) {
            this.searchQuery = this.cachedSearchQuery || this.selectedSearch
          }
        }
      }
      },
          handlePopularListingClick(event, shouldCloseMenu = false) {
            if (shouldCloseMenu) {
              this.closeMobileMenu()
            }
            const isHomeRoute = this.activePath === '/'
            if (!isHomeRoute) {
              return
            }
            if (event && typeof event.preventDefault === 'function') {
              event.preventDefault()
            }
            this.scrollToPopularListings()
          },
        scrollToPopularListings() {
          if (typeof window === 'undefined') {
            return
          }
          this.$nextTick(() => {
            const target = document.getElementById(this.popularSectionId)
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          })
        },
        handleListYourAgencyClick(event, shouldCloseMenu = false) {
          if (shouldCloseMenu) {
            this.closeMobileMenu()
          }

          if (!this.isAuthenticated) {
            if (event && typeof event.preventDefault === 'function') {
              event.preventDefault()
            }
            this.notifyLoginRequired()
            this.openLoginModal()
            return
          }

          const targetRoute = this.listYourAgencyLink
          if (targetRoute && this.$router) {
            this.$router.push(targetRoute)
          }
        },
        isRouteActive(target) {
          const path = typeof target === 'string' ? target : target?.path
          if (!path) {
            return false
          }
          return this.activePath === path
        },
        navTextClass(target) {
          return this.isRouteActive(target) ? 'text-[#212121] font-medium' : 'text-[#616161] font-normal'
        },
        mobileNavClasses(target) {
          return this.isRouteActive(target)
            ? 'bg-[#fff9e6] text-[#212121] font-semibold border-[#ffe08f]'
            : 'text-[#616161] hover:bg-[#fff9e6]'
        },
      findMatchingRecord(value) {
        const normalized = this.normalizeTitle(value)
        if (!normalized) {
          return this.searchResults[0] || null
        }
        const exact = this.searchResults.find(
          (entry) => this.normalizeTitle(entry.title || entry.name) === normalized,
        )
        return exact || this.searchResults[0] || null
      },
      buildAgencyQuery(record) {
        if (!record) return null
        const query = {}
        if (record.slug) {
          query.slug = record.slug
        }
        if (record.id != null) {
          query.id = String(record.id)
        } else if (!record.slug && record.title) {
          query.title = record.title
        }
        return Object.keys(query).length ? query : null
      },
      normalizeTitle(value) {
        return String(value || '')
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim()
      },
      navigateToPopularListing(record) {
        if (!this.$router) return
        const target = record || this.searchResults[0]
        if (!target) {
          this.$router.push({ path: '/agency' })
          return
        }
        const query = this.buildAgencyQuery(target)
        if (query) {
          this.$router.push({ path: '/agency', query })
        } else {
          this.$router.push({ path: '/agency' })
        }
      }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    this.fetchSearchEntries()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
    if (this.searchDebounceId) {
      clearTimeout(this.searchDebounceId)
      this.searchDebounceId = null
    }
  }
}
</script>

<style scoped>
/* Height Control for Mobile (Unchanged) */
.mobile-height {
  height: 100vh;
  min-height: 100vh;
}
@media (max-width: 1023px) {
  .mobile-height {
    height: 50vh;
    min-height: 50vh;
  }
}

/* * Boat Bottom Shape MODIFIED:
 * Curve flattened by an additional 10%.
 */
.boat-bottom-radius {
  /* Previous vertical radius 38.88px -> 34.99px (approx) */
  border-bottom-left-radius: 50% 34.99px;
  border-bottom-right-radius: 50% 34.99px;
}

@media (min-width: 640px) {
  .boat-bottom-radius {
    /* Previous vertical radius 58.32px -> 52.49px (approx) */
    border-bottom-left-radius: 50% 52.49px;
    border-bottom-right-radius: 50% 52.49px;
  }
}
@media (min-width: 1024px) {
  .boat-bottom-radius {
    /* Previous vertical radius 81px -> 72.9px */
    border-bottom-left-radius: 50% 72.9px;
    border-bottom-right-radius: 50% 72.9px;
  }
}

/* Transition Styles (Unchanged) */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Scrollbar Styling (Unchanged) */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #fcc207;
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #e5b106;
}
</style>