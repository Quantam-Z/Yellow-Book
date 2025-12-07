import { defineEventHandler, getMethod, getQuery, readBody, setResponseStatus } from 'h3';
import type { H3Event } from 'h3';

import { executeStubRequest, StubApiError } from '~/services/stubClient';

type AnyQuery = Record<string, string | string[] | undefined>;

const METHODS_WITH_BODY = new Set(['PUT', 'PATCH']);

const normalizeDelay = (query: AnyQuery): number | undefined => {
  const raw = query?.delay;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const respondWithSuccess = (event: H3Event, payload: any) => {
  const status = payload?.status ?? 200;
  const statusText = payload?.statusText ?? 'OK';
  setResponseStatus(event, status, statusText);
  return {
    ok: payload?.ok ?? true,
    status,
    statusText,
    data: payload?.data ?? null,
    meta: payload?.meta ?? {},
    duration: payload?.duration ?? null,
  };
};

const respondWithError = (event: H3Event, error: unknown) => {
  const stubError =
    error instanceof StubApiError
      ? error
      : new StubApiError(500, error instanceof Error ? error.message : 'Stub request failed', {
          reason: 'stub-handler-error',
        });

  setResponseStatus(event, stubError.status, stubError.statusText);
  return {
    error: stubError.message,
    status: stubError.status,
    statusText: stubError.statusText,
    details: stubError.details ?? {},
  };
};

export default defineEventHandler(async (event) => {
  const resource = event.context.params?.resource;
  const id = event.context.params?.id;

  if (!resource) {
    return respondWithError(event, new StubApiError(400, 'Stub resource is required'));
  }

  if (id === undefined || id === null) {
    return respondWithError(event, new StubApiError(400, 'Stub record id is required'));
  }

  const method = (getMethod(event) || 'GET').toUpperCase();
  const query = getQuery(event) as AnyQuery;
  const delay = normalizeDelay(query);

  try {
    if (method === 'GET') {
      const response = await executeStubRequest({ resource, method: 'GET', id, delay });
      return respondWithSuccess(event, response);
    }

    if (method === 'DELETE') {
      const response = await executeStubRequest({ resource, method: 'DELETE', id, delay });
      return respondWithSuccess(event, response);
    }

    if (METHODS_WITH_BODY.has(method)) {
      const payload = await readBody(event);
      const response = await executeStubRequest({ resource, method, id, payload, delay });
      return respondWithSuccess(event, response);
    }

    throw new StubApiError(405, `Method ${method} not allowed for stub resource "${resource}"`);
  } catch (error) {
    return respondWithError(event, error);
  }
});
