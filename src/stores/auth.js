// src/stores/auth.js
import { defineStore } from 'pinia'

// Authentication store with token and derived auth state
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: ''
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token || (state.user && state.user.id)),
  },
  actions: {
    login(_payload) { /* implement login and set token/user */ },
    logout() { /* implement logout and clear token/user */ }
  },
  persist: true
})
