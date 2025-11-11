// src/stores/auth.js
import { defineStore } from 'pinia'
import useRequest from '~/composables/useRequest'
import { setToken as setAuthToken, removeToken as clearAuthToken, getUser as getSavedUser, getToken as getSavedToken } from '~/composables/useAuth'

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
      async hydrateFromStorage() {
        // Useful on app boot to restore state (client-only values)
        try {
          const token = getSavedToken();
          const user = getSavedUser();
          if (token) this.token = token;
          if (user && Object.keys(user).length) this.user = user;
        } catch (_) {}
      },

      async login(payload) {
        // Adjust endpoint/shape to your API
        const $api = useRequest()
        const response = await $api.post('auth/login', payload, {
          toast: { showSuccess: true, successMessage: 'Logged in successfully' },
        });

        const token = response?.token || response?.access_token || '';
        const user = response?.user || null;

        this.token = token;
        this.user = user;

        setAuthToken(token, user);
        return response;
      },

      async logout() {
        const $api = useRequest()
        try {
          // Call API if available but ignore failures
          await $api.post('auth/logout', null, { toast: { showSuccess: false, showError: false } });
        } catch (_) {}

        this.token = '';
        this.user = null;
        clearAuthToken();
        navigateTo('/auth/login');
      },

      async fetchMe() {
        // Optionally fetch current user
        const $api = useRequest()
        const me = await $api.get('auth/me', { toast: { showError: false } });
        if (me) this.user = me;
        return me;
      }
  },
  persist: true
})
