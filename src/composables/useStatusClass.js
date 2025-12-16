// Centralized helpers for status/role/signup badges and labels

export function getStatusClass(status, variant = 'badge') {
  const map = {
    approved: { badge: 'bg-green-100 text-green-700', soft: 'text-green-500 bg-green-50' },
    active: { badge: 'bg-green-100 text-green-700', soft: 'text-green-500 bg-green-50' },
    verified: { badge: 'bg-green-100 text-green-700', soft: 'text-green-500 bg-green-50' },
    pending: { badge: 'bg-amber-100 text-amber-700', soft: 'text-amber-500 bg-amber-50' },
    inactive: { badge: 'bg-gray-100 text-gray-700', soft: 'text-gray-500 bg-gray-50' },
    rejected: { badge: 'bg-red-100 text-red-700', soft: 'text-red-500 bg-red-50' },
    suspended: { badge: 'bg-red-100 text-red-700', soft: 'text-red-500 bg-red-50' },
    banned: { badge: 'bg-red-100 text-red-700', soft: 'text-red-500 bg-red-50' },
    'on hold': { badge: 'bg-gray-100 text-gray-700', soft: 'text-gray-600 bg-gray-50' },
    default: { badge: 'bg-gray-100 text-gray-700', soft: 'text-gray-500 bg-gray-50' },
  };
  const key = String(status || '').toLowerCase();
  const style = map[key] || map.default;
  return style[variant] || style.badge;
}

export function getStatusShort(status) {
  const map = {
    approved: 'App',
    pending: 'Pen',
    rejected: 'Rej',
    active: 'Act',
    inactive: 'Ina',
    suspended: 'Sus',
    verified: 'Ver',
    banned: 'Ban',
  };
  const key = String(status || '').toLowerCase();
  return map[key] || status || '';
}

export function getRoleClass(role, variant = 'badge') {
  const map = {
    'super admin': { badge: 'bg-purple-100 text-purple-700', soft: 'text-purple-600 bg-purple-50' },
    admin: { badge: 'bg-blue-100 text-blue-700', soft: 'text-blue-600 bg-blue-50' },
    moderator: { badge: 'bg-orange-100 text-orange-700', soft: 'text-orange-600 bg-orange-50' },
    support: { badge: 'bg-teal-100 text-teal-700', soft: 'text-teal-600 bg-teal-50' },
    default: { badge: 'bg-gray-100 text-gray-700', soft: 'text-gray-600 bg-gray-50' },
  };
  const key = String(role || '').toLowerCase();
  const style = map[key] || map.default;
  return style[variant] || style.badge;
}

export function getSignupMethodClass(method, variant = 'badge') {
  const map = {
    google: { badge: 'bg-red-50 text-red-600', soft: 'text-red-600 bg-red-50' },
    facebook: { badge: 'bg-blue-50 text-blue-600', soft: 'text-blue-600 bg-blue-50' },
    twitter: { badge: 'bg-sky-50 text-sky-600', soft: 'text-sky-600 bg-sky-50' },
    email: { badge: 'bg-orange-50 text-orange-600', soft: 'text-orange-600 bg-orange-50' },
    default: { badge: 'bg-gray-50 text-gray-600', soft: 'text-gray-600 bg-gray-50' },
  };
  const key = String(method || '').toLowerCase();
  const style = map[key] || map.default;
  return style[variant] || style.badge;
}
