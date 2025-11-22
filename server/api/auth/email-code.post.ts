import { defineEventHandler, readBody, createError } from 'h3';
import { executeStubRequest } from '~/services/stubClient';
import { normalizeEmail } from '~/utils/authTokens';
import { issueCode, getDefaultTtl } from '../../utils/emailCodeStore';

const ensureUserExists = async (email: string) => {
  const normalized = normalizeEmail(email);
  const response = await executeStubRequest({ resource: 'users', method: 'GET' });
  const records: Array<any> = Array.isArray(response.data) ? response.data : [];
  let user = records.find((entry) => normalizeEmail(entry.email) === normalized);

  if (user) {
    return user;
  }

  const fallbackName = normalized.split('@')[0] || 'Guest';
  const created = await executeStubRequest({
    resource: 'users',
    method: 'POST',
    payload: {
      name: fallbackName.replace(/^\w/, (char) => char.toUpperCase()),
      email: normalized,
      signupMethod: 'Email',
      signupDate: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      verified: false,
    },
  });

  user = created.data ?? { name: fallbackName, email: normalized };
  return user;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event);
  const email = normalizeEmail(body?.email);

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' });
  }

  await ensureUserExists(email);

  const { code, expiresAt } = issueCode(email, getDefaultTtl());
  const expiresInMs = Math.max(0, expiresAt - Date.now());

  return {
    ok: true,
    message: 'Verification code generated',
    meta: {
      expiresAt,
      expiresInMs,
    },
    debug: process.env.NODE_ENV !== 'production' ? { code } : undefined,
  };
});
