import { defineEventHandler, readBody, createError } from 'h3';
import { executeStubRequest } from '~/services/stubClient';
import { normalizeEmail, buildStubToken } from '~/utils/authTokens';
import { verifyCode } from '~/server/utils/emailCodeStore';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; code?: string }>(event);
  const email = normalizeEmail(body?.email);
  const code = String(body?.code ?? '').trim();

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' });
  }

  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'Verification code is required' });
  }

  const isValid = verifyCode(email, code);
  if (!isValid) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or expired verification code' });
  }

  const response = await executeStubRequest({ resource: 'users', method: 'GET' });
  const records: Array<any> = Array.isArray(response.data) ? response.data : [];
  const user = records.find((entry) => normalizeEmail(entry.email) === email);

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User record not found' });
  }

  const token = buildStubToken(user.id ?? email);

  return {
    token,
    user,
  };
});
