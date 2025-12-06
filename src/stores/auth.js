// src/stores/auth.js
import { defineStore } from 'pinia'
import { useNuxtApp, navigateTo } from 'nuxt/app'
import { useStubClient } from '~/services/stubClient'
import { normalizeEmail, buildStubToken, parseStubToken } from '~/utils/authTokens'
import { setToken as setAuthToken, removeToken as clearAuthToken, getUser as getSavedUser, getToken as getSavedToken } from '~/composables/useAuth'
import { issueCode, verifyCode, getDefaultTtl } from '~/utils/emailCodeStore'

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

const ensureStubUserExists = async (email) => {
  const stubClient = useStubClient()
  const normalized = normalizeEmail(email)
  const users = await stubClient.list('users', { delay: 0 })
  let user = users.find((candidate) => normalizeEmail(candidate?.email) === normalized) ?? null

  if (user) {
    return user
  }

  const fallbackName = normalized.split('@')[0] || 'Guest'
  const created = await stubClient.create('users', {
    name: fallbackName.replace(/^\w/, (char) => char.toUpperCase()),
    email: normalized,
    signupMethod: 'Email',
    signupDate: new Date().toISOString().slice(0, 10),
    status: 'Pending',
    verified: false,
  })

  user = created ?? { name: fallbackName, email: normalized }
  return user
}

// Authentication store with token and derived auth state
export const useAuthStore = defineStore('auth', {
    state: () => ({
      user: null,
      token: '',
      pendingChallenge: null,
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
        this.pendingChallenge = null
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
    async requestEmailCode(payload = {}) {
        const email = normalizeEmail(payload?.email)
        if (!email) {
          throw createAuthError(400, 'Email is required', 'EMAIL_REQUIRED')
        }

        await ensureStubUserExists(email)

        const { code, expiresAt } = issueCode(email, getDefaultTtl())
        const expiresInMs = Math.max(0, expiresAt - Date.now())

        this.pendingChallenge = {
          email,
          sentAt: Date.now(),
          expiresAt,
        }

        const notifier = getNotifier()
        notifier?.success('Verification code sent')

        return {
          ok: true,
          message: 'Verification code generated',
          meta: {
            expiresAt,
            expiresInMs,
          },
          debug: import.meta.dev ? { code } : undefined,
        }
      },
      async verifyEmailCode(payload = {}) {
        const email = normalizeEmail(payload?.email)
        const code = String(payload?.code ?? '').trim()
        if (!email) {
          throw createAuthError(400, 'Email is required', 'EMAIL_REQUIRED')
        }
        if (!code) {
          throw createAuthError(400, 'Verification code is required', 'CODE_REQUIRED')
        }

        const isValid = verifyCode(email, code)
        if (!isValid) {
          throw createAuthError(400, 'Invalid or expired verification code', 'INVALID_CODE')
        }

        const stubClient = useStubClient()
        const users = await stubClient.list('users', { delay: 0 })
        const user =
          users.find((candidate) => normalizeEmail(candidate?.email) === email) ??
          (await ensureStubUserExists(email))

        if (!user) {
          throw createAuthError(404, 'User record not found', 'USER_NOT_FOUND')
        }

        const token = buildStubToken(user.id ?? email)

        this.token = token
        this.user = { ...user }
        this.pendingChallenge = null
        setAuthToken(token, this.user)

        const notifier = getNotifier()
        notifier?.success('Logged in successfully')

        return {
          token,
          user: this.user,
        }
      },
      clearEmailChallenge() {
        this.pendingChallenge = null
      },
    },
    persist: {
      key: 'auth',
      paths: ['user', 'token'],
    },
})
