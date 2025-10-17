// Return token from auth store or cookie/localStorage fallback
export default function useToken() {
  // Try Pinia store if available
  try {
    // Lazy import to avoid cyclic deps in SSR
    const { useAuthStore } = require('~/stores/auth')
    const auth = useAuthStore?.()
    if (auth?.token) return auth.token
  } catch (_) { /* store may not be initialized yet */ }

  // SSR-safe cookie fallback
  try {
    const tokenCookie = useCookie('token')
    const cookieVal = tokenCookie?.value || ''
    if (cookieVal) return cookieVal
  } catch (_) { /* cookie not available */ }

  // Client-side localStorage fallback
  if (process.client) {
    try {
      return localStorage.getItem('token') || ''
    } catch (_) {
      return ''
    }
  }

  return ''
}
