// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    login() { /* login logic */ },
    logout() { /* logout logic */ }
  }
})
