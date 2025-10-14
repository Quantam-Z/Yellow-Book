export function setToken(token = '', user = '') {
  if (process.server) {
    cookieToken(token)
    return
  }
  try {
    localStorage.setItem('token', token || '')
    localStorage.setItem('user', JSON.stringify(user || ''))
  } catch (_) { /* ignore */ }
  cookieToken(token)
}

export function removeToken() {
  try {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  } catch (_) { /* ignore */ }
  cookieToken('')
}

export function getUser() {
  if (process.server) return {}
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : {}
  } catch (_) {
    return {}
  }
}

export function getToken() {
  if (process.server) return cookieToken()
  try {
    return localStorage.getItem('token') || ''
  } catch (_) {
    return ''
  }
}

export function cookieToken(token = null) {
  const savedToken = useCookie('token')
  savedToken.value = token ?? savedToken.value
  return savedToken.value
}
