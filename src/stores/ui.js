import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isSidebarOpen: false,
    isScrolled: false
  }),
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    openSidebar() {
      this.isSidebarOpen = true
    },
    closeSidebar() {
      this.isSidebarOpen = false
    },
    closeOnMobile() {
      if (process.client && window.innerWidth < 768) this.isSidebarOpen = false
    },
    handleScroll() {
      if (!process.client) return
      this.isScrolled = window.scrollY > 50
    },
    mountListeners() {
      if (!process.client) return
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    },
    unmountListeners() {
      if (!process.client) return
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  persist: true
})
