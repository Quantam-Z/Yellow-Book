// Return token from cookie/localStorage (avoids store import cycles)
export default function useToken() {
  // SSR-safe cookie lookup
  try {
    const tokenCookie = useCookie('token')
    const cookieVal = tokenCookie?.value || ''
    if (cookieVal) return cookieVal
  } catch (_) { /* cookie not available in some contexts */ }

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
