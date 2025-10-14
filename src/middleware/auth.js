// src/middleware/auth.js
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Attempt hydration on client in case store is empty but persisted data exists
  if (process.client && !auth.token) auth.hydrateFromStorage?.()

  if (!auth.isAuthenticated) {
    const next = encodeURIComponent(to.fullPath || '/')
    return navigateTo(`/auth/login?next=${next}`)
  }
})
