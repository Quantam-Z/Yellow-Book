// Return token from auth store or cookie/localStorage fallback
export default function useToken() {
  try {
    const auth = useAuthStore?.() || null
    if (auth && auth.token) return auth.token
  } catch (_) { /* store not ready */ }

  if (process.server) {
    const token = useCookie('token')
    return token?.value || ''
  }

  try {
    return localStorage.getItem('token') || ''
  } catch (_) {
    return ''
  }
}
