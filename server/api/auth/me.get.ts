import { defineEventHandler, getHeader, getCookie, createError } from "h3";
import { executeStubRequest } from "~/services/stubClient";

const BEARER_PREFIX = "bearer ";

const extractBearerToken = (value: string | null | undefined) => {
  if (!value) return null;
  const normalized = value.trim();
  return normalized.toLowerCase().startsWith(BEARER_PREFIX)
    ? normalized.slice(BEARER_PREFIX.length).trim()
    : null;
};

const parseStubToken = (token: string | null | undefined) => {
  if (!token) return null;
  const match = /^stub-token-(?<id>[\w-]+)$/i.exec(token.trim());
  return match?.groups?.id ?? null;
};

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "authorization");
  const cookieToken = getCookie(event, "token");
  const suppliedToken = extractBearerToken(authHeader) ?? cookieToken ?? null;
  const userId = parseStubToken(suppliedToken);

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
      data: { error: "TOKEN_INVALID" },
    });
  }

  const response = await executeStubRequest({
    resource: "users",
    method: "GET",
    delay: 0,
  });

  const candidates = Array.isArray(response.data) ? response.data : [];
  const user =
    candidates.find((candidate) => candidate && String(candidate.id) === String(userId)) ?? null;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
      data: { error: "USER_NOT_FOUND" },
    });
  }

  return { ...user };
});
