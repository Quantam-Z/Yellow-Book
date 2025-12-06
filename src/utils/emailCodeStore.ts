const STORE_KEY = '__OTP_STORE__';
const DEFAULT_TTL = 5 * 60 * 1000;

type OtpEntry = {
  code: string;
  expiresAt: number;
};

const getStore = (): Map<string, OtpEntry> => {
  const globalStore = globalThis as typeof globalThis & { [STORE_KEY]?: Map<string, OtpEntry> };
  if (!globalStore[STORE_KEY]) {
    globalStore[STORE_KEY] = new Map();
  }
  return globalStore[STORE_KEY]!;
};

export const issueCode = (email: string, ttlMs = DEFAULT_TTL) => {
  const normalized = email.trim().toLowerCase();
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + ttlMs;
  getStore().set(normalized, { code, expiresAt });
  return { code, expiresAt };
};

export const verifyCode = (email: string, code: string) => {
  const normalized = email.trim().toLowerCase();
  const entry = getStore().get(normalized);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    getStore().delete(normalized);
    return false;
  }
  const matches = entry.code === code.trim();
  if (matches) {
    getStore().delete(normalized);
  }
  return matches;
};

export const peekCode = (email: string) => {
  const normalized = email.trim().toLowerCase();
  return getStore().get(normalized) ?? null;
};

export const getDefaultTtl = () => DEFAULT_TTL;
