// src/stores/auth.js
import { defineStore } from 'pinia'
import { useNuxtApp, navigateTo } from '#imports'
import { useStubClient } from '~/services/stubClient'
import { setToken as setAuthToken, removeToken as clearAuthToken, getUser as getSavedUser, getToken as getSavedToken } from '~/composables/useAuth'

const normalizeEmail = (value) =>
  typeof value === 'string' ? value.trim().toLowerCase() : String(value ?? '').trim().toLowerCase()

const parseStubToken = (token) => {
  if (!token) return null
  const match = /^stub-token-(?<id>[\w-]+)$/i.exec(String(token).trim())
  return match?.groups?.id ?? null
}

const buildStubToken = (id) => `stub-token-${id ?? 'guest'}`

const createAuthError = (status, message, code) => {
  const error = new Error(message)
  error.status = status
  error.statusCode = status
  error.statusMessage = message
  error.data = { error: code }
  return error
}

const getNotifier = () => {
  if (!import.meta.client) return null
  try {
    return useNuxtApp()?.$awn ?? null
  } catch (_) {
    return null
  }
}

// Authentication store with token and derived auth state
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: '',
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token || (state.user && state.user.id)),
  },
  actions: {
    async hydrateFromStorage() {
      // Useful on app boot to restore state (client-only values)
      try {
        const token = getSavedToken()
        const user = getSavedUser()
        if (token) this.token = token
        if (user && Object.keys(user).length) this.user = user
      } catch (_) {}
    },

    async login(payload) {
      const stubClient = useStubClient()

      const email = normalizeEmail(payload?.email)
      if (!email) {
        throw createAuthError(400, 'Email is required', 'EMAIL_REQUIRED')
      }

      const users = await stubClient.list('users', { delay: 0 })
      const matchedUser =
        users.find((candidate) => typeof candidate?.email === 'string' && normalizeEmail(candidate.email) === email) ??
        null

      if (!matchedUser) {
        throw createAuthError(401, 'Invalid credentials', 'INVALID_CREDENTIALS')
      }

      const token = buildStubToken(matchedUser.id)
      const user = { ...matchedUser }

      this.token = token
      this.user = user

      setAuthToken(token, user)

      const notifier = getNotifier()
      notifier?.success('Logged in successfully')

      return {
        token,
        user,
        message: 'Authenticated with stub credentials',
      }
    },

    async logout() {
      this.token = ''
      this.user = null
      clearAuthToken()

      const notifier = getNotifier()
      notifier?.success('Logged out successfully')

      navigateTo('/auth/login')
    },

    async fetchMe() {
      const stubClient = useStubClient()
      const token = this.token || getSavedToken()
      const userId = parseStubToken(token)

      if (!userId) {
        throw createAuthError(401, 'Unauthenticated', 'TOKEN_INVALID')
      }

      const users = await stubClient.list('users', { delay: 0 })
      const user = users.find((candidate) => candidate && String(candidate.id) === String(userId)) ?? null

      if (!user) {
        throw createAuthError(401, 'Unauthenticated', 'USER_NOT_FOUND')
      }

      this.user = { ...user }
      return this.user
    },
  },
  persist: true,
})
